import { StyleSheet, View } from "react-native";

export default function ProfilePic() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eaeaea",
    width: 64,
    height: 64,
    borderRadius: 999,
  },
});
