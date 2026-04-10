import { View } from "react-native";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface AuthCradProps {
  title: string;
  descrition: string;
  children: React.ReactNode;
}

export const Authcard = ({ title, descrition, children }: AuthCradProps) => {
  return (
    <View className="flex-1 items-center justify-center bg-black px-4">
      <Card className="w-full max-w-md bg-neutral-900 border border-neutral-900 rounded-2xl shadow-xl">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{descrition}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </View>
  );
};
