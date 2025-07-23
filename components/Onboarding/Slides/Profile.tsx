import BigIcon from "@/components/BigIcon";
import Button from "@/components/Button";
import Slides from "@/components/Slides";
import TextInput from "@/components/TextInput";
import PfpSelector from "../PfpSelector";
import useAuthContext from "@/hooks/useAuthContext";
import { useState } from "react";
import { updateUserProfile } from "@/utils/api";

type Props = {
  onNext: () => void;
};

export default function Profile({ onNext }: Props) {
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [nextDisabled, setNextDisabled] = useState(false);

  async function updateProfileAndContinue() {
    setNextDisabled(true);

    const trimmedName = name.trim();
    if (user && trimmedName.length !== 0) {
      updateUserProfile({
        uid: user.uid,
        name: trimmedName,
      })
        .then(onNext)
        .catch((error) => {
          console.error(error);
          setNextDisabled(false);
        });
    }
  }

  return (
    <Slides.Slide>
      <BigIcon icon="brush-outline" variant="purple" />
      <Slides.Title>Make yourself shine!</Slides.Title>
      <Slides.Text>
        Add a photo and name so people can recognize you when you cross paths.
      </Slides.Text>
      {/* TODO: pretty phone number formatting */}
      <PfpSelector />
      <Slides.Hint>Tap to add your photo</Slides.Hint>
      <TextInput
        label="Display Name"
        borderColor="#fbcfe8"
        borderColorFocused="#f472b6"
        placeholder="What should people call you?"
        onChangeText={(text) => setName(text)}
      />
      <Button
        icon="arrow-forward-outline"
        variant="purple"
        style={{ width: "100%" }}
        onPress={updateProfileAndContinue}
        disabled={nextDisabled}
      >
        Continue
      </Button>
    </Slides.Slide>
  );
}
