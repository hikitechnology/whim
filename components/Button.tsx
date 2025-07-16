import { PropsWithChildren } from "react";
import {
  ColorValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

type Props = PropsWithChildren<{
  variant?:
    | "primary"
    | "secondary"
    | "textOnly"
    | "green"
    | "blue"
    | "orange"
    | "purple";
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  style?: ViewStyle;
}>;

export default function Button({
  style,
  variant = "secondary",
  icon,
  children,
  onPress,
}: Props) {
  let variantStyles;
  if (
    variant === "primary" ||
    variant === "green" ||
    variant === "blue" ||
    variant === "orange" ||
    variant === "purple"
  ) {
    variantStyles = StyleSheet.create({
      container: {},
      text: {
        color: "#fff",
      },
    });
  } else if (variant === "secondary") {
    variantStyles = StyleSheet.create({
      container: {
        borderColor: "rgb(252, 211, 77)",
        borderWidth: 2,
        backgroundColor: "#fff",
      },
      text: {
        color: "#78350f",
      },
    });
  } else {
    variantStyles = StyleSheet.create({
      container: {},
      text: {
        color: "#6b7280",
      },
    });
  }

  let gradientColors: [ColorValue, ColorValue, ...ColorValue[]] | null = null;
  switch (variant) {
    case "primary":
      gradientColors = ["#f43f5e", "#db2777"];
      break;
    case "green":
      gradientColors = ["#10b981", "#16a34a"];
      break;
    case "blue":
      gradientColors = ["#3b82f6", "#6366f1"];
      break;
    case "orange":
      gradientColors = ["#fbbf24", "#f97316"];
      break;
    case "purple":
      gradientColors = ["#c084fc", "#ec4899"];
      break;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, variantStyles.container, style]}
    >
      {gradientColors && (
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0.75 }}
          end={{ x: 1, y: 0.25 }}
          style={styles.gradientBg}
        />
      )}
      {icon && (
        <Ionicons name={icon} size={18} color={variantStyles.text.color} />
      )}
      <Text style={[styles.text, variantStyles.text]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    overflow: "hidden",
    height: 44,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
  },
  gradientBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
