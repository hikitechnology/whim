import * as Location from "expo-location";

import BigIcon from "@/components/BigIcon";
import Button from "@/components/Button";
import Callout from "@/components/Callout";
import Slides from "@/components/Slides";

type Props = {
  onNext: () => void;
  onSkip: () => void;
};

export default function BackgroundConfirm({ onNext, onSkip }: Props) {
  return (
    <Slides.Slide>
      <BigIcon icon="warning-outline" variant="orange" />
      <Slides.Title>Are you sure?</Slides.Title>
      <Slides.Text>
        Without background location, you might miss connections with amazing
        people you encounter throughout your day.
      </Slides.Text>
      <Callout variant="red">
        <Callout.Header icon="settings-outline">
          You can always enable it later:
        </Callout.Header>
        <Callout.Body>
          Settings → Privacy & Security → Location Services
        </Callout.Body>
      </Callout>
      <Button
        icon="heart-outline"
        color="purple"
        variant="primary"
        style={{ width: "100%" }}
        onPress={() => {
          Location.requestBackgroundPermissionsAsync().then(onNext);
        }}
      >
        Actually, let&apos;s enable it!
      </Button>
      <Button color="textOnly" style={{ width: "100%" }} onPress={onSkip}>
        Continue without it
      </Button>
    </Slides.Slide>
  );
}
