import { View, Text } from "react-native";
export type Item = {
  name: string;
  duration: number;
  calories: number;
};

interface ActivityItemProps {
  items: Item;
}
export const ActivityItem = ({ items }: ActivityItemProps) => {
  return (
    <View className="flex-row  justify-between py-3 border-b border-border">
      <Text className="text-white">{items.name}</Text>
      <Text className="text-white">{items.duration} min</Text>
      <Text className="text-orange-500">{items.calories} kcal</Text>
    </View>
  );
};
