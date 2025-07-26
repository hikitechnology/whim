import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationUpdate } from "@/types/Location";

type PersistentState = {
  hasCompletedOnboarding: boolean;
  connections: {
    [uid: string]: {
      startTime: number;
      endTime?: number;
      distance: number;
      location: {
        x: number;
        y: number;
      };
    };
  };
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
      updateConnections: (locationUpdates) => {
        console.log("location updates", locationUpdates);

        set((state) => {
          const newConnections = locationUpdates.filter(
            (update) =>
              state.connections[update.uid] === undefined ||
              state.connections[update.uid].endTime !== undefined,
          );
          const noLongerNear = Object.keys(state.connections).filter(
            (uid) =>
              state.connections[uid].endTime === undefined &&
              !locationUpdates.some((conn) => conn.uid === uid),
          );

          const updatedConnections = { ...state.connections };

          for (const connection of newConnections) {
            updatedConnections[connection.uid] = {
              startTime: Date.now(),
              distance: connection.distance,
              location: connection.coordinates,
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
      endAllConnectionsNow: () => {
        set((state) => {
          const activeConnections = Object.keys(state.connections).filter(
            (uid) => !state.connections[uid].endTime,
          );
          const updatedConnections = { ...state.connections };
          activeConnections.forEach(
            (uid) => (updatedConnections[uid].endTime = Date.now()),
          );
          return {
            ...state,
            connections: updatedConnections,
          };
        });
      },
      resetConnections: () => {
        set((state) => ({
          ...state,
          connections: {},
        }));
      },
    }),
    {
      name: "persistent-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
