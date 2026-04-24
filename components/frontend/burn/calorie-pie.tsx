import React from "react";
import { View, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

interface Activity {
  label: string;
  burned: number;
  color: string;
}

interface Props {
  data: Activity[];
}

export const CaloriesPieChart = ({ data }: Props) => {
  const total = data.reduce((sum, item) => sum + item.burned, 0);

  const radius = 70;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;

  let cumulative = 0;

  return (
    <View className="bg-[#1c1c1e] p-5 rounded-2xl items-center">
      <Text className="text-white font-semibold mb-4">
        Calories Distribution
      </Text>

      <View className="items-center justify-center">
        <Svg width={180} height={180}>
          <G rotation="-90" origin="90, 90">
            {data.map((item, index) => {
              const percent = item.burned / total;
              const strokeDasharray = `${circumference * percent} ${
                circumference
              }`;

              const strokeDashoffset = -cumulative * circumference;

              cumulative += percent;

              return (
                <Circle
                  key={index}
                  cx="90"
                  cy="90"
                  r={radius}
                  stroke={item.color}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              );
            })}
          </G>
        </Svg>

        {/* 🔥 Center Text */}
        <View className="absolute items-center">
          <Text className="text-white text-lg font-bold">{total}</Text>
          <Text className="text-zinc-400 text-xs">kcal</Text>
        </View>
      </View>

      {/* 🔥 Legend */}
      <View className="mt-5 gap-y-2 w-full">
        {data.map((item, index) => (
          <View key={index} className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2">
              <View
                style={{ backgroundColor: item.color }}
                className="w-3 h-3 rounded-full"
              />
              <Text className="text-white text-sm">{item.label}</Text>
            </View>

            <Text className="text-zinc-400 text-sm">{item.burned} kcal</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
