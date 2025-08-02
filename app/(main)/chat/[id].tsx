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
import { MESSAGE_SPLIT_TIME_MS } from "@/constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TypingIndicator from "@/components/Chat/TypingIndicator";
import useMessagingContext from "@/hooks/useMessagingContext";

// TODO: animate bottom sheet border radius when < 100%

const CHAT_HANDLE_HEIGHT = 24;

export default function ChatPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isPending, isError } = useBasicProfileQuery(id);
  const { getMessagesWith, sendMessage, isTyping, sendTypingStart } =
    useMessagingContext();
  const insets = useSafeAreaInsets();

  const [message, setMessage] = useState<string>("");
  const listRef = useRef<BottomSheetFlatListMethods | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const messages = getMessagesWith(id);

  function handleChangeText(newText: string) {
    setMessage(newText);
    sendTypingStart(id);
  }

  function send() {
    // if timeout isn't used, and the last word gets autocorrected, it'll replace the empty string upon sending.
    // this solution clears the message box properly, but discards the autocorrect change. not ideal but i've spent
    // like 40 minutes trying to fix it with no luck so im giving up for now
    setTimeout(() => {
      if (message.trim().length > 0) {
        setMessage("");
        sendMessage({
          message,
          to: id,
        });
      }
    });
  }

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
            snapPoints={["20%", "100%"]}
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
                const nextMessage = messages[index - 1];

                const currentTimestamp = item.timestamp
                  ? new Date(item.timestamp).getTime()
                  : Infinity;
                const nextTimestamp =
                  nextMessage && nextMessage.timestamp
                    ? new Date(nextMessage.timestamp).getTime()
                    : Infinity;

                const showTimestamp =
                  nextTimestamp - currentTimestamp > MESSAGE_SPLIT_TIME_MS ||
                  !nextMessage;

                const indicator =
                  item.sender !== id && nextMessage === undefined
                    ? "check"
                    : "none";

                return (
                  <Message
                    isOutgoing={item.sender !== id}
                    timestamp={showTimestamp ? item.timestamp : undefined}
                    text={item.message}
                    isDelivered={item.delivered}
                    indicator={indicator}
                  />
                );
              }}
              ref={listRef}
              onContentSizeChange={() => {
                if (!isScrolling) {
                  setTimeout(() => {
                    listRef.current?.scrollToOffset({
                      offset: 0,
                      animated: true,
                    });
                  });
                }
              }}
              contentContainerStyle={styles.messages}
              ListHeaderComponent={
                <View style={{ paddingBottom: 6 }}>
                  {isTyping(id) && <TypingIndicator />}
                </View>
              }
              onMomentumScrollBegin={() => setIsScrolling(true)}
              onMomentumScrollEnd={() => setIsScrolling(false)}
              maintainVisibleContentPosition={{
                minIndexForVisible: 0,
              }}
              inverted
              // workaround for https://github.com/gorhom/react-native-bottom-sheet/issues/512
              onRefresh={() => {}}
              refreshing={false}
              refreshControl={<></>}
            />
            <KeyboardAvoidingView
              behavior="padding"
              keyboardVerticalOffset={
                CHAT_HEADER_HEIGHT + CHAT_HANDLE_HEIGHT - insets.bottom
              }
            >
              <View
                style={[
                  styles.messageBar,
                  { paddingBottom: insets.bottom + styles.messageBar.padding },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <TextInput
                    placeholder="Type a message..."
                    enterKeyHint="enter"
                    submitBehavior="newline"
                    multiline
                    style={{ height: "auto", maxHeight: 150 }}
                    value={message}
                    onChangeText={handleChangeText}
                  />
                </View>
                <TouchableOpacity onPress={send}>
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
