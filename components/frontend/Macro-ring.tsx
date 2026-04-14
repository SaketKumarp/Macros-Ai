import { Text, View, Animated, Easing } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { useEffect, useRef, useState } from "react";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface MacroRingProps {
  size?: number;
  strokeWidth?: number;
  totalCalories: number;
  eatenCalories: number;
}

export const MacroRing = ({
  size = 240,
  strokeWidth = 20,
  totalCalories,
  eatenCalories,
}: MacroRingProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = Math.min(eatenCalories / totalCalories, 1);
  const caloriesLeft = Math.max(totalCalories - eatenCalories, 0);

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [progress]);

  useEffect(() => {
    const id = animatedValue.addListener(({ value }) => {
      setDisplayValue(Math.round(caloriesLeft * value));
    });

    return () => animatedValue.removeListener(id);
  }, [caloriesLeft]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View className="items-center justify-center">
      <Svg width={size} height={size}>
        {/* Background */}
        <Circle
          stroke="#1f2937"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        
        <AnimatedCircle
          stroke="#00d2d3"
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

      {/* Center Content */}
      <View className="absolute items-center">
        <Text className="text-gray-400 text-sm">Calories left</Text>
        <Text className="text-white text-4xl font-bold mt-1">
          {displayValue}
        </Text>
        <Text className="text-gray-500 text-xs mt-1">of {totalCalories}</Text>
      </View>
    </View>
  );
};
