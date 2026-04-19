import { View, Text, Pressable } from "react-native";

import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

// 👇 get the correct type directly from Ionicons
type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const iconMap: Record<"flame" | "barbell" | "leaf" | "water", IoniconName> = {
  flame: "flame",
  barbell: "barbell",
  leaf: "leaf",
  water: "water",
};
export default function Feature({ icon, label, color, value }: FeatureProps) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className="items-center"
      style={{
        transform: [{ scale: pressed ? 0.95 : 1 }],
      }}
    >
      <View
        className="w-14 h-14 rounded-2xl items-center justify-center mb-2"
        style={{ backgroundColor: `${color}22` }}
      >
        <Ionicons name={iconMap[icon]} size={24} color={color} />
      </View>

      <Text className="text-gray-400 text-xs">{label}</Text>

      {value && (
        <Text className="text-white text-sm font-semibold mt-1">{value}</Text>
      )}
    </Pressable>
  );
}
