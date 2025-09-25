import { Text, View, Dimensions } from "react-native";
import {
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useCarouselSwipe } from "./useCarouselSwipe";

const items = [1, 2] as const;

const itemWidth = Math.round(Dimensions.get("screen").width);

const totalWidth = itemWidth * items.length;

export function Carousel() {
  const { gesture, translateX } = useCarouselSwipe();

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gesture}>
        <View
          style={{ width: itemWidth }}
          className="overflow-hidden border-solid border-red-50 border-2"
        >
          <Animated.View
            className="min-h-40 bg-slate-100"
            style={[{ width: totalWidth }, containerStyle]}
          >
            {items.map((item, index) => {
              return (
                <View
                  key={item}
                  className="absolute top-0 w-full h-full"
                  style={{ left: itemWidth * index }}
                >
                  <Text>{item}</Text>
                </View>
              );
            })}
          </Animated.View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
