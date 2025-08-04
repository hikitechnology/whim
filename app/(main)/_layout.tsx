import MessagingProvider from "@/context/MessagingContext";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <MessagingProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="chat/[id]" />
        <Stack.Screen
          name="friend"
          options={{
            title: "Add Friend",
            presentation: "modal",
            headerShown: true,
            headerTintColor: "#78350f",
            headerBackground: () => (
              <LinearGradient
                colors={[
                  "rgba(255, 237, 213, 0.9)",
                  "rgba(254, 249, 195, 0.9)",
                ]}
                start={{ x: 0, y: 0.75 }}
                end={{ x: 1, y: 0.25 }}
                style={{
                  flex: 1,
                  borderColor: "rgba(254, 215, 170, 0.5)",
                  borderWidth: 1,
                }}
              />
            ),
          }}
        />
      </Stack>
    </MessagingProvider>
  );
}
