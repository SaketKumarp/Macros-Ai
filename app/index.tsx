import { Button } from "@/components/ui/button";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="bg-red-300 flex min-h-screen justify-center items-center">
      <Link href={"/(auth)/sign-up"}>
        <Text>hey</Text>
      </Link>
    </View>
  );
}
