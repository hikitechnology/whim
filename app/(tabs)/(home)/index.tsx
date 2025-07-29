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
import { getIdToken } from "@react-native-firebase/auth";
import useAuthContext from "@/hooks/useAuthContext";
import { useEffect } from "react";
import { metersToFeet } from "@/utils/location";
import { useConnectionState } from "@/hooks/useConnections";

export default function Index() {
  const { user } = useAuthContext();
  const connections = useConnectionState((state) => state.connections);

  useEffect(() => {
    getIdToken(user!).then((token) =>
      console.log(`Signed in with token: ${token}`),
    );
  }, [user]);

  const scrollOffset = useSharedValue(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollOffset.value = event.nativeEvent.contentOffset.y;
  };

  return (
    <View style={styles.container}>
      <Overview scrollOffset={scrollOffset} />
      <FlatList
        data={connections}
        renderItem={({ item }) => (
          <UserCard
            name={item.name}
            location={`Near ${item.locationName}`}
            // mutualFriendsCount={item.mutualFriends}
            time={new Date(item.startTime).toLocaleTimeString([], {
              timeStyle: "short",
            })}
            distance={Math.floor(metersToFeet(item.distance)) + " ft away"}
            timeTogether={
              Math.floor(
                ((item.endTime ?? Date.now()) - item.startTime) / 60000,
              ) + " min together"
            }
            currentlyNearby={!item.endTime}
            interests={item.interests}
            userId={item.uid}
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
