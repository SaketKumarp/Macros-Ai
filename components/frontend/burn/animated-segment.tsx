import React from "react";
import { Circle } from "react-native-svg";
import Animated, { useAnimatedProps } from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface SegmentProps {
  radius: number;
  circumference: number;
  percent: number;
  color: string;
  offset: number;
  progress: Animated.SharedValue<number>;
}

export const PieSegment = ({
  radius,
  circumference,
  percent,
  color,
  offset,
  progress,
}: SegmentProps) => {
  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDasharray: [
        circumference * percent * progress.value,
        circumference,
      ],
      strokeDashoffset: -offset * circumference,
    };
  });

  return (
    <AnimatedCircle
      cx="90"
      cy="90"
      r={radius}
      stroke={color}
      strokeWidth={20}
      fill="none"
      strokeLinecap="round"
      animatedProps={animatedProps}
    />
  );
};
