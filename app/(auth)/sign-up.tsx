import { useState } from "react";
import {
  ActivityIndicator,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Href, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useToast } from "@/providers/toast";
import { Authcard } from "@/components/auth/Auth-newCard";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOAuth, useSignUp } from "@clerk/expo";
import { Authinput } from "@/components/auth/Auth-newInput";
import { checkNewUser } from "@/convex/test";

WebBrowser.maybeCompleteAuthSession();

const SignUp = () => {
  // const addUser = useMutation(api.test.addUser);

  const checkNewUser = useMutation(api.test.checkNewUser);
  const { signUp, errors, fetchStatus } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setName] = useState("");
  const [socialLoading, setSocialLoading] = useState<
    "google" | "facebook" | null
  >(null);

  const { showToast } = useToast();

  const { startOAuthFlow: startGoogleFlow } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: startFacebookFlow } = useOAuth({
    strategy: "oauth_facebook",
  });

  const loading = fetchStatus === "fetching";

  // 🔥 OAuth handler (same as sign-in)
  const handleOAuth = async (provider: "google" | "facebook") => {
    try {
      setSocialLoading(provider);

      const startFlow =
        provider === "google" ? startGoogleFlow : startFacebookFlow;

      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: "macrotrack",
        path: "/(auth)/sign-up",
      });

      const result = await startFlow({ redirectUrl });

      if (!result) return;

      const { createdSessionId, setActive } = result;

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        const res = await checkNewUser();
        console.log(res);
        if (res.isNewUser) {
          router.push("/screens/onboarding");
          showToast("Account created ⚡️", "success");
        } else {
          router.replace("/" as Href);
          showToast("Welcome back ⚡️", "success");
        }

        // if user exists
        // addUser({
        //   weight: 80,
        //   age: 24,
        // });
      } else {
        showToast("Please complete sign up", "info");
      }
    } catch (err: any) {
      console.error("OAuth error:", err);
      showToast(err?.message ?? `${provider} sign-up failed`, "error");
    } finally {
      setSocialLoading(null);
    }
  };

  const onSignUp = async () => {
    try {
      const { error } = await signUp.password({
        firstName,
        emailAddress,
        password,
      });

      if (error) {
        showToast("Error", "info", error);
        return;
      }

      await signUp.verifications.sendEmailCode();
      showToast("Code has been sent", "info");
      router.push("/verify-email");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        <Authcard
          title="Create Account 🚀"
          description="Start your fitness journey"
          onGooglePress={() => handleOAuth("google")}
          onFacebookPress={() => handleOAuth("facebook")}
          socialLoading={socialLoading}
        >
          {/* Name */}
          <Authinput
            label="Name"
            value={firstName}
            onChangeText={setName}
            placeholder="Your name"
          />

          {/* Email */}
          <Authinput
            label="Email"
            value={emailAddress}
            onChangeText={setEmailAddress}
            placeholder="you@example.com"
          />

          {errors?.fields?.emailAddress && (
            <Text style={{ color: "#f87171", fontSize: 12 }}>
              {errors.fields.emailAddress.message}
            </Text>
          )}

          {/* Password */}
          <Authinput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {errors?.fields?.password && (
            <Text style={{ color: "#f87171", fontSize: 12 }}>
              {errors.fields.password.message}
            </Text>
          )}

          {/* CTA */}
          <Button
            onPress={onSignUp}
            disabled={!emailAddress || !password || loading}
            className="mt-3 rounded-2xl py-4 items-center justify-center active:opacity-80"
            style={{
              backgroundColor: "#1abc9c",
              shadowColor: "#1abc9c",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.5,
              shadowRadius: 16,
              elevation: 10,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text className="text-black font-semibold text-base">
                Create Account
              </Text>
            )}
          </Button>

          {/* Switch */}
          <View className="flex-row justify-center mt-2">
            <Text style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
              Already have an account?{" "}
            </Text>
            <Text
              style={{
                color: "#5DCAA5",
                fontSize: 13,
                fontWeight: "600",
              }}
              onPress={() => router.push("/sign-in")}
            >
              Login
            </Text>
          </View>
        </Authcard>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
