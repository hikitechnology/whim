import { PropsWithChildren } from "react";
import BadgeBase from "../Badge";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = PropsWithChildren<{
  backgroundColor?: string;
  textColor?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}>;

export default function Badge({
  backgroundColor,
  textColor,
  icon,
  children,
}: Props) {
  return (
    <BadgeBase
      variant="small"
      backgroundColor={backgroundColor}
      textColor={textColor}
      icon={icon}
    >
      {children}
    </BadgeBase>
  );
}
