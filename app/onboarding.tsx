import OnboardingFlow from "@/components/Onboarding/OnboardingFlow";
import { useAuthStore } from "@/utils/authStore";

export default function Onboarding() {
  const { isLoggedIn } = useAuthStore();
  return <OnboardingFlow showLogin={!isLoggedIn} />;
}
