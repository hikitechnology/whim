import Button from "@/components/Button";
import MyCode from "@/components/Friend/MyCode";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function FriendPage() {
  const { name } = useLocalSearchParams<{ name?: string }>();

  return (
    <View style={styles.background}>
      <MyCode name={name} />
      <View style={styles.buttonContainer}>
        <Button color="blue" variant="primary" icon="scan-outline">
          Scan their code instead
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#fffbeb",
    padding: 24,
    flex: 1,
    gap: 24,
  },
  buttonContainer: {
    paddingHorizontal: 16,
  },
});
