import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { CarouselItem, RenderItem } from "./types";
import { Platform, StyleSheet } from "react-native";

interface SlideProps {
  item: CarouselItem;
  index: number;
  itemWidth: number;
  itemSpacing: number;
  translateX: SharedValue<number>;
  snapStep: number;
  renderItem: RenderItem;
}

export function Slide({
  item,
  index,
  itemWidth,
  itemSpacing,
  translateX,
  snapStep,
  renderItem,
}: SlideProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const offset = (translateX.value + index * snapStep) / snapStep;

    const scale = interpolate(
      offset,
      [-2, -1, 0, 1, 2],
      [0.85, 0.92, 1, 0.92, 0.85],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      Math.abs(offset),
      [0, 1, 2],
      [1, 0.8, 0.6],
      Extrapolate.CLAMP,
    );

    const translateY = interpolate(
      Math.abs(offset),
      [0, 1, 2],
      [0, 10, 20],
      Extrapolate.CLAMP,
    );

    return {
      transform: [{ scale }, { translateY }],
      opacity,
      width: itemWidth,
    };
  }, [itemWidth, itemSpacing, snapStep]);

  return (
    <Animated.View
      key={String(item.id ?? index)}
      className=""
      style={[
        styles.slide,
        { left: index * snapStep, width: itemWidth },
        animatedStyle,
      ]}
    >
      {renderItem({ item, index })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  slide: {
    position: "absolute",
    top: 0,
    height: "100%",
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
      },
      android: {
        elevation: 3,
      },
    }),
    backgroundColor: "white",
  },
});
