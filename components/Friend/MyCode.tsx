import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import Card from "../Card";
import { useEffect, useState } from "react";
import useFriendCodeQuery from "@/hooks/queries/useFriendCodeQuery";
import { generateScannableCode } from "@/utils/friendCodes";

const QR_SIZE = 225;

type Props = {
  name?: string;
};

export default function MyCode({ name }: Props) {
  const { data } = useFriendCodeQuery();
  const [code, setCode] = useState<number | null>(null);

  useEffect(() => {
    const showCode = () => {
      if (data) {
        setCode(generateScannableCode(data));
      }
    };

    const interval = setInterval(showCode, 1000);

    showCode();

    return () => clearInterval(interval);
  }, [data]);

  return (
    <Card innerStyle={styles.codeContainer}>
      <Text style={styles.codeLabel}>Your Friend Code</Text>
      <View style={styles.innerCodeContainer}>
        {code !== null ? (
          <QRCode value={code.toString()} size={QR_SIZE} />
        ) : (
          <ActivityIndicator />
        )}
      </View>
      <View>
        {!!name && (
          <Text style={styles.hint}>
            Have <Text style={styles.bold}>{name}</Text> scan this code to add
            you as a friend!
          </Text>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#fffbeb",
    padding: 24,
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
    width: QR_SIZE + 70,
    height: QR_SIZE + 70,
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "inset 0px 2px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: 20,
  },
  hint: {
    color: "#4b5563",
    fontSize: 16,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
});
