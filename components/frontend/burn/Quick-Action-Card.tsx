import { View, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import {
  Footprints,
  Bike,
  Dumbbell,
  Plus,
  Activity,
} from "lucide-react-native";

const actions = [
  { label: "Walking", icon: Footprints },
  { label: "Running", icon: Activity },
  { label: "Cycling", icon: Bike },
  { label: "Gym", icon: Dumbbell },
  { label: "Yoga", icon: Footprints },
];

export const QuickActionCard = () => {
  return (
    <Card className="bg-[#202020] rounded-2xl px-6 py-4 mr-2 ml-2">
      {/* Header */}
      <View className="flex-row justify-between items-center ">
        <Text className="text-base font-semibold text-white">
          Quick Add Activity
        </Text>
      </View>

      {/* Actions */}
      <View className="flex-row justify-between">
        {actions.map((item, index) => {
          const Icon = item.icon;

          return (
            <TouchableOpacity
              key={index}
              className="items-center gap-1"
              activeOpacity={0.7}
            >
              {/* Icon container */}
              <View className="bg-[#2c2c2e] p-3 rounded-xl">
                <Icon size={20} color="#ff7a00" />
              </View>

              {/* Label */}
              <Text className="text-xs text-white">{item.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Card>
  );
};
