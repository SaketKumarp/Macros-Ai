import { useState } from "react";
import {
  ActivityIndicator,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Href, useRouter } from "expo-router";
import { useSignIn, useOAuth } from "@clerk/expo";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useToast } from "@/providers/toast";
import { Authcard } from "@/components/auth/Auth-newCard";

import { Authinput } from "@/components/auth/Auth-newInput";

// Must be at the top — closes the browser tab after redirect
WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
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

  const handleOAuth = async (provider: "google" | "facebook") => {
    try {
      setSocialLoading(provider);
      const startFlow =
        provider === "google" ? startGoogleFlow : startFacebookFlow;

      // This is the key fix — explicitly pass the redirectUrl
      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: "macrotrack", // must match "scheme" in your app.json
        path: "/(auth)/sign-in",
      });

      const result = await startFlow({ redirectUrl });

      // result can be undefined if user cancels
      if (!result) return;

      const { createdSessionId, setActive } = result;

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        showToast("welcome back⚡️", "success");
        router.replace("/" as Href);
      } else {
        // This means sign-up is required (new user) — redirect to sign-up
        showToast("Please complete sign up", "info");
        router.push("/sign-up" as Href);
      }
    } catch (err: any) {
      console.error("OAuth error:", JSON.stringify(err, null, 2));
      showToast(err?.message ?? `${provider} sign-in failed`, "error");
    } finally {
      setSocialLoading(null);
    }
  };

  const onSignIn = async () => {
    const { error } = await signIn.password({ emailAddress, password });
    if (error) {
      showToast("error :", "info", error);
      return;
    }
    try {
      if (signIn.status === "complete") {
        await signIn.finalize({
          navigate: ({ decorateUrl, session }) => {
            if (session?.currentTask) return;
            const url = decorateUrl("/");
            if (url.startsWith("http")) {
              window.location.href = url;
            } else {
              router.push(url as Href);
              showToast("welcome back⚡️", "success");
            }
          },
        });
      }
    } catch (error) {
      console.log("login error", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        <Authcard
          title="Welcome Back 👋"
          description="Sign in to continue"
          onGooglePress={() => handleOAuth("google")}
          onFacebookPress={() => handleOAuth("facebook")}
          socialLoading={socialLoading}
        >
          <Authinput
            label="Email"
            value={emailAddress}
            onChangeText={setEmailAddress}
            placeholder="you@example.com"
          />
          {errors?.fields?.identifier && (
            <Text style={{ color: "#f87171", fontSize: 12 }}>
              {errors.fields.identifier.message}
            </Text>
          )}
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

          <Button
            onPress={onSignIn}
            className="mt-1 rounded-xl py-3 active:opacity-75"
            style={{
              backgroundColor: "rgba(29, 158, 117, 0.9)",
              borderWidth: 0.75,
              borderColor: "rgba(93, 202, 165, 0.4)",
              shadowColor: "#1D9E75",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.4,
              shadowRadius: 14,
              elevation: 8,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-center font-semibold text-base">
                Sign In
              </Text>
            )}
          </Button>

          <View className="flex-row justify-center mt-1">
            <Text style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
              No account?{" "}
            </Text>
            <Text
              style={{ color: "#5DCAA5", fontSize: 13, fontWeight: "600" }}
              onPress={() => router.push("/sign-up")}
            >
              Create one
            </Text>
          </View>
        </Authcard>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
