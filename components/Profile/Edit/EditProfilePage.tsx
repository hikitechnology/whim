import profileQueryOptions from "@/queries/profileQueryOptions";
import EditProfile from "./EditProfile";
import { useQuery } from "@tanstack/react-query";
import { Text } from "react-native";

type Props = {
  userId: string;
};

export default function EditProfilePage({ userId }: Props) {
  const { data, isPending, isError } = useQuery(profileQueryOptions(userId));

  if (isPending) return <Text>loading profile</Text>;
  if (isError) return <Text>error while loading profile</Text>;

  return <EditProfile profile={data} />;
}
