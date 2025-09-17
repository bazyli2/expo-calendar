import React, { useCallback } from "react";
import { View, StyleSheet, Dimensions, Platform, Text } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import { CarouselItem, RenderItem } from "./types";
import { Slide } from "./Slide";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const springConfig = {
  damping: 20,
  stiffness: 200,
  mass: 1,
  overshootClamping: false,
  restDisplacementThreshold: 0.5,
  restSpeedThreshold: 0.5,
};

interface CarouselProps {
  data: CarouselItem[];
  renderItem: RenderItem;
  itemWidth?: number;
  itemSpacing?: number;
  initialIndex?: number;
  height?: number;
}

export function Carousel({
  data,
  renderItem,
  itemWidth = SCREEN_WIDTH * 0.85,
  itemSpacing = 16,
  initialIndex = 0,
  height = 300,
}: CarouselProps) {
  const snapStep = itemWidth + itemSpacing;
  const totalWidth = data.length * snapStep;

  const translateX = useSharedValue(-initialIndex * snapStep);
  const startX = useSharedValue(0); // acts as gesture context

  const currentIndex = useDerivedValue(() => {
    const raw = -translateX.value / snapStep;
    return Math.round(raw);
  }, [snapStep]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const renderSlides = useCallback(
    () =>
      data.map((item, index) => (
        <Slide
          key={String(item.id ?? index)}
          item={item}
          index={index}
          itemWidth={itemWidth}
          itemSpacing={itemSpacing}
          translateX={translateX}
          snapStep={snapStep}
          renderItem={renderItem}
        />
      )),
    [data, itemWidth, itemSpacing, snapStep, renderItem, translateX],
  );

  const pan = Gesture.Pan()
    .onStart(() => {
      // store starting translate in gesture context
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      // update shared value directly on UI thread
      translateX.value = startX.value + event.translationX;
    })
    .onEnd((event) => {
      // velocity-aware snap to nearest index
      const velocity = event.velocityX;
      const rawIndex = -translateX.value / snapStep;
      let nextIndex = Math.round(rawIndex - velocity * 0.0005);

      if (nextIndex < 0) nextIndex = 0;
      if (nextIndex > data.length - 1) nextIndex = data.length - 1;

      const dest = -nextIndex * snapStep;
      translateX.value = withSpring(dest, { ...springConfig, velocity }, () => {
        // optional runOnJS callback after spring finishes
        // runOnJS(someCallback)(nextIndex);
      });
    });

  // ... and in JSX replace PanGestureHandler with GestureDetector:
  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[{ width: itemWidth, height }, styles.carouselBox]}
        >
          <View style={[styles.viewport, { width: itemWidth, height }]}>
            <Animated.View
              style={[styles.inner, containerStyle, { width: totalWidth }]}
            >
              {renderSlides()}
            </Animated.View>
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  carouselBox: {},
  viewport: {
    overflow: "hidden",
  },
  inner: {
    position: "relative",
    height: "100%",
  },
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
