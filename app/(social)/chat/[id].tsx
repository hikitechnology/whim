import Header from "@/components/Chat/Header";
import Message from "@/components/Chat/Message";
import { StyleSheet, View } from "react-native";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import TextInput from "@/components/TextInput";

// TODO: animate bottom sheet border radius when < 100%
// TODO: this is jank as fuck. switch to this library maybe, looks more promising https://github.com/ammarahm-ed/react-native-actions-sheet

export default function Chat() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <MapView style={{ flex: 1 }} />
        <BottomSheet
          snapPoints={["15%", "40%", "100%"]}
          enableDynamicSizing={false}
          index={2}
          animateOnMount={false}
          backgroundStyle={{ backgroundColor: "#f5f5f5", borderRadius: 0 }}
          handleIndicatorStyle={{ backgroundColor: "#9ca3af" }}
        >
          <BottomSheetScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.messages}
          >
            <Message isOutgoing />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
          </BottomSheetScrollView>
          <TextInput provider="bottomSheet" />
        </BottomSheet>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundMap: {
    flex: 1,
  },
  messages: {
    padding: 16,
    paddingTop: 6,
    gap: 10,
  },
});
