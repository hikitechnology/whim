import Header from "@/components/Onboarding/Header";
import Slides from "@/components/Slides";
import { useAuthStore } from "@/utils/authStore";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Phone from "./Slides/Phone";
import Verify from "./Slides/Verify";
import ForegroundLocation from "./Slides/ForegroundLocation";
import BackgroundLocation from "./Slides/BackgroundLocation";
import BackgroundConfirm from "./Slides/BackgroundConfirm";
import BackgroundReminder from "./Slides/BackgroundReminder";
import useAuth from "@/hooks/useAuth";

type Props = {
  showLogin?: boolean;
  showPermissions?: boolean;
  showProgressBar?: boolean;
};

export default function OnboardingFlow({
  showLogin = true,
  showPermissions = true,
  showProgressBar = true,
}: Props) {
  const { completeOnboarding, logIn } = useAuthStore();
  const { sendVerificationCode, confirmCode } = useAuth();
  const [progress, setProgress] = useState<number>(1);
  const [phoneNumber, setPhoneNumber] = useState("");

  function completeOnboardingAndLogin() {
    logIn();
    completeOnboarding();
  }

  const onboardingSlides = (setSlide: (key: string) => void) => ({
    phone: (
      <Phone
        onNext={() => setSlide("verify")}
        sendVerificationCode={(phoneNumber) => {
          setPhoneNumber(phoneNumber);
          return sendVerificationCode(phoneNumber);
        }}
      />
    ),
    verify: (
      <Verify
        numberToShow={phoneNumber}
        onNext={() => {
          if (showPermissions) {
            setSlide("fgLocation");
          } else {
            logIn();
          }
        }}
        confirmCode={confirmCode}
      />
    ),
    fgLocation: <ForegroundLocation onNext={() => setSlide("bgLocation")} />,
    bgLocation: (
      <BackgroundLocation
        onNext={() => setSlide("bgReminder")}
        onSkip={() => setSlide("bgConfirm")}
      />
    ),
    bgConfirm: (
      <BackgroundConfirm
        onNext={() => setSlide("bgReminder")}
        onSkip={completeOnboardingAndLogin}
      />
    ),
    bgReminder: <BackgroundReminder onNext={completeOnboardingAndLogin} />,
  });

  const progressUpdatingPages: (string | number)[] = [
    ...(showLogin ? ["phone", "verify"] : []),
    ...(showPermissions ? ["fgLocation", "bgLocation", "bgReminder"] : []),
  ];

  function setProgressWithSlide(slideName: string | number) {
    if (progressUpdatingPages.includes(slideName)) {
      setProgress(progressUpdatingPages.indexOf(slideName) + 1);
    }
  }

  return (
    <View style={styles.container}>
      {showProgressBar ? (
        <Header
          currentPage={progress}
          pageCount={progressUpdatingPages.length}
        />
      ) : null}
      <View style={styles.slidesArea}>
        <View style={styles.slides}>
          <Slides
            slides={onboardingSlides}
            initialSlide={showLogin ? "phone" : "fgLocation"}
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
    paddingBottom: 50,
  },
});
