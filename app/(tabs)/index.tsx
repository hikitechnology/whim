import { ScrollView, StyleSheet, View } from "react-native";

import Overview from "@/components/Overview";
import UserCard from "@/components/UserCard";

export default function Index() {
  return (
    <View style={styles.container}>
      <Overview />
      <ScrollView>
        <View style={styles.profileList}>
          <UserCard
            name="Sarah Chen"
            location="Blue Bottle Coffee"
            mutualFriendsCount={3}
          />
          <UserCard
            name="Sarah Chen"
            location="Blue Bottle Coffee"
            mutualFriendsCount={3}
          />
          <UserCard
            name="Sarah Chen"
            location="Blue Bottle Coffee"
            mutualFriendsCount={3}
          />
          <UserCard
            name="Sarah Chen"
            location="Blue Bottle Coffee"
            mutualFriendsCount={3}
          />
          <UserCard
            name="Sarah Chen"
            location="Blue Bottle Coffee"
            mutualFriendsCount={3}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fffbeb",
    flex: 1,
  },
  profileList: {
    padding: 16,
    gap: 16,
  },
});
