import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { DetectItem } from "./Detect-Item";

export default function DetectBar() {
  return (
    <LinearGradient
      colors={["#0f172a", "#020617"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="p-4 rounded-2xl"
      style={{
        borderWidth: 1,
        borderColor: "#1f2937",
      }}
    >
      {/* Title */}
      <Text className="text-gray-400 w-full text-sm mb-2">AI can detect</Text>

      {/* Row */}
      <View className="flex-row items-center justify-between mt-2">
        <DetectItem icon="flame" label="Calories" color="#ff6b6b" />
        <DetectItem icon="barbell" label="Protein" color="#54a0ff" />
        <DetectItem icon="leaf" label="Carbs" color="#feca57" />
        <DetectItem icon="water" label="Fats" color="#1dd1a1" />
        <DetectItem icon="pricetag" label="Type" color="#a78bfa" />
      </View>
    </LinearGradient>
  );
}
