import { Text, View } from "react-native";

export const RightActions = () => (
  <View className="flex-row">
    <View className="bg-red-500 justify-center px-6 rounded-r-2xl">
      <Text className="text-white">Delete</Text>
    </View>
    <View className="bg-blue-500 justify-center px-6">
      <Text className="text-white">Edit</Text>
    </View>
  </View>
);
