import UserProfile from "@/components/Profile/UserProfile";
import useAuthContext from "@/hooks/useAuthContext";
import { UserProfile as UserProfileType } from "@/types/UserProfile";
import { getUserProfile } from "@/utils/api";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";

export default function Profile() {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<UserProfileType | null>(null);

  const loadProfile = useCallback(() => {
    if (user) {
      getUserProfile(user.uid).then(setProfile).catch(console.error);
    }
  }, [user]);

  useEffect(loadProfile, [loadProfile]);
  useFocusEffect(loadProfile);

  if (!profile) return null;

  return <UserProfile profile={profile} />;
}
