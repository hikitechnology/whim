import Header, { BASE_SOCIAL_HEADER_HEIGHT } from "@/components/Social/Header";
import UserCard from "@/components/Social/UserCard";
import useMessagingContext from "@/hooks/useMessagingContext";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";

export default function SocialPage() {
  const scrollOffset = useSharedValue(0);
  const { getCorrespondents } = useMessagingContext();

  const conversationTargets = getCorrespondents();

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollOffset.value = event.nativeEvent.contentOffset.y;
  };

  return (
    <>
      <Header scrollOffset={scrollOffset} />
      <FlatList
        data={conversationTargets}
        renderItem={({ item }) => <UserCard id={item} />}
        onScroll={onScroll}
        style={styles.convosContainer}
        contentContainerStyle={styles.convosList}
      />
    </>
  );
}

const styles = StyleSheet.create({
  convosContainer: {
    backgroundColor: "#fffbeb",
    paddingTop: BASE_SOCIAL_HEADER_HEIGHT,
  },
  convosList: {
    padding: 16,
    gap: 16,
  },
});
