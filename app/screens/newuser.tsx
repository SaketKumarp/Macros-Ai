import { View, Text } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Button } from "@/components/ui/button";

const Newuser = () => {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center">
      <Text>new user should navigate here !</Text>
      <Button
        onPress={() => {
          router.push("/(tabs)");
        }}
      >
        <Text>Home</Text>
      </Button>
    </View>
  );
};

export default Newuser;
