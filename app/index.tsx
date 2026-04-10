import { useUser } from "@clerk/expo";
import { Link, Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const { isSignedIn } = useUser();
  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-up"} />;
  }
  return (
    <View className="bg-red-300 flex min-h-screen justify-center items-center">
      <Link href={"/sign-up"}>
        <Text>hey</Text>
      </Link>
    </View>
  );
}
