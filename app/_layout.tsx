import Button from "@/components/Button";
import { useAuthStore } from "@/utils/authStore";
import { Stack } from "expo-router";

export default function RootLayout() {
  const { hasCompletedOnboarding, resetOnboarding } = useAuthStore();

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
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Protected guard={hasCompletedOnboarding}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
        <Stack.Protected guard={!hasCompletedOnboarding}>
          <Stack.Screen name="onboarding" />
        </Stack.Protected>
      </Stack>
    </>
  );
}
