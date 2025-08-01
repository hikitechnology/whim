import {
  ClientMessage,
  DeliveredEvent,
  ServerMessage,
  TypingEvent,
} from "@/types/Messaging";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAuthenticatedUser from "./useAuthenticatedUser";
import { getIdToken } from "@react-native-firebase/auth";
import simpleId from "@/utils/simpleId";

const socket = io(process.env.EXPO_PUBLIC_SOCKET_URL, {
  autoConnect: false,
});

type StateMessage = Omit<ServerMessage, "id" | "timestamp"> & {
  timestamp?: string | number;
  clientId?: string;
  delivered: boolean;
};

export default function useMessaging() {
  const [messages, setMessages] = useState<StateMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const user = useAuthenticatedUser();

  useEffect(() => {
    getIdToken(user, true).then((token) => {
      socket.auth = { token };
      socket.connect();
      socket.on("message", (message: ServerMessage) => {
        setMessages((prev) => [
          ...prev,
          {
            ...message,
            delivered: true,
          },
        ]);
        setTypingUsers((prev) =>
          prev.includes(message.sender)
            ? prev.toSpliced(prev.indexOf(message.sender), 1)
            : prev,
        );
      });
      socket.on("typing-start", ({ uid }: TypingEvent) =>
        setTypingUsers((prev) => (!prev.includes(uid) ? [...prev, uid] : prev)),
      );
      socket.on("typing-stop", ({ uid }: TypingEvent) =>
        setTypingUsers((prev) =>
          prev.includes(uid) ? prev.toSpliced(prev.indexOf(uid), 1) : prev,
        ),
      );
      socket.on("delivered", ({ clientId, timestamp, id }: DeliveredEvent) => {
        setMessages((prev) =>
          prev.map((item) =>
            item.clientId === clientId
              ? { ...item, delivered: true, timestamp, id }
              : item,
          ),
        );
      });
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [user]);

  function sendMessage(message: ClientMessage) {
    const newMessage = {
      ...message,
      sender: user.uid,
      clientId: simpleId(),
      delivered: false,
    };
    setMessages((prev) => [...prev, newMessage]);
    socket.emit("message", newMessage);
  }

  function sendTypingStart(toUid: string) {
    socket.emit("typing-start", { uid: toUid });
  }

  function sendTypingStop(toUid: string) {
    socket.emit("typing-stop", { uid: toUid });
  }

  return {
    messages,
    sendMessage,
    sendTypingStart,
    sendTypingStop,
    typingUsers,
  };
}
