import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren<{
  backgroundColor: string;
  textColor: string;
}>;

export default function Badge({ backgroundColor, textColor, children }: Props) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text
        style={{
          color: textColor,
        }}
      >
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 8,
    borderRadius: 999,
  },
});
