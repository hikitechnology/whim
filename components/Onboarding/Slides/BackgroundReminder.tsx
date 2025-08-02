import BigIcon from "@/components/BigIcon";
import Button from "@/components/Button";
import Callout from "@/components/Callout";
import Slides from "@/components/Slides";

type Props = {
  onNext: () => void;
};

export default function BackgroundReminder({ onNext }: Props) {
  return (
    <Slides.Slide>
      <BigIcon icon="phone-portrait-outline" variant="green" />
      <Slides.Title>One last thing!</Slides.Title>
      <Slides.Text>
        Keep the app running in the background to discover connections
        throughout your day.
      </Slides.Text>
      <Callout variant="green">
        <Callout.Header icon="sunny-outline">What this means</Callout.Header>
        <Callout.Body>
          When you&apos;re done using Whim, simply return to the home screen
          instead of force-closing it!
        </Callout.Body>
      </Callout>
      <Button
        icon="sparkles-outline"
        color="green"
        variant="primary"
        style={{ width: "100%" }}
        onPress={onNext}
      >
        Got it! Let&apos;s start connecting
      </Button>
    </Slides.Slide>
  );
}
