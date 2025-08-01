import { ClientMessage, ServerMessage, TypingEvent } from "@/types/Messaging";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAuthenticatedUser from "./useAuthenticatedUser";
import { getIdToken } from "@react-native-firebase/auth";

const socket = io(process.env.EXPO_PUBLIC_SOCKET_URL, {
  autoConnect: false,
});

export default function useMessaging() {
  const [messages, setMessages] = useState<ServerMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const user = useAuthenticatedUser();

  useEffect(() => {
    getIdToken(user, true).then((token) => {
      socket.auth = { token };
      socket.connect();
      socket.on("message", (message: ServerMessage) => {
        setMessages((prev) => [...prev, message]);

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
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
    socket.emit("message", message);
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
