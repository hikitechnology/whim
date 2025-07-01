import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Badge from "./Badge";
import Button from "./Button";
import Card from "./Card";

type Props = {
  name: string;
  pfpUri?: string;
  location?: string;
  time?: string;
  distance?: number;
  timeTogether?: number;
  interests?: string[];
  mutualFriendsCount?: number;
  onPress?: () => void;
};

export default function UserCard({
  name,
  pfpUri,
  location,
  time,
  distance,
  timeTogether,
  interests,
  mutualFriendsCount,
  onPress,
}: Props) {
  return (
    <Pressable onPress={onPress}>
      <Card innerStyle={styles.innerBounds}>
        <View style={styles.top}>
          <View style={styles.pfpContainer}>
            {/* <Image source={pfpUri} /> */}
          </View>
          <View style={styles.topTextContainer}>
            <View style={styles.nameAndMutualsContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {name}
              </Text>
              {mutualFriendsCount ? (
                <Badge backgroundColor="#dbeafe" textColor="#1d4ed8">
                  {mutualFriendsCount} mutual friend
                  {mutualFriendsCount > 1 && "s"} 💫
                </Badge>
              ) : null}
            </View>
            {location ? (
              <View style={styles.locationWrapper}>
                <Ionicons name="location-outline" size={18} color="#d97706" />
                <Text style={styles.locationText} numberOfLines={1}>
                  {location}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={styles.statsRow}>
          {time ? (
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={18} color="#d97706" />
              <Text>{time}</Text>
            </View>
          ) : null}
          {distance ? (
            <View style={styles.statItem}>
              <Ionicons name="location-outline" size={18} color="#d97706" />
              <Text>{distance} ft away</Text>
            </View>
          ) : null}
          {timeTogether ? (
            <View style={styles.statItem}>
              <Ionicons name="hourglass-outline" size={18} color="#d97706" />
              <Text>{timeTogether} min together</Text>
            </View>
          ) : null}
        </View>
        {interests && interests.length > 0 ? (
          <FlatList
            data={interests}
            renderItem={({ item }) => (
              <Badge backgroundColor="#f3e8ff" textColor="#7e22ce">
                {item}
              </Badge>
            )}
            horizontal
            style={{ overflow: "visible" }}
            contentContainerStyle={styles.interests}
            showsHorizontalScrollIndicator={false}
            onStartShouldSetResponder={() => true}
          />
        ) : null}
        <View style={styles.actions}>
          <Button variant="primary" icon="hand-left-outline">
            Wave
          </Button>
          <Button variant="secondary" icon="chatbubble-outline">
            Chat
          </Button>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  innerBounds: {
    padding: 16,
    gap: 10,
    overflow: "hidden",
  },
  top: {
    flexDirection: "row",
  },
  pfpContainer: {
    backgroundColor: "#eaeaea",
    width: 64,
    height: 64,
    borderRadius: 999,
  },
  topTextContainer: {
    justifyContent: "center",
    paddingLeft: 12,
    flex: 1,
    gap: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  mutuals: {
    backgroundColor: "#dbeafe",
    borderRadius: 999,
    textAlignVertical: "center",
  },
  locationText: {
    fontSize: 16,
  },
  nameAndMutualsContainer: {
    flexDirection: "row",
  },
  locationWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  statItem: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  interests: {
    flexDirection: "row",
    height: 24,
    gap: 6,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    height: 50,
    paddingTop: 6,
  },
});
