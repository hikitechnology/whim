import Profile from "@/components/Profile/Profile";
import profileQueryOptions from "@/queries/profileQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { Text } from "react-native";
import { UserProfile as UserProfileType } from "@/types/UserProfile";
import { Href } from "expo-router";

type Props = {
  userId: string;
  editPagePath: Href;
};

export default function ProfilePage({ userId, editPagePath }: Props) {
  const { data, isPending, isError } = useQuery(profileQueryOptions(userId));

  if (isPending) return <Text>loading profile</Text>;
  if (isError) return <Text>error while loading profile</Text>;

  const hiddenKeys = Object.keys(data)
    // step 1: find keys starting with "show" that aren't set to true
    .filter(
      (key) =>
        key.substring(0, 4) === "show" &&
        data[key as keyof UserProfileType] !== true,
    )
    // step 2: get name of property it refers to ("showFavorites" => "favorites")
    .map((key) => key[4].toLowerCase() + key.substring(5));

  // step 3: get all keys that aren't disabled
  const shownKeys = Object.keys(data).filter(
    (key) => !hiddenKeys.includes(key),
  );

  // step 4: create a new object with only enabled keys and their original values
  const profileWithoutHidden = Object.fromEntries(
    shownKeys.map((key) => [key, data[key as keyof UserProfileType]]),
  ) as UserProfileType;

  return <Profile profile={profileWithoutHidden} editPagePath={editPagePath} />;
}
