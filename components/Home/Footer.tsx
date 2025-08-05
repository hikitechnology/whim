import { StyleSheet, Text, View } from "react-native";

type Props = {
  hasConnections: boolean;
};

export default function Footer({ hasConnections }: Props) {
  const text = hasConnections
    ? "Your connections update every 15 minutes ⏰" // not how it really works right now
    : "No connections yet, scanning now... 🔍";

  return (
    <View style={styles.container}>
      <Text style={styles.topText}>{text}</Text>
      <Text style={styles.bottomText}>Last updated at 12:34 PM</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff88",
    borderColor: "#fed7aa",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: "center",
    gap: 6,
    marginHorizontal: 6,
  },
  topText: {
    color: "#b45309",
    fontWeight: 500,
    fontSize: 15,
  },
  bottomText: {
    fontSize: 15,
    color: "#d97706",
  },
});
