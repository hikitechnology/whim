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
import { UserProfile } from "@/types/UserProfile";

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
      const nearbyUsers: UserProfile[] = await syncLocation({
        x: locations[0].coords.latitude,
        y: locations[0].coords.longitude,
      });
      console.log(nearbyUsers);

      const connectionsForState = nearbyUsers.map((user) => ({
        uid: user.uid,
        name: user.name,
      }));

      usePersistentStore.getState().updateConnections(connectionsForState);
    }
  },
);

export default function LocationPage() {
  const [status, setStatus] = useState<string>(
    "Location permission has not been granted",
  );

  const { connections } = usePersistentStore();

  async function requestPermission() {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status === "granted") {
      setStatus("Location permission granted");
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
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{status}</Text>
      <Button title="Enable location tracking" onPress={enableTracking} />
      <Button title="Disable location tracking" onPress={disableTracking} />
      <Text style={styles.text}>
        Nearby users: {JSON.stringify(connections)}
      </Text>
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
});
