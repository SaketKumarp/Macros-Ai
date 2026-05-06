import { Text, View } from "react-native";

type ProgressBarProps = {
  label: string;
  value: number;
  total: number;
};

export const ProgressBar = ({ label, value, total }: ProgressBarProps) => {
  const percentage = total ? (value / total) * 100 : 0;

  return (
    <View className="mb-5">
      <View className="flex-row justify-between mb-1">
        <Text className="text-gray-400">{label}</Text>
        <Text className="text-white font-semibold">{value}g</Text>
      </View>

      <View className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
        <View
          style={{ width: `${percentage}%` }}
          className="h-full bg-[#00d2d3] rounded-full"
        />
      </View>
    </View>
  );
};
