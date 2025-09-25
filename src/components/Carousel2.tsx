import { Text, View, Dimensions } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const items = [1, 2] as const;

const screenWidth = Math.round(Dimensions.get("screen").width);

export function Carousel() {
  const startX = useSharedValue(0);
  const translateX = useSharedValue(0);

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
          className="min-h-40 bg-slate-100"
          style={[{ width: screenWidth }, containerStyle]}
        >
          {items.map((item, index) => {
            return (
              <View
                key={item}
                className="absolute top-0 w-full h-full"
                style={{ left: screenWidth * index * -1 }}
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
