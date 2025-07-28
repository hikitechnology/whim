import { Pressable, StyleSheet, View } from "react-native";
import UserCardBase from "../UserCard/index";
import Button from "../Button";
import React from "react";
import { useRouter } from "expo-router";

type Props = {
  name?: string;
  location?: string;
  time?: string;
  distance?: string;
  timeTogether?: number;
  interests?: string[];
  mutualFriendsCount?: number;
  userId: string;
};

function UserCard(props: Props) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.navigate(`/user/${props.userId}`)}>
      <UserCardBase>
        {props.name ? (
          <UserCardBase.Name>{props.name}</UserCardBase.Name>
        ) : null}
        <UserCardBase.ProfilePic />
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
              {props.distance}
            </UserCardBase.StatItem>
          ) : null}
          {props.timeTogether !== undefined ? (
            <UserCardBase.StatItem icon="hourglass-outline">
              {props.timeTogether} min together
            </UserCardBase.StatItem>
          ) : null}
        </UserCardBase.StatsRow>
        {props.interests ? (
          <UserCardBase.InterestsRow items={props.interests} />
        ) : null}
        <View style={styles.actions}>
          <Button
            variant="primary"
            icon="hand-left-outline"
            style={{ flex: 1 }}
          >
            Wave
          </Button>
          <Button
            variant="secondary"
            icon="chatbubble-outline"
            style={{ flex: 1 }}
          >
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

export default React.memo(UserCard);
