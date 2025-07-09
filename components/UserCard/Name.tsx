import { PropsWithChildren } from "react";
import { StyleSheet, Text } from "react-native";

export default function Name({ children }: PropsWithChildren) {
  return (
    <Text style={styles.name} numberOfLines={1}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
