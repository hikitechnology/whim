import { StyleSheet, Text as TextBase, TextProps } from "react-native";

export default function Hint({ style, ...rest }: TextProps) {
  return <TextBase style={[styles.text, style]} {...rest} />;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
});
