import { View, Text } from "react-native";
import { FlameProgress } from "./Flame_progress";

interface Props {
  burned: number;
  goal: number;
}

export const BurnHero = ({ burned, goal }: Props) => {
  const progress = Math.min(burned / goal, 1);

  return (
    <View className="items-center py-6">
      <FlameProgress progress={progress} />

      <Text className="text-white text-3xl font-bold mt-4">{burned} kcal</Text>

      <Text className=" text-white text-muted-foreground">
        Goal: {goal} kcal
      </Text>

      <Text className="mt-2 text-orange-500 font-semibold">
        {Math.round(progress * 100)}%
      </Text>
    </View>
  );
};
