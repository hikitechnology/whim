import EditProfile from "@/components/Profile/Edit/EditProfile";
import useAuthenticatedUser from "@/hooks/useAuthenticatedUser";
import profileQueryOptions from "@/queries/profileQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { Text } from "react-native";

export default function Edit() {
  const user = useAuthenticatedUser();
  const { data, isPending, isError } = useQuery(profileQueryOptions(user.uid));

  if (isPending) return <Text>loading profile</Text>;
  if (isError) return <Text>error while loading profile</Text>;

  return <EditProfile profile={data} />;
}
