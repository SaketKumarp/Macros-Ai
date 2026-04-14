import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface MacroRingProps {
  size?: number;
  strokeWidth?: number;
  progress?: number;
  caloriesLeft?: number;
}

export const MacroRing = ({
  size = 220,
  strokeWidth = 18,
  progress = 0.6,
  caloriesLeft = 828,
}: MacroRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const safeProgress = Math.min(Math.max(progress, 0), 1);

  const strokeDashoffset = circumference - circumference * safeProgress;

  return (
    <View className="items-center justify-center">
      <Svg width={size} height={size}>
        {/* Background Ring */}
        <Circle
          stroke="#95afc0" // dark gray
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        {/* Progress Ring */}
        <Circle
          stroke="#ff4d6d"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>

      {/* Center Text */}
      <View className="absolute items-center">
        <Text className="text-white text-3xl font-bold">{caloriesLeft}</Text>
        <Text className="text-gray-400">calories left</Text>
      </View>
    </View>
  );
};
