import { LOCATION_CACHE_RADIUS_METERS } from "@/constants";
import { calculateDistance } from "@/utils/location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type ReverseGeocoderState = {
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
  resetLocationCache: () => void;
};

// prevent overlapping location requests if fired in quick succession
let existingLocationPromise: Promise<
  Location.LocationGeocodedAddress[]
> | null = null;

export const useReverseGeocoder = create(
  persist<ReverseGeocoderState>(
    (set, get) => ({
      locations: [],
      getLocationName: async (coordinates) => {
        if (existingLocationPromise) await existingLocationPromise;

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
      name: "reverse-geocoder-cache",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
