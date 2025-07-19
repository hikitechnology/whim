import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  number: number;
  text: string;
  onPress?: () => void;
};

export default function CountShowcase({ number, text, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.number}>{number}</Text>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 14,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    gap: 4,
  },
  number: {
    color: "#78350f",
    fontWeight: "bold",
    fontSize: 28,
  },
  text: {
    color: "#b45309",
    fontSize: 16,
    fontWeight: 500,
  },
});
