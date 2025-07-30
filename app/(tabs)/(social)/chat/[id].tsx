import Header from "@/components/Chat/Header";
import Message from "@/components/Chat/Message";
import { StyleSheet, View } from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import { useRef, useState } from "react";
import Button from "@/components/Button";

// TODO: animate bottom sheet border radius when < 100%

export default function Chat() {
  const listRef = useRef<BottomSheetFlatListMethods | null>(null);
  const [messages, setMessages] = useState<
    { isOutgoing: boolean; content: string }[]
  >([]);

  function addMessage() {
    setMessages((prev) => [
      ...prev,
      {
        isOutgoing: Math.random() < 0.5,
        content: `My favorite number is ${Math.random()}`,
      },
    ]);
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          // fixes swipe back navigation gesture
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 20,
          zIndex: 999,
        }}
      />
      <Header />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MapView style={{ flex: 1 }} />
          <BottomSheet
            snapPoints={["15%", "100%"]}
            enableDynamicSizing={false}
            index={1}
            animateOnMount={false}
            backgroundStyle={{ backgroundColor: "#f5f5f5", borderRadius: 0 }}
            handleIndicatorStyle={{ backgroundColor: "#9ca3af" }}
          >
            <BottomSheetFlatList
              data={messages}
              renderItem={({ item }) => (
                <Message isOutgoing={item.isOutgoing}>{item.content}</Message>
              )}
              ref={listRef}
              onContentSizeChange={() =>
                listRef.current?.scrollToEnd({ animated: true })
              }
              contentContainerStyle={styles.messages}
              ListFooterComponent={<View style={{ height: 6 }} />}
            />
            <Button onPress={addMessage}>add message</Button>
          </BottomSheet>
        </View>
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
    paddingHorizontal: 16,
    paddingTop: 6,
  },
});
