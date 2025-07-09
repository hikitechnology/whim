import { ScrollView, ScrollViewProps, StyleSheet } from "react-native";

export default function PageBackground({
  style,
  contentContainerStyle,
  children,
  ...rest
}: ScrollViewProps) {
  return (
    <ScrollView
      style={[styles.container, style]}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      {...rest}
    >
      {children}
    </ScrollView>
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
