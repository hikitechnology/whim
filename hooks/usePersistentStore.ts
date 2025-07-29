import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocalLocationUpdate } from "@/types/Location";
import * as Location from "expo-location";
import { calculateDistance } from "@/utils/location";
import { LOCATION_CACHE_RADIUS_METERS } from "@/constants";
import equal from "fast-deep-equal";

let existingLocationPromise: Promise<
  Location.LocationGeocodedAddress[]
> | null = null;

type PersistentState = {
  hasCompletedOnboarding: boolean;
  connections: {
    uid: string;
    startTime: number;
    endTime?: number;
    distance: number;
    locationName: string;
    name: string;
    interests?: string[];
  }[];
  locations: {
    name: string;
    coordinates: {
      lat: number;
      long: number;
    };
  }[];
  getLocationName: (coordinates: {
    latitude: number;
    longitude: number;
  }) => Promise<string>;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  updateConnections: (locationUpdates: LocalLocationUpdate[]) => void;
  endAllConnectionsNow: () => void;
  resetConnections: () => void;
  resetLocationCache: () => void;
};

export const usePersistentStore = create(
  persist<PersistentState>(
    (set, get) => ({
      hasCompletedOnboarding: false,
      connections: [],
      locations: [],
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
      getLocationName: async (coordinates) => {
        if (existingLocationPromise) {
          await existingLocationPromise;
        }

        const existingLocation = get().locations.find(
          (loc) =>
            calculateDistance(
              loc.coordinates.lat,
              loc.coordinates.long,
              coordinates.latitude,
              coordinates.longitude,
            ) <= LOCATION_CACHE_RADIUS_METERS,
        );

        if (existingLocation) {
          return existingLocation.name;
        } else {
          existingLocationPromise = Location.reverseGeocodeAsync({
            longitude: coordinates.longitude,
            latitude: coordinates.latitude,
          });

          const results = await existingLocationPromise;
          console.log("Performed geocode. results:", results);
          const [result] = results;
          const displayName =
            result.name ??
            // (result.streetNumber && result.street
            //   ? `${result.streetNumber} ${result.street}`
            //   : null) ??
            result.city ??
            result.region ??
            result.country ??
            "Unknown Location";

          set((state) => ({
            ...state,
            locations: [
              ...state.locations,
              {
                name: displayName,
                coordinates: {
                  lat: coordinates.latitude,
                  long: coordinates.longitude,
                },
              },
            ],
          }));

          existingLocationPromise = null;

          return displayName;
        }
      },
      resetLocationCache: () => {
        set((state) => ({
          ...state,
          locations: [],
        }));
      },
    }),
    {
      name: "persistent-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
