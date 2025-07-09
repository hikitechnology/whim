import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import IconText from "../IconText";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = PropsWithChildren<{
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: "primary" | "secondary";
}>;

export default function Subtext({
  variant = "primary",
  icon,
  children,
}: Props) {
  const textStyle = {
    color: variant === "primary" ? "#000" : "#6b7280",
  };

  return (
    <IconText
      style={[styles.subtext, textStyle]}
      icon={icon}
      iconColor="#d97706"
      numberOfLines={1}
    >
      {children}
    </IconText>
  );
}

const styles = StyleSheet.create({
  subtext: {
    fontSize: 16,
  },
});
