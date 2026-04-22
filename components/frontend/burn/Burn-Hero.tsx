import { View, Text } from "react-native";
import { FlameProgress } from "./Flame_progress";

interface Props {
  burned: number;
  goal: number;
}

export const BurnHero = ({ burned, goal }: Props) => {
  const progress = Math.min(burned / goal, 1);

  return (
    <View className="items-center py-8">
      {/* 🔥 TOP ROW */}
      <View className="flex-row items-center justify-between w-full px-20">
        {/* LEFT - Burned */}
        <View className="items-center">
          <Text className="text-zinc-400 text-sm">Burned</Text>
          <Text className="text-3xl font-bold text-orange-500">{burned}</Text>
          <Text className="text-zinc-500 text-xs">kcal</Text>
        </View>

        {/* CENTER - Flame */}
        <View
          style={{
            shadowColor: "#f97316",
            shadowOpacity: 0.6,
            shadowRadius: 50,
          }}
        >
          <FlameProgress progress={progress} />
        </View>

        {/* RIGHT - Goal */}
        <View className="items-center">
          <Text className="text-zinc-400 text-sm">Goal</Text>
          <Text className="text-3xl font-bold text-white">{goal}</Text>
          <Text className="text-zinc-500 text-xs">kcal</Text>
        </View>
      </View>

      {/* 🔥 PERCENT BADGE */}
      <View className="bg-[#18181b] px-4 py-1 rounded-full mt-3 border border-[#27272a]">
        <Text className="text-orange-400 font-semibold">
          {Math.round(progress * 100)}%
        </Text>
      </View>

      {/* 🔥 MOTIVATION */}
      <Text className="text-zinc-400 mt-3 text-sm">
        🔥 You are doing great! Keep going!
      </Text>
    </View>
  );
};
