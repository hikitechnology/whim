import Button from "@/components/Button";
import Card from "@/components/Card";
import { StyleSheet, Text, View } from "react-native";

export default function FriendPage() {
  return (
    <View style={styles.background}>
      <Card innerStyle={styles.codeContainer}>
        <Text style={styles.codeLabel}>Your Friend Code</Text>
        <View style={styles.innerCodeContainer}>
          <View style={{ width: 250, height: 250, backgroundColor: "black" }} />
        </View>
        <View>
          <Text style={styles.hint}>
            Have NAME scan this code to add you as a friend!
          </Text>
        </View>
      </Card>
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
    padding: 16,
    flex: 1,
    gap: 24,
  },
  codeContainer: {
    alignItems: "center",
    padding: 16,
    gap: 16,
  },
  codeLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  innerCodeContainer: {
    padding: 30,
    boxShadow: "inset 0px 2px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: 20,
  },
  hint: {
    color: "#4b5563",
  },
  buttonContainer: {
    paddingHorizontal: 16,
  },
});
