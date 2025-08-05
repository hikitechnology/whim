import Button from "@/components/Button";
import MyCode from "@/components/Friend/MyCode";
import Scan from "@/components/Friend/Scan";
import Slides from "@/components/Slides";
import { useCameraPermissions } from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function FriendPage() {
  const [permission, requestPermission] = useCameraPermissions();
  const setSlideFnRef = useRef<((id: string | number) => void) | null>(null);
  const { name } = useLocalSearchParams<{ name?: string }>();
  const [showingCode, setShowingCode] = useState(true);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  return (
    <View style={styles.background}>
      <Slides
        slides={(setSlide) => {
          setSlideFnRef.current = setSlide;

          return {
            code: <MyCode name={name} />,
            scan: <Scan name={name} />,
          };
        }}
        initialSlide="code"
      />
      {/* <MyCode name={name} /> */}
      <View style={styles.buttonContainer}>
        <Button
          color="blue"
          variant="primary"
          icon="scan-outline"
          onPress={() => {
            if (setSlideFnRef.current) {
              setSlideFnRef.current(showingCode ? "scan" : "code");
              setShowingCode((prev) => !prev);
            }
          }}
        >
          {showingCode ? "Scan their code instead" : "Show your code instead"}
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
