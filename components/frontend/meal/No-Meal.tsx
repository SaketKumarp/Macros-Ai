import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NoMealsProps {
  onAddMeal: () => void;
}

export const NoMeals = ({ onAddMeal }: NoMealsProps) => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      {/* Icon */}
      <View className="w-20 h-20 rounded-full bg-white/10 items-center justify-center mb-4">
        <Ionicons name="restaurant-outline" size={36} color="#a1a1aa" />
      </View>

      {/* Title */}
      <Text className="text-white text-lg font-semibold mb-1">
        No meals yet
      </Text>

      {/* Subtitle */}
      <Text className="text-gray-400 text-center mb-6">
        Add your first meal to start tracking your macros
      </Text>

      {/* Button */}
      <TouchableOpacity
        onPress={onAddMeal}
        activeOpacity={0.8}
        className="bg-[#1dd1a1] px-6 py-3 rounded-full flex-row items-center"
      >
        <Ionicons
          name="add"
          size={20}
          color="#000"
          style={{ marginRight: 6 }}
        />
        <Text className="text-black font-semibold">Add Meal</Text>
      </TouchableOpacity>
    </View>
  );
};
