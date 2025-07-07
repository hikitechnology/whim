import {
  StyleSheet,
  Switch,
  SwitchProps,
  Text,
  TextProps,
  View,
} from "react-native";

type Props = {
  label: string;
  textProps?: TextProps;
} & SwitchProps;

export default function SwitchRow({ label, textProps, ...switchProps }: Props) {
  return (
    <View style={styles.switchRow}>
      <Text style={styles.switchText}>{label}</Text>
      <Switch trackColor={{ true: "#78350f" }} {...switchProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchText: {
    flex: 1,
    fontSize: 18,
    color: "#374151",
    fontWeight: 500,
  },
});
