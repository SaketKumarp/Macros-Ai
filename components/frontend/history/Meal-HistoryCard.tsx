import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Doc } from "@/convex/_generated/dataModel";

type Meal = Doc<"foods">;
interface MealHistoryCardProps {
  meal: Meal;
}

const MacroItem = ({ label, value, icon }: any) => (
  <View className="flex-1 bg-[#141414] p-4 rounded-2xl items-center border border-[#222]">
    <Ionicons name={icon} size={16} color="#00d2d3" />
    <Text className="text-white text-lg font-bold mt-2">{value}g</Text>
    <Text className="text-gray-400 text-xs mt-1">{label}</Text>
  </View>
);

export const MealHistoryCard = ({ meal }: MealHistoryCardProps) => {
  return (
    <View className="flex-1 mt-6 bg-[#0d0d0d] rounded-3xl border border-[#1c1c1e] p-6">
      {/* HEADER */}
      <View className="flex-row justify-between items-center">
        <Text className="text-white text-2xl font-bold">🍽️ {meal.name}</Text>

        <View className="bg-[#1c1c1e] px-3 py-1 rounded-full">
          <Text className="text-gray-400 text-xs uppercase">
            {meal.type || "Meal"}
          </Text>
        </View>
      </View>

      {/* CALORIES */}
      <View className="mt-6 items-center">
        <Text className="text-[#00d2d3] text-5xl font-extrabold">
          {meal.calories}
        </Text>
        <Text className="text-gray-400 text-sm mt-1">kcal consumed</Text>
      </View>

      {/* DIVIDER */}
      <View className="h-[1px] bg-[#222] my-6" />

      {/* MACROS */}
      <Text className="text-gray-400 text-sm mb-3">Macronutrients</Text>

      <View className="flex-row gap-3">
        <MacroItem label="Protein" value={meal.protein} icon="barbell" />
        <MacroItem label="Carbs" value={meal.carbs} icon="leaf" />
      </View>

      <View className="flex-row gap-3 mt-3">
        <MacroItem label="Fat" value={meal.fat} icon="water" />
        <MacroItem label="Sugar" value={meal.sugar} icon="nutrition" />
      </View>
    </View>
  );
};
