import PageBackground from "@/components/PageBackground";
import UserCard from "@/components/Social/UserCard";

export default function Index() {
  return (
    <PageBackground contentInsetAdjustmentBehavior="automatic">
      <UserCard
        name="Sarah Chen"
        isFriend
        lastMessaged="2m ago"
        lastMessage="That coffee shop you recommended was amazing! ☕"
        metAt="Blue Bottle Coffee"
      />
    </PageBackground>
  );
}
