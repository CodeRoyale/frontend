import { DataFromServer, Room } from "../../types/types";
import { ROOM_PREFIX } from "../../utils/constants";
import { z } from "zod";
import api from "../../utils/api";
import { getUser, updateUser } from "../userController";

const CreateRoomInputSchema = z.object({
  config: z.object({
    title: z
      .string()
      .trim()
      .min(2, { message: "Must be 2 or more characters long" })
      .max(50, { message: "Cannot be more than 50 characters" }),
    private: z.boolean(),
    maxTeams: z.number(),
    maxMembersPerTeam: z.number(),
    maxMembers: z.number(),
  }),
  competition: z.object({
    timeLimit: z.number(),
    maxQuestions: z.number(),
  }),
  veto: z.object({
    questionCount: z.number(),
    maxVoteAllowed: z.number(),
    timeLimit: z.number(),
  }),
});

export type CreateRoomInput = z.infer<typeof CreateRoomInputSchema>;

type FieldError = {
  field: string;
  message: string;
};

type CreateRoomResponse = {
  errors?: FieldError[] | null;
  room?: Room | null;
};

export const createRoom = async (
  createRoomInput: CreateRoomInput,
  { socket, redis, currentUserId }: DataFromServer
): Promise<CreateRoomResponse> => {
  // check input from client
  const checkInputresult = CreateRoomInputSchema.safeParse(createRoomInput);
  if (!checkInputresult.success) {
    // need to find a better way to do this...this works for now
    return {
      errors: [
        {
          field: checkInputresult.error.issues[0].path[1].toString(),
          message: checkInputresult.error.issues[0].message,
        },
      ],
    };
  }

  // find user in redis
  let user = await getUser(currentUserId, redis!);
  if (!user) {
    return {
      errors: [
        {
          field: "CreateRoom",
          message: "User who tried to create the room does not exist",
        },
      ],
    };
  }

  // disabled for testing, have to re enable
  // if (user.currentRoom) {
  //   // user already in a room, must leave room to create a new room
  //   return {
  //     error: "You are already in a room, leave to create a new room.",
  //   };
  // }

  // this room id is generated by db
  let roomId = null;
  let response;
  // first create room in db
  try {
    response = await api.createRoom({
      title: createRoomInput.config.title,
      private: createRoomInput.config.private,
      maxMembers: createRoomInput.config.maxMembers,
      creatorId: currentUserId,
    });

    roomId = response.createRoom.id;
  } catch (error) {
    return {
      errors: [
        {
          field: "CreateRoom",
          message: "Failed to create room in DB",
        },
      ],
    };
  }

  const room = await redis?.get(ROOM_PREFIX + roomId);
  if (room) {
    return {
      errors: [
        {
          field: "CreateRoom",
          message: "There is already a room present by the code given",
        },
      ],
    };
  }

  const newRoom: Room = {
    config: {
      id: roomId,
      private: response.createRoom.private,
      title: response.createRoom.title,
      adminUserId: currentUserId,
      maxTeams: createRoomInput.config.maxTeams,
      maxMembersPerTeam: createRoomInput.config.maxMembersPerTeam,
      maxMembers: createRoomInput.config.maxMembers,
    },
    state: {
      currMemberCount: 1,
      bannedMemberIds: [],
      bench: [currentUserId],
    },
    competition: {
      questionIds: [],
      maxQuestions: createRoomInput.competition.maxQuestions,
      contestStartedAt: null,
      contestEndedAt: null,
      isOngoing: false,
      timeLimit: createRoomInput.competition.timeLimit,
      veto: {
        questionCount: createRoomInput.veto.questionCount,
        questionIds: [],
        maxVoteAllowed: createRoomInput.veto.maxVoteAllowed,
        isOngoing: false,
        timeLimit: createRoomInput.veto.timeLimit,
        votedUserIds: [],
      },
    },
  };

  await redis?.set(ROOM_PREFIX + roomId, JSON.stringify(newRoom));

  // update user in cache
  user = {
    ...user,
    currentRoom: roomId,
  };
  await updateUser(user, redis!);

  // created room
  socket.join(roomId!);
  return { room: newRoom };
};
