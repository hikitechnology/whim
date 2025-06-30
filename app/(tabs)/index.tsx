import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";

import Overview, { BASE_OVERVIEW_HEIGHT } from "@/components/Overview";
import UserCard from "@/components/UserCard";

export default function Index() {
  const scrollOffset = useSharedValue(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollOffset.value = event.nativeEvent.contentOffset.y;
  };

  return (
    <View style={styles.container}>
      <Overview scrollOffset={scrollOffset} />
      <ScrollView style={styles.scrollContainer} onScroll={onScroll}>
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
  scrollContainer: {
    paddingTop: BASE_OVERVIEW_HEIGHT,
  },
  profileList: {
    padding: 16,
    gap: 16,
  },
});
