import { StyleSheet, Text, TextProps, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
} & TextProps;

export default function IconText({ icon, iconColor, children, style }: Props) {
  const flatStyles = StyleSheet.flatten(style);

  return (
    <View style={styles.container}>
      <Ionicons
        name={icon}
        size={(flatStyles?.fontSize ?? 15) * 1.1}
        color={iconColor ?? flatStyles?.color ?? "black"}
      />
      <Text style={style}> {children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
