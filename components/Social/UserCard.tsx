import UserCardBase from "../UserCard";

type Props = {
  name: string;
  isFriend: boolean;
  lastMessaged: string;
  lastMessage: string;
  metAt?: string;
};

export default function UserCard({
  name,
  isFriend,
  lastMessaged,
  lastMessage,
  metAt,
}: Props) {
  return (
    <UserCardBase>
      <UserCardBase.ProfilePic />
      <UserCardBase.Name>{name}</UserCardBase.Name>
      {isFriend ? (
        <UserCardBase.Badge
          icon="heart-outline"
          backgroundColor="#fce7f3"
          textColor="#be185d"
        >
          Friend
        </UserCardBase.Badge>
      ) : null}
      <UserCardBase.Blurb>{lastMessaged}</UserCardBase.Blurb>
      <UserCardBase.Subtext>{lastMessage}</UserCardBase.Subtext>
      {metAt ? (
        <UserCardBase.Subtext variant="secondary" icon="map-outline">
          Met at {metAt}
        </UserCardBase.Subtext>
      ) : null}
    </UserCardBase>
  );
}
