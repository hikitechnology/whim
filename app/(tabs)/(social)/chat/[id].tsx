import Header, { CHAT_HEADER_HEIGHT } from "@/components/Chat/Header";
import Message from "@/components/Chat/Message";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import { useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import useBasicProfileQuery from "@/hooks/queries/useBasicProfileQuery";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import TextInput from "@/components/TextInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import useMessaging from "@/hooks/useMessaging";
import { MESSAGE_SPLIT_TIME_MS } from "@/constants";

// TODO: animate bottom sheet border radius when < 100%

const CHAT_HANDLE_HEIGHT = 24;

export default function Chat() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError } = useBasicProfileQuery(id);
  const { messages, sendMessage } = useMessaging();

  const [message, setMessage] = useState<string>("");
  const listRef = useRef<BottomSheetFlatListMethods | null>(null);

  function send() {
    // if timeout isn't used, and the last word gets autocorrected, it'll replace the empty string upon sending.
    // this solution clears the message box properly, but discards the autocorrect change. not ideal but i've spent
    // like 40 minutes trying to fix it with no luck so im giving up for now
    setTimeout(() => {
      if (message.trim().length > 0) {
        setMessage("");
        sendMessage({
          message,
          receiver: id,
        });
      }
    });
  }

  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  if (isPending) return <Text>Loading profile</Text>;
  if (isError) return <Text>Error while loading profile</Text>;

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
          zIndex: 9,
        }}
      />
      <Header userId={id} name={data.name} pfpId={data.pfpId} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MapView style={{ flex: 1 }} />
          <BottomSheet
            snapPoints={["15%", "100%"]}
            enableDynamicSizing={false}
            index={1}
            animateOnMount={false}
            backgroundStyle={{ backgroundColor: "#f5f5f5", borderRadius: 0 }}
            handleStyle={{ height: CHAT_HANDLE_HEIGHT }}
            handleIndicatorStyle={{ backgroundColor: "#9ca3af" }}
            onChange={(point) => {
              if (point === 0) {
                Keyboard.dismiss();
              }
            }}
          >
            <BottomSheetFlatList
              data={messages}
              renderItem={({ item, index }) => {
                const nextMessage = messages[index + 1];

                const currentTimestamp = new Date(item.timestamp).getTime();
                const nextTimestamp = nextMessage
                  ? new Date(nextMessage.timestamp).getTime()
                  : Infinity;

                const showTimestamp =
                  nextTimestamp - currentTimestamp > MESSAGE_SPLIT_TIME_MS ||
                  !nextMessage ||
                  nextMessage.sender !== item.sender;

                return (
                  <Message
                    isOutgoing={item.sender !== id}
                    timestamp={showTimestamp ? item.timestamp : undefined}
                    text={item.message}
                  />
                );
              }}
              ref={listRef}
              onContentSizeChange={() =>
                listRef.current?.scrollToEnd({ animated: true })
              }
              onLayout={() => {
                if (isScrolledToBottom && !isScrolling) {
                  listRef.current?.scrollToEnd({ animated: false });
                }
              }}
              contentContainerStyle={styles.messages}
              ListFooterComponent={<View style={{ height: 6 }} />}
              onMomentumScrollBegin={() => setIsScrolling(true)}
              onMomentumScrollEnd={() => setIsScrolling(false)}
              // @ts-ignore-error incorrect type definition https://github.com/gorhom/react-native-bottom-sheet/pull/1019
              onScroll={({ nativeEvent }) => {
                const viewportHeight = nativeEvent.layoutMeasurement.height;
                const contentOffset = nativeEvent.contentOffset.y;
                const contentHeight = nativeEvent.contentSize.height;

                setIsScrolledToBottom(
                  viewportHeight + contentOffset + 50 >= contentHeight,
                );
              }}
            />
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={CHAT_HEADER_HEIGHT + CHAT_HANDLE_HEIGHT}
            >
              <View style={styles.messageBar}>
                <View style={{ flex: 1 }}>
                  <TextInput
                    placeholder="Type a message..."
                    enterKeyHint="enter"
                    submitBehavior="newline"
                    multiline
                    style={{ height: "auto", maxHeight: 150 }}
                    value={message}
                    onChangeText={setMessage}
                  />
                </View>
                <TouchableOpacity onPress={send} disabled={false}>
                  <LinearGradient
                    colors={["#fbbf2477", "#f9731677"]}
                    start={{ x: 0, y: 0.75 }}
                    end={{ x: 1, y: 0.25 }}
                    style={styles.sendButton}
                  >
                    <Ionicons
                      name="paper-plane-outline"
                      size={26}
                      color="#fff"
                    />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
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
  messageBar: {
    flexDirection: "row",
    padding: 6,
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    alignItems: "center",
  },
  sendButton: {
    backgroundColor: "#fbbf24",
    width: 36,
    height: 36,
    paddingTop: 6,
    paddingLeft: 4,
    marginRight: 2,
    borderRadius: 999,
  },
});
