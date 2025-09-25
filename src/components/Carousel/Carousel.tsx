import { Dimensions, Text } from "react-native";
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

  const renderItem = (item: number) => {
    return <Text>{item}</Text>;
  };

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <Slides
          items={items}
          translateX={translateX}
          itemWidth={itemWidth}
          renderItem={renderItem}
        />
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
