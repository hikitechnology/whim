import { useContext } from "react";
import { TextStyle } from "react-native";
import { CalloutColors, CalloutContext } from "./Callout";
import IconText from "../IconText";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  icon?: keyof typeof Ionicons.glyphMap;
  children?: string;
};

export default function Header({ icon, children }: Props) {
  const variant = useContext(CalloutContext);
  const color = CalloutColors[variant].headerColor;

  return (
    <IconText icon={icon} style={[style, { color }]}>
      {children}
    </IconText>
  );
}

const style: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
};
