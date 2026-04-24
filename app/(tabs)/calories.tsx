import { ScrollView, View } from "react-native";
import React from "react";

import { BurnHero } from "@/components/frontend/burn/Burn-Hero";
import { QuickActionCard } from "@/components/frontend/burn/Quick-Action-Card";
import { TodayActivityCard } from "@/components/frontend/burn/Today-Acticity-Card";
import { CaloriesBreakdownBar } from "@/components/frontend/burn/Calorie-Bar";
import { CaloriesPieChart } from "@/components/frontend/burn/calorie-pie";

const CaloriesScreen = () => {
  const burned = 540;
  const goal = 700;

  return (
    <View className="flex-1 bg-black px-2 pt-10">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingTop: 16,
          paddingBottom: 100, // 👈 important for tab space
          gap: 16,
        }}
      >
        <BurnHero burned={burned} goal={goal} />
        <QuickActionCard />
        {/* 👇 Just render it normally */}
        <TodayActivityCard />
        {/* <CaloriesBreakdownBar
          data={[
            { label: "Running", burned: 240, color: "#eb4d4b" },
            { label: "Walking", burned: 80, color: "#8e44ad" },
            { label: "Cycling", burned: 120, color: "#2ecc71" },
            { label: "gym", burned: 500, color: "#3498db" },
          ]}
        /> */}
        <CaloriesPieChart
          data={[
            { label: "Running", burned: 240, color: "#eb4d4b" },
            { label: "Walking", burned: 80, color: "#8e44ad" },
            { label: "Cycling", burned: 120, color: "#2ecc71" },
            { label: "gym", burned: 500, color: "#3498db" },
          ]}
        />
      </ScrollView>
    </View>
  );
};

export default CaloriesScreen;
