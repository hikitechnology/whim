import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddButton from "../AddButton";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { FormUserProfile } from "@/types/UserProfile";
import TextInput from "@/components/TextInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import PopInView from "../PopInView";

type Props = {
  control: Control<FormUserProfile, any, FormUserProfile>;
};

export default function ConversationStarters({ control }: Props) {
  const fieldName = "conversationStarters";

  const { fields, append, remove } = useFieldArray({
    name: fieldName,
    control,
  });

  return (
    <PopInView>
      <Card>
        <View style={styles.descriptionHeader}>
          <CardHeader icon="chatbubble-outline">
            Let&apos;s talk about...
          </CardHeader>
          <Text style={styles.description}>
            Give people easy ways to start a conversation
          </Text>
        </View>
        <AddButton
          bgColor="#86efac"
          fgColor="#14532d"
          onPress={() => append({ value: "" })}
        />
        {fields.map((item, index) => (
          <PopInView key={item.id}>
            <View style={styles.textRow}>
              <View style={{ flex: 1 }}>
                <Controller
                  control={control}
                  name={`${fieldName}.${index}.value`}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      placeholder="Add a conversation starter..."
                      borderColor="#bbf7d0"
                      borderColorFocused="#86efac"
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>
              <TouchableOpacity
                style={{ paddingLeft: 10 }}
                onPress={() => remove(index)}
              >
                <Ionicons name="close-outline" size={26} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </PopInView>
        ))}
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
  textRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
