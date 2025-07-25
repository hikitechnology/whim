import EditProfilePage from "@/components/Profile/Edit/EditProfilePage";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";

export default function Edit() {
  const user = useAuthenticatedUser();

  return <EditProfilePage userId={user.uid} />;
}
