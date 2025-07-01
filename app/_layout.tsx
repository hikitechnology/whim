import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="(home)"
          options={{ title: "Home", headerShown: false }}
        />
      </Tabs>
      <StatusBar style="dark" />
    </>
  );
}
