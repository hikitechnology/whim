import { Pressable, StyleSheet, Text, View } from "react-native";
import UserCardBase from "../UserCard/index";
import Button from "../Button";
import React from "react";
import { useRouter } from "expo-router";

type Props = {
  name?: string;
  pfpId?: string;
  location?: string;
  time?: string;
  distance?: string;
  timeTogether?: string;
  interests?: string[];
  mutualFriendsCount?: number;
  currentlyNearby?: boolean;
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
        <UserCardBase.ProfilePic id={props.pfpId} />
        {props.mutualFriendsCount && props.mutualFriendsCount > 0 ? (
          <UserCardBase.Badge>
            {props.mutualFriendsCount} mutual friend
            {props.mutualFriendsCount > 1 && "s"} 💫
          </UserCardBase.Badge>
        ) : null}
        {props.location ? (
          <UserCardBase.Subtext icon="location-outline">
            Met near <Text style={styles.bold}>{props.location}</Text>
          </UserCardBase.Subtext>
        ) : null}
        <UserCardBase.StatsRow>
          {props.time ? (
            <UserCardBase.StatItem icon="time-outline">
              {props.time}
            </UserCardBase.StatItem>
          ) : null}
          {props.distance ? (
            <UserCardBase.StatItem icon="compass-outline">
              {props.distance}
            </UserCardBase.StatItem>
          ) : null}
          {props.currentlyNearby ? (
            <UserCardBase.StatIndicator>Nearby now</UserCardBase.StatIndicator>
          ) : props.timeTogether !== undefined ? (
            <UserCardBase.StatItem icon="hourglass-outline">
              {props.timeTogether}
            </UserCardBase.StatItem>
          ) : null}
        </UserCardBase.StatsRow>
        {props.interests && props.interests.length > 0 ? (
          <UserCardBase.InterestsRow items={props.interests} />
        ) : null}
        <View style={styles.actions}>
          <Button
            variant="primary"
            icon="qr-code-outline"
            style={{ flex: 1 }}
            onPress={() =>
              router.navigate({
                pathname: "/friend",
                params: {
                  name: props.name,
                },
              })
            }
          >
            Add friend
          </Button>
          <Button
            variant="secondary"
            icon="chatbubble-outline"
            style={{ flex: 1 }}
            onPress={() => router.navigate(`/chat/${props.userId}`)}
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
  bold: {
    fontWeight: "500",
  },
});

export default React.memo(UserCard);
