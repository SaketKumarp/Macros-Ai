import { View, Text } from "react-native";

interface MacroCardProps {
  label: string;
  value: number;
  maxValue: number; // 👈 new
  unit?: string;
  color?: string;
}

export const MacroCard = ({
  label,
  value,
  maxValue,
  unit = "g",
  color = "#00d2d3",
}: MacroCardProps) => {
  const progress = Math.min(value / maxValue, 1);

  return (
    <View className="bg-[#111] p-4 rounded-2xl w-[30%] items-center">
      <Text className="text-gray-400 text-xs">{label}</Text>

      <Text className="text-white text-lg font-bold mt-1" style={{ color }}>
        {value}
        {unit}
      </Text>

      <View className="w-full h-2 bg-[#222] rounded-full mt-3 overflow-hidden">
        {/* progress bar  */}
        <View
          className="h-full rounded-full"
          style={{
            width: `${progress * 100}%`,
            backgroundColor: value > maxValue ? "#eb4d4b" : color,
          }}
        />
      </View>

      <Text className="text-gray-500 text-[10px] mt-1">
        {Math.round(progress * 100)}%
      </Text>
    </View>
  );
};
