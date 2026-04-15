import { View, Text, TouchableOpacity } from "react-native";

interface MealAIResponse {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
  type: string;
}

interface Props {
  data: MealAIResponse;
  onAdd: () => void;
}

const MacroItem = ({ label, value }: { label: string; value: number }) => (
  <View className="flex-1 bg-[#1a1a1a] p-4 rounded-2xl items-center">
    <Text className="text-white text-base font-semibold">{value}g</Text>
    <Text className="text-gray-400 text-xs mt-1">{label}</Text>
  </View>
);

const MealCard = ({ data, onAdd }: Props) => {
  return (
    <View className="flex-1 mt-6 bg-[#0d0d0d] rounded-3xl border border-[#1c1c1e] p-6 justify-between">
      
      {/* 🔝 HEADER */}
      <View>
        <Text className="text-white text-2xl font-bold tracking-wide">
          {data.name}
        </Text>

        <Text className="text-[#00d2d3] text-3xl font-bold mt-3">
          {data.calories}
          <Text className="text-gray-400 text-base font-medium"> kcal</Text>
        </Text>

        <Text className="text-gray-500 text-xs mt-1 uppercase">
          Estimated Nutrition
        </Text>
      </View>

      {/* 📊 MACROS GRID */}
      <View className="mt-8">
        <View className="flex-row gap-3">
          <MacroItem label="Protein" value={data.protein} />
          <MacroItem label="Carbs" value={data.carbs} />
        </View>

        <View className="flex-row gap-3 mt-3">
          <MacroItem label="Fat" value={data.fat} />
          <MacroItem label="Sugar" value={data.sugar} />
        </View>
      </View>

      {/* ⚡ CTA BUTTON */}
      <TouchableOpacity
        onPress={onAdd}
        className="mt-10 bg-[#00d2d3] py-4 rounded-2xl items-center shadow-lg"
      >
        <Text className="text-black font-bold text-base tracking-wide">
          Add to Today’s Meals
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MealCard;