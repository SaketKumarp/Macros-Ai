import { View, Text } from "react-native";
import React from "react";

interface Props {
  duration: number;
  distance: number;
  calories: number;
}

export const LiveSessionCard = ({ duration, distance, calories }: Props) => {
  return (
    <View
      className="rounded-2xl p-5 border border-[#27272a]"
      style={{
        backgroundColor: "#0a0a0a",
        shadowColor: "#f97316",
        shadowOpacity: 0.2,
        shadowRadius: 20,
      }}
    >
      <Text className="text-white text-lg font-semibold mb-4">
        Live Session
      </Text>

      <View className="flex-row justify-between">
        <View className="items-center flex-1">
          <Text className="text-zinc-500 text-xs">Time</Text>
          <Text className="text-white font-bold text-lg mt-1">{duration}s</Text>
        </View>

        <View className="items-center flex-1">
          <Text className="text-zinc-500 text-xs">Distance</Text>
          <Text className="text-white font-bold text-lg mt-1">
            {(distance / 1000).toFixed(2)} km
          </Text>
        </View>

        <View className="items-center flex-1">
          <Text className="text-zinc-500 text-xs">Calories</Text>
          <Text className="text-orange-500 font-bold text-lg mt-1">
            {calories.toFixed(1)}
          </Text>
        </View>
      </View>
    </View>
  );
};
