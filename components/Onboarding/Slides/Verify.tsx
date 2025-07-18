import BigIcon from "@/components/BigIcon";
import Button from "@/components/Button";
import Slides from "@/components/Slides";
import TextInput from "@/components/TextInput";
import { AuthResult } from "@/hooks/useAuth";
import { useState } from "react";
import { Text } from "react-native";

type Props = {
  numberToShow: string;
  onNext: () => void;
  confirmCode: (code: string) => Promise<AuthResult>;
};

export default function Verify({ numberToShow, onNext, confirmCode }: Props) {
  const [code, setCode] = useState("");
  const [codeEntryFailed, setCodeEntryFailed] = useState(false);

  const numberFormatted = `(${numberToShow.substring(0, 3)}) ${numberToShow.substring(3, 6)}-${numberToShow.substring(6)}`;

  async function attemptSubmitCode() {
    const result = await confirmCode(code);
    if (result.status === "success") {
      console.log("Code entry succeeded, signing in...");
      onNext();
    } else {
      console.log("Code entry failed", result.message);
      setCodeEntryFailed(true);
    }
  }

  return (
    <Slides.Slide>
      <BigIcon icon="chatbox-outline" variant="green" />
      <Slides.Title>Check your messages!</Slides.Title>
      <Slides.Text>We sent a 6-digit code to {numberFormatted}</Slides.Text>
      <TextInput
        label="Verification Code"
        borderColor="#bbf7d0"
        borderColorFocused="#4ade80"
        placeholder="123456"
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        onChangeText={setCode}
      />
      {codeEntryFailed ? (
        <Text style={{ color: "red", width: "100%" }}>
          Incorrect verification code, please try again
        </Text>
      ) : null}
      <Button
        icon="arrow-forward-outline"
        variant="green"
        style={{ width: "100%" }}
        onPress={attemptSubmitCode}
      >
        Verify & Continue
      </Button>
      <Button variant="textOnly" style={{ width: "100%" }}>
        Didn&apos;t receive a code? Resend
      </Button>
    </Slides.Slide>
  );
}
