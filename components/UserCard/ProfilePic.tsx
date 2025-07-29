import { StyleSheet } from "react-native";
import ApiImage from "../ApiImage";

type Props = {
  id?: string;
};

export default function ProfilePic({ id }: Props) {
  return <ApiImage id={id} targetSize={64} style={styles.pic} />;
}

const styles = StyleSheet.create({
  pic: {
    backgroundColor: "#eaeaea",
    width: 64,
    height: 64,
    borderRadius: 999,
  },
});
