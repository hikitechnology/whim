import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function TypingIndicator() {
  const entryAnimation = FadeIn.duration(200);
  const exitAnimation = FadeOut.duration(200);

  const dot1Scale = useSharedValue(0.75);
  const dot2Scale = useSharedValue(0.75);
  const dot3Scale = useSharedValue(0.75);

  useEffect(() => {
    const createAnimation = (delay: number) =>
      withDelay(
        delay,
        withRepeat(
          withTiming(1, {
            duration: 900,
            easing: Easing.inOut(Easing.ease),
          }),
          -1,
          true,
        ),
      );

    dot1Scale.value = createAnimation(0);
    dot2Scale.value = createAnimation(300);
    dot3Scale.value = createAnimation(600);
  }, [dot1Scale, dot2Scale, dot3Scale]);

  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot1Scale.value }],
    opacity: dot1Scale.value,
  }));
  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot2Scale.value }],
    opacity: dot2Scale.value,
  }));
  const dot3Style = useAnimatedStyle(() => ({
    transform: [{ scale: dot3Scale.value }],
    opacity: dot3Scale.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        entering={entryAnimation}
        exiting={exitAnimation}
        style={styles.bubble}
      >
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, dot1Style]} />
          <Animated.View style={[styles.dot, dot2Style]} />
          <Animated.View style={[styles.dot, dot3Style]} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    paddingBottom: 4,
    alignItems: "flex-start",
  },
  bubble: {
    maxWidth: "90%",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderColor: "#e5e7eb",
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "#78350f",
  },
});
