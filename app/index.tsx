import { MacroRing } from "@/components/frontend/Macro-ring";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useClerk, useUser } from "@clerk/expo";
import { useQuery } from "convex/react";
import { Redirect } from "expo-router";
import { Text, View, Image } from "react-native";

export default function Index() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const handleSignout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.log("error in sign-out", err);
    }
  };
  const identity = useQuery(api.test.test);

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-up"} />;
  }
  return (
    <View className="flex-1 bg-black pt-16 items-center">
      <MacroRing progress={0.55} caloriesLeft={828} />
    </View>
  );
}
