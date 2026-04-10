import { useState } from "react";
import {
  ActivityIndicator,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/expo";

import { AuthCard } from "@/components/auth/Auth-card";
import { AuthInput } from "@/components/auth/Auth-input";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

const SignUp = () => {
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const loading = fetchStatus === "fetching";

  const onSignUp = async () => {
    try {
      const { error } = await signUp.password({
        emailAddress,
        password,
      });
      if (error) {
        console.error(JSON.stringify(error, null, 2));
        return;
      }

      if (!error) {
        await signUp.verifications.sendEmailCode();
      }

      router.push("/verify-email");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        <AuthCard
          title="Create Account 🚀"
          description="Sign up to get started"
        >
          <AuthInput
            label="Email"
            value={emailAddress}
            onChangeText={setEmailAddress}
            placeholder="you@example.com"
          />

          {errors?.fields?.emailAddress && (
            <Text className="text-red-500 text-sm">
              {errors.fields.emailAddress.message}
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
            onPress={onSignUp}
            disabled={!emailAddress || !password || loading}
            className="mt-3 bg-teal-500 rounded-xl py-3 active:opacity-80"
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-white text-center font-semibold">
                Create Account
              </Text>
            )}
          </Button>

          <View className="flex-row justify-center mt-3">
            <Text className="text-neutral-400">Already have an account? </Text>
            <Text
              className="text-teal-400 font-semibold"
              onPress={() => router.push("/sign-in")}
            >
              Login
            </Text>
          </View>
        </AuthCard>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
