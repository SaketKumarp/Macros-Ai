import { View, Text } from "react-native";
import { ActivityItem, Item } from "./Activity-Item";

interface ActivityListProps {
  data: Item[];
}

export default function ActivityList({ data }: ActivityListProps) {
  return (
    <View className="bg-card mx-4 p-4 rounded-2xl mt-4">
      <Text className=" text-white font-semibold mb-2"> Activities</Text>

      {data.map((item, index) => (
        <ActivityItem key={index} items={item} />
      ))}
    </View>
  );
}
