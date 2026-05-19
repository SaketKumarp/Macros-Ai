import { ProfileDropDown } from "@/components/auth/Profile-dropdown";
import { ProfileSheet } from "@/components/auth/Profile-Sheet";
import EatenCard, {
  EatenCardProps,
} from "@/components/frontend/macros/Eaten-Card";
import { MacroCard } from "@/components/frontend/macros/Macro-card";
import { MacroRing } from "@/components/frontend/macros/Macro-ring";
import { NoMeals } from "@/components/frontend/meal/No-Meal";

import { api } from "@/convex/_generated/api";
import { calculateCalories } from "@/lib/macros";

import { useUser } from "@clerk/expo";
import { useQuery } from "convex/react";
import { Redirect, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";

export default function Index() {
  const { isSignedIn, user } = useUser();

  const router = useRouter();

  // const [profileOpen, setprofileOpen] = useState(false);

  // meals
  const mealData = useQuery(api.macros.getTodayMeals);
  const mealLoading = mealData === undefined;

  const meals = mealData ?? [];

  // user details
  const userDetail = useQuery(api.test.getuserDetails, {});

  // loading state
  if (userDetail === undefined) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size="large" color="#00d2d3" />

        <Text className="text-white mt-4 text-base">
          Loading your dashboard...
        </Text>
      </View>
    );
  }

  // signed out
  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  // calories
  const { calorieGoal } = calculateCalories(userDetail);

  // macros eaten
  const eatenCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);

  const proteinEaten = meals.reduce((acc, meal) => acc + meal.protein, 0);

  const carbsEaten = meals.reduce((acc, meal) => acc + meal.carbs, 0);

  const fatEaten = meals.reduce((acc, meal) => acc + meal.fat, 0);

  const handleSignOut = () => {
    // setprofileOpen(true);
  };

  return (
    <View className="flex-1 bg-black px-5 pt-14">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-white text-2xl font-bold">Today</Text>

          <Text className="text-gray-400 mt-1">Track your nutrition</Text>
        </View>

        <ProfileDropDown
          onProfilePress={() => {
            router.push("/");
          }}
          onSettingsPress={() => {
            router.push("/");
          }}
        />
      </View>

      {/* Macro Ring */}
      <View className="items-center mt-2">
        <MacroRing totalCalories={calorieGoal} eatenCalories={eatenCalories} />
      </View>

      {/* Macro Cards */}
      <View className="flex-row justify-between mt-4 gap-2">
        <MacroCard
          label="Protein"
          value={proteinEaten}
          color="#be2edd"
          maxValue={100}
        />

        <MacroCard
          label="Carbs"
          value={carbsEaten}
          color="#feca57"
          maxValue={220}
        />

        <MacroCard label="Fat" value={fatEaten} color="#1dd1a1" maxValue={60} />
      </View>

      {/* Meals */}
      <Text className="text-white text-lg font-semibold mt-6 mb-2">
        Today’s Meals
      </Text>

      <View className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
          {mealLoading ? (
            <Text className="text-gray-400 text-center mt-4">
              Loading meals...
            </Text>
          ) : meals.length === 0 ? (
            <NoMeals onAddMeal={() => router.push("/screens/onboarding")} />
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

      {/* Floating Button */}
      <TouchableOpacity
        onPress={() => router.push("/screens/uplaod")}
        className="absolute bottom-6 right-6 bg-[#00d2d3] w-14 h-14 rounded-full items-center justify-center shadow-lg"
      >
        <Text className="text-black text-2xl font-bold">+</Text>
      </TouchableOpacity>

      {/* <ProfileSheet
        visible={profileOpen}
        onClose={() => setprofileOpen(false)}
      /> */}
    </View>
  );
}
