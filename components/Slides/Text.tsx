import { StyleSheet, Text as TextBase, TextProps } from "react-native";

export default function Text({ style, ...rest }: TextProps) {
  return <TextBase style={[styles.text, style]} {...rest} />;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: "#4b5563",
    textAlign: "center",
  },
});
