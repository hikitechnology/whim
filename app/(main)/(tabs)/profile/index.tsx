import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import ProfilePage from "@/components/Profile/ProfilePage";

export default function Profile() {
  const user = useAuthenticatedUser();

  return <ProfilePage userId={user.uid} editPagePath={"/edit"} />;
}
