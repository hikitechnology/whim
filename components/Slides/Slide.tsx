import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import Animated, { Keyframe } from "react-native-reanimated";

type Props = PropsWithChildren;

export default function Slide({ children }: Props) {
  const enterAnimation = new Keyframe({
    0: {
      transform: [{ scale: 0.8 }],
      opacity: 0,
    },
    100: {
      transform: [{ scale: 1 }],
      opacity: 1,
    },
  })
    .duration(125)
    .delay(125);

  const exitAnimation = new Keyframe({
    0: {
      transform: [{ scale: 1 }],
      opacity: 1,
    },
    100: {
      transform: [{ scale: 0.8 }],
      opacity: 0,
    },
  }).duration(125);

  return (
    <Animated.View
      entering={enterAnimation}
      exiting={exitAnimation}
      style={styles.slide}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  slide: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});
