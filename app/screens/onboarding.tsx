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
  Pressable,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const goals = ["Cut", "Bulk"];

const Onboarding = () => {
  const router = useRouter();

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const addUser = useMutation(api.test.addUser);

  const disabled = !age || !weight || !height || !goal;

  const handleContinue = async () => {
    try {
      addUser({
        age: Number(age),
        weight: Number(weight),
        height: Number(height),
        goal,
      });

      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={["#0f172a", "#111827", "#000000"]}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
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
            <View style={{ marginBottom: 40 }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 24,
                  backgroundColor: "rgba(26,188,156,0.15)",
                }}
              >
                <Ionicons name="fitness" size={40} color="#1abc9c" />
              </View>

              <Text
                style={{
                  color: "white",
                  fontSize: 36,
                  fontWeight: "bold",
                  marginBottom: 12,
                }}
              >
                Welcome 🚀
              </Text>

              <Text
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 16,
                  lineHeight: 24,
                }}
              >
                Let’s personalize your fitness journey and build your perfect
                macro plan.
              </Text>
            </View>

            {/* Card */}
            <View
              style={{
                borderRadius: 24,
                padding: 24,
                backgroundColor: "rgba(255,255,255,0.05)",
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              {/* Age */}
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    color: "white",
                    marginBottom: 8,
                    fontWeight: "600",
                    fontSize: 14,
                  }}
                >
                  Age
                </Text>

                <TextInput
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                  placeholder="Enter your age"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  style={{
                    borderRadius: 16,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    color: "white",
                    fontSize: 16,
                    backgroundColor: "rgba(255,255,255,0.06)",
                  }}
                />
              </View>

              {/* Weight */}
              <View style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    color: "white",
                    marginBottom: 8,
                    fontWeight: "600",
                    fontSize: 14,
                  }}
                >
                  Weight (kg)
                </Text>

                <TextInput
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                  placeholder="Current body weight"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  style={{
                    borderRadius: 16,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    color: "white",
                    fontSize: 16,
                    backgroundColor: "rgba(255,255,255,0.06)",
                  }}
                />
              </View>

              {/* Height */}
              <View style={{ marginBottom: 24 }}>
                <Text
                  style={{
                    color: "white",
                    marginBottom: 8,
                    fontWeight: "600",
                    fontSize: 14,
                  }}
                >
                  Height (cm)
                </Text>

                <TextInput
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="numeric"
                  placeholder="Your height"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  style={{
                    borderRadius: 16,
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    color: "white",
                    fontSize: 16,
                    backgroundColor: "rgba(255,255,255,0.06)",
                  }}
                />
              </View>

              {/* Goals */}
              <View style={{ marginBottom: 32 }}>
                <Text
                  style={{
                    color: "white",
                    marginBottom: 16,
                    fontWeight: "600",
                    fontSize: 14,
                  }}
                >
                  Fitness Goal
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  {goals.map((item) => {
                    const active = goal === item;

                    return (
                      <Pressable
                        key={item}
                        onPress={() => setGoal(item)}
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 12,
                          borderRadius: 16,
                          backgroundColor: active
                            ? "#1abc9c"
                            : "rgba(255,255,255,0.06)",
                        }}
                      >
                        <Text
                          style={{
                            color: active ? "black" : "white",
                            fontWeight: "600",
                          }}
                        >
                          {item}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              {/* Button */}
              <Pressable
                disabled={disabled}
                onPress={handleContinue}
                style={{
                  backgroundColor: disabled
                    ? "rgba(26,188,156,0.4)"
                    : "#1abc9c",
                  paddingVertical: 18,
                  borderRadius: 20,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Continue
                </Text>
              </Pressable>
            </View>

            {/* Footer */}
            <Text
              style={{
                textAlign: "center",
                marginTop: 24,
                fontSize: 14,
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
