import { ScrollViewProps, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

export default function PageBackground({
  style,
  contentContainerStyle,
  children,
  ...rest
}: ScrollViewProps) {
  return (
    <KeyboardAwareScrollView
      disableScrollOnKeyboardHide
      style={[styles.container, style]}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      {...rest}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fffbeb",
  },
  content: {
    padding: 16,
    gap: 16,
  },
});
