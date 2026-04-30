import { View, Text } from "react-native";
import { FlameProgress } from "./Flame_progress";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { cn } from "@/lib/utils";

interface Props {
  liveBurned: number;
  goal: number;
  totalBurned: number;
  isGoalReached?: boolean;
}

export const BurnHero = ({ liveBurned, totalBurned, goal }: Props) => {
  const isGoalReached = useSelector(
    (state: RootState) => state.calories.isGoalReached,
  );
  const progress = Math.min((totalBurned + liveBurned) / goal, 1);

  return (
    <View className="items-center py-6">
      {/* 🔥 TOP ROW */}
      <View className="flex-row items-center w-full">
        {/* LEFT */}
        <View className="flex-1 items-center">
          <Text className="text-zinc-400 text-sm">Burned</Text>
          <Text
            className={cn(
              "text-3xl font-bold",
              isGoalReached ? "text-[#00d2d3]" : " text-orange-500",
            )}
          >
            {Math.round(totalBurned)}
          </Text>
          <Text className="text-zinc-500 text-xs">kcal</Text>
        </View>

        {/* CENTER */}
        <View
          className="items-center justify-center"
          style={{
            shadowColor: "#f97316",
            shadowOpacity: 0.5,
            shadowRadius: 40,
          }}
        >
          <FlameProgress progress={progress} />
        </View>

        {/* RIGHT */}
        <View className="flex-1 items-center">
          <Text className="text-zinc-400 text-sm">Goal</Text>
          <Text className="text-3xl font-bold text-white">{goal}</Text>
          <Text className="text-zinc-500 text-xs">kcal</Text>
        </View>
      </View>

      {/* 🔥 PERCENT BADGE */}
      <View className=" bg-[#18181b] px-4 py-1 rounded-full border border-[#27272a]">
        <Text className="text-orange-400 font-semibold">
          {Math.round(progress * 100)}%
        </Text>
      </View>

      {/* 🔥 MOTIVATION */}
      <Text className="text-zinc-400 mt-2 text-sm">
        🔥 You are doing great! Keep going!
      </Text>
    </View>
  );
};
