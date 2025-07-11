import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Header() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back-outline" size={24} color="#4b5563" />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <View style={styles.pfp} />
        <View>
          <Text style={styles.name}>name</Text>
          <View style={styles.statusContainer}>
            <View style={styles.statusIndicator} />
            <Text style={styles.statusText}>Online • Park Slope</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="location-outline" size={24} color="#d97706" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingBottom: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  pfp: {
    width: 40,
    height: 40,
    backgroundColor: "#eaeaea",
    borderRadius: 999,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    backgroundColor: "#4ade80",
    borderRadius: 999,
  },
  statusText: {
    fontSize: 15,
    color: "#4b5563",
  },
});
