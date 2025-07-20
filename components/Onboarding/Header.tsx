import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type Props = {
  currentPage: number;
  pageCount: number;
};

export default function Header({ currentPage, pageCount }: Props) {
  const progress = useSharedValue(currentPage / pageCount);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    progress.value = currentPage / pageCount;
  }, [currentPage, pageCount, progress]);

  const animatedStyles = useAnimatedStyle(() => ({
    width: withTiming(`${progress.value * 100}%`, { duration: 500 }),
  }));

  return (
    <LinearGradient
      colors={["rgba(255, 237, 213, 0.9)", "rgba(254, 249, 195, 0.9)"]}
      start={{ x: 0, y: 0.75 }}
      end={{ x: 1, y: 0.25 }}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.topText}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.page}>
          {currentPage} of {pageCount}
        </Text>
      </View>
      <View style={styles.progressContainer}>
        <AnimatedLinearGradient
          colors={["#fbbf24", "#f97316"]}
          start={{ x: 0, y: 0.75 }}
          end={{ x: 1, y: 0.25 }}
          style={[styles.progressBar, animatedStyles]}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 14,
    gap: 14,
    borderColor: "rgba(254, 215, 170, 0.5)",
    borderWidth: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  topText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#78350f",
  },
  page: {
    fontSize: 15,
    color: "#b45309",
  },
  progressContainer: {
    backgroundColor: "#d1d5db",
    height: 10,
    borderRadius: 999,
  },
  progressBar: {
    height: 10,
    borderRadius: 999,
  },
});
