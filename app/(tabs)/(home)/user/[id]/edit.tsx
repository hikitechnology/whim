import EditProfilePage from "@/components/Profile/Edit/EditProfilePage";
import { useLocalSearchParams } from "expo-router";

export default function Edit() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <EditProfilePage userId={id} />;
}
