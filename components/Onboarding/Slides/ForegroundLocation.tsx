import * as Location from "expo-location";

import BigIcon from "@/components/BigIcon";
import Button from "@/components/Button";
import Callout from "@/components/Callout";
import Slides from "@/components/Slides";

type Props = {
  onNext: () => void;
};

export default function ForegroundLocation({ onNext }: Props) {
  return (
    <Slides.Slide>
      <BigIcon icon="location-outline" variant="orange" />
      <Slides.Title>Let&apos;s find your people!</Slides.Title>
      <Slides.Text>
        We need your location to show you who you&apos;ve crossed paths with
        throughout your day.
      </Slides.Text>
      <Callout>
        <Callout.Header icon="heart-outline">
          Your privacy matters
        </Callout.Header>
        <Callout.Body>
          Your exact location is never shared. We only use it to detect when
          you&apos;re near other users.
        </Callout.Body>
      </Callout>
      <Button
        icon="location-outline"
        variant="orange"
        style={{ width: "100%" }}
        onPress={() => {
          Location.requestForegroundPermissionsAsync().then(onNext);
        }}
      >
        Enable Location Access
      </Button>
      <Slides.Hint>You can change this in Settings anytime</Slides.Hint>
    </Slides.Slide>
  );
}
