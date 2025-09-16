import { CalendarProps, useCalendar } from "@marceloterreiro/flash-calendar";
import { Text, View } from "react-native";
import classNames from "classnames";

export function BasicCalendar(props: CalendarProps) {
  const { weekDaysList, weeksList } = useCalendar(props);
  return (
    <View className="w-full h-full flex">
      <View className="flex flex-row">
        {weekDaysList.map((day, index) => (
          <View key={index} className="flex-1 border-l-2 border-gray-400">
            <Text className="text-center">{day}</Text>
          </View>
        ))}
      </View>
      <View className="flex flex-1">
        {weeksList.map((week, weekIndex) => (
          <View key={weekIndex} className="flex-1 flex flex-row">
            {week.map((day) => {
              return (
                <View
                  key={day.id}
                  className={classNames(
                    "flex-1 border-solid border-gray-400 border-l-2 border-t-2 pt-4",
                  )}
                >
                  <Text className="text-center">{day.displayLabel}</Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}
