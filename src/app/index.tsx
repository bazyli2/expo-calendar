import { Text, View } from "react-native";
import { BasicCalendar } from "../components/BasicCalendar";
import "../global.css";
import { useState } from "react";
import { toDateId } from "@marceloterreiro/flash-calendar";
import { Carousel } from "../components/Carousel";

const today = toDateId(new Date());

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "black",
      }}
    >
      <Carousel
        renderItem={(item) => <Text>{item.item.id}</Text>}
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
      />
    </View>
  );
}
