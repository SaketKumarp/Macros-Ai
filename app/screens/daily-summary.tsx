import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

export default function DailySummary() {
  const { date } = useLocalSearchParams<{
    date: string;
  }>();

  const summary = useQuery(
    api.macros.getSummaryByDate,
    date ? { date } : "skip",
  );

  return (
    <View className="flex-1 bg-black px-5 pt-16">
      <Text className="text-white text-3xl font-bold">{date}</Text>

      <View className="bg-[#0B0F17] rounded-3xl p-5 mt-6">
        <Text className="text-cyan-400 text-lg">Calories</Text>

        <Text className="text-white text-5xl font-bold mt-2">
          {summary?.calories ?? 0}
        </Text>
      </View>

      <View className="flex-row gap-3 mt-5">
        <View className="flex-1 bg-[#0B0F17] rounded-3xl p-4">
          <Text className="text-purple-400">Protein</Text>

          <Text className="text-white text-2xl font-bold mt-2">
            {summary?.protein ?? 0}g
          </Text>
        </View>

        <View className="flex-1 bg-[#0B0F17] rounded-3xl p-4">
          <Text className="text-yellow-400">Carbs</Text>

          <Text className="text-white text-2xl font-bold mt-2">
            {summary?.carbs ?? 0}g
          </Text>
        </View>

        <View className="flex-1 bg-[#0B0F17] rounded-3xl p-4">
          <Text className="text-cyan-400">Fat</Text>

          <Text className="text-white text-2xl font-bold mt-2">
            {summary?.fat ?? 0}g
          </Text>
        </View>
      </View>
    </View>
  );
}
