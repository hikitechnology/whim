import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import TextInput from "@/components/TextInput";
import { StyleSheet, Text, View } from "react-native";
import PopInView from "../PopInView";
import { Control, Controller } from "react-hook-form";
import { FormUserProfile } from "@/types/UserProfile";

type Props = {
  control: Control<FormUserProfile, any, FormUserProfile>;
};

export default function LookingFor({ control }: Props) {
  const fieldName = "lookingFor";

  return (
    <PopInView>
      <Card>
        <View style={styles.descriptionHeader}>
          <CardHeader icon="search-outline">Looking For</CardHeader>
          <Text style={styles.description}>
            Who are you interested in meeting?
          </Text>
        </View>
        <Controller
          control={control}
          name={fieldName}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Your description here"
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
    </PopInView>
  );
}

const styles = StyleSheet.create({
  descriptionHeader: {
    gap: 6,
  },
  description: {
    fontSize: 16,
    color: "#4b5563",
  },
});
