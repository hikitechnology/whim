import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type Props = {
  status?: "online" | "offline";
  size?: number;
};

export default function StatusIndicator({
  status = "online",
  size = 10,
}: Props) {
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

  const dotColors = {
    online: "#00FF00",
    offline: "#6b7280",
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View
      style={[
        styles.dot,
        { width: size, height: size, backgroundColor: dotColors[status] },
      ]}
    >
      {!(status === "offline") ? (
        <Animated.View
          style={[
            styles.dot,
            {
              width: size,
              height: size,
              backgroundColor: dotColors[status] + "66",
            },
            animatedStyle,
          ]}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    borderRadius: 999,
  },
});
