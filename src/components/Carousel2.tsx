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

const itemWidth = Math.round(Dimensions.get("screen").width);

const totalWidth = itemWidth * items.length;

export function Carousel() {
  const startX = useSharedValue(0);
  const translateX = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
    });

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
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
