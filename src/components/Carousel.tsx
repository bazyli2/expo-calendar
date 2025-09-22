import classNames from "classnames";
import { Dimensions, Text, View } from "react-native";

const windowWidth = Math.round(Dimensions.get("window").width);

const items = [1, 2] as const;

export function Carousel() {
  return (
    <View className="relative -translate-x-[381px]">
      {items.map((item, index) => {
        const leftClassname = `left-[${windowWidth * index}px]`;
        return (
          <View
            className={classNames(
              "absolute top-0 min-h-40 w-full",
              leftClassname,
            )}
            key={item}
          >
            <Text>{item}</Text>
          </View>
        );
      })}
    </View>
  );
}
