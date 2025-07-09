import { FlatList, StyleSheet } from "react-native";
import Badge from "../Badge";

type Props = {
  items: string[];
};

export default function InterestsRow({ items }: Props) {
  return (
    <FlatList
      data={items}
      renderItem={({ item }) => (
        <Badge backgroundColor="#f3e8ff" textColor="#7e22ce">
          {item}
        </Badge>
      )}
      horizontal
      style={{ overflow: "visible" }}
      contentContainerStyle={styles.interests}
      showsHorizontalScrollIndicator={false}
      onStartShouldSetResponder={() => true}
    />
  );
}

const styles = StyleSheet.create({
  interests: {
    flexDirection: "row",
    height: 24,
    gap: 6,
  },
});
