import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import TextInput from "@/components/TextInput";
import { FormUserProfile } from "@/types/UserProfile";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AddButton from "../AddButton";
import PopInView from "../PopInView";

type Props = {
  control: Control<FormUserProfile, any, FormUserProfile>;
};

export default function Traits({ control }: Props) {
  const fieldName = "traits";

  const { fields, append, remove } = useFieldArray({
    name: fieldName,
    control,
  });

  return (
    <PopInView>
      <Card>
        <CardHeader icon="sparkles-outline">My Vibe</CardHeader>
        <AddButton
          bgColor="#93c5fd"
          fgColor="#1e40af"
          onPress={() => append({ trait: "", description: "" })}
        />
        {fields.map((item, index) => (
          <PopInView key={item.id}>
            <View style={styles.itemContainer}>
              <View style={styles.textRow}>
                <View style={{ flex: 1 }}>
                  <Controller
                    control={control}
                    name={`${fieldName}.${index}.trait`}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        placeholder="Personality trait..."
                        borderColor="#bfdbfe"
                        borderColorFocused="#60a5fa"
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
              <Controller
                control={control}
                name={`${fieldName}.${index}.description`}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Describe this trait..."
                    borderColor="#bfdbfe"
                    borderColorFocused="#60a5fa"
                    multiline
                    style={{
                      height: 80,
                    }}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
          </PopInView>
        ))}
      </Card>
    </PopInView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#eff6ff",
    padding: 16,
    borderRadius: 20,
    gap: 10,
  },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
