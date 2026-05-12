import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TextInput,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const goals = ["Lose Weight", "Build Muscle", "Stay Fit", "Improve Strength"];

const Onboarding = () => {
  const router = useRouter();

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const addUser = useMutation(api.test.addUser);

  const disabled = !age || !weight || !height || !goal;

  const handleContinue = async () => {
    // later call convex addUser here

    await addUser({
      age: Number(age),
      weight: Number(weight),
      height: Number(height),
      
      goal,
    });

    router.replace("/");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={["#0f172a", "#111827", "#000000"]}
        className="flex-1"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              padding: 24,
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View className="mb-10">
              <View
                className="w-20 h-20 rounded-full items-center justify-center mb-6"
                style={{
                  backgroundColor: "rgba(26,188,156,0.15)",
                }}
              >
                <Ionicons name="fitness" size={40} color="#1abc9c" />
              </View>

              <Text className="text-white text-4xl font-bold mb-3">
                Welcome 🚀
              </Text>

              <Text
                className="text-base leading-6"
                style={{
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                Let’s personalize your fitness journey and build your perfect
                macro plan.
              </Text>
            </View>

            {/* Card */}
            <View
              className="rounded-3xl p-6"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              {/* Age */}
              <View className="mb-5">
                <Text className="text-white mb-2 font-semibold text-sm">
                  Age
                </Text>

                <TextInput
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                  placeholder="Enter your age"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  className="rounded-2xl px-4 py-4 text-white text-base"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                  }}
                />
              </View>

              {/* Weight */}
              <View className="mb-5">
                <Text className="text-white mb-2 font-semibold text-sm">
                  Weight (kg)
                </Text>

                <TextInput
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                  placeholder="Current body weight"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  className="rounded-2xl px-4 py-4 text-white text-base"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                  }}
                />
              </View>

              {/* Height */}
              <View className="mb-6">
                <Text className="text-white mb-2 font-semibold text-sm">
                  Height (cm)
                </Text>

                <TextInput
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="numeric"
                  placeholder="Your height"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  className="rounded-2xl px-4 py-4 text-white text-base"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                  }}
                />
              </View>

              {/* Goals */}
              <View className="mb-8">
                <Text className="text-white mb-4 font-semibold text-sm">
                  Fitness Goal
                </Text>

                <View className="flex-row flex-wrap gap-3">
                  {goals.map((item) => {
                    const active = goal === item;

                    return (
                      <Text
                        key={item}
                        onPress={() => setGoal(item)}
                        className="px-4 py-3 rounded-2xl overflow-hidden"
                        style={{
                          backgroundColor: active
                            ? "#1abc9c"
                            : "rgba(255,255,255,0.06)",
                          color: active ? "#000" : "#fff",
                          fontWeight: "600",
                        }}
                      >
                        {item}
                      </Text>
                    );
                  })}
                </View>
              </View>

              {/* CTA */}
              <Button
                disabled={disabled}
                onPress={handleContinue}
                className="rounded-2xl py-4 items-center justify-center"
                style={{
                  backgroundColor: disabled
                    ? "rgba(26,188,156,0.4)"
                    : "#1abc9c",

                  shadowColor: "#1abc9c",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: 0.5,
                  shadowRadius: 20,
                  elevation: 10,
                }}
              >
                <Text className="text-black font-bold text-base">Continue</Text>
              </Button>
            </View>

            {/* Footer */}
            <Text
              className="text-center mt-6 text-sm"
              style={{
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Your data helps us create accurate calorie & macro targets.
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default Onboarding;
