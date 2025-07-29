import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type OnboardingState = {
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
};

export const useOnboardingState = create(
  persist<OnboardingState>(
    (set) => ({
      hasCompletedOnboarding: false,
      completeOnboarding: () =>
        set((state) => ({
          ...state,
          hasCompletedOnboarding: true,
        })),
      resetOnboarding: () =>
        set((state) => ({
          ...state,
          hasCompletedOnboarding: false,
        })),
    }),
    {
      name: "onboarding-state",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
