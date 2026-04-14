import { MacroCard } from "@/components/frontend/Macro-card";
import { MacroRing } from "@/components/frontend/Macro-ring";
import { View, Text } from "react-native";

export default function Index() {
  const totalCalories = 2000;
  const eatenCalories = 1450;

  return (
    <View className="flex-1 bg-black px-6 pt-16">
      <Text className="text-white text-2xl font-bold">Today</Text>
      <Text className="text-gray-400 mt-1">Track your nutrition</Text>

      <View className="items-center mt-10">
        <MacroRing
          totalCalories={totalCalories}
          eatenCalories={eatenCalories}
        />
      </View>
      <View className="flex-row justify-between mt-10">
        <MacroCard label="Protein" value={90} color="#ff6b6b" />
        <MacroCard label="Carbs" value={180} color="#feca57" />
        <MacroCard label="Fat" value={60} color="#1dd1a1" />
      </View>
    </View>
  );
}
