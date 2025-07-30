import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import { ClientMessage, ServerMessage } from "@/types/Messaging";
import { getIdToken } from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { io } from "socket.io-client";

const socket = io(process.env.EXPO_PUBLIC_SOCKET_URL, {
  autoConnect: false,
});

export default function SocketPage() {
  const [messages, setMessages] = useState<ServerMessage[]>([]);
  const user = useAuthenticatedUser();

  useEffect(() => {
    getIdToken(user, true).then((token) => {
      socket.auth = { token };
      socket.connect();
      socket.on("message", (message) =>
        setMessages((prev) => [...prev, message]),
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>messages received this session: {JSON.stringify(messages)}</Text>
      <Text>You are: {user.uid}</Text>
      <SendButton toId="ub7RAqZYmvXADnzNxpE9B9T9Suv1" />
      <SendButton toId="gqZZpFY5Cff8f6bkun8gcIpBbuW2" />
    </View>
  );
}

function SendButton({ toId }: { toId: string }) {
  function sendMessage() {
    const messageToSend: ClientMessage = {
      receiver: toId,
      message: `Random number: ${Math.random()}`,
    };

    socket.emit("message", messageToSend);
  }

  return <Button title={`Send message to ${toId}`} onPress={sendMessage} />;
}
