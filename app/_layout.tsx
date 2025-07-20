import Button from "@/components/Button";
import AuthProvider from "@/context/AuthContext";
import useAuthContext from "@/hooks/useAuthContext";
import { usePersistentStore } from "@/utils/persistentStore";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

function RootNavigator() {
  const { hasCompletedOnboarding, resetOnboarding } = usePersistentStore();
  const { isInitializing, user, signOut } = useAuthContext();

  useEffect(() => {
    if (!isInitializing) {
      // give navigator time to mount
      setTimeout(SplashScreen.hideAsync, 200);
    }
  }, [isInitializing]);

  if (isInitializing) {
    return null;
  }

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
      {user && (
        <Button
          style={{
            position: "absolute",
            top: 150,
            left: 10,
            zIndex: 100,
          }}
          variant="orange"
          onPress={signOut}
        >
          log out
        </Button>
      )}
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Protected guard={hasCompletedOnboarding && user !== null}>
          <Stack.Screen name="(tabs)" />
        </Stack.Protected>
        <Stack.Protected guard={hasCompletedOnboarding && user === null}>
          <Stack.Screen name="login" />
        </Stack.Protected>
        <Stack.Protected guard={!hasCompletedOnboarding}>
          <Stack.Screen name="onboarding" />
        </Stack.Protected>
      </Stack>
    </>
  );
}
