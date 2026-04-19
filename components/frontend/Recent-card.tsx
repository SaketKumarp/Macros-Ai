import { View, Text, Image } from "react-native";
import React from "react";
import { Meal } from "@/lib/types";

interface Props {
  item: Meal;
}

export const RecentScanCard = ({ item }: Props) => {
  return (
    <View className="w-44 mr-4">
      <View className="h-28 rounded-2xl overflow-hidden bg-[#222]">
        {item.image ? (
          <Image source={{ uri: item.image }} className="w-full h-full" />
        ) : null}
      </View>

      <View className="mt-2">
        <Text className="text-white text-sm font-semibold" numberOfLines={1}>
          {item.name}
        </Text>

        <Text className="text-[#1dd1a1] text-xs mt-1">
          {item.calories} kcal
          <Text className="text-gray-400"> • {item.protein}g protein</Text>
        </Text>
      </View>
    </View>
  );
};
