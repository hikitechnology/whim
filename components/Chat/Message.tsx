import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";

type Props = {
  isOutgoing?: boolean;
  timestamp?: number | string;
  text: string;
};

export default function Message({
  isOutgoing = false,
  timestamp,
  text,
}: Props) {
  const senderStyles = StyleSheet.create({
    container: {
      alignItems: isOutgoing ? "flex-end" : "flex-start",
    },
    bubble: {
      borderWidth: isOutgoing ? 0 : 1,
    },
  });

  const messageAnimation = (isOutgoing ? FadeInRight : FadeInLeft).duration(
    200,
  );
  const timestampAnimation = FadeIn.duration(200);

  return (
    <View style={[styles.container, senderStyles.container]}>
      <Animated.View
        entering={messageAnimation}
        style={[styles.bubble, senderStyles.bubble]}
      >
        {isOutgoing ? (
          <LinearGradient
            colors={["#fcd34d", "#fdba74"]}
            start={{ x: 0, y: 0.75 }}
            end={{ x: 1, y: 0.25 }}
            style={styles.background}
          />
        ) : null}
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
      {timestamp !== undefined ? (
        <Animated.Text entering={timestampAnimation} style={styles.timestamp}>
          {new Date(timestamp).toLocaleTimeString([], { timeStyle: "short" })}
        </Animated.Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    paddingBottom: 4,
  },
  bubble: {
    maxWidth: "90%",
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
    paddingBottom: 4,
  },
});
