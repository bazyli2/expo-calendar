import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Slide } from "./Slide";
import { View } from "react-native";
import { ReactNode } from "react";

export function Slides<T>(props: Props<T>) {
  const { translateX, items, itemWidth, renderItem } = props;

  const totalWidth = itemWidth * items.length;

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={{ width: itemWidth }}
      className="overflow-hidden border-solid border-red-50 border-2"
    >
      <Animated.View
        className="min-h-40 bg-slate-100"
        style={[{ width: totalWidth }, containerStyle]}
      >
        {props.items.map((item, index) => {
          return (
            <Slide key={index} index={index} itemWidth={itemWidth}>
              {renderItem(item)}
            </Slide>
          );
        })}
      </Animated.View>
    </View>
  );
}

interface Props<T> {
  translateX: SharedValue<number>;
  itemWidth: number;
  items: T[];
  renderItem: (item: T) => ReactNode;
}
