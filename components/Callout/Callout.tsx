import { createContext, PropsWithChildren } from "react";
import { ColorValue, StyleSheet, View, ViewStyle } from "react-native";

const defaultVariant = "orange";

type Props = PropsWithChildren<{
  variant?: "orange" | "purple" | "green" | "red";
}>;

export const CalloutContext =
  createContext<NonNullable<Props["variant"]>>(defaultVariant);

export const CalloutColors: Record<
  NonNullable<Props["variant"]>,
  {
    borderColor: ColorValue;
    backgroundColor: ColorValue;
    headerColor: ColorValue;
    bodyColor: ColorValue;
  }
> = {
  orange: {
    borderColor: "#fde68a",
    backgroundColor: "#fffbeb",
    headerColor: "#92400e",
    bodyColor: "#b45309",
  },
  purple: {
    borderColor: "#e9d5ff",
    backgroundColor: "#faf5ff",
    headerColor: "#6b21a8",
    bodyColor: "#7e22ce",
  },
  green: {
    borderColor: "#bbf7d0",
    backgroundColor: "#f0fdf4",
    headerColor: "#166534",
    bodyColor: "#15803d",
  },
  red: {
    borderColor: "#fecaca",
    backgroundColor: "#fef2f2",
    headerColor: "#991b1b",
    bodyColor: "#b91c1c",
  },
};

export default function Callout({ variant = defaultVariant, children }: Props) {
  const variantStyles: ViewStyle = {
    borderColor: CalloutColors[variant].borderColor,
    backgroundColor: CalloutColors[variant].backgroundColor,
  };

  return (
    <CalloutContext.Provider value={variant}>
      <View style={[styles.callout, variantStyles]}>{children}</View>
    </CalloutContext.Provider>
  );
}

const styles = StyleSheet.create({
  callout: {
    borderWidth: 1,
    padding: 18,
    borderRadius: 10,
    gap: 8,
  },
});
