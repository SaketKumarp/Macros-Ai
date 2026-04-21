import { View, Text, TouchableOpacity } from "react-native";

const actions = ["Walking", "Running", "Cycling", "Gym"];

export const QuickActions = () => {
  return (
    <View className="flex-row flex-wrap justify-between px-4">
      {actions.map((item) => (
        <TouchableOpacity
          key={item}
          className="bg-card p-4 rounded-2xl w-[22%] items-center mb-3"
        >
          <Text className="text-sm text-white">{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
