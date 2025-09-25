import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Slide } from "./Slide";
import { Text, View } from "react-native";

export function Slides(props: Props) {
  const { translateX, items, itemWidth } = props;

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
            <Slide key={item} index={index} itemWidth={itemWidth}>
              <Text>{item}</Text>
            </Slide>
          );
        })}
      </Animated.View>
    </View>
  );
}

interface Props {
  translateX: SharedValue<number>;
  itemWidth: number;
  items: number[];
}
