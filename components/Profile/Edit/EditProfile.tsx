import {
  ActionSheetIOS,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../../Card";
import CardHeader from "../../CardHeader";
import PageBackground from "../../PageBackground";
import TextInput from "../../TextInput";
import Button from "../../Button";
import { FormUserProfile, UserProfile } from "@/types/UserProfile";
import SwitchRow from "../../SwitchRow";
import { Controller, useForm } from "react-hook-form";
import Interests from "./Sections/Interests";
import {
  formProfileToNormalProfile,
  normalProfileToFormProfile,
} from "@/utils/form";
import Traits from "./Sections/Traits";
import Favorites from "./Sections/Favorites";
import LookingFor from "./Sections/LookingFor";
import ConversationStarters from "./Sections/ConversationStarters";
import { updateUserProfile, uploadImages } from "@/utils/api";
import { useRouter } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import ApiImage from "@/components/ApiImage";

const sectionMapping: { label: string; key: keyof UserProfile }[] = [
  { label: "Interests", key: "showInterests" },
  { label: "Personality", key: "showTraits" },
  { label: "Favorites", key: "showFavorites" },
  { label: "Looking For", key: "showLookingFor" },
  { label: "Conversation Starters", key: "showConversationStarters" },
];

type Props = {
  profile: UserProfile;
};

function EditProfile({ profile }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (data: FormUserProfile) => {
      const dataToSubmit = formProfileToNormalProfile(data);
      return updateUserProfile(dataToSubmit);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", profile.uid],
      });
      router.back();
    },
    onError: (error) => {
      console.error("Error updating profile", error);
    },
  });

  const [imageChangeInProgress, setImageChangeInProgress] = useState(false);

  const profileForForm = normalProfileToFormProfile(profile);

  const { control, watch, handleSubmit } = useForm<FormUserProfile>({
    defaultValues: {
      ...profileForForm,
      ...(!profileForForm.interests || profileForForm.interests.length === 0
        ? { interests: [{ value: "" }] }
        : {}),
      ...(!profileForForm.traits || profileForForm.traits.length === 0
        ? { traits: [{ trait: "", description: "" }] }
        : {}),
      ...(!profileForForm.favorites || profileForForm.favorites.length === 0
        ? { favorites: [{ category: "", item: "" }] }
        : {}),
      ...(!profileForForm.conversationStarters ||
      profileForForm.conversationStarters.length === 0
        ? { conversationStarters: [{ value: "" }] }
        : {}),
    },
  });

  function pickImage(onChange: (imageId: string) => void) {
    return async () => {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Photo Library", "Take Photo"],
          cancelButtonIndex: 0,
        },
        async (buttonIndex) => {
          if (buttonIndex === 0) return;

          if (buttonIndex === 2) {
            await ImagePicker.requestCameraPermissionsAsync();
          }

          const imageSelector =
            buttonIndex === 1
              ? ImagePicker.launchImageLibraryAsync
              : ImagePicker.launchCameraAsync;

          const result = await imageSelector({
            allowsEditing: true,
            aspect: [1, 1],
          });

          setImageChangeInProgress(true);

          if (result.canceled) {
            setImageChangeInProgress(false);
            return;
          }

          const [imageId] = await uploadImages(result);
          console.log("upload successful, image id:", imageId);
          setImageChangeInProgress(false);
          onChange(imageId);
        },
      );
    };
  }

  return (
    <View style={{ flex: 1 }}>
      <PageBackground contentContainerStyle={{ paddingBottom: 80 }}>
        <Card>
          <CardHeader icon="person-outline">Basic Info</CardHeader>
          <View style={styles.pfpContainer}>
            <Controller
              name="pfpId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity
                  style={styles.pfpButton}
                  onPress={pickImage(onChange)}
                >
                  {!imageChangeInProgress ? (
                    <ApiImage id={value} targetSize={90} style={styles.pfp} />
                  ) : (
                    <ActivityIndicator />
                  )}
                </TouchableOpacity>
              )}
            />
            <Text style={styles.pfpText}>Tap to change your photo</Text>
          </View>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Name"
                placeholder="Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            name="bio"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Bio"
                placeholder="Bio"
                multiline
                style={{
                  height: 80,
                }}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </Card>
        <Card>
          <View style={styles.descriptionHeader}>
            <CardHeader icon="brush-outline">Profile Sections</CardHeader>
            <Text style={styles.description}>
              Choose what to show on your profile
            </Text>
          </View>
          {sectionMapping.map(({ label, key }) => (
            <Controller
              key={key}
              name={key}
              control={control}
              render={({ field: { onChange, value } }) => (
                <SwitchRow
                  label={label}
                  value={value as boolean | undefined}
                  onValueChange={onChange}
                />
              )}
            />
          ))}
        </Card>
        {watch("showInterests") ? <Interests control={control} /> : null}
        {watch("showTraits") ? <Traits control={control} /> : null}
        {watch("showFavorites") ? <Favorites control={control} /> : null}
        {watch("showLookingFor") ? <LookingFor control={control} /> : null}
        {watch("showConversationStarters") ? (
          <ConversationStarters control={control} />
        ) : null}
        {/* TODO: recent spots here when i figure out how to handle it */}
      </PageBackground>
      <Button
        style={styles.saveButton}
        variant="green"
        icon="save-outline"
        onPress={handleSubmit((data) => mutate(data))}
        disabled={isPending}
      >
        Save changes
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  pfpContainer: {
    alignItems: "center",
    gap: 10,
  },
  pfpButton: {
    width: 90,
    height: 90,
    backgroundColor: "#eaeaea",
    borderRadius: 999,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  pfp: {
    width: 90,
    height: 90,
  },
  pfpText: {
    color: "#4b5563",
  },
  descriptionHeader: {
    gap: 6,
  },
  description: {
    fontSize: 16,
    color: "#4b5563",
  },
  saveButton: {
    height: 44,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default React.memo(EditProfile);
