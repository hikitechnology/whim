import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useState } from "react";
import {
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  View,
} from "react-native";
import FormLabel from "./FormLabel";

type Props = {
  provider?: "default" | "bottomSheet";
  borderColor?: string;
  borderColorFocused?: string;
  label?: string;
} & TextInputProps;

export default function TextInput({
  style,
  enterKeyHint,
  borderColor = "rgb(252, 211, 77)",
  borderColorFocused,
  provider = "default",
  label,
  ...rest
}: Props) {
  const [focused, setFocused] = useState(false);

  const focusStyle = {
    borderColor:
      focused && borderColorFocused ? borderColorFocused : borderColor,
  };

  const InputProvider =
    provider === "default" ? RNTextInput : BottomSheetTextInput;

  return (
    <View style={styles.container}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <InputProvider
        style={[styles.input, focusStyle, style]}
        placeholderTextColor="#6b7280"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        enterKeyHint={enterKeyHint ?? "done"}
        submitBehavior="blurAndSubmit"
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
  },
  input: {
    padding: 8,
    borderWidth: 2,
    borderRadius: 16,
    fontSize: 16,
    backgroundColor: "#fff",
    height: 44,
  },
});
