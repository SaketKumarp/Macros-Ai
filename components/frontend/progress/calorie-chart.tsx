import { Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

export const CaloriesChart = () => {
  const data = [
    { value: 200 },
    { value: 350 },
    { value: 500 },
    { value: 400 },
    { value: 600 },
    { value: 550 },
    { value: 700 },
  ];

  return (
    <View className="bg-[#0B0F17] rounded-3xl p-5 mt-5">
      <Text>Last 7 Days Calories</Text>
      <Text className="text-white text-xl font-bold mb-4"></Text>
      <LineChart
        data={data}
        color="#22d3ee"
        thickness={3}
        hideRules
        areaChart
      />
    </View>
  );
};
