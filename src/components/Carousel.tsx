import classNames from "classnames";
import { Dimensions, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const windowWidth = Math.round(Dimensions.get("window").width);

const items = [1, 2] as const;

const widthClassname = `min-w-[${windowWidth}px]`;
console.log(widthClassname);

export function Carousel() {
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      console.log("pan start");
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      console.log("pan update");
      translateX.value = startX.value + event.translationX;
    });

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
        <Animated.View
          className={classNames("relative min-h-40", `w-[${windowWidth}px]`)}
          style={containerStyle}
        >
          {items.map((item, index) => {
            const leftClassname = `left-[${windowWidth * index}px]`;
            return (
              <View
                className={classNames(
                  "absolute top-0 min-h-40 bg-slate-200 w-full",
                  leftClassname,
                )}
                key={item}
              >
                <Text>{item}</Text>
              </View>
            );
          })}
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
