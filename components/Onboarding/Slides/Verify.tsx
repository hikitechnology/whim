import BigIcon from "@/components/BigIcon";
import Button from "@/components/Button";
import Slides from "@/components/Slides";
import TextInput from "@/components/TextInput";
import useAuthContext from "@/hooks/useAuthContext";
import { useState } from "react";
import { Text } from "react-native";

type Props = {
  numberToShow: string;
  onNext: () => void;
};

export default function Verify({ numberToShow, onNext }: Props) {
  const { confirmCode } = useAuthContext();

  const [code, setCode] = useState("");
  const [codeEntryFailed, setCodeEntryFailed] = useState(false);
  const [continueDisabled, setContinueDisabled] = useState(false);

  const numberFormatted = `(${numberToShow.substring(0, 3)}) ${numberToShow.substring(3, 6)}-${numberToShow.substring(6)}`;

  async function attemptSubmitCode() {
    setContinueDisabled(true);
    const result = await confirmCode(code);
    if (result.status === "success") {
      console.log("Code entry succeeded, signing in...");
      onNext();
    } else {
      console.log("Code entry failed", result.message);
      setCodeEntryFailed(true);
      setContinueDisabled(false);
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
        disabled={continueDisabled}
      >
        Verify & Continue
      </Button>
      <Button variant="textOnly" style={{ width: "100%" }}>
        Didn&apos;t receive a code? Resend
      </Button>
    </Slides.Slide>
  );
}
