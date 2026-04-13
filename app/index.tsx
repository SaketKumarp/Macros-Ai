import { Button } from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/expo";
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

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-up"} />;
  }
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image
        source={{ uri: user?.imageUrl }}
        className="w-28 h-28 rounded-full border-4 border-[#1abc9c]"
      />

      <Text className="text-2xl font-semibold mt-4">{user?.fullName}</Text>

      <Text className="text-gray-500 mt-1">
        {user?.primaryEmailAddress?.emailAddress}
      </Text>
      <Button variant={"outline"} onPress={handleSignout}>
        <Text>Sign-out</Text>
      </Button>
    </View>
  );
}
