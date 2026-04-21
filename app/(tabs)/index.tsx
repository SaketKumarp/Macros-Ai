import EatenCard, {
  EatenCardProps,
} from "@/components/frontend/macros/Eaten-Card";
import { MacroCard } from "@/components/frontend/macros/Macro-card";
import { MacroRing } from "@/components/frontend/macros/Macro-ring";
import { NoMeals } from "@/components/frontend/meal/No-Meal";

import { api } from "@/convex/_generated/api";
import { useToast } from "@/providers/toast";

import { useClerk, useUser } from "@clerk/expo";
import { useQuery } from "convex/react";
import { Redirect, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

export default function Index() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { showToast } = useToast();
  const router = useRouter();

  const mealData = useQuery(api.macros.getTodayMeals);
  const mealLoading = mealData === undefined;
  const meals = mealData ?? [];
  const totalCalories = 2000;
  // const eatenCalories = 2000;
  let eatenCalories = 0;
  let proteinEaten = 0;
  let carbsEaten = 0;
  let fatEaten = 0;

  meals.map((meal) => (eatenCalories += meal.calories));
  meals.map((meal) => (proteinEaten += meal.protein));
  meals.map((meal) => (carbsEaten += meal.carbs));
  meals.map((meal) => (fatEaten += meal.fat));
  console.log("eaten calories of today", eatenCalories);

  //TODO:i have to take total maximum calories and total macros from user or may be i need to calculate it somehow using bmi of the user
  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  const handleSignOut = () => {
    signOut();
    showToast("logged out", "success");
  };

  return (
    <View className="flex-1 bg-black px-5 pt-14">
      {/* 🔥 Header */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-white text-2xl font-bold">Today</Text>
          <Text className="text-gray-400 mt-1">Track your nutrition</Text>
        </View>

        <TouchableOpacity onPress={handleSignOut}>
          <Image
            source={{ uri: user?.imageUrl }}
            className="w-10 h-10 rounded-full border border-gray-600"
          />
        </TouchableOpacity>
      </View>

      {/* 🔥 Macro Ring */}
      <View className="items-center mt-2">
        <MacroRing
          totalCalories={totalCalories}
          eatenCalories={eatenCalories}
        />
      </View>

      {/* 🔥 Macro Cards */}
      <View className="flex-row justify-between mt-4 gap-2">
        <MacroCard
          label="Protein"
          value={proteinEaten}
          color="#be2edd"
          maxValue={160}
        />
        <MacroCard
          label="Carbs"
          value={carbsEaten}
          color="#feca57"
          maxValue={220}
        />
        <MacroCard label="Fat" value={fatEaten} color="#1dd1a1" maxValue={60} />
      </View>

      {/* 🔥 Meals Section */}
      <Text className="text-white text-lg font-semibold mt-6 mb-2">
        Today’s Meals
      </Text>

      {/* 🔥 ONLY THIS SCROLLS */}
      <View className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {mealLoading ? (
            <Text className="text-gray-400 text-center mt-4">
              Loading meals...
            </Text>
          ) : meals.length === 0 ? (
            <NoMeals onAddMeal={() => console.log("onadd meal")} />
          ) : (
            meals.map((item) => (
              <EatenCard
                key={item._id}
                name={item.name}
                carbs={item.carbs}
                calories={item.calories}
                fat={item.fat}
                protein={item.protein}
                sugar={item.sugar}
                type={item.type as EatenCardProps["type"]}
              />
            ))
          )}
        </ScrollView>
      </View>

      {/* 🔥 Floating Add Button */}
      <TouchableOpacity
        onPress={() => router.push("/screens/uplaod")}
        className="absolute bottom-6 right-6 bg-[#00d2d3] w-14 h-14 rounded-full items-center justify-center shadow-lg"
      >
        <Text className="text-black text-2xl font-bold">+</Text>
      </TouchableOpacity>
    </View>
  );
}
