import { useState } from "react";
import { Calendar } from "react-native-calendars";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { router } from "expo-router";
import { View } from "react-native";

export default function CalendarScreen() {
  const meals = useQuery(api.macros.getFood);
  const [selectedDate, setSelectedDate] = useState("");

  const markedDates =
    meals?.reduce(
      (acc, meal) => {
        acc[meal.date] = {
          marked: true,
          dotColor: "#22d3ee",
        };

        return acc;
      },
      {} as Record<string, any>,
    ) ?? {};

  if (selectedDate) {
    markedDates[selectedDate] = {
      ...(markedDates[selectedDate] || {}),
      selected: true,
      selectedColor: "#22d3ee",
    };
  }

  return (
    <View className="bg-black flex-1">
      <Calendar
        markedDates={markedDates}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);

          router.push({
            pathname: "/screens/daily-summary",
            params: {
              date: day.dateString,
            },
          });
        }}
        theme={{
          backgroundColor: "#000",
          calendarBackground: "#0B0F17",

          dayTextColor: "#fff",
          monthTextColor: "#fff",

          textDisabledColor: "#374151",

          todayTextColor: "#22d3ee",

          selectedDayBackgroundColor: "#22d3ee",
          selectedDayTextColor: "#000",
        }}
      />
    </View>
  );
}
