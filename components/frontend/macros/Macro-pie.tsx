import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

export const MacroPieChart = ({ protein, carbs, fat }: any) => {
  const total = protein + carbs + fat;

  const p1 = (protein / total) * 100;
  const p2 = (carbs / total) * 100;
  const p3 = (fat / total) * 100;

  return (
    <View className="items-center mt-6">
      <Svg width={120} height={120} viewBox="0 0 36 36">
        {/* Protein */}
        <Circle
          cx="18"
          cy="18"
          r="15"
          stroke="#00d2d3"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={`${p1}, 100`}
        />
        {/* Carbs */}
        <Circle
          cx="18"
          cy="18"
          r="15"
          stroke="#4ade80"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={`${p2}, 100`}
          strokeDashoffset={-p1}
        />
        {/* Fat */}
        <Circle
          cx="18"
          cy="18"
          r="15"
          stroke="#facc15"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={`${p3}, 100`}
          strokeDashoffset={-(p1 + p2)}
        />
      </Svg>

      <Text className="text-gray-400 text-xs mt-2">Macro Split</Text>
    </View>
  );
};
