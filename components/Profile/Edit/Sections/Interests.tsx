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

export default function Interests({ control }: Props) {
  const fieldName = "interests";

  const { fields, append, remove } = useFieldArray({
    name: fieldName,
    control,
  });

  return (
    <PopInView>
      <Card>
        <CardHeader icon="star-outline">Things I Love</CardHeader>
        <AddButton
          bgColor="#e9d5ff"
          fgColor="#581c87"
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
                      placeholder="Add an interest..."
                      borderColor="#e9d5ff"
                      borderColorFocused="#c084fc"
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
  textRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
