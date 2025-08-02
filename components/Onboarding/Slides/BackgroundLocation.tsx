import * as Location from "expo-location";

import BigIcon from "@/components/BigIcon";
import Button from "@/components/Button";
import Callout from "@/components/Callout";
import Slides from "@/components/Slides";

type Props = {
  onNext: () => void;
  onSkip: () => void;
};

export default function BackgroundLocation({ onNext, onSkip }: Props) {
  return (
    <Slides.Slide>
      <BigIcon icon="navigate-outline" variant="purple" />
      <Slides.Title>Make the magic happen!</Slides.Title>
      <Slides.Text>
        For the best experience, we&apos;d love to detect connections even when
        you&apos;re not actively using the app.
      </Slides.Text>
      <Callout variant="purple">
        <Callout.Header icon="sparkles-outline">Why this helps</Callout.Header>
        <Callout.Body>
          You&apos;ll never miss a connection! We can detect when you&apos;re at
          the same coffee shop, library, or event as someone interesting.
        </Callout.Body>
      </Callout>
      <Button
        icon="navigate-outline"
        color="purple"
        variant="primary"
        style={{ width: "100%" }}
        onPress={() => {
          Location.requestBackgroundPermissionsAsync().then(onNext);
        }}
      >
        Enable Background Location
      </Button>
      <Button color="textOnly" style={{ width: "100%" }} onPress={onSkip}>
        Skip for now
      </Button>
    </Slides.Slide>
  );
}
