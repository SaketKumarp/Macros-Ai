import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  color: string;
};

export function DetectItem({ icon, label, color }: Props) {
  return (
    <View className="flex-row items-center mr-3">
      <Ionicons name={icon} size={16} color={color} />
      <Text className="text-gray-300 text-sm ml-1">{label}</Text>
    </View>
  );
}
