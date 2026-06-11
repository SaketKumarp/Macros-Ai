import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { useQuery } from "convex/react";
import { router } from "expo-router";
import dayjs from "dayjs";

import { api } from "@/convex/_generated/api";

export default function ProgressScreen() {
  const meals = useQuery(api.macros.getFood);

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD"),
  );

  const [currentMonth, setCurrentMonth] = useState(dayjs());

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

  markedDates[selectedDate] = {
    ...(markedDates[selectedDate] || {}),
    selected: true,
    selectedColor: "#22d3ee",
  };

  return (
    <View className="flex-1 bg-black px-5 pt-16">
      {/* Header */}

      <Text className="text-white text-4xl font-bold">Progress</Text>

      <Text className="text-gray-400 text-lg mt-1">Track your consistency</Text>

      {/* Month Selector */}

      <View className="flex-row items-center justify-between mt-8 bg-[#0B0F17] rounded-3xl p-4">
        <TouchableOpacity
          onPress={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
        >
          <Text className="text-cyan-400 text-2xl">←</Text>
        </TouchableOpacity>

        <Text className="text-white text-lg font-semibold">
          {currentMonth.format("MMMM YYYY")}
        </Text>

        <TouchableOpacity
          onPress={() => setCurrentMonth(currentMonth.add(1, "month"))}
        >
          <Text className="text-cyan-400 text-2xl">→</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar */}

      <View className="bg-[#0B0F17] rounded-3xl mt-5 p-3">
        <Calendar
          current={currentMonth.format("YYYY-MM-DD")}
          hideArrows
          markedDates={markedDates}
          enableSwipeMonths
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          theme={{
            backgroundColor: "#0B0F17",
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

      {/* Selected Day Card */}

      <View className="bg-[#0B0F17] rounded-3xl p-5 mt-5">
        <Text className="text-gray-400">Selected Day</Text>

        <Text className="text-white text-2xl font-bold mt-2">
          {dayjs(selectedDate).format("DD MMM YYYY")}
        </Text>

        <TouchableOpacity
          className="bg-cyan-400 rounded-2xl py-4 mt-5"
          onPress={() =>
            router.push({
              pathname: "/screens/daily-summary",
              params: {
                date: selectedDate,
              },
            })
          }
        >
          <Text className="text-center text-black font-bold">View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
