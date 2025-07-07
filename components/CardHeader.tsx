import Ionicons from "@expo/vector-icons/Ionicons";
import IconText from "./IconText";
import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";

type Props = PropsWithChildren<{
  icon?: keyof typeof Ionicons.glyphMap;
}>;

export default function CardHeader({ icon, children }: Props) {
  return (
    <IconText icon={icon} iconColor="#d97706" style={styles.cardHeader}>
      {children}
    </IconText>
  );
}

const styles = StyleSheet.create({
  cardHeader: {
    fontSize: 22,
    fontWeight: 600,
  },
});
