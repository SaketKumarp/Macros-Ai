import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import {
  Bike,
  DumbbellIcon,
  Flame,
  FootprintsIcon,
  MoreVertical,
} from "lucide-react-native";
import { View } from "react-native";

const activities = [
  {
    icon: Flame,
    label: "Running",
    duration: "30 min",
    burned: "240",
    color: "#eb4d4b",
  },
  {
    icon: FootprintsIcon,
    label: "Walking",
    duration: "20 min",
    burned: "80",
    color: "#8e44ad",
  },
  {
    icon: Bike,
    label: "Cycling",
    duration: "25 min",
    burned: "120",
    color: "#2ecc71",
  },
  {
    icon: DumbbellIcon,
    label: "Gym",
    duration: "45 min",
    burned: "500",
    color: "#3498db",
  },
];

export const TodayActivityCard = () => {
  return (
    <Card className="bg-[#111] px-4 py-4 rounded-2xl">
      <Text className="text-white font-semibold mb-4">Today Activity</Text>

      <View className="gap-y-4">
        {activities.map((item, index) => {
          const Icon = item.icon;

          return (
            <View
              key={item.label}
              className="flex-row items-center justify-between"
            >
              {/* LEFT: icon + label + duration */}
              <View className="flex-row items-center gap-3">
                {/* icon box (FIXED using style, not className) */}
                <View
                  style={{ backgroundColor: item.color + "20" }} // light tint
                  className="p-2 rounded-full"
                >
                  <Icon size={18} color={item.color} />
                </View>

                <View>
                  <Text className="text-white text-sm font-medium">
                    {item.label}
                  </Text>
                  <Text className="text-[#888] text-xs">{item.duration}</Text>
                </View>
              </View>

              {/* RIGHT: calories + menu */}
              <View className="flex-row items-center gap-4">
                <View className="items-end">
                  <Text className="text-orange-400 text-sm font-semibold">
                    {item.burned}
                  </Text>
                  <Text className="text-[#777] text-xs">kcal</Text>
                </View>

                {/* three dots */}
                <MoreVertical size={18} color="#777" />
              </View>
            </View>
          );
        })}
      </View>
    </Card>
  );
};
