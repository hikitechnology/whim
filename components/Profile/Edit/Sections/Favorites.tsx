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

export default function Favorites({ control }: Props) {
  const fieldName = "favorites";

  const { fields, append, remove } = useFieldArray({
    name: fieldName,
    control,
  });

  return (
    <PopInView>
      <Card>
        <CardHeader icon="heart-outline">Current Favorites</CardHeader>
        <AddButton
          bgColor="#fef9c3"
          fgColor="#a16207"
          onPress={() => append({ category: "", item: "" })}
        />
        {fields.map((item, index) => (
          <PopInView key={item.id}>
            <View style={styles.itemContainer}>
              <View style={styles.textRow}>
                <View style={{ flex: 1 }}>
                  <Controller
                    control={control}
                    name={`${fieldName}.${index}.category`}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        placeholder="Category"
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
                name={`${fieldName}.${index}.item`}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Your choice"
                    style={{
                      height: 46,
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
    backgroundColor: "#fefce8",
    padding: 16,
    borderRadius: 20,
    gap: 10,
  },
  textRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
