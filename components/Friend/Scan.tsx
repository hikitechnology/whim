import { StyleSheet, Text, View } from "react-native";
import Slides from "../Slides";
import { CameraView } from "expo-camera";
import { decodeScannedCode } from "@/utils/friendCodes";

const CAMERA_SIZE = 225;

type Props = {
  name?: string;
};

export default function Scan({ name }: Props) {
  return (
    <Slides.Slide>
      <Text style={styles.codeLabel}>Scan Friend Code</Text>
      <View style={styles.innerCodeContainer}>
        <CameraView
          style={{ width: CAMERA_SIZE, height: CAMERA_SIZE }}
          zoom={0.25}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={(result) => {
            console.log("qr code scan result:", result.data);
            console.log("decode result", decodeScannedCode(result.data));
          }}
        />
      </View>
      {!!name && (
        <Text style={styles.hint}>
          Scan <Text style={styles.bold}>{name}</Text>&apos;s code to add them
          as a friend!{" "}
        </Text>
      )}
    </Slides.Slide>
  );
}

const styles = StyleSheet.create({
  codeLabel: {
    fontSize: 20,
    fontWeight: "bold",
  },
  innerCodeContainer: {
    width: CAMERA_SIZE + 70,
    height: CAMERA_SIZE + 70,
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
