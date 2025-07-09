import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import IconText from "../IconText";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = PropsWithChildren<{
  icon?: keyof typeof Ionicons.glyphMap;
}>;

export default function StatItem({ icon, children }: Props) {
  return (
    <IconText style={styles.subtext} icon={icon} iconColor="#d97706">
      {children}
    </IconText>
  );
}

const styles = StyleSheet.create({
  subtext: {
    fontSize: 15,
  },
});
