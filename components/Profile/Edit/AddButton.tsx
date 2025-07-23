import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, ViewStyle } from "react-native";

type Props = {
  bgColor: string;
  fgColor: string;
  onPress: () => void;
};

export default function AddButton({ bgColor, fgColor, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[style, { backgroundColor: bgColor }]}
      onPress={onPress}
    >
      <Ionicons name="add-outline" size={36} color={fgColor} />
    </TouchableOpacity>
  );
}

const style: ViewStyle = {
  width: 40,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 999,
  position: "absolute",
  top: 8,
  right: 16,
};
