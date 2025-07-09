import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import IconText from "./IconText";

type Props = PropsWithChildren<{
  variant?: "small" | "large";
  backgroundColor?: string;
  textColor?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}>;

export default function Badge({
  variant = "small",
  backgroundColor = "#dbeafe",
  textColor = "#1d4ed8",
  icon,
  onPress,
  children,
}: Props) {
  let variantStyles;
  if (variant === "small") {
    variantStyles = StyleSheet.create({
      container: {
        paddingHorizontal: 8,
        height: 24,
      },
      text: {
        fontSize: 14,
      },
    });
  } else {
    variantStyles = StyleSheet.create({
      container: {
        paddingHorizontal: 12,
        height: 30,
      },
      text: {
        fontSize: 18,
      },
    });
  }

  return (
    <TouchableOpacity
      style={[styles.container, variantStyles.container, { backgroundColor }]}
      onPress={onPress}
    >
      <IconText
        icon={icon}
        style={[
          variantStyles.text,
          {
            color: textColor,
          },
        ]}
      >
        {children}
      </IconText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderRadius: 999,
  },
});
