import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  isOutgoing?: boolean;
};

export default function Message({ isOutgoing = false }: Props) {
  const senderStyles = StyleSheet.create({
    container: {
      alignItems: isOutgoing ? "flex-end" : "flex-start",
    },
    bubble: {
      borderWidth: isOutgoing ? 0 : 1,
    },
  });

  return (
    <View style={[styles.container, senderStyles.container]}>
      <View style={[styles.bubble, senderStyles.bubble]}>
        {isOutgoing ? (
          <LinearGradient
            colors={["#fcd34d", "#fdba74"]}
            start={{ x: 0, y: 0.75 }}
            end={{ x: 1, y: 0.25 }}
            style={styles.background}
          />
        ) : null}
        <Text style={styles.text}>
          That coffee shop you recommended was amazing! ☕
        </Text>
      </View>
      <Text style={styles.timestamp}>2:34 PM</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  bubble: {
    width: "90%",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderColor: "#e5e7eb",
    borderRadius: 20,
    overflow: "hidden",
  },
  background: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    fontSize: 16,
  },
  timestamp: {
    color: "#6b7280",
    fontSize: 14,
  },
});
