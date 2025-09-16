import { View } from "react-native";
import { BasicCalendar } from "../components/BasicCalendar";
import "../global.css";
import { useState } from "react";
import { toDateId } from "@marceloterreiro/flash-calendar";

const today = toDateId(new Date());

export default function Index() {
  const [selectedDate, setSelectedDate] = useState(today);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "black",
      }}
    >
      <BasicCalendar
        calendarFormatLocale="pl-PL"
        calendarFirstDayOfWeek="monday"
        calendarActiveDateRanges={[
          {
            startId: selectedDate,
            endId: selectedDate,
          },
        ]}
        calendarMonthId={today}
        onCalendarDayPress={setSelectedDate}
      />
    </View>
  );
}
