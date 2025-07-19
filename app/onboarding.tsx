import OnboardingFlow from "@/components/Onboarding/OnboardingFlow";
import useAuthContext from "@/hooks/useAuthContext";
import { useRef } from "react";

export default function Onboarding() {
  const { user } = useAuthContext();
  const initialUserRef = useRef(user);

  return <OnboardingFlow showLogin={!initialUserRef.current} />;
}
