import { useState } from "react";
import {
  View,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Href, useRouter } from "expo-router";
import { useSignUp } from "@clerk/expo";

import { AuthCard } from "@/components/auth/Auth-card";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useToast } from "@/providers/toast";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Authinput } from "@/components/auth/Auth-newInput";

const VerifyEmail = () => {
  const { signUp, fetchStatus } = useSignUp();
  const router = useRouter();

  const [code, setCode] = useState("");
  const { showToast } = useToast();

  const loading = fetchStatus === "fetching";

  const addUser = useMutation(api.test.addUser);

  const onVerify = async () => {
    try {
      await signUp.verifications.verifyEmailCode({
        code,
      });

      if (signUp.status === "complete") {
        await signUp.finalize({
          navigate: ({ decorateUrl, session }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }
            const url = decorateUrl("/screens/newuser");
            if (url.startsWith("http")) {
              window.location.href = url;
            } else {
              router.push(url as Href);
            }
          },
        });

        addUser({
          weight: 80,
          age: 24,
        });
        router.replace("/");
        showToast("account Created🔥", "success");
      } else {
        console.error("Sign-up attempt not complete:", signUp);
      }
    } catch (err) {
      console.log(err);
      showToast(err, "error");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        <AuthCard
          title="Verify your email 📩"
          description="Enter the OTP sent to your email"
        >
          <Authinput
            label="OTP Code"
            value={code}
            onChangeText={setCode}
            placeholder="Enter 6-digit code"
            keyboardType="number-pad"
          />

          <Button
            onPress={onVerify}
            disabled={!code || loading}
            className="mt-3 bg-teal-500 rounded-xl py-3 active:opacity-80"
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-white text-center font-semibold">
                Verify
              </Text>
            )}
          </Button>

          <Text className="text-center text-neutral-400 mt-3">
            Didn’t receive code? Check spam or try again.
          </Text>
        </AuthCard>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VerifyEmail;
