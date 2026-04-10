import { useAuth, useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import { View, Text, TextInput } from "react-native";

const SignupPage = () => {
  const { signUp, fetchStatus, errors } = useSignUp();
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center ">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
  );
};

export default SignupPage;
