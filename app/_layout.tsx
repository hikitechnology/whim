import Button from "@/components/Button";
import { useAuthStore } from "@/utils/authStore";
import { Stack } from "expo-router";

export default function RootLayout() {
  const { isLoggedIn, hasCompletedOnboarding, resetOnboarding, logOut } =
    useAuthStore();

  return (
    <>
      {hasCompletedOnboarding && (
        <Button
          style={{
            position: "absolute",
            top: 100,
            left: 10,
            zIndex: 100,
          }}
          variant="green"
          onPress={resetOnboarding}
        >
          reset onboarding
        </Button>
      )}
      {isLoggedIn && (
        <Button
          style={{
            position: "absolute",
            top: 150,
            left: 10,
            zIndex: 100,
          }}
          variant="orange"
          onPress={logOut}
        >
          log out
        </Button>
      )}
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Protected guard={hasCompletedOnboarding && isLoggedIn}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
        <Stack.Protected guard={hasCompletedOnboarding && !isLoggedIn}>
          <Stack.Screen name="login" />
        </Stack.Protected>
        <Stack.Protected guard={!hasCompletedOnboarding}>
          <Stack.Screen name="onboarding" />
        </Stack.Protected>
      </Stack>
    </>
  );
}
