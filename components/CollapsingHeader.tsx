import { LinearGradient } from "expo-linear-gradient";
import React, { PropsWithChildren } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type Props = PropsWithChildren<{
  baseHeight: number;
  scrollOffset: SharedValue<number>;
  innerStyle?: ViewStyle;
}>;

export default function CollapsingHeader({
  baseHeight,
  scrollOffset,
  innerStyle,
  children,
}: Props) {
  const insets = useSafeAreaInsets();

  const animatedStyles = {
    container: useAnimatedStyle(() => ({
      height: Math.max(baseHeight - scrollOffset.value, insets.top),
    })),
    innerLayout: useAnimatedStyle(() => {
      const radius = interpolate(
        scrollOffset.value,
        [0, baseHeight - insets.top],
        [20, 0],
        Extrapolation.CLAMP,
      );

      return {
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius,
      };
    }),
    innerElements: useAnimatedStyle(() => ({
      opacity: interpolate(
        scrollOffset.value,
        [0, baseHeight - insets.top],
        [1, 0],
        Extrapolation.CLAMP,
      ),
    })),
  };

  return (
    <Animated.View style={[styles.container, animatedStyles.container]}>
      <AnimatedLinearGradient
        colors={["rgba(255, 237, 213, 0.9)", "rgba(254, 249, 195, 0.9)"]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={[
          styles.innerLayout,
          { paddingTop: insets.top },
          animatedStyles.innerLayout,
        ]}
      >
        <Animated.View style={[innerStyle, animatedStyles.innerElements]}>
          {children}
        </Animated.View>
      </AnimatedLinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 999,
  },
  innerLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: "rgba(254, 215, 170, 0.5)",
    borderWidth: 1,
  },
});
