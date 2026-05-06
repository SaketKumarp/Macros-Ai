import { Text, View } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

export const AnimatedMacroBar = ({ label, value, total }: any) => {
  const width = useSharedValue(0);
  const percentage = total ? (value / total) * 100 : 0;

  width.value = withTiming(percentage, { duration: 800 });

  const style = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View className="mb-4">
      <View className="flex-row justify-between mb-1">
        <Text className="text-gray-400">{label}</Text>
        <Text className="text-white">{value}g</Text>
      </View>

      <View className="h-2 bg-[#222] rounded-full overflow-hidden">
        <Animated.View style={[style]} className="h-full bg-[#00d2d3]" />
      </View>
    </View>
  );
};
