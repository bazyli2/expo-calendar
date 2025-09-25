import classNames from "classnames";
import { Text, View, Dimensions } from "react-native";

const items = [1, 2] as const;

const screenWidth = Math.round(Dimensions.get("screen").width);

export function Carousel() {
  return (
    <View className="min-h-40" style={{ width: screenWidth }}>
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
    </View>
  );
}
