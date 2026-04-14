import { View, Text } from "react-native";

interface MacroCardProps {
  label: string;
  value: number;
  unit?: string;
  color?: string;
}

export const MacroCard = ({
  label,
  value,
  unit = "g",
  color = "#00d2d3",
}: MacroCardProps) => {
  return (
    <View className="bg-[#111] p-4 rounded-2xl w-[30%] items-center">
      {/* Label */}
      <Text className="text-gray-400 text-xs">{label}</Text>

      {/* Value */}
      <Text className="text-white text-lg font-bold mt-1" style={{ color }}>
        {value}
        {unit}
      </Text>
    </View>
  );
};
