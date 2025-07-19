import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";

import Overview, { BASE_OVERVIEW_HEIGHT } from "@/components/Home/Overview";
import UserCard from "@/components/Home/UserCard";
import { getRandomUsers } from "@/placeholder/users";
import { navigate } from "expo-router/build/global-state/routing";

const users = getRandomUsers(10);

export default function Index() {
  const scrollOffset = useSharedValue(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollOffset.value = event.nativeEvent.contentOffset.y;
  };

  return (
    <View style={styles.container}>
      <Overview scrollOffset={scrollOffset} />
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserCard
            showPfp={true}
            name={item.name}
            location={item.location}
            mutualFriendsCount={item.mutualFriends}
            time={item.timeMet}
            distance={item.distance}
            timeTogether={item.timeTogether}
            interests={item.interests}
            onPress={() => navigate(`/user/${item.id}`)}
          />
        )}
        style={styles.scrollContainer}
        contentContainerStyle={styles.profileList}
        onScroll={onScroll}
      />
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
