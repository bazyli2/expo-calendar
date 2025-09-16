import {
  Calendar,
  CalendarProps,
  toDateId,
  useCalendar,
} from "@marceloterreiro/flash-calendar";
import { useState } from "react";
import { Text, View } from "react-native";

export function BasicCalendar(props: CalendarProps) {
  const { calendarRowMonth } = useCalendar(props);
  return (
    <View>
      <Text>{calendarRowMonth}</Text>
    </View>
  );
}
