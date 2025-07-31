import EditProfile from "./EditProfile";
import { Text } from "react-native";
import useProfileQuery from "@/hooks/queries/useProfileQuery";

type Props = {
  userId: string;
};

export default function EditProfilePage({ userId }: Props) {
  const { data, isPending, isError } = useProfileQuery(userId);

  if (isPending) return <Text>loading profile</Text>;
  if (isError) return <Text>error while loading profile</Text>;

  return <EditProfile profile={data} />;
}
