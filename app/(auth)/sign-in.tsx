import { useState } from "react";
import {
  ActivityIndicator,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/expo";

import { AuthCard } from "@/components/auth/Auth-card";
import { AuthInput } from "@/components/auth/Auth-input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

const SignUp = () => {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loading = fetchStatus === "fetching";

  const onSignIn = async () => {
    try {
      await signIn.create({
        identifier: email,
        password,
      });

      router.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        <AuthCard title="Welcome Back 👋" description="Sign in to continue">
          <AuthInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
          />

          {errors?.fields?.identifier && (
            <Text className="text-red-500 text-sm">
              {errors.fields.identifier.message}
            </Text>
          )}

          <AuthInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {errors?.fields?.password && (
            <Text className="text-red-500 text-sm">
              {errors.fields.password.message}
            </Text>
          )}

          <Button
            onPress={onSignIn}
            disabled={!email || !password || loading}
            className="mt-3 bg-teal-500 rounded-xl py-3 active:opacity-80"
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-white text-center font-semibold">
                Login
              </Text>
            )}
          </Button>

          <View className="flex-row justify-center mt-3">
            <Text className="text-neutral-400">Already have an account? </Text>
            <Text
              className="text-teal-400 font-semibold"
              onPress={() => router.push("/sign-up")}
            >
              Create account
            </Text>
          </View>
        </AuthCard>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
