import { ClientMessage, ServerMessage } from "@/types/Messaging";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAuthenticatedUser from "./useAuthenticatedUser";
import { getIdToken } from "@react-native-firebase/auth";

const socket = io(process.env.EXPO_PUBLIC_SOCKET_URL, {
  autoConnect: false,
});

export default function useMessaging() {
  const [messages, setMessages] = useState<ServerMessage[]>([]);
  const user = useAuthenticatedUser();

  useEffect(() => {
    getIdToken(user, true).then((token) => {
      socket.auth = { token };
      socket.connect();
      socket.on("message", (message: ServerMessage) =>
        setMessages((prev) => [...prev, message]),
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

  return { messages, sendMessage };
}
