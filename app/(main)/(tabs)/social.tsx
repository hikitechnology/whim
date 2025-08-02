import PageBackground from "@/components/PageBackground";
import Header, { BASE_SOCIAL_HEADER_HEIGHT } from "@/components/Social/Header";
import { NativeScrollEvent, NativeSyntheticEvent, Text } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export default function SocialPage() {
  const scrollOffset = useSharedValue(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollOffset.value = event.nativeEvent.contentOffset.y;
  };

  return (
    <>
      <Header scrollOffset={scrollOffset} />
      <PageBackground
        onScroll={onScroll}
        style={{ paddingTop: BASE_SOCIAL_HEADER_HEIGHT }}
      >
        <Text>social page</Text>
      </PageBackground>
    </>
    // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Text>social page</Text>
    // </View>
  );
}
