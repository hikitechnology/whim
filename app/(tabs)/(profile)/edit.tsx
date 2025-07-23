import EditProfile from "@/components/Profile/Edit/EditProfile";
import useAuthContext from "@/hooks/useAuthContext";
import { UserProfile } from "@/types/UserProfile";
import { getUserProfile } from "@/utils/api";
import { useEffect, useState } from "react";

export default function Edit() {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  useEffect(() => {
    if (user) {
      getUserProfile(user.uid).then(setProfile);
    }
  }, [user]);

  if (!profile) return null;

  return <EditProfile profile={profile} />;
}
