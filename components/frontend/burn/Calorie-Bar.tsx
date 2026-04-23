import { View, Text } from "react-native";

interface Activity {
  label: string;
  burned: number;
  color: string;
}

interface Props {
  data: Activity[];
}

export const CaloriesBreakdownBar = ({ data }: Props) => {
  const total = data.reduce((sum, item) => sum + item.burned, 0);

  return (
    <View className="bg-[#1c1c1e] p-4 rounded-2xl">
      <Text className="text-white font-semibold mb-3">Calories Breakdown</Text>

      {/* 🔥 Segmented Bar */}
      <View className="flex-row h-3 rounded-full overflow-hidden">
        {data.map((item, index) => {
          const widthPercent = (item.burned / total) * 100;

          return (
            <View
              key={index}
              style={{
                width: `${widthPercent}%`,
                backgroundColor: item.color,
              }}
            />
          );
        })}
      </View>

      {/* 🔥 Legend */}
      <View className="mt-4 gap-y-2">
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
