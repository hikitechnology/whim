import { ReactNode } from "react";
import Animated, { Keyframe } from "react-native-reanimated";

type Props = {
  children: ReactNode;
};

export default function PopInView({ children }: Props) {
  const enterAnimation = new Keyframe({
    0: {
      transform: [{ scale: 0.8 }],
      opacity: 0,
    },
    100: {
      transform: [{ scale: 1 }],
      opacity: 1,
    },
  }).duration(200);

  return <Animated.View entering={enterAnimation}>{children}</Animated.View>;
}
