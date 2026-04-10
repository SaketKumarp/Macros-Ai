import { useState } from "react";
import { View, TextInput, ActivityIndicator } from "react-native";

import { useRouter } from "expo-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useSignUp } from "@clerk/expo";

const SignupPage = () => {
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);

      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      router.push("/verify-email");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-black px-4">
      <Card className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl">
        {/* HEADER */}
        <CardHeader>
          <CardTitle className="text-white text-2xl text-center">
            Create Account 🚀
          </CardTitle>
          <CardDescription className="text-neutral-400 text-center">
            Start your journey with us
          </CardDescription>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="gap-4">
          {/* EMAIL */}
          <View className="gap-1">
            <Text className="text-neutral-300 text-sm">Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="#888"
              className="bg-neutral-800 text-white px-4 py-3 rounded-xl border border-neutral-700"
            />
          </View>

          {/* PASSWORD */}
          <View className="gap-1">
            <Text className="text-neutral-300 text-sm">Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#888"
              secureTextEntry
              className="bg-neutral-800 text-white px-4 py-3 rounded-xl border border-neutral-700"
            />
          </View>

          {/* BUTTON */}
          <Button
            onPress={onSignUp}
            className="mt-4 bg-teal-500 rounded-xl py-3 active:opacity-80"
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-white text-center font-semibold">
                Sign Up
              </Text>
            )}
          </Button>

          {/* FOOTER LINK */}
          <View className="flex-row justify-center mt-2">
            <Text className="text-neutral-400">Already have an account? </Text>
            <Text
              className="text-teal-400 font-semibold"
              onPress={() => router.push("/sign-in")}
            >
              Sign In
            </Text>
          </View>
        </CardContent>
      </Card>
    </View>
  );
};

export default SignupPage;
