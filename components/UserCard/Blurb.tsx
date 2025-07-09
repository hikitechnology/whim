import { PropsWithChildren } from "react";
import { StyleSheet, Text } from "react-native";

export default function Blurb({ children }: PropsWithChildren) {
  return <Text style={styles.blurb}>{children}</Text>;
}

const styles = StyleSheet.create({
  blurb: {
    color: "#6b7280",
    fontSize: 14,
  },
});
