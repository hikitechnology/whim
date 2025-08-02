import { SharedValue } from "react-native-reanimated";
import CollapsingHeader from "../CollapsingHeader";
import { StyleSheet, Text, View } from "react-native";
import TextInput from "../TextInput";
import Button from "../Button";
import React, { useState } from "react";

export const BASE_SOCIAL_HEADER_HEIGHT = 248;

type Props = {
  scrollOffset: SharedValue<number>;
};

function Header({ scrollOffset }: Props) {
  const [selectedTab, setSelectedTab] = useState<"all" | "friends" | "new">(
    "all",
  );

  return (
    <CollapsingHeader
      baseHeight={BASE_SOCIAL_HEADER_HEIGHT}
      scrollOffset={scrollOffset}
      innerStyle={styles.innerElements}
    >
      <View style={styles.topText}>
        <Text style={styles.header}>Conversations</Text>
        <Text style={styles.subheader}>Stay connected with your friends</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search conversations..."
        />
      </View>
      <View style={styles.filters}>
        <Button
          style={{ flex: 1 }}
          color="orange"
          variant={selectedTab === "all" ? "primary" : "secondary"}
          onPress={() => setSelectedTab("all")}
        >
          All (6)
        </Button>
        <Button
          style={{ flex: 1 }}
          color="purple"
          variant={selectedTab === "friends" ? "primary" : "secondary"}
          onPress={() => setSelectedTab("friends")}
        >
          Friends (2)
        </Button>
        <Button
          style={{ flex: 1 }}
          color="blue"
          variant={selectedTab === "new" ? "primary" : "secondary"}
          onPress={() => setSelectedTab("new")}
        >
          New (2)
        </Button>
      </View>
    </CollapsingHeader>
  );
}

const styles = StyleSheet.create({
  innerElements: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    height: BASE_SOCIAL_HEADER_HEIGHT,
    padding: 12,
  },
  topText: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 8,
    gap: 10,
  },
  header: {
    fontSize: 28,
    lineHeight: 28,
    fontWeight: "bold",
    color: "#78350f",
  },
  subheader: {
    fontSize: 20,
    lineHeight: 20,
    color: "#b45309",
  },
  searchContainer: {
    flexDirection: "row",
    height: 44,
  },
  searchBar: {
    flex: 1,
  },
  filters: {
    flexDirection: "row",
    gap: 6,
  },
});

export default React.memo(Header);
