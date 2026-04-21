import { View, Text, Animated } from "react-native";
import React, { useRef } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Meal } from "@/lib/types";
import { RecentScanCard } from "./Recent-card";

const ITEM_WIDTH = 180;

export const RecentScans = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const scans = useQuery(api.macros.getRecentMeals) as Meal[] | undefined;

  if (!scans || scans.length === 0) return null;

  return (
    <View className="mt-6">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-white text-lg font-semibold">Recent Scans</Text>
        <Text className="text-[#1dd1a1] text-sm">See all</Text>
      </View>

      <Animated.FlatList
        data={scans}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingRight: 20 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: "clamp",
          });

          return (
            <Animated.View style={{ transform: [{ scale }] }}>
              <RecentScanCard item={item} />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};
