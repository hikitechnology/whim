import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type Props = PropsWithChildren<{
  outerStyle?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
}>;

export default function Card({ innerStyle, outerStyle, children }: Props) {
  return (
    <View style={[styles.outerContainer, outerStyle]}>
      <View style={[styles.innerContainer, innerStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
  },
  innerContainer: {
    overflow: "hidden",
  },
});
