import { Image, ImageStyle } from "expo-image";
import { PixelRatio, View } from "react-native";

type Props = {
  id?: string;
  targetSize?: number;
  style?: ImageStyle;
};

export default function ApiImage({ id, targetSize, style }: Props) {
  if (!id) return <View style={style} />;

  return (
    <Image
      source={`${process.env.EXPO_PUBLIC_BASE_URL}/image/${id}${targetSize ? `?size=${targetSize * PixelRatio.get()}` : ""}`}
      style={style}
    />
  );
}
