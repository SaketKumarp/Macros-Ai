import { View, Text } from "react-native";
import React from "react";

type FoodType = "drink" | "snack" | "fastfood" | "protein" | "carb" | "fat";

export interface EatenCardProps {
  id: number;
  carbs: number;
  name: string;
  calories: number;
  protein: number;
  fat: number;
  sugar: number;
  type?: FoodType;
}

const getFoodMeta = (type?: FoodType) => {
  switch (type) {
    case "drink":
      return { icon: "🥤", color: "#3498db" };
    case "snack":
      return { icon: "🍿", color: "#f1c40f" };
    case "fastfood":
      return { icon: "🍔", color: "#e74c3c" };
    case "protein":
      return { icon: "🥩", color: "#9b59b6" };
    case "carb":
      return { icon: "🍚", color: "#f39c12" };
    case "fat":
      return { icon: "🥑", color: "#2ecc71" };
    default:
      return { icon: "🍽️", color: "#95a5a6" };
  }
};

const EatenCard = ({
  name,
  calories,
  protein,
  fat,
  sugar,
  carbs,
  type,
}: EatenCardProps) => {
  const { icon, color } = getFoodMeta(type);

  return (
    <View className="bg-[#111] p-4 rounded-2xl mb-3 border border-[#1c1c1e]">
      {/* 🔥 Top Row */}
      <View className="flex-row justify-between items-center">
        <Text className="text-white text-base font-semibold">{name}</Text>

        {/* Type Badge */}
        <View
          className="px-2 py-1 rounded-full"
          style={{ backgroundColor: `${color}20` }}
        >
          <Text style={{ color }} className="text-xs">
            {icon}
          </Text>
        </View>
      </View>

      {/* Calories */}
      <Text className="text-gray-400 text-sm mt-1">{calories} kcal</Text>

      {/* Macros */}
      <View className="flex-row justify-between mt-3">
        <Text className="text-gray-400 text-xs">
          P: <Text className="text-white">{protein}g</Text>
        </Text>
        <Text className="text-gray-400 text-xs">
          C: <Text className="text-white">{carbs}g</Text>
        </Text>
        <Text className="text-gray-400 text-xs">
          F: <Text className="text-white">{fat}g</Text>
        </Text>
        <Text className="text-gray-400 text-xs">
          S: <Text className="text-white">{sugar}g</Text>
        </Text>
      </View>
    </View>
  );
};

export default EatenCard;
