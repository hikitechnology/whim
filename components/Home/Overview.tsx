import { StyleSheet, Text, View } from "react-native";
import CountShowcase from "./CountShowcase";
import { SharedValue } from "react-native-reanimated";
import CollapsingHeader from "../CollapsingHeader";

const overviewData = {
  peopleMet: 5,
  placesVisited: 4,
};

export const BASE_OVERVIEW_HEIGHT = 280;

type Props = {
  scrollOffset: SharedValue<number>;
};

export default function Overview({ scrollOffset }: Props) {
  const date = new Date();
  const prettyDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <CollapsingHeader
      baseHeight={BASE_OVERVIEW_HEIGHT}
      scrollOffset={scrollOffset}
      innerStyle={styles.innerElements}
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
    </CollapsingHeader>
  );
}

const styles = StyleSheet.create({
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
