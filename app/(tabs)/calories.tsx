import { ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { BurnHero } from "@/components/frontend/burn/Burn-Hero";
import { QuickActions } from "@/components/frontend/burn/Quick-Action";
import ActivityList from "@/components/frontend/burn/Activity-List";

const CaloriesScreen = () => {
  const burned = 540;
  const goal = 700;

  const activities = [
    { name: "Running", duration: 30, calories: 240 },
    { name: "Walking", duration: 20, calories: 80 },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#09090b" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <BurnHero burned={burned} goal={goal} />
        <QuickActions />
        <ActivityList data={activities} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CaloriesScreen;
