import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function PfpSelector() {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.badge}>
        <Ionicons name="camera-outline" size={24} color="#fff" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
    borderWidth: 5,
    borderColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
    width: 108,
    height: 108,
    backgroundColor: "#eaeaea",
  },
  badge: {
    backgroundColor: "#ec4899",
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    position: "absolute",
    bottom: -8,
    right: -8,
  },
});
