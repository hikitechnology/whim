import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type PersistentState = {
  hasCompletedOnboarding: boolean;
  connections: {
    [uid: string]: {
      name: string;
      startTime: number;
      endTime?: number;
    };
  };
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  updateConnections: (nearbyUsers: { name: string; uid: string }[]) => void;
};

export const usePersistentStore = create(
  persist<PersistentState>(
    (set) => ({
      hasCompletedOnboarding: false,
      connections: {},
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
      updateConnections: (nearbyUsers) => {
        set((state) => {
          const newConnections = nearbyUsers.filter(
            (user) => state.connections[user.uid] === undefined,
          );
          const noLongerNear = Object.keys(state.connections).filter(
            (uid) =>
              state.connections[uid].endTime === undefined &&
              !nearbyUsers.some((conn) => conn.uid === uid),
          );

          const updatedConnections = { ...state.connections };

          for (const connection of newConnections) {
            updatedConnections[connection.uid] = {
              name: connection.name,
              startTime: Date.now(),
            };
          }

          for (const key in updatedConnections) {
            if (noLongerNear.includes(key)) {
              updatedConnections[key].endTime = Date.now();
            }
          }

          return {
            ...state,
            connections: updatedConnections,
          };
        });
      },
    }),
    {
      name: "persistent-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
