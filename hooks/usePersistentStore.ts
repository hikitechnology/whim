import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationUpdate } from "@/types/Location";

type PersistentState = {
  hasCompletedOnboarding: boolean;
  connections: {
    uid: string;
    startTime: number;
    endTime?: number;
    distance: number;
    location: {
      x: number;
      y: number;
    };
    name: string;
    interests?: string[];
  }[];

  completeOnboarding: () => void;
  resetOnboarding: () => void;
  updateConnections: (locationUpdates: LocationUpdate[]) => void;
  endAllConnectionsNow: () => void;
  resetConnections: () => void;
};

export const usePersistentStore = create(
  persist<PersistentState>(
    (set) => ({
      hasCompletedOnboarding: false,
      connections: [],
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
      updateConnections: (locationUpdates) => {
        set((state) => {
          let updatedConnections = [...state.connections];

          locationUpdates.forEach((update) => {
            const existingIndex = updatedConnections.findIndex(
              (conn) => conn.uid === update.uid,
            );
            const updatedConnection = {
              uid: update.uid,
              startTime: Date.now(),
              location: update.coordinates,
              distance: update.distance,
              name: update.name,
              interests: update.interests,
            };

            if (existingIndex === -1) {
              updatedConnections.push(updatedConnection);
            } else {
              updatedConnections[existingIndex] = updatedConnection;
            }
          });

          updatedConnections = updatedConnections.map((conn) => ({
            ...conn,
            endTime:
              !locationUpdates.some((update) => update.uid === conn.uid) &&
              !conn.endTime
                ? Date.now()
                : conn.endTime,
          }));

          return {
            ...state,
            connections: updatedConnections,
          };
        });
      },
      endAllConnectionsNow: () => {
        set((state) => ({
          ...state,
          connections: [...state.connections].map((conn) => ({
            ...conn,
            endTime: conn.endTime ?? Date.now(),
          })),
        }));
      },
      resetConnections: () => {
        set((state) => ({
          ...state,
          connections: [],
        }));
      },
    }),
    {
      name: "persistent-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
