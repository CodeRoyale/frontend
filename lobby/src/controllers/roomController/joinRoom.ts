import { ROOM_ALERT_MSG, ROOM_PREFIX } from "../../utils/constants";
import { ControllerResponse, DataFromServer, Room } from "../../types/types";
import { getUser, updateUser } from "../userController";
import {
  JOINED_ROOM,
  RCV_MSG,
  ROOM_UPDATED,
} from "../../socketActions/serverActions";
import { getRoom } from "./getRoom";

export const joinRoom = async (
  roomId: string,
  { socket, redis, currentUserId }: DataFromServer
): Promise<ControllerResponse<Room>> => {
  const user = await getUser(currentUserId, redis!);
  if (!user) {
    return { error: "User who tried to join the room does not exist" };
  }

  const room = await getRoom(roomId, redis!);
  if (!room) {
    return { error: `Room with roomId:${roomId} does not exist` };
  }

  // (only run if room doesn't exists) and (user is allowed if private) and (space is there)
  // ! privateList needs to be added
  if (room["state"]["currMemberCount"] + 1 > room["config"]["maxMembers"]) {
    return { error: "Max members in room reached" };
  }

  // User is already in a different room do not allow
  if (user?.currentRoom) {
    return { error: "User is already in a room" };
  }

  room.state.bench.push(currentUserId);
  room.state.currMemberCount += 1;
  await redis?.set(ROOM_PREFIX + roomId, JSON.stringify(room));

  user.currentRoom = roomId;
  await updateUser(user!, redis!);

  socket.join(roomId);
  socket.to(roomId).emit(ROOM_UPDATED, {
    type: JOINED_ROOM,
    joineeUserId: currentUserId,
    data: room,
  });
  socket.to(roomId).emit(RCV_MSG, {
    type: ROOM_ALERT_MSG,
    fromUserId: currentUserId,
    message: "joined the room",
  });
  console.log(`userId:${currentUserId} joined from ${roomId}`);
  return { data: room };
};