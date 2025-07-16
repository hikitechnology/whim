// TODO: persistent auth state management https://www.youtube.com/watch?v=zHZjJDTTHJg

import { Stack } from "expo-router";

const isLoggedIn = true;
const hasCompletedOnboarding = false;

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={hasCompletedOnboarding && isLoggedIn}>
        <Stack.Screen name="(tabs)" />
      </Stack.Protected>
      <Stack.Protected guard={hasCompletedOnboarding && !isLoggedIn}>
        <Stack.Screen name="sign-in" />
      </Stack.Protected>
      <Stack.Protected guard={!hasCompletedOnboarding}>
        <Stack.Screen name="onboarding" />
      </Stack.Protected>
    </Stack>
  );
}
