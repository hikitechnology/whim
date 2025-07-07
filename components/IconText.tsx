import { StyleSheet, Text, TextProps, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
} & TextProps;

export default function IconText({ icon, iconColor, children, style }: Props) {
  const flatStyles = StyleSheet.flatten(style);

  return (
    <View style={styles.container}>
      {icon ? (
        <Ionicons
          name={icon}
          size={(flatStyles?.fontSize ?? 15) * 1.1}
          color={iconColor ?? flatStyles?.color ?? "black"}
        />
      ) : null}
      <Text style={style}>
        {icon ? " " : ""}
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
