import Button from "@/components/Button";
import AuthProvider from "@/context/AuthContext";
import useAuthContext from "@/hooks/useAuthContext";
import { usePersistentStore } from "@/utils/persistentStore";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { QueryClient } from "@tanstack/react-query";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export default function RootLayout() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </PersistQueryClientProvider>
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
