import { useLocalSearchParams } from "expo-router";
import ProfilePage from "@/components/Profile/ProfilePage";

export default function UserProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ProfilePage userId={id} editPagePath={`/user/{id}/edit`} />;
}
