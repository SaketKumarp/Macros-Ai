import { Button } from "@/components/ui/button";
import { useClerk, useUser } from "@clerk/expo";
import { Link, Redirect } from "expo-router";
import { Text, View } from "react-native";

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
    <View className="bg-red-300 flex min-h-screen justify-center items-center">
      <Text>welcome !{user?.fullName}</Text>
      <Button variant={"outline"} onPress={handleSignout}>
        <Text>Sign-Out</Text>
      </Button>
    </View>
  );
}
