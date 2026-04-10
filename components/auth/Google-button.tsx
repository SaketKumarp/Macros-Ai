import { Pressable, Text, ActivityIndicator } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { useOAuth } from "@clerk/expo";
 

WebBrowser.maybeCompleteAuthSession();

export default function GoogleButton() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const [loading, setLoading] = useState(false);

  const onPress = async () => {
    try {
      setLoading(true);
      const { createdSessionId, setActive } = await startOAuthFlow();

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-xl py-3 active:opacity-80"
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text className="text-black text-center font-semibold">
          Continue with Google
        </Text>
      )}
    </Pressable>
  );
}
