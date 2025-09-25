import { Gesture } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";

export function useCarouselSwipe() {
  const startX = useSharedValue(0);
  const translateX = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      translateX.value = startX.value + event.translationX;
    });

  return { gesture: pan, translateX: translateX } as const;
}
