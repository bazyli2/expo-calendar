import { ComponentProps } from "react";
import { View } from "react-native";

export function Slide(props: Props) {
  const { index, itemWidth, ...rest } = props;
  return (
    <View
      className="absolute top-0 w-full h-full"
      style={{ left: itemWidth * index }}
      {...rest}
    />
  );
}

interface Props extends ComponentProps<typeof View> {
  index: number;
  itemWidth: number;
}
