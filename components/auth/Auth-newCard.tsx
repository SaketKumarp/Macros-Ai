import { Image, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "../ui/text";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onGooglePress?: () => void;
  onFacebookPress?: () => void;
  socialLoading?: "google" | "facebook" | null;
}
const GoogleIcon = () => (
  <Image
    source={require("../../assets/images/google.png")}
    style={{ width: 18, height: 18 }}
    resizeMode="contain"
  />
);

const FacebookIcon = () => (
  <Image
    source={require("../../assets/images/facebook.png")}
    style={{ width: 25, height: 25 }}
    resizeMode="contain"
  />
);

export const Authcard = ({
  title,
  description,
  children,
  onGooglePress,
  onFacebookPress,
  socialLoading,
}: AuthCardProps) => {
  return (
    <LinearGradient
      colors={["#0f2027", "#203a43", "#2c5364"]}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
      style={{ flex: 1 }}
    >
      {/* Ambient glow blobs */}
      <View
        className="absolute w-[280px] h-[280px] rounded-full top-[-80px] right-[-80px]"
        style={{ backgroundColor: "rgba(29, 158, 117, 0.18)" }}
      />
      <View
        className="absolute w-[220px] h-[220px] rounded-full bottom-[60px] left-[-60px]"
        style={{ backgroundColor: "rgba(52, 211, 153, 0.10)" }}
      />
      <View
        className="absolute w-[160px] h-[160px] rounded-full top-[35%] right-[-40px]"
        style={{ backgroundColor: "rgba(14, 116, 144, 0.15)" }}
      />

      <View className="flex-1 items-center justify-center px-5">
        {/* Logo section */}
        <View className="items-center mb-8">
          <View
            className="w-16 h-16 rounded-2xl items-center justify-center mb-4"
            style={{}}
          >
            <Image
              source={require("../../assets/images/yoga-pose.png")}
              className="w-20 h-20"
              resizeMode="contain"
            />
          </View>
          <Text className="text-white text-2xl font-bold tracking-tight">
            MacroTrack
          </Text>
          <Text
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 13,
              marginTop: 3,
            }}
          >
            Track calories. Build discipline.
          </Text>
        </View>

        {/* Frosted glass card */}
        <Card
          className="w-full max-w-md rounded-3xl"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            borderWidth: 0.75,
            borderColor: "rgba(255, 255, 255, 0.15)",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 20 },
            shadowOpacity: 0.4,
            shadowRadius: 40,
            elevation: 16,
          }}
        >
          <CardHeader className="items-center pt-6 pb-2 gap-1">
            <CardTitle>
              <Text className="text-white text-xl font-bold text-center">
                {title}
              </Text>
            </CardTitle>
            <CardDescription>
              <Text
                style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}
                className="text-center"
              >
                {description}
              </Text>
            </CardDescription>
          </CardHeader>

          <View
            className="mx-6 my-2"
            style={{ height: 0.5, backgroundColor: "rgba(255,255,255,0.10)" }}
          />

          <CardContent className="gap-4 px-5 pb-6">
            {/* Social buttons */}
            <View className="flex-row gap-3">
              {/* Google */}
              <TouchableOpacity
                onPress={onGooglePress}
                activeOpacity={0.75}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  paddingVertical: 11,
                  borderRadius: 12,
                  backgroundColor: "rgba(255,255,255,0.10)",
                  borderWidth: 0.75,
                  borderColor: "rgba(255,255,255,0.18)",
                }}
              >
                {socialLoading === "google" ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <GoogleIcon />
                    <Text
                      style={{ color: "#fff", fontSize: 13, fontWeight: "600" }}
                    >
                      Google
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              {/* Facebook */}
              <TouchableOpacity
                onPress={onFacebookPress}
                activeOpacity={0.75}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  paddingVertical: 11,
                  borderRadius: 12,
                  backgroundColor: "rgba(255,255,255,0.10)",
                  borderWidth: 0.75,
                  borderColor: "rgba(255,255,255,0.18)",
                }}
              >
                {socialLoading === "facebook" ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <FacebookIcon />
                    <Text
                      style={{ color: "#fff", fontSize: 13, fontWeight: "600" }}
                    >
                      Facebook
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View className="flex-row items-center gap-3">
              <View
                style={{
                  flex: 1,
                  height: 0.5,
                  backgroundColor: "rgba(255,255,255,0.12)",
                }}
              />
              <Text
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: 11,
                  letterSpacing: 1,
                }}
              >
                OR
              </Text>
              <View
                style={{
                  flex: 1,
                  height: 0.5,
                  backgroundColor: "rgba(255,255,255,0.12)",
                }}
              />
            </View>

            {/* Email/password fields go here */}
            {children}
          </CardContent>
        </Card>
      </View>
    </LinearGradient>
  );
};
