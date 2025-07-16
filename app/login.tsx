import BigIcon from "@/components/BigIcon";
import Button from "@/components/Button";
import Slides from "@/components/Slides";
import TextInput from "@/components/TextInput";
import { useAuthStore } from "@/utils/authStore";
import { StyleSheet, View } from "react-native";

export default function Login() {
  const { logIn } = useAuthStore();

  const loginSlides = (setSlide: (key: string) => void) => ({
    phone: (
      <Slides.Slide>
        <BigIcon icon="call-outline" variant="blue" />
        <Slides.Title>Let&apos;s get you connected!</Slides.Title>
        <Slides.Text>
          Enter your phone number to sign in or create an account.
        </Slides.Text>
        {/* TODO: pretty phone number formatting */}
        <TextInput
          label="Phone Number"
          borderColor="#bfdbfe"
          borderColorFocused="#60a5fa"
          placeholder="(555) 123-4567"
          keyboardType="numeric"
        />
        <Button
          icon="arrow-forward-outline"
          variant="blue"
          style={{ width: "100%" }}
          onPress={() => setSlide("verify")}
        >
          Continue
        </Button>
        <Slides.Hint>
          We&apos;ll send you a verification code to confirm your number
        </Slides.Hint>
      </Slides.Slide>
    ),
    verify: (
      <Slides.Slide>
        <BigIcon icon="chatbox-outline" variant="green" />
        <Slides.Title>Check your messages!</Slides.Title>
        <Slides.Text>We sent a 6-digit code to (XXX) XXX-XXXX</Slides.Text>
        <TextInput
          label="Verification Code"
          borderColor="#bbf7d0"
          borderColorFocused="#4ade80"
          placeholder="123456"
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
        />
        <Button
          icon="arrow-forward-outline"
          variant="green"
          style={{ width: "100%" }}
          onPress={logIn}
        >
          Verify & Continue
        </Button>
        <Button variant="textOnly" style={{ width: "100%" }}>
          Didn&apos;t receive a code? Resend
        </Button>
      </Slides.Slide>
    ),
  });

  return (
    <View style={styles.container}>
      <View style={styles.slides}>
        <Slides slides={loginSlides} initialSlide="phone" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fffbeb",
  },
  slides: {
    paddingBottom: 40,
  },
});
