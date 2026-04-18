import { View, Text, ScrollView, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import HistoryMealCard from "@/components/frontend/History-Card";
import { Ionicons } from "@expo/vector-icons";

const History = () => {
  const mealsData = useQuery(api.macros.getFood);
  const [search, setSearch] = React.useState("");

  // 🔍 Filter meals
  const filteredMeals = React.useMemo(() => {
    if (!mealsData) return [];

    return mealsData.filter((meal: any) =>
      meal.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [mealsData, search]);

  // 📅 Group meals by date
  const groupedMeals = React.useMemo(() => {
    if (!filteredMeals) return {};

    return filteredMeals.reduce((acc: any, meal: any) => {
      const dateKey = new Date(meal.date).toISOString().split("T")[0];

      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(meal);

      return acc;
    }, {});
  }, [filteredMeals]);

  // 🔽 Sort dates (latest first)
  const sortedDates = React.useMemo(() => {
    return Object.keys(groupedMeals).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime(),
    );
  }, [groupedMeals]);

  // ⏳ Loading
  if (!mealsData) {
    return (
      <SafeAreaView className="flex-1 bg-[#0f0f10] justify-center items-center">
        <Text className="text-white">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView className="px-4">
        {/* 🔍 Search Bar */}
        <View className="flex-row items-center bg-[#1c1c1e] px-4 py-3 rounded-2xl mt-3 mb-6 border border-[#2c2c2e]">
          <Ionicons name="search" size={18} color="#888" />
          <TextInput
            placeholder="Search meals..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            className="ml-2 flex-1 text-white"
          />
        </View>

        {/* ❌ Empty State */}
        {sortedDates.length === 0 && (
          <Text className="text-gray-500 text-center mt-20 text-base">
            No meals found 🍽️
          </Text>
        )}

        {/* 📅 Sections */}
        {sortedDates.map((date) => (
          <View key={date} className="mb-8">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-white text-lg font-bold">
                {formatDate(date)}
              </Text>

              <Text className="text-gray-400 text-sm">
                {groupedMeals[date].length} meals
              </Text>
            </View>

            {/* Meals */}
            {groupedMeals[date].map((meal: any) => (
              <HistoryMealCard key={meal._id} meal={meal} />
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;

//////////////////////////////////////////////////////

// 📅 Date Formatter
const formatDate = (dateStr: string) => {
  const today = new Date();
  const todayKey = today.toISOString().split("T")[0];

  const yesterdayDate = new Date();
  yesterdayDate.setDate(today.getDate() - 1);
  const yesterdayKey = yesterdayDate.toISOString().split("T")[0];

  if (dateStr === todayKey) return "Today";
  if (dateStr === yesterdayKey) return "Yesterday";

  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
