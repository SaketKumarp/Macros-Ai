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

interface TodayActivityCardProps {
  data: {
    type: "walking" | "running" | "cycling" | "gym";
    duration: string;
    burned: string;
  }[];
}

const ActivityConfigue = {
  running: {
    icon: Flame,
    label: "Running",
    color: "#eb4d4b",
  },
  walking: {
    icon: FootprintsIcon,
    label: "Walking",
    color: "#8e44ad",
  },
  cycling: {
    icon: Bike,
    label: "Cycling",
    color: "#2ecc71",
  },
  gym: {
    icon: DumbbellIcon,
    label: "Gym",
    color: "#3498db",
  },
};

export const TodayActivityCard = ({ data }: TodayActivityCardProps) => {
  return (
    <Card className="bg-[#111] px-4 py-4 rounded-2xl">
      <Text className="text-white font-semibold mb-4">Today Activity</Text>

      <View className="gap-y-4">
        {data.map((item) => {
          const configue = ActivityConfigue[item.activity];
          const Icon = configue.icon;

          return (
            <View
              key={configue.label}
              className="flex-row items-center justify-between"
            >
              {/* LEFT: icon + label + duration */}
              <View className="flex-row items-center gap-3">
                {/* icon box (FIXED using style, not className) */}
                <View
                  style={{ backgroundColor: configue.color + "20" }} // light tint
                  className="p-2 rounded-full"
                >
                  <Icon size={18} color={configue.color} />
                </View>

                <View>
                  <Text className="text-white text-sm font-medium">
                    {configue.label}
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
