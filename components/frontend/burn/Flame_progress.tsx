import React from "react";
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";

interface ProgressProps {
  progress: number; // 0 → 1
}

export const FlameProgress = ({ progress }: ProgressProps) => {
  const height = 120;
  const fillLevel = height * (1 - progress);

  return (
    <Svg width={180} height={220} viewBox="0 0 100 120">
      <Defs>
        {/* 🔥 Gradient */}
        <LinearGradient id="grad" x1="0" y1="1" x2="0" y2="0">
          <Stop offset="0%" stopColor="#f97316" />
          <Stop offset="100%" stopColor="#fb923c" />
        </LinearGradient>

        {/* 🔥 Clip flame */}
        <ClipPath id="clip">
          <Path
            d="M50 5 
            C35 35, 15 50, 25 85 
            C35 110, 65 110, 75 85 
            C85 50, 65 35, 50 5 Z"
          />
        </ClipPath>
      </Defs>

      {/* 🔥 Flame outline */}
      <Path
        d="M50 5 
          C35 35, 15 50, 25 85 
          C35 110, 65 110, 75 85 
          C85 50, 65 35, 50 5 Z"
        fill="none"
        stroke="#fbbf24"
        strokeWidth={2}
      />

      {/* 🔥 Liquid fill with wave */}
      <Path
        d={`
          M0 ${fillLevel}
          Q25 ${fillLevel - 5} 50 ${fillLevel}
          Q75 ${fillLevel + 5} 100 ${fillLevel}
          L100 120
          L0 120
          Z
        `}
        fill="url(#grad)"
        clipPath="url(#clip)"
      />
    </Svg>
  );
};
