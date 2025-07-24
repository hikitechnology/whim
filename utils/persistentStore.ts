import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PersistentState = {
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
};

export const usePersistentStore = create(
  persist<PersistentState>(
    (set) => ({
      hasCompletedOnboarding: false,
      completeOnboarding: () => {
        set((state) => ({
          ...state,
          hasCompletedOnboarding: true,
        }));
      },
      resetOnboarding: () => {
        set((state) => ({
          ...state,
          hasCompletedOnboarding: false,
        }));
      },
    }),
    {
      name: "persistent-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
