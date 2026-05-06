import { View, Text, Image, TouchableOpacity } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Doc } from "@/convex/_generated/dataModel";
import { MacroPieChart } from "../macros/Macro-pie";
import { AnimatedMacroBar } from "../macros/Macro-animated-bar";

type Meal = Doc<"foods">;

export const MealHistoryCard = ({ meal }: { meal: Meal }) => {
  const total = meal.protein + meal.carbs + meal.fat;

  // ✅ DEFINE HERE
  const RightActions = () => (
    <View className="flex-row h-full">
      <TouchableOpacity
        onPress={() => console.log("Delete", meal._id)}
        className="bg-red-500 justify-center items-center px-6"
      >
        <Text className="text-white font-semibold">Delete</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => console.log("Edit", meal._id)}
        className="bg-blue-500 justify-center items-center px-6"
      >
        <Text className="text-white font-semibold">Edit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable renderRightActions={RightActions}>
      <View className="mt-6 bg-[#0d0d0d] rounded-3xl border border-[#1c1c1e] overflow-hidden">
        {meal.image && (
          <Image
            source={{ uri: meal.image }}
            className="w-full h-48"
            resizeMode="cover"
          />
        )}

        <View className="p-6">
          <Text className="text-white text-2xl font-bold">🍽️ {meal.name}</Text>

          <Text className="text-[#00d2d3] text-5xl font-extrabold mt-4 text-center">
            {meal.calories}
          </Text>

          <MacroPieChart
            protein={meal.protein}
            carbs={meal.carbs}
            fat={meal.fat}
          />

          <View className="mt-6">
            <AnimatedMacroBar
              label="Protein"
              value={meal.protein}
              total={total}
            />
            <AnimatedMacroBar label="Carbs" value={meal.carbs} total={total} />
            <AnimatedMacroBar label="Fat" value={meal.fat} total={total} />
            <AnimatedMacroBar label="Sugar" value={meal.sugar} total={total} />
          </View>
        </View>
      </View>
    </Swipeable>
  );
};
