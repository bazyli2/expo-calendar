import { Dimensions } from "react-native";
import {
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useCarouselSwipe } from "./useCarouselSwipe";
import { Slides } from "./Slides";

const items = [1, 2];

const itemWidth = Math.round(Dimensions.get("screen").width);

export function Carousel() {
  const { gesture, translateX } = useCarouselSwipe();

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <Slides items={items} translateX={translateX} itemWidth={itemWidth} />
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
