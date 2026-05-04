import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Id } from "@/convex/_generated/dataModel";

const Detail = () => {
  // ✅ Extract param
  const { mealId } = useLocalSearchParams<{ mealId: Id<"foods"> }>();
  const router = useRouter();
  return (
    <View className="bg-black flex-1 justify-center items-center">
      <Text onPress={() => router.replace("/history")} className="text-white">
        details of each meal : {mealId}
      </Text>
    </View>
  );
};

export default Detail;
