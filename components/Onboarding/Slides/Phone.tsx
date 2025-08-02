import BigIcon from "@/components/BigIcon";
import Button from "@/components/Button";
import Slides from "@/components/Slides";
import TextInput from "@/components/TextInput";
import useAuthContext from "@/hooks/useAuthContext";
import { useState } from "react";
import { Text } from "react-native";

type Props = {
  onNext: () => void;
  setDisplayNumber: (number: string) => void;
};

export default function Phone({ onNext, setDisplayNumber }: Props) {
  const { sendVerificationCode } = useAuthContext();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneEntryFailed, setPhoneEntryFailed] = useState(false);
  const [continueDisabled, setContinueDisabled] = useState(false);

  async function attemptSignIn() {
    setContinueDisabled(true);
    const result = await sendVerificationCode(phoneNumber);
    if (result.status === "success") {
      console.log("Phone entry succeeded");
      setDisplayNumber(phoneNumber);
      onNext();
    } else {
      console.log("Phone entry failed", result.message);
      setPhoneEntryFailed(true);
      setContinueDisabled(false);
    }
  }

  return (
    <Slides.Slide>
      <BigIcon icon="call-outline" variant="blue" />
      <Slides.Title>Let&apos;s get you connected!</Slides.Title>
      <Slides.Text>
        We&apos;ll use your phone number to help you find and connect with
        people you meet in real life.
      </Slides.Text>
      {/* TODO: pretty phone number formatting */}
      <TextInput
        label="Phone Number"
        borderColor="#bfdbfe"
        borderColorFocused="#60a5fa"
        placeholder="(555) 123-4567"
        keyboardType="phone-pad"
        onChangeText={setPhoneNumber}
      />
      {phoneEntryFailed ? (
        <Text style={{ color: "red", width: "100%" }}>
          Please enter a valid phone number.
        </Text>
      ) : null}
      <Button
        icon="arrow-forward-outline"
        color="blue"
        variant="primary"
        style={{ width: "100%" }}
        onPress={attemptSignIn}
        disabled={continueDisabled}
      >
        Continue
      </Button>
      <Slides.Hint>
        We&apos;ll send you a verification code to confirm your number
      </Slides.Hint>
    </Slides.Slide>
  );
}
