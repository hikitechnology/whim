import { LocalLocationUpdate } from "@/types/Location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import equal from "fast-deep-equal";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ConnectionState = {
  connections: {
    uid: string;
    startTime: number;
    endTime?: number;
    distance: number;
    locationName: string;
    name: string;
    pfpId?: string;
    interests?: string[];
  }[];
  updateConnections: (locationUpdates: LocalLocationUpdate[]) => void;
  endAllConnectionsNow: () => void;
  resetConnections: () => void;
};

export const useConnectionState = create(
  persist<ConnectionState>(
    (set, get) => ({
      connections: [],
      updateConnections: (locationUpdates) => {
        let connections = [...get().connections];

        locationUpdates.forEach((update) => {
          const existingConnectionIndex = connections.findIndex(
            (conn) => conn.uid === update.uid,
          );
          const existingConnection = connections[existingConnectionIndex];

          const updatedConnection = {
            uid: update.uid,
            startTime:
              !existingConnection || existingConnection.endTime !== undefined
                ? Date.now()
                : existingConnection.startTime,
            locationName: update.locationName,
            distance: update.distance,
            name: update.name,
            pfpId: update.pfpId,
            interests: update.interests,
          };

          if (!existingConnection) {
            connections.push(updatedConnection);
          } else if (!equal(existingConnection, updatedConnection)) {
            connections[existingConnectionIndex] = updatedConnection;
          }
        });

        connections = connections.map((conn) => ({
          ...conn,
          endTime:
            !locationUpdates.some((update) => update.uid === conn.uid) &&
            !conn.endTime
              ? Date.now()
              : conn.endTime,
        }));

        if (!equal(get().connections, connections)) {
          set((state) => ({
            ...state,
            connections,
          }));
        }
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
      name: "connections-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
