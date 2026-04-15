import { MacroCard } from "@/components/frontend/Macro-card";
import { MacroRing } from "@/components/frontend/Macro-ring";
import { Button } from "@/components/ui/button";
import { useToast } from "@/providers/toast";
import { useClerk, useUser } from "@clerk/expo";
import { Redirect } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function Index() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { showToast } = useToast();

  const totalCalories = 2000;
  const eatenCalories = 1450;

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }
  const handleSignOut = () => {
    signOut();
    showToast("logged out", "success");
  };

  return (
    <View className="flex-1 bg-black px-6 pt-16">
      {/* 🔥 Header */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-white text-2xl font-bold">Today</Text>
          <Text className="text-gray-400 mt-1">Track your nutrition</Text>
        </View>

        {/* 👤 Profile Button */}
        <TouchableOpacity onPress={handleSignOut}>
          <Image
            source={{ uri: user?.imageUrl }}
            className="w-10 h-10 rounded-full border border-gray-600"
          />
        </TouchableOpacity>
      </View>

      {/* 🔵 Macro Ring */}
      <View className="items-center mt-10">
        <MacroRing
          totalCalories={totalCalories}
          eatenCalories={eatenCalories}
        />
        <Button
          onPress={() => {
            showToast("Welcome back 🔥", "success");
          }}
        >
          <Text className="text-white">showTaost</Text>
        </Button>
      </View>

      {/* 🟣 Macro Cards */}
      <View className="flex-row justify-between mt-10">
        <MacroCard label="Protein" value={90} color="#ff6b6b" />

        <MacroCard label="Carbs" value={180} color="#feca57" />
        <MacroCard label="Fat" value={60} color="#1dd1a1" />
      </View>
    </View>
  );
}
