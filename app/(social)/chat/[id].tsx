import Header from "@/components/Chat/Header";
import Message from "@/components/Chat/Message";
import MessageBar from "@/components/Chat/MessageBar";
import { StyleSheet, View } from "react-native";

export default function Chat() {
  return (
    <View style={styles.bgPlaceholder}>
      <Header />
      <View style={styles.messages}>
        <Message isOutgoing />
        <Message />
        <Message />
        <Message />
        <Message />
      </View>
      <MessageBar />
    </View>
  );
}

const styles = StyleSheet.create({
  bgPlaceholder: {
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  messages: {
    padding: 16,
    gap: 10,
    flex: 1,
  },
});
