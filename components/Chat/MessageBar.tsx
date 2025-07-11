import { StyleSheet, Text, View } from "react-native";
import TextInput from "../TextInput";

export default function MessageBar() {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type a message..."
        borderColor="#e5e7eb"
        enterKeyHint="send"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 10,
  },
});
