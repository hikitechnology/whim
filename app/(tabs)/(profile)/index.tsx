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
      getUserProfile(user.uid)
        .then((profile) => {
          const hiddenKeys = Object.keys(profile)
            // step 1: find keys starting with "show" that aren't set to true
            .filter(
              (key) =>
                key.substring(0, 4) === "show" &&
                profile[key as keyof UserProfileType] !== true,
            )
            // step 2: get name of property it refers to ("showFavorites" => "favorites")
            .map((key) => key[4].toLowerCase() + key.substring(5));

          // step 3: get all keys that aren't disabled
          const shownKeys = Object.keys(profile).filter(
            (key) => !hiddenKeys.includes(key),
          );

          // step 4: create a new object with only enabled keys and their original values
          const profileWithoutHidden = Object.fromEntries(
            shownKeys.map((key) => [
              key,
              profile[key as keyof UserProfileType],
            ]),
          );

          setProfile(profileWithoutHidden as UserProfileType);
        })
        .catch(console.error);
    }
  }, [user]);

  useEffect(loadProfile, [loadProfile]);
  useFocusEffect(loadProfile);

  if (!profile) return null;

  return <UserProfile profile={profile} />;
}
