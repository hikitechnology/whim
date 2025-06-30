import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Badge from "./Badge";
import Button from "./Button";

type Props = {
  name: string;
  pfpUri?: string;
  location?: string;
  time?: string;
  distance?: string;
  timeTogether?: string;
  interests?: string[];
  mutualFriendsCount?: number;
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
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.pfpContainer}>
          {/* <Image source={pfpUri} /> */}
        </View>
        <View style={styles.topTextContainer}>
          <View style={styles.nameAndMutualsContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            {mutualFriendsCount && (
              <Badge backgroundColor="#dbeafe" textColor="#1d4ed8">
                {mutualFriendsCount} mutual friend
                {mutualFriendsCount > 1 && "s"} 💫
              </Badge>
            )}
          </View>
          {location && (
            <View style={styles.locationWrapper}>
              <Ionicons name="location-outline" size={18} color="#d97706" />
              <Text style={styles.locationText} numberOfLines={1}>
                {location}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Ionicons name="time-outline" size={18} color="#d97706" />
          <Text>9:15 AM</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="location-outline" size={18} color="#d97706" />
          <Text>2 ft away</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="hourglass-outline" size={18} color="#d97706" />
          <Text>12 min together</Text>
        </View>
      </View>
      <View style={styles.interests}>
        <Badge backgroundColor="#f3e8ff" textColor="#7e22ce">
          Photography
        </Badge>
        <Badge backgroundColor="#f3e8ff" textColor="#7e22ce">
          Coffee
        </Badge>
      </View>
      <View style={styles.actions}>
        <Button variant="primary" icon="hand-left-outline">
          Wave
        </Button>
        <Button variant="secondary" icon="chatbubble-outline">
          Chat
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
    gap: 10,
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
