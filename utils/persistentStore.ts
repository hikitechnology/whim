import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getItem, setItem, deleteItemAsync } from "expo-secure-store";

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
      storage: createJSONStorage(() => ({
        setItem,
        getItem,
        removeItem: deleteItemAsync,
      })),
    },
  ),
);
