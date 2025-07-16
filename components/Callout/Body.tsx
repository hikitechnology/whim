import { useContext } from "react";
import { Text, TextStyle } from "react-native";
import { CalloutColors, CalloutContext } from "./Callout";

type Props = {
  children?: string;
};

export default function Body({ children }: Props) {
  const variant = useContext(CalloutContext);
  const color = CalloutColors[variant].bodyColor;

  return <Text style={[style, { color }]}>{children}</Text>;
}

const style: TextStyle = {
  fontSize: 16,
};
