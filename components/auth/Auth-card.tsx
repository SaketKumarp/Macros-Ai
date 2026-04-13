import { Image, View } from "react-native";

import { Text } from "../ui/text";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const AuthCard = ({ title, description, children }: AuthCardProps) => {
  return (
    <View className="flex-1 items-center justify-center bg-black px-4">
      <View className="absolute w-[300px] h-[300px] bg-teal-500/20 rounded-full blur-3xl top-10 -left-10" />
      <View className="absolute w-[250px] h-[250px] bg-purple-500/10 rounded-full blur-3xl bottom-10 -right-10" />

      <View className="items-center mb-6">
        <View className="w-14 h-14 bg-teal-500 rounded-2xl items-center justify-center mb-3 shadow-lg">
          <Image
            source={require("../../assets/images/macro.png")}
            className="w-20 h-20"
            resizeMode="contain"
          />
        </View>

        <Text className="text-white text-2xl font-bold">MacroTrack</Text>

        <Text className="text-neutral-400 text-sm">
          Track calories. Build discipline.
        </Text>
      </View>

      <Card className="w-full max-w-md bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-3xl shadow-2xl px-1">
        <CardHeader className="items-center gap-2 pt-6">
          <CardTitle>
            <Text className="text-white text-xl font-bold text-center">
              {title}
            </Text>
          </CardTitle>

          <CardDescription>
            <Text className="text-neutral-400 text-sm text-center">
              {description}
            </Text>
          </CardDescription>
        </CardHeader>

        <View className="h-[1px] bg-neutral-800 mx-6 my-2" />

        <CardContent className="gap-4 px-4 pb-6">{children}</CardContent>
      </Card>
    </View>
  );
};
