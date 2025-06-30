import { PropsWithChildren } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

type Props = PropsWithChildren<{
  variant?: "primary" | "secondary";
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}>;

export default function Button({
  variant = "secondary",
  icon,
  children,
  onPress,
}: Props) {
  let variantStyles;
  if (variant === "primary") {
    variantStyles = StyleSheet.create({
      container: {},
      text: {
        color: "#fff",
      },
    });
  } else {
    variantStyles = StyleSheet.create({
      container: {
        borderColor: "rgb(252, 211, 77)",
        borderWidth: 2,
      },
      text: {
        color: "#78350f",
      },
    });
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, variantStyles.container]}
    >
      {variant === "primary" && (
        <LinearGradient
          colors={["#f43f5e", "#db2777"]}
          end={{ x: 0.1, y: 0.2 }}
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    overflow: "hidden",
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
