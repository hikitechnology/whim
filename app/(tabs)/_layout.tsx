import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { Button } from "react-native";

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(social)"
          options={{
            title: "Social",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "people" : "people-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
