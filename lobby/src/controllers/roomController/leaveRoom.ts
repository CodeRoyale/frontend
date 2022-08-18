import { ROOM_ALERT_MSG, ROOM_PREFIX } from "../../utils/constants";
import { ControllerResponse, DataFromServer } from "../../types/types";
import { getUser, updateUser } from "../userController";
import {
  LEFT_ROOM,
  RCV_MSG,
  ROOM_UPDATED,
} from "../../socketActions/serverActions";
import { getRoom } from "./getRoom";

export const leaveRoom = async (
  {},
  { socket, redis, currentUserId }: DataFromServer
): Promise<ControllerResponse<boolean>> => {
  let user = await getUser(currentUserId, redis!);
  if (!user) {
    return { error: "User who tried to join the room does not exist" };
  }

  const room = await getRoom(user.currentRoom!, redis!);
  if (!room) {
    return { error: `Room with roomId:${user.currentRoom} does not exist` };
  }

  // if user is part of a team
  if (user.currentTeam) {
    const newTeam = room.teams[user.currentTeam].filter(
      (ele) => ele !== currentUserId
    );
    room.teams[user.currentTeam] = newTeam;
  } else {
    const newBench = room.state.bench.filter((ele) => ele !== currentUserId);
    room.state.bench = newBench;
  }

  // decrement the currentMemberCount
  room.state.currMemberCount -= 1;

  await redis?.set(ROOM_PREFIX + user.currentRoom, JSON.stringify(room));

  socket.to(user.currentRoom!).emit(ROOM_UPDATED, {
    type: LEFT_ROOM,
    data: room,
  });
  socket.to(user.currentRoom!).emit(RCV_MSG, {
    type: ROOM_ALERT_MSG,
    fromUserId: currentUserId,
    message: "has left the room",
  });

  socket.leave(`${user.currentRoom}/${user.currentTeam}`);
  socket.leave(user.currentRoom!);
  console.log(`User: ${currentUserId} has left the room: ${user.currentRoom}`);

  user = {
    ...user,
    currentRoom: null,
    currentTeam: null,
  };
  await updateUser(user, redis!);

  return { data: true };
};
