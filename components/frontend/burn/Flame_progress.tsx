import React, { useEffect } from "react";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  interpolate,
  Easing,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface ProgressProps {
  progress: number; // 0 → 1
}

export const FlameProgress = ({ progress }: ProgressProps) => {
  const isGoalReached = useSelector(
    (state: RootState) => state.calories.isGoalReached,
  );

  // 🔥 animated progress
  const progressSV = useSharedValue(0);

  // 🌊 wave animation
  const wave = useSharedValue(0);

  const prev = useSharedValue(0);

  useEffect(() => {
    if (Math.abs(progress - prev.value) > 0.01) {
      progressSV.value = withTiming(progress, {
        duration: 1200,
        easing: Easing.out(Easing.cubic),
      });
      prev.value = progress;
    }
  }, [progress, prev, progressSV]);

  const animatedProps = useAnimatedProps(() => {
    const fillLevel = interpolate(progressSV.value, [0, 1], [120, 10]);

    // 🌊 natural sine wave
    const baseAmplitude = 6;

    // reduce wave when settled (more premium feel)
    const settleFactor = interpolate(progressSV.value, [0, 1], [1.2, 0.6]);

    const w = Math.sin(wave.value) * baseAmplitude * settleFactor;

    return {
      d: `
      M0 ${fillLevel}
      C20 ${fillLevel + w} 40 ${fillLevel - w} 50 ${fillLevel}
      C60 ${fillLevel + w} 80 ${fillLevel - w} 100 ${fillLevel}
      L100 120
      L0 120
      Z
    `,
    };
  });
  return (
    <Svg width={180} height={220} viewBox="0 0 100 120">
      <Defs>
        {/* 🔥 Gradient */}
        <LinearGradient id="grad" x1="0" y1="1" x2="0" y2="0">
          {isGoalReached
            ? [
                <Stop key="g1" offset="0%" stopColor="#22c55e" />,
                <Stop key="g2" offset="50%" stopColor="#4ade80" />,
                <Stop key="g3" offset="100%" stopColor="#bbf7d0" />,
              ]
            : [
                <Stop key="o1" offset="0%" stopColor="#f97316" />,
                <Stop key="o2" offset="50%" stopColor="#fb923c" />,
                <Stop key="o3" offset="100%" stopColor="#fde68a" />,
              ]}
        </LinearGradient>

        {/* 🔥 Improved flame shape */}
        <ClipPath id="clip">
          <Path
            d="
            M50 5
            C30 35, 15 55, 25 85
            C35 110, 65 110, 75 85
            C85 55, 70 35, 50 5 Z
          "
          />
        </ClipPath>
      </Defs>

      {/* 🔥 Outer glow */}
      <Path
        d="
          M50 5
          C30 35, 15 55, 25 85
          C35 110, 65 110, 75 85
          C85 55, 70 35, 50 5 Z
        "
        fill="none"
        stroke={isGoalReached ? "#22c55e" : "#fbbf24"}
        strokeWidth={2}
        strokeOpacity={0.6}
      />

      {/* 🔥 Animated fill */}
      <AnimatedPath
        animatedProps={animatedProps}
        fill="url(#grad)"
        clipPath="url(#clip)"
      />
    </Svg>
  );
};
