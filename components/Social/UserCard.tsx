import React from "react";
import UserCardBase from "../UserCard";
import useBasicProfileQuery from "@/hooks/queries/useBasicProfileQuery";
import useMessaging from "@/hooks/useMessaging";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import toDateOrTimeString from "@/utils/date";
import { useConnectionState } from "@/hooks/useConnections";

type Props = {
  id: string;
};

function UserCard({ id }: Props) {
  const router = useRouter();
  const { data } = useBasicProfileQuery(id);
  const { getMessagesWith } = useMessaging();
  const messages = getMessagesWith(id);
  const getConnection = useConnectionState((state) => state.getConnection);

  const metAt = getConnection(id)?.locationName;

  const lastMessaged = messages[0].timestamp
    ? toDateOrTimeString(messages[0].timestamp)
    : null;
  const lastMessage = messages[0].message;

  return (
    <Pressable onPress={() => router.navigate(`/chat/${id}`)}>
      <UserCardBase>
        <UserCardBase.ProfilePic id={data?.pfpId} />
        <UserCardBase.Name>{data?.name}</UserCardBase.Name>
        {/* {isFriend ? ( */}
        {/*   <UserCardBase.Badge */}
        {/*     icon="heart-outline" */}
        {/*     backgroundColor="#fce7f3" */}
        {/*     textColor="#be185d" */}
        {/*   > */}
        {/*     Friend */}
        {/*   </UserCardBase.Badge> */}
        {/* ) : null} */}
        {!!lastMessaged && (
          <UserCardBase.Blurb>{lastMessaged}</UserCardBase.Blurb>
        )}
        <UserCardBase.Subtext>{lastMessage}</UserCardBase.Subtext>
        {metAt ? (
          <UserCardBase.Subtext variant="secondary" icon="map-outline">
            Met near {metAt}
          </UserCardBase.Subtext>
        ) : null}
      </UserCardBase>
    </Pressable>
  );
}

export default React.memo(UserCard);
