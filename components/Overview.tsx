import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CountShowcase from "./CountShowcase";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const overviewData = {
  peopleMet: 5,
  placesVisited: 4,
};

export const BASE_OVERVIEW_HEIGHT = 280;

type Props = {
  scrollOffset: SharedValue<number>;
};

export default function Overview({ scrollOffset }: Props) {
  const insets = useSafeAreaInsets();

  const animatedStyles = {
    container: useAnimatedStyle(() => ({
      height: Math.max(BASE_OVERVIEW_HEIGHT - scrollOffset.value, insets.top),
    })),
    innerLayout: useAnimatedStyle(() => {
      const radius = interpolate(
        scrollOffset.value,
        [0, BASE_OVERVIEW_HEIGHT - insets.top],
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
        [0, BASE_OVERVIEW_HEIGHT - insets.top],
        [1, 0],
        Extrapolation.CLAMP,
      ),
    })),
  };

  const date = new Date();
  const prettyDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

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
        <Animated.View
          style={[styles.innerElements, animatedStyles.innerElements]}
        >
          <Text style={styles.header}>Today&apos;s Connections</Text>
          <Text style={styles.subheader}>{prettyDate}</Text>
          <View style={styles.statsContainer}>
            <CountShowcase
              number={overviewData.peopleMet}
              text="people met"
              onPress={() => console.log("people met pressed")}
            />
            <CountShowcase
              number={overviewData.placesVisited}
              text="places visited"
              onPress={() => console.log("places visited pressed")}
            />
          </View>
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
    height: BASE_OVERVIEW_HEIGHT,
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
  innerElements: {
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    height: BASE_OVERVIEW_HEIGHT,
  },
  header: {
    fontSize: 28,
    lineHeight: 28,
    fontWeight: "bold",
    color: "#78350f",
  },
  subheader: {
    fontSize: 22,
    lineHeight: 22,
    fontWeight: 500,
    color: "#b45309",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
  },
});
