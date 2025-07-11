import { Stack } from "expo-router";

export default function SocialLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#78350f",
        headerStyle: {
          backgroundColor: "#fef3c7",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Your Conversations",
          headerSearchBarOptions: {
            hideWhenScrolling: true,
          },
        }}
      />
      <Stack.Screen
        name="chat/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
