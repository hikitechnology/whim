import PageBackground from "@/components/PageBackground";
import UserCard from "@/components/Social/UserCard";
import { navigate } from "expo-router/build/global-state/routing";
import { Pressable } from "react-native";

export default function Index() {
  return (
    <PageBackground contentInsetAdjustmentBehavior="automatic">
      <Pressable onPress={() => navigate("/chat/1")}>
        <UserCard
          name="Sarah Chen"
          isFriend
          lastMessaged="2m ago"
          lastMessage="That coffee shop you recommended was amazing! ☕"
          metAt="Blue Bottle Coffee"
        />
      </Pressable>
    </PageBackground>
  );
}
