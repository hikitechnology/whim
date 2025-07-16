import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { ColorValue, StyleSheet } from "react-native";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  variant?: "blue" | "green" | "orange" | "purple";
  size?: number;
};

export default function BigIcon({ icon, variant = "blue", size = 84 }: Props) {
  let gradientColors: [ColorValue, ColorValue, ...ColorValue[]];
  switch (variant) {
    case "blue":
      gradientColors = ["#60a5fa", "#818cf8"];
      break;
    case "green":
      gradientColors = ["#4ade80", "#10b981"];
      break;
    case "orange":
      gradientColors = ["#fbbf24", "#f97316"];
      break;
    case "purple":
      gradientColors = ["#c084fc", "#ec4899"];
      break;
  }

  return (
    <LinearGradient
      colors={gradientColors}
      style={[styles.bg, { width: size, height: size }]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      <Ionicons name={icon} size={size * 0.6} color="#fff" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
});
