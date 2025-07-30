import Card from "@/components/Card";
import React, { ReactElement, useState } from "react";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

type Props = {
  slides: (setSlide: (id: string | number) => void) => {
    [key: string | number]: ReactElement;
  };
  initialSlide: string | number;
  onSlideChange?: (id: string | number) => void;
};

export default function Slides({
  slides,
  initialSlide,
  onSlideChange = () => {},
}: Props) {
  const [currentSlide, setCurrentSlide] = useState<string | number>(
    initialSlide,
  );
  function setSlide(id: string | number) {
    setCurrentSlide(id);
    onSlideChange(id);
  }
  const currentSlideComponent = slides(setSlide)[currentSlide];

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={
        50 /* TODO: calculate this based on distance from top */
      }
    >
      <Card innerStyle={{ padding: 34, overflow: "visible" }}>
        {/* key is added to trigger rerender. animation wont work without*/}
        {React.cloneElement(currentSlideComponent, { key: currentSlide })}
      </Card>
    </KeyboardAvoidingView>
  );
}
