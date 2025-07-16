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

const WEBHOOK_URL =
  "https://discord.com/api/webhooks/1394712696649154681/67Uwuuvvoh0P22bCy_b7a9sKlvyQPkTCxDsIER3icyQIVpYx2sh2xtEzPSF2jRGwGE_t";
const LOCATION_TASK_NAME = "background-location-task";

async function sendWebhookMessage(message: string) {
  const formData = new FormData();
  formData.append("content", message);

  await fetch(WEBHOOK_URL, {
    method: "POST",
    body: formData,
  });
}

type LocationTaskData = {
  locations: Location.LocationObject[];
};

TaskManager.defineTask<LocationTaskData>(
  LOCATION_TASK_NAME,
  async ({ data, error }) => {
    if (error) {
      sendWebhookMessage(`Error occured: ${error.message}`);
    }
    if (data) {
      const { locations } = data;
      sendWebhookMessage(`Location received: ${JSON.stringify(locations)}`);
    }
  },
);

export default function LocationPage() {
  const [status, setStatus] = useState<string>(
    "Location permission has not been granted",
  );

  async function requestPermission() {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status === "granted") {
      setStatus("Location permission granted");
    }
  }

  async function enableTracking() {
    await sendWebhookMessage("Background location tracking enabled from app");
    await requestPermission();
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Highest,
    });
  }

  async function disableTracking() {
    await sendWebhookMessage("Background location tracking disabled from app");
    await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{status}</Text>
      <Button title="Enable location tracking" onPress={enableTracking} />
      <Button title="Disable location tracking" onPress={disableTracking} />
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
