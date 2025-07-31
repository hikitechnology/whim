import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ApiImage from "../ApiImage";
import { useConnectionState } from "@/hooks/useConnections";
import StatusIndicator from "../StatusIndicator";

type Props = {
  userId: string;
  name: string;
  pfpId?: string;
};

export const CHAT_HEADER_HEIGHT = 100;

export default function Header({ userId, name, pfpId }: Props) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const connection = useConnectionState((state) => state.getConnection(userId));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity
        style={{ zIndex: 10 }}
        onPress={() => router.back()}
        hitSlop={20}
      >
        <Ionicons name="arrow-back-outline" size={24} color="#4b5563" />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <ApiImage style={styles.pfp} id={pfpId} targetSize={40} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{name}</Text>
          {connection ? (
            <View style={styles.statusContainer}>
              {!connection.endTime ? (
                <>
                  <StatusIndicator status="online" size={8} />
                  <Text style={styles.statusText}>Nearby •</Text>
                </>
              ) : null}
              <Text style={[styles.statusText, { flex: 1 }]} numberOfLines={1}>
                Met near {connection.locationName}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      <TouchableOpacity hitSlop={20}>
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
    height: CHAT_HEADER_HEIGHT,
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
  statusText: {
    fontSize: 15,
    color: "#4b5563",
  },
});
