import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import StatusIndicator from "../StatusIndicator";

type Props = {
  children: ReactNode;
};

export default function StatIndicator({ children }: Props) {
  return (
    <View style={styles.container}>
      <StatusIndicator status="online" size={10} />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  text: {
    fontSize: 15,
  },
});
