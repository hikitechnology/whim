import BigIcon from "@/components/BigIcon";
import Button from "@/components/Button";
import Callout from "@/components/Callout";
import Header from "@/components/Onboarding/Header";
import Slides from "@/components/Slides";
import TextInput from "@/components/TextInput";
import { useAuthStore } from "@/utils/authStore";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Onboarding() {
  const { isLoggedIn, completeOnboarding, logIn } = useAuthStore();
  const [progress, setProgress] = useState<number>(1);

  function completeOnboardingAndLogin() {
    logIn();
    completeOnboarding();
  }

  const onboardingSlides = (setSlide: (key: string) => void) => ({
    phone: (
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
          onPress={() => setSlide("fgLocation")}
        >
          Verify & Continue
        </Button>
        <Button variant="textOnly" style={{ width: "100%" }}>
          Didn&apos;t receive a code? Resend
        </Button>
      </Slides.Slide>
    ),
    fgLocation: (
      <Slides.Slide>
        <BigIcon icon="location-outline" variant="orange" />
        <Slides.Title>Let&apos;s find your people!</Slides.Title>
        <Slides.Text>
          We need your location to show you who you&apos;ve crossed paths with
          throughout your day.
        </Slides.Text>
        <Callout>
          <Callout.Header icon="heart-outline">
            Your privacy matters
          </Callout.Header>
          <Callout.Body>
            Your exact location is never shared. We only use it to detect when
            you&apos;re near other users.
          </Callout.Body>
        </Callout>
        <Button
          icon="location-outline"
          variant="orange"
          style={{ width: "100%" }}
          onPress={() => setSlide("bgLocation")}
        >
          Enable Location Access
        </Button>
        <Slides.Hint>You can change this in Settings anytime</Slides.Hint>
      </Slides.Slide>
    ),
    bgLocation: (
      <Slides.Slide>
        <BigIcon icon="navigate-outline" variant="purple" />
        <Slides.Title>Make the magic happen!</Slides.Title>
        <Slides.Text>
          For the best experience, we&apos;d love to detect connections even
          when you&apos;re not actively using the app.
        </Slides.Text>
        <Callout variant="purple">
          <Callout.Header icon="sparkles-outline">
            Why this helps
          </Callout.Header>
          <Callout.Body>
            You&apos;ll never miss a connection! We can detect when you&apos;re
            at the same coffee shop, library, or event as someone interesting.
          </Callout.Body>
        </Callout>
        <Button
          icon="navigate-outline"
          variant="purple"
          style={{ width: "100%" }}
          onPress={() => setSlide("bgReminder")}
        >
          Enable Background Location
        </Button>
        <Button
          variant="textOnly"
          style={{ width: "100%" }}
          onPress={() => setSlide("bgConfirm")}
        >
          Skip for now
        </Button>
      </Slides.Slide>
    ),
    bgConfirm: (
      <Slides.Slide>
        <BigIcon icon="warning-outline" variant="orange" />
        <Slides.Title>Are you sure?</Slides.Title>
        <Slides.Text>
          Without background location, you might miss connections with amazing
          people you encounter throughout your day.
        </Slides.Text>
        <Callout variant="red">
          <Callout.Header icon="settings-outline">
            You can always enable it later:
          </Callout.Header>
          <Callout.Body>
            Settings → Privacy & Security → Location Services
          </Callout.Body>
        </Callout>
        <Button
          icon="heart-outline"
          variant="purple"
          style={{ width: "100%" }}
          onPress={() => setSlide("bgReminder")}
        >
          Actually, let&apos;s enable it!
        </Button>
        <Button
          variant="textOnly"
          style={{ width: "100%" }}
          onPress={completeOnboardingAndLogin}
        >
          Continue without it
        </Button>
      </Slides.Slide>
    ),
    bgReminder: (
      <Slides.Slide>
        <BigIcon icon="phone-portrait-outline" variant="green" />
        <Slides.Title>One last thing!</Slides.Title>
        <Slides.Text>
          Keep the app running in the background to discover connections
          throughout your day.
        </Slides.Text>
        <Callout variant="green">
          <Callout.Header icon="sunny-outline">What this means</Callout.Header>
          <Callout.Body>
            When you&apos;re done using Whim, simply return to the home screen
            instead of force-closing it!
          </Callout.Body>
        </Callout>
        <Button
          icon="sparkles-outline"
          variant="green"
          style={{ width: "100%" }}
          onPress={completeOnboardingAndLogin}
        >
          Got it! Let&apos;s start connecting
        </Button>
      </Slides.Slide>
    ),
  });

  const progressUpdatingPages: (string | number)[] = isLoggedIn
    ? ["fgLocation", "bgLocation", "bgReminder"]
    : ["phone", "verify", "fgLocation", "bgLocation", "bgReminder"];

  function setProgressWithSlide(slideName: string | number) {
    if (progressUpdatingPages.includes(slideName)) {
      setProgress(progressUpdatingPages.indexOf(slideName) + 1);
    }
  }

  return (
    <View style={styles.container}>
      <Header currentPage={progress} pageCount={progressUpdatingPages.length} />
      <View style={styles.slidesArea}>
        <View style={styles.slides}>
          <Slides
            slides={onboardingSlides}
            initialSlide={isLoggedIn ? "fgLocation" : "phone"}
            onSlideChange={setProgressWithSlide}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fffbeb",
    flex: 1,
  },
  slidesArea: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  slides: {
    paddingBottom: 136,
  },
});
