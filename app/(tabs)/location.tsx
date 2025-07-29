/*
 * still working on making this good
 * interesting things to look at:
 * - https://docs.expo.dev/versions/latest/sdk/location/#locationoptions
 *   - distance interval: only update when user moves a certain distance from their previous location
 * - https://docs.expo.dev/versions/latest/sdk/location/#locationtaskoptions
 *   - deferredUpdatesDistance & deferredUpdatesInterval: batch location updates and only report when distance/interval reached
 */

import * as Location from "expo-location";
import { Button, StyleSheet, Text, View } from "react-native";
import * as TaskManager from "expo-task-manager";
import { useState } from "react";
import { usePersistentStore } from "@/hooks/usePersistentStore";
import { syncLocation } from "@/utils/api";
import { LocalLocationUpdate } from "@/types/Location";

const LOCATION_TASK_NAME = "background-location-task";

type LocationTaskData = {
  locations: Location.LocationObject[];
};

TaskManager.defineTask<LocationTaskData>(
  LOCATION_TASK_NAME,
  async ({ data, error }) => {
    if (error) {
      console.error(`location error occured: ${error}`);
    }
    if (data) {
      const { locations } = data;
      const syncResults = await syncLocation({
        x: locations[0].coords.longitude,
        y: locations[0].coords.latitude,
      });

      const nearbyUsers: LocalLocationUpdate[] = [];

      for (const result of syncResults) {
        nearbyUsers.push({
          ...result,
          locationName: await usePersistentStore.getState().getLocationName({
            latitude: result.coordinates.y,
            longitude: result.coordinates.x,
          }),
        });
      }

      usePersistentStore.getState().updateConnections(nearbyUsers);
    }
  },
);

export default function LocationPage() {
  const [status, setStatus] = useState<string>("Location tracking disabled");

  const {
    connections,
    resetConnections,
    endAllConnectionsNow,
    resetLocationCache,
  } = usePersistentStore();

  async function requestPermission() {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status === "granted") {
      setStatus("Location tracking enabled");
    } else {
      setStatus("Location permission request failed");
    }
  }

  async function enableTracking() {
    await requestPermission();
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
    });
  }

  async function disableTracking() {
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
    endAllConnectionsNow();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{status}</Text>
      <Button title="Enable location tracking" onPress={enableTracking} />
      <Button title="Disable location tracking" onPress={disableTracking} />
      <Button title="Reset connections" onPress={resetConnections} />
      <Button title="Reset location cache" onPress={resetLocationCache} />
      <View style={styles.nearbyList}>
        {connections.map((connection) => (
          <View
            style={[
              styles.connection,
              !connection.endTime && styles.connActive,
            ]}
            key={connection.uid}
          >
            <Text>UID: {connection.uid}</Text>
            <Text>Name: {connection.name}</Text>
            <Text>Interests: {JSON.stringify(connection.interests)}</Text>
            <Text>Geocoded location: {connection.locationName}</Text>
            <Text>Distance: {connection.distance} meters</Text>
            <Text>
              Encounter started:{" "}
              {new Date(connection.startTime).toLocaleTimeString()}
            </Text>
            {connection.endTime ? (
              <Text>
                Encounter ended:{" "}
                {new Date(connection.endTime).toLocaleTimeString()}
              </Text>
            ) : (
              <Text>Currently active</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
  },
  nearbyList: {
    padding: 8,
  },
  connection: {
    borderWidth: 1,
    padding: 4,
  },
  connActive: {
    backgroundColor: "#c2fcc0",
  },
});
