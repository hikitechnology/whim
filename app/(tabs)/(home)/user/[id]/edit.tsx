// TODO: this whole page is basically unusable, i was rushing thru it just to get the styling done but didnt clean up, needs big refactor

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFieldArray,
} from "react-hook-form";

import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import PageBackground from "@/components/PageBackground";
import TextInput from "@/components/TextInput";
import SwitchRow from "@/components/SwitchRow";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "@/components/Button";

type Inputs = {
  name: string;
  location: string;
  bio: string;
  enablePhotos: boolean;
  enableInterests: boolean;
  enablePersonality: boolean;
  enableFavorites: boolean;
  enableLookingFor: boolean;
  enableConversationStarters: boolean;
  enableRecentSpots: boolean;
  interests: { value: string }[];
  personality: { trait: string; description: string }[];
  favorites: { category: string; item: string }[];
  lookingFor: string;
  conversationStarters: { value: string }[];
};

const sectionMapping: { label: string; key: keyof Inputs }[] = [
  { label: "Photos", key: "enablePhotos" },
  { label: "Interests", key: "enableInterests" },
  { label: "Personality", key: "enablePersonality" },
  { label: "Favorites", key: "enableFavorites" },
  { label: "Looking For", key: "enableLookingFor" },
  { label: "Conversation Starters", key: "enableConversationStarters" },
  { label: "Recent Spots", key: "enableRecentSpots" },
];

export default function EditPage() {
  const { control, watch, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      interests: [{ value: "" }],
      personality: [{ trait: "", description: "" }],
      favorites: [{ category: "", item: "" }],
      conversationStarters: [{ value: "" }],
    },
  });
  const {
    fields: interestsFields,
    append: interestsAppend,
    remove: interestsRemove,
  } = useFieldArray({
    name: "interests",
    control,
  });
  const {
    fields: personalityFields,
    append: personalityAppend,
    remove: personalityRemove,
  } = useFieldArray({
    name: "personality",
    control,
  });
  const {
    fields: favoriteFields,
    append: favoriteAppend,
    remove: favoriteRemove,
  } = useFieldArray({
    name: "favorites",
    control,
  });
  const {
    fields: csFields,
    append: csAppend,
    remove: csRemove,
  } = useFieldArray({
    name: "conversationStarters",
    control,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("name"));

  return (
    <View style={{ flex: 1 }}>
      <PageBackground
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <Card>
          <CardHeader icon="person-outline">Basic Info</CardHeader>
          <View style={styles.pfpContainer}>
            <View style={styles.pfp} />
            <Text style={styles.pfpText}>Tap to change your photo</Text>
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Name</Text>
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Name"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Location</Text>
            <Controller
              name="location"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Location"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Bio</Text>
            <Controller
              name="bio"
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Bio"
                  onChangeText={onChange}
                  value={value}
                  multiline
                  style={{
                    height: 80,
                  }}
                />
              )}
            />
          </View>
        </Card>
        <Card>
          <View style={styles.descriptionHeader}>
            <CardHeader icon="brush-outline">Profile Sections</CardHeader>
            <Text style={styles.description}>
              Choose what to show on your profile
            </Text>
          </View>
          {sectionMapping.map(({ label, key }, index) => (
            <Controller
              key={index}
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
        {watch("enablePhotos") ? (
          <Card>
            <View style={styles.descriptionHeader}>
              <CardHeader icon="camera-outline">My Pics</CardHeader>
              <Text style={styles.description}>
                Share photos that show your personality
              </Text>
            </View>
            <TouchableOpacity style={styles.addPhoto}>
              <Ionicons name="add-outline" size={36} color="#d97706" />
            </TouchableOpacity>
          </Card>
        ) : null}
        {watch("enableInterests") ? (
          <Card>
            <CardHeader icon="star-outline">Things I Love</CardHeader>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: "#e9d5ff" }]}
              onPress={() => interestsAppend({ value: "" })}
            >
              <Ionicons name="add-outline" size={36} color="#581c87" />
            </TouchableOpacity>
            {interestsFields.map((item, index) => (
              <View style={styles.closableTextRow} key={item.id}>
                <TextInput
                  placeholder="Add an interest..."
                  borderColor="#e9d5ff"
                  borderColorFocused="#c084fc"
                  style={{ flex: 1 }}
                />
                <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={() => interestsRemove(index)}
                >
                  <Ionicons name="close-outline" size={26} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))}
          </Card>
        ) : null}
        {watch("enablePersonality") ? (
          <Card>
            <CardHeader icon="sparkles-outline">My Vibe</CardHeader>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: "#93c5fd" }]}
              onPress={() => personalityAppend({ trait: "", description: "" })}
            >
              <Ionicons name="add-outline" size={36} color="#1e40af" />
            </TouchableOpacity>
            {personalityFields.map((item, index) => (
              <View style={styles.personalityField} key={item.id}>
                <View style={styles.closableTextRow}>
                  <TextInput
                    placeholder="Personality trait..."
                    borderColor="#bfdbfe"
                    borderColorFocused="#60a5fa"
                    style={{ flex: 1 }}
                  />
                  <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={() => personalityRemove(index)}
                  >
                    <Ionicons name="close-outline" size={26} color="#ef4444" />
                  </TouchableOpacity>
                </View>
                <TextInput
                  placeholder="Describe this trait..."
                  borderColor="#bfdbfe"
                  borderColorFocused="#60a5fa"
                  multiline
                  style={{
                    height: 80,
                  }}
                />
              </View>
            ))}
          </Card>
        ) : null}
        {watch("enableFavorites") ? (
          <Card>
            <CardHeader icon="heart-outline">Current Favorites</CardHeader>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: "#fef9c3" }]}
              onPress={() => favoriteAppend({ category: "", item: "" })}
            >
              <Ionicons name="add-outline" size={36} color="#a16207" />
            </TouchableOpacity>
            {favoriteFields.map((item, index) => (
              <View style={styles.favoriteField} key={item.id}>
                <View style={styles.closableTextRow}>
                  <TextInput placeholder="Category" style={{ flex: 1 }} />
                  <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={() => favoriteRemove(index)}
                  >
                    <Ionicons name="close-outline" size={26} color="#ef4444" />
                  </TouchableOpacity>
                </View>
                <TextInput
                  placeholder="Your choice"
                  style={{
                    height: 46,
                  }}
                />
              </View>
            ))}
          </Card>
        ) : null}
        {watch("enableLookingFor") ? (
          <Card>
            <View style={styles.descriptionHeader}>
              <CardHeader icon="search-outline">Looking For</CardHeader>
              <Text style={styles.description}>
                Who are you interested in meeting?
              </Text>
            </View>
            <TextInput
              placeholder="Your description here"
              multiline
              style={{
                height: 80,
              }}
            />
          </Card>
        ) : null}
        {watch("enableConversationStarters") ? (
          <Card>
            <View style={styles.descriptionHeader}>
              <CardHeader icon="chatbubble-outline">
                Let&apos;s talk about...
              </CardHeader>
              <Text style={styles.description}>
                Give people easy ways to start a conversation
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: "#86efac" }]}
              onPress={() => csAppend({ value: "" })}
            >
              <Ionicons name="add-outline" size={36} color="#14532d" />
            </TouchableOpacity>
            {csFields.map((item, index) => (
              <View style={styles.closableTextRow} key={item.id}>
                <TextInput
                  placeholder="Add a conversation starter..."
                  borderColor="#bbf7d0"
                  borderColorFocused="#86efac"
                  style={{ flex: 1 }}
                />
                <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={() => csRemove(index)}
                >
                  <Ionicons name="close-outline" size={26} color="#ef4444" />
                </TouchableOpacity>
              </View>
            ))}
          </Card>
        ) : null}
        {watch("enableRecentSpots") ? (
          <Card>
            <View style={styles.descriptionHeader}>
              <CardHeader icon="compass-outline">
                You Might Find Me At...
              </CardHeader>
              <Text style={styles.description}>
                not sure how to implement this yet
              </Text>
            </View>
          </Card>
        ) : null}
      </PageBackground>
      <Button
        style={styles.saveButton}
        variant="green"
        icon="save-outline"
        onPress={handleSubmit(onSubmit)}
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
  pfp: {
    width: 90,
    height: 90,
    backgroundColor: "#eaeaea",
    borderRadius: 999,
  },
  pfpText: {
    color: "#4b5563",
  },
  formItem: {
    gap: 4,
  },
  formLabel: {
    fontSize: 16,
    color: "#4b5563",
    fontWeight: 500,
  },
  descriptionHeader: {
    gap: 6,
  },
  description: {
    fontSize: 16,
    color: "#4b5563",
  },
  addPhoto: {
    width: 124,
    height: 124,
    borderRadius: 20,
    backgroundColor: "#fef3c7",
    borderColor: "#fcd34d",
    borderWidth: 2,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    position: "absolute",
    top: 8,
    right: 16,
  },
  closableTextRow: {
    flexDirection: "row",
  },
  saveButton: {
    height: 44,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  personalityField: {
    backgroundColor: "#eff6ff",
    padding: 16,
    borderRadius: 20,
    gap: 10,
  },
  favoriteField: {
    backgroundColor: "#fefce8",
    padding: 16,
    borderRadius: 20,
    gap: 10,
  },
});
