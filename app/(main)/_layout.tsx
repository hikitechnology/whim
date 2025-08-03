import MessagingProvider from "@/context/MessagingContext";
import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <MessagingProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="chat/[id]" />
      </Stack>
    </MessagingProvider>
  );
}
