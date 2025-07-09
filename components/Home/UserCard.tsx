import { Pressable, StyleSheet, View } from "react-native";
import UserCardBase from "../UserCard/index";
import Button from "../Button";

type Props = {
  name?: string;
  showPfp?: boolean;
  location?: string;
  time?: string;
  distance?: number;
  timeTogether?: number;
  interests?: string[];
  mutualFriendsCount?: number;
  onPress?: () => void;
};

export default function UserCard(props: Props) {
  return (
    <Pressable onPress={props.onPress}>
      <UserCardBase>
        {props.name ? (
          <UserCardBase.Name>{props.name}</UserCardBase.Name>
        ) : null}
        {props.showPfp ? <UserCardBase.ProfilePic /> : null}
        {props.mutualFriendsCount && props.mutualFriendsCount > 0 ? (
          <UserCardBase.Badge>
            {props.mutualFriendsCount} mutual friend
            {props.mutualFriendsCount > 1 && "s"} 💫
          </UserCardBase.Badge>
        ) : null}
        {props.location ? (
          <UserCardBase.Subtext icon="location-outline">
            {props.location}
          </UserCardBase.Subtext>
        ) : null}
        <UserCardBase.StatsRow>
          {props.time ? (
            <UserCardBase.StatItem icon="time-outline">
              {props.time}
            </UserCardBase.StatItem>
          ) : null}
          {props.distance ? (
            <UserCardBase.StatItem icon="location-outline">
              {props.distance} ft away
            </UserCardBase.StatItem>
          ) : null}
          {props.timeTogether ? (
            <UserCardBase.StatItem icon="hourglass-outline">
              {props.timeTogether} min together
            </UserCardBase.StatItem>
          ) : null}
        </UserCardBase.StatsRow>
        {props.interests ? (
          <UserCardBase.InterestsRow items={props.interests} />
        ) : null}
        <View style={styles.actions}>
          <Button variant="primary" icon="hand-left-outline">
            Wave
          </Button>
          <Button variant="secondary" icon="chatbubble-outline">
            Chat
          </Button>
        </View>
      </UserCardBase>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: "row",
    gap: 10,
  },
});
