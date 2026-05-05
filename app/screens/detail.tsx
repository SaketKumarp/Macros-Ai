import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MealHistoryCard } from "@/components/frontend/history/Meal-HistoryCard";
import { Ionicons } from "@expo/vector-icons";

const Detail = () => {
  const { mealId } = useLocalSearchParams<{ mealId: Id<"foods"> }>();
  const meal = useQuery(api.macros.getmeal, { mealId });
  const mealLoading = meal === undefined;

  const router = useRouter();

  // 🔄 Loading state
  if (mealLoading) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <ActivityIndicator size="large" color="#00d2d3" />
        <Text className="text-gray-400 mt-3">Loading meal...</Text>
      </View>
    );
  }

  // ❌ Not found
  if (!meal) {
    return (
      <View className="flex-1 bg-black justify-center items-center">
        <Text className="text-white text-lg">Meal not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      {/* 🔙 HEADER */}
      <View className="flex-row items-center px-4 pt-12 pb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text className="text-white text-lg font-semibold ml-4">
          Meal Details
        </Text>
      </View>

      {/* 📜 CONTENT */}
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <MealHistoryCard meal={meal} />
      </ScrollView>
    </View>
  );
};

export default Detail;
