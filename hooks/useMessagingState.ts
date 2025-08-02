import { LocalMessage } from "@/types/Messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type MessagingState = {
  messages: LocalMessage[];
  setMessages: (
    messages:
      | LocalMessage[]
      | ((prevMessages: LocalMessage[]) => LocalMessage[]),
  ) => void;
};

export const useMessagingState = create(
  persist<MessagingState>(
    (set) => ({
      messages: [],
      setMessages: (messages) => {
        if (messages instanceof Function) {
          set((state) => ({
            ...state,
            messages: messages(state.messages),
          }));
        } else {
          set((state) => ({
            ...state,
            messages,
          }));
        }
      },
    }),
    {
      name: "messaging-state",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
