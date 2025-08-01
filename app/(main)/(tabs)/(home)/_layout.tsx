import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#78350f",
        headerBackground: () => (
          <LinearGradient
            colors={["rgba(255, 237, 213, 0.9)", "rgba(254, 249, 195, 0.9)"]}
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
    >
      <Stack.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen name="user/[id]/index" options={{ title: "Profile" }} />
      <Stack.Screen name="user/[id]/edit" options={{ title: "Edit Profile" }} />
    </Stack>
  );
}
