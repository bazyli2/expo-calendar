import { Text, View } from "react-native";
import { BasicCalendar } from "../components/BasicCalendar";
import "../global.css";

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
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <BasicCalendar />
    </View>
  );
}
