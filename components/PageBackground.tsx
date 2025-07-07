import {
  KeyboardAvoidingView,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
} from "react-native";

// TODO: KeyboardAvoidingView is bad. switch to react-native-keyboard-controller once using dev builds

type Props = {
  keyboardVerticalOffset?: number;
} & ScrollViewProps;

export default function PageBackground({
  style,
  contentContainerStyle,
  keyboardVerticalOffset,
  children,
  ...rest
}: Props) {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[styles.container, style]}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView
        contentContainerStyle={[styles.content, contentContainerStyle]}
        {...rest}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fffbeb",
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
});
