import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { useMessagingState } from "@/hooks/useMessagingState";
import {
  DeliveredEvent,
  LocalMessage,
  ServerMessage,
  TypingEvent,
} from "@/types/Messaging";
import simpleId from "@/utils/simpleId";
import { getIdToken } from "@react-native-firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.EXPO_PUBLIC_SOCKET_URL, {
  autoConnect: false,
});

export type MessagingContextType = {
  getMessagesWith: (uid: string) => LocalMessage[];
  getCorrespondents: () => string[];
  sendMessage: ({ to, message }: { to: string; message: string }) => void;
  sendTypingStart: (recipient: string) => void;
  sendTypingStop: (recipient: string) => void;
  isTyping: (uid: string) => boolean;
};

export const MessagingContext = createContext<MessagingContextType | null>(
  null,
);

type ProviderProps = {
  children: React.ReactNode;
};

export default function MessagingProvider({ children }: ProviderProps) {
  const user = useAuthenticatedUser();
  const { messages, setMessages } = useMessagingState();
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    getIdToken(user, true).then((token) => {
      socket.removeAllListeners();
      socket.auth = { token };
      socket.connect();
      socket.on("message", (message: ServerMessage) => {
        setMessages((prev) => [
          {
            ...message,
            delivered: true,
          },
          ...prev,
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
  }, [user, setMessages]);

  function getMessagesWith(uid: string) {
    return messages.filter((msg) => msg.sender === uid || msg.receiver === uid);
  }

  function getCorrespondents() {
    return [
      ...new Set(
        messages.map((msg) =>
          msg.sender !== user.uid ? msg.sender : msg.receiver,
        ),
      ),
    ];
  }

  function sendMessage({ to, message }: { to: string; message: string }) {
    const newMessage: LocalMessage = {
      receiver: to,
      message,
      sender: user.uid,
      clientId: simpleId(),
      delivered: false,
    };
    setMessages((prev) => [newMessage, ...prev]);
    socket.emit("message", newMessage);
  }

  function sendTypingStart(recipient: string) {
    socket.emit("typing-start", { uid: recipient });
  }

  function sendTypingStop(recipient: string) {
    socket.emit("typing-stop", { uid: recipient });
  }

  function isTyping(uid: string) {
    return typingUsers.includes(uid);
  }

  return (
    <MessagingContext.Provider
      value={{
        getMessagesWith,
        getCorrespondents,
        sendMessage,
        sendTypingStart,
        sendTypingStop,
        isTyping,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
}
