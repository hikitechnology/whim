import {
  ColorValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  color?: "default" | "textOnly" | "green" | "blue" | "orange" | "purple";
  variant?: "primary" | "secondary";
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  children?: string;
};

type ButtonVariant = (
  | {
      bgType: "gradient";
      bgColor: [ColorValue, ColorValue, ...ColorValue[]];
    }
  | {
      bgType: "solid";
      bgColor: ColorValue;
    }
  | {
      bgType: "none";
    }
) & {
  textColor: ColorValue;
  borderColor?: ColorValue;
};

type ButtonStyle = {
  primary: ButtonVariant;
  secondary: ButtonVariant;
};

const buttonStyles: Record<NonNullable<Props["color"]>, ButtonStyle> = {
  default: {
    primary: {
      bgType: "gradient",
      bgColor: ["#f43f5e", "#db2777"],
      textColor: "#fff",
    },
    secondary: {
      bgType: "solid",
      bgColor: "#fff",
      textColor: "#78350f",
      borderColor: "rgb(252, 211, 77)",
    },
  },
  textOnly: {
    primary: {
      bgType: "none",
      textColor: "#6b7280",
    },
    secondary: {
      bgType: "none",
      textColor: "#6b7280",
    },
  },
  green: {
    primary: {
      bgType: "gradient",
      bgColor: ["#10b981", "#16a34a"],
      textColor: "#fff",
    },
    secondary: {
      bgType: "solid",
      bgColor: "#f0fdf4",
      textColor: "#166534",
      borderColor: "#bbf7d0",
    },
  },
  blue: {
    primary: {
      bgType: "gradient",
      bgColor: ["#3b82f6", "#6366f1"],
      textColor: "#fff",
    },
    secondary: {
      bgType: "solid",
      bgColor: "#eff6ff",
      textColor: "#1e40af",
      borderColor: "#bfdbfe",
    },
  },
  orange: {
    primary: {
      bgType: "gradient",
      bgColor: ["#fbbf24", "#f97316"],
      textColor: "#fff",
    },
    secondary: {
      bgType: "solid",
      bgColor: "#fff7ed",
      textColor: "#9a3412",
      borderColor: "#fed7aa",
    },
  },
  purple: {
    primary: {
      bgType: "gradient",
      bgColor: ["#7c3aed", "#9333ea"],
      textColor: "#fff",
    },
    secondary: {
      bgType: "solid",
      bgColor: "#faf5ff",
      textColor: "#6b21a8",
      borderColor: "#e9d5ff",
    },
  },
};

export default function Button({
  color = "default",
  variant = "secondary",
  icon,
  children,
  disabled,
  style,
  onPress,
}: Props) {
  const variantConfig = buttonStyles[color][variant];

  const variantStyles = StyleSheet.create({
    container: {
      backgroundColor:
        variantConfig.bgType === "solid" ? variantConfig.bgColor : undefined,
      borderWidth: variantConfig.borderColor ? 2 : undefined,
      borderColor: variantConfig.borderColor,
    },
    text: {
      color: variantConfig.textColor,
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        variantStyles.container,
        style,
        disabled && { opacity: 0.5 },
      ]}
      disabled={disabled}
    >
      {variantConfig.bgType === "gradient" && (
        <LinearGradient
          colors={variantConfig.bgColor}
          start={{ x: 0, y: 0.75 }}
          end={{ x: 1, y: 0.25 }}
          style={styles.gradientBg}
        />
      )}
      {icon !== undefined && (
        <Ionicons name={icon} size={18} color={variantConfig.textColor} />
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
