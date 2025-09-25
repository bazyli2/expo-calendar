import { Text, View } from "react-native";
import "../global.css";
import { Carousel } from "../components/Carousel";

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
      <Carousel />
    </View>
  );
}
