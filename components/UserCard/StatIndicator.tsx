import { ReactNode, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type Props = {
  children: ReactNode;
};

export default function StatIndicator({ children }: Props) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1.75, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
    );

    opacity.value = withRepeat(
      withTiming(0, {
        duration: 1000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
    );
  }, [scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#00FF00",
          width: 10,
          height: 10,
          borderRadius: 6,
        }}
      >
        <Animated.View style={[styles.dot, animatedStyle]} />
      </View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  text: {
    fontSize: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#00FF0066",
  },
});
