import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HistoryMealCard = ({ meal }: any) => {
  return (
    <View className="bg-[#1c1c1e] p-3 rounded-2xl mb-3 border border-[#2c2c2e] flex-row">
      {/* 🖼️ Meal Image */}
      <Image
        source={
          meal.image ? { uri: meal.image } : require("@/assets/images/food.png") // add a placeholder image
        }
        className="w-16 h-16 rounded-xl mr-3"
        resizeMode="cover"
      />

      {/* 📄 Content */}
      <View className="flex-1">
        {/* Top Row */}
        <View className="flex-row justify-between items-center">
          <Text
            className="text-white text-base font-semibold flex-1 mr-2"
            numberOfLines={1}
          >
            {meal.name || "Unnamed Meal"}
          </Text>

          <Ionicons name="chevron-forward" size={18} color="#666" />
        </View>

        {/* Calories */}
        <Text className="text-green-400 text-base font-bold mt-1">
          {meal.calories} kcal
        </Text>

        {/* Macros */}
        <View className="flex-row justify-between mt-2">
          <Macro
            icon="barbell"
            color="#4ade80"
            value={meal.protein}
            label="P"
          />
          <Macro icon="leaf" color="#60a5fa" value={meal.carbs} label="C" />
          <Macro icon="water" color="#facc15" value={meal.fat} label="F" />
        </View>
      </View>
    </View>
  );
};

const Macro = ({ icon, color, value, label }: any) => (
  <View className="items-center">
    <Ionicons name={icon} size={14} color={color} />
    <Text className="text-white text-xs font-bold">{value}</Text>
    <Text className="text-gray-400 text-[10px]">{label}</Text>
  </View>
);

export default HistoryMealCard;
