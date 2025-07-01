import { PropsWithChildren } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = PropsWithChildren<{
  variant?: "small" | "large";
  backgroundColor: string;
  textColor: string;
  onPress?: () => void;
}>;

export default function Badge({
  variant = "small",
  backgroundColor,
  textColor,
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
      <Text
        style={[
          variantStyles.text,
          {
            color: textColor,
          },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderRadius: 999,
  },
});
