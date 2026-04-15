import EatenCard, { EatenCardProps } from "@/components/frontend/Eaten-Card";
import { MacroCard } from "@/components/frontend/Macro-card";
import { MacroRing } from "@/components/frontend/Macro-ring";
import { useToast } from "@/providers/toast";

import { useClerk, useUser } from "@clerk/expo";
import { Redirect, useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";

export default function Index() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { showToast } = useToast();
  const router = useRouter();

  const totalCalories = 2000;
  const eatenCalories = 1450;
  const dummyData: EatenCardProps[] = [
    {
      id: 1,
      name: "Chicken Rice",
      calories: 450,
      protein: 35,
      carbs: 50,
      fat: 12,
      sugar: 5,
      type: "protein",
    },
    {
      id: 2,
      name: "Oats with Milk",
      calories: 300,
      protein: 15,
      carbs: 40,
      fat: 8,
      sugar: 10,
      type: "carb",
    },
    {
      id: 3,
      name: "Peanut Butter Toast",
      calories: 350,
      protein: 12,
      carbs: 30,
      fat: 18,
      sugar: 6,
      type: "protein",
    },
    {
      id: 4,
      name: "Cold Drink",
      calories: 120,
      protein: 0,
      carbs: 30,
      fat: 0,
      sugar: 25,
      type: "drink",
    },
    {
      id: 5,
      name: "Burger",
      calories: 500,
      protein: 20,
      carbs: 45,
      fat: 25,
      sugar: 8,
      type: "fastfood",
    },
    {
      id: 6,
      name: "Chips",
      calories: 250,
      protein: 5,
      carbs: 20,
      fat: 15,
      sugar: 2,
      type: "snack",
    },
  ];
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
      <View className="items-center mt-9">
        <MacroRing
          totalCalories={totalCalories}
          eatenCalories={eatenCalories}
        />
      </View>

      {/* 🔥 Macro Cards */}
      <View className="flex-row justify-between mt-6 gap-2">
        <MacroCard label="Protein" value={90} color="#be2edd" maxValue={160} />
        <MacroCard label="Carbs" value={180} color="#feca57" maxValue={220} />
        <MacroCard label="Fat" value={60} color="#1dd1a1" maxValue={60} />
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
          {dummyData.map((item) => (
            <EatenCard
              key={item.id}
              id={item.id}
              name={item.name}
              carbs={item.carbs}
              calories={item.calories}
              fat={item.fat}
              protein={item.protein}
              sugar={item.sugar}
              type={item.type}
            />
          ))}
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
