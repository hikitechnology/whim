import BigIcon from "@/components/BigIcon";
import Button from "@/components/Button";
import Slides from "@/components/Slides";
import TextInput from "@/components/TextInput";
import PfpSelector from "../PfpSelector";

type Props = {
  onNext: () => void;
};

export default function Profile({ onNext }: Props) {
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
      />
      <Button
        icon="arrow-forward-outline"
        variant="purple"
        style={{ width: "100%" }}
        onPress={onNext}
      >
        Continue
      </Button>
    </Slides.Slide>
  );
}
