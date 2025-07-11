import { useState } from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

type Props = {
  borderColor?: string;
  borderColorFocused?: string;
} & TextInputProps;

export default function TextInput({
  style,
  enterKeyHint,
  borderColor = "rgb(252, 211, 77)",
  borderColorFocused,
  ...rest
}: Props) {
  const [focused, setFocused] = useState(false);

  const focusStyle = {
    borderColor:
      focused && borderColorFocused ? borderColorFocused : borderColor,
  };

  return (
    <RNTextInput
      style={[styles.input, focusStyle, style]}
      placeholderTextColor="#6b7280"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      enterKeyHint={enterKeyHint ?? "done"}
      submitBehavior="blurAndSubmit"
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 8,
    borderWidth: 2,
    borderRadius: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});
