import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CountShowcase from "./CountShowcase";

const overviewData = {
  peopleMet: 5,
  placesVisited: 4,
};

export default function Overview() {
  const insets = useSafeAreaInsets();

  const date = new Date();
  const prettyDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <LinearGradient
      colors={["rgba(255, 237, 213, 0.9)", "rgba(254, 249, 195, 0.9)"]}
      style={[styles.container, { paddingTop: insets.top + 20 }]}
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 28,
    alignItems: "center",
    gap: 16,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: "rgba(254, 215, 170, 0.5)",
    borderWidth: 1,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
