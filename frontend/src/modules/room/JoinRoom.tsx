import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useChat, useRoom } from "../../global-stores";
import { joinRoom } from "../../service/roomSocket";
import { WebSocketContext } from "../ws/WebSocketProvider";
import { useMeQuery } from "../../generated/graphql";
import { chatColors } from "../../utils/constants";

export const JoinRoom: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { conn } = useContext(WebSocketContext);
  const { data } = useMeQuery();
  const addUserChatIdentityColor = useChat(
    (state) => state.addUserChatIdentityColor
  );
  const room = useRoom((state) => state.room);
  const setRoom = useRoom((state) => state.setRoom);

  let body = null;

  useEffect(() => {
    const joinRoomFunction = async () => {
      if (!room && conn) {
        try {
          const result: any = await joinRoom(conn, router.query.id as string);
          if (result.data) {
            setRoom(result.data);
            // setting chat identities for the users in room
            // generating a random number from 1 to 10
            const randomNumber = Math.floor(Math.random() * 10) + 1;
            addUserChatIdentityColor(data?.me?.id!, chatColors[randomNumber]);
          }
        } catch (error) {
          console.log(error);
          // show toast and push to /dashboard
          router.push("/dashboard");
        }
      }
    };

    joinRoomFunction();
  }, []);

  const handleRoomUpdated = (res: any) => {
    if (res.type === "CLOSED_ROOM") {
      setRoom(null);
      router.push("/dashboard");
    } else {
      if (res.type === "JOINED_ROOM") {
        // setting chat identities for the users in room
        // generating a random number from 1 to 10
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        addUserChatIdentityColor(res.joineeUserId, chatColors[randomNumber]);
      }
      setRoom(res.data);
    }
  };

  useEffect(() => {
    conn?.on("ROOM_UPDATED", handleRoomUpdated);

    return () => {
      conn?.off("ROOM_UPDATED", handleRoomUpdated);
    };
  }, []);

  if (room) {
    body = children;
  }

  return <>{body}</>;
};