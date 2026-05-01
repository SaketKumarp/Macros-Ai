import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import {
  Bike,
  DumbbellIcon,
  Flame,
  FootprintsIcon,
  MoreVertical,
} from "lucide-react-native";
import { View, Pressable, Image } from "react-native";

type ActivityType = "walking" | "running" | "cycling" | "gym";

interface TodayActivityCardProps {
  data: {
    type: ActivityType;
    duration: string;
    burned: string;
  }[];
  onMenuPress?: (activity: ActivityType) => void; // 🔥 callback
}

const ActivityConfig: Record<
  ActivityType,
  { icon: any; label: string; color: string }
> = {
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

export const TodayActivityCard = ({
  data,
  onMenuPress,
}: TodayActivityCardProps) => {
  if (!data || data.length === 0) {
    return (
      <Card className="bg-[#111] px-4 py-4 rounded-2xl flex-1 ">
        <Image
          source={require("../../../assets/images/newLazy.png")}
          alt="lazy"
          width={20}
        />
        <Text className="text-[#777] text-sm">No activity yet</Text>
      </Card>
    );
  }

  return (
    <Card className="bg-[#111] px-4 py-4 rounded-2xl">
      <Text className="text-white font-semibold mb-4">Today Activity</Text>

      <View className="gap-y-4">
        {data.map((item, index) => {
          const config = ActivityConfig[item.type];
          const Icon = config.icon;

          return (
            <View
              key={`${item.type}-${index}`}
              className="flex-row items-center justify-between"
            >
              {/* LEFT */}
              <View className="flex-row items-center gap-3">
                <View
                  style={{ backgroundColor: config.color + "20" }}
                  className="p-2 rounded-full"
                >
                  <Icon size={18} color={config.color} />
                </View>

                <View>
                  <Text className="text-white text-sm font-medium">
                    {config.label}
                  </Text>
                  <Text className="text-[#888] text-xs">{item.duration}</Text>
                </View>
              </View>

              {/* RIGHT */}
              <View className="flex-row items-center gap-4">
                <View className="items-end">
                  <Text className="text-orange-400 text-sm font-semibold">
                    {item.burned}
                  </Text>
                  <Text className="text-[#777] text-xs">kcal</Text>
                </View>

                {/* 🔥 CLICKABLE 3 DOT */}
                <Pressable
                  onPress={() => onMenuPress?.(item.type)}
                  hitSlop={10}
                >
                  <MoreVertical size={18} color="#777" />
                </Pressable>
              </View>
            </View>
          );
        })}
      </View>
    </Card>
  );
};
