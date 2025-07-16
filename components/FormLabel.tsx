import { StyleSheet, Text, TextProps } from "react-native";

export default function FormLabel({ style, ...rest }: TextProps) {
  return <Text style={[styles.formLabel, style]} {...rest} />;
}

const styles = StyleSheet.create({
  formLabel: {
    fontSize: 16,
    color: "#4b5563",
    fontWeight: 500,
  },
});
