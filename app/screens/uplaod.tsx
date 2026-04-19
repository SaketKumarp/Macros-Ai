import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { cloudinaryApi } from "@/lib/api";
import MealCard from "@/components/frontend/Meal-Card";
import { analyzeImageFront } from "@/lib/gemini";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/providers/toast";
import { useRouter } from "expo-router";
import { RecentScans } from "@/components/frontend/RecentScans";
import DetectBar from "@/components/frontend/Detect-Section";

const Upload = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiData, setAiData] = useState<any>(null);
  const [imgurl, setImgurl] = useState<string | null>(null);

  const addMeal = useMutation(api.macros.addMeal);
  const { showToast } = useToast();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setAiData(null);
    }
  };

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setAiData(null);
    }
  };

  const uploadImage = async (imageUri: string) => {
    const data = new FormData();

    data.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "photo.jpg",
    } as any);

    data.append("upload_preset", "macro_upload");

    const res = await fetch(cloudinaryApi, {
      method: "POST",
      body: data,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const result = await res.json();
    return result.secure_url;
  };

  const handleAnalyze = async () => {
    if (!image) return;

    try {
      setLoading(true);
      const cloudinaryUrl = await uploadImage(image);
      setImgurl(cloudinaryUrl);

      const response = await analyzeImageFront(image);
      setAiData(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMeal = async () => {
    if (!aiData) return;

    const res = await addMeal({
      ...aiData,
      image: imgurl ?? "",
    });

    if (res) showToast("meal added", "success");
    router.push("/(tabs)");
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: insets.bottom + 80,
        }}
      >
        {/* 🔥 HEADER */}
        <View className="items-center mb-6">
          <Text className="text-white text-2xl font-bold">Add Meal</Text>
          <Text className="text-gray-400 text-sm mt-1">
            Capture food & let AI calculate macros
          </Text>

          {/* AI Badge */}
          <View className="flex-row items-center bg-[#1dd1a1]/20 px-3 py-1 rounded-full mt-3">
            <Ionicons name="flash" size={14} color="#1dd1a1" />
            <Text className="text-[#1dd1a1] ml-1 text-xs font-medium">
              AI Powered
            </Text>
          </View>
        </View>

        {/* 📸 UPLOAD CARD */}
        <View className="bg-[#111] rounded-3xl p-5 border border-white/10">
          <TouchableOpacity
            onPress={pickImage}
            className="h-44 rounded-2xl border border-dashed border-white/20 items-center justify-center overflow-hidden"
          >
            {image ? (
              <Image source={{ uri: image }} className="w-full h-full" />
            ) : (
              <>
                <View className="bg-[#1dd1a1]/20 p-5 rounded-full mb-3">
                  <Ionicons name="camera" size={32} color="#1dd1a1" />
                </View>
                <Text className="text-white font-medium text-base">
                  Upload Food Image
                </Text>
                <Text className="text-gray-400 text-xs mt-1">
                  Take photo or upload from gallery
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* BUTTONS */}
          <View className="flex-row mt-4 gap-3">
            <TouchableOpacity
              onPress={openCamera}
              className="flex-1 bg-[#1c1c1e] py-3 rounded-xl flex-row justify-center items-center"
            >
              <Ionicons name="camera-outline" size={18} color="#fff" />
              <Text className="text-white ml-2">Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={pickImage}
              className="flex-1 bg-[#1c1c1e] py-3 rounded-xl flex-row justify-center items-center"
            >
              <Ionicons name="images-outline" size={18} color="#fff" />
              <Text className="text-white ml-2">Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 bg-[#1c1c1e] py-3 rounded-xl flex-row justify-center items-center">
              <Ionicons name="document-outline" size={18} color="#fff" />
              <Text className="text-white ml-2">Files</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 🤖 AI SECTION */}
        <LinearGradient
          colors={["#be2edd", "#7ed6df"]}
          className="mt-6 rounded-3xl p-5"
        >
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="brain" size={22} color="#fff" />
              <Text className="text-white text-lg font-semibold ml-2">
                Analyze with AI
              </Text>
            </View>

            <Text className="text-white/80 text-xs bg-white/20 px-2 py-1 rounded-full">
              Smart
            </Text>
          </View>

          <Text className="text-white/70 text-sm mb-4">
            Detect calories, protein, carbs, fats & type
          </Text>

          <TouchableOpacity
            onPress={handleAnalyze}
            disabled={!image || loading}
            className="bg-white py-3 rounded-xl items-center"
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text className="text-black font-semibold">Analyze Food</Text>
            )}
          </TouchableOpacity>
        </LinearGradient>

        {/* 🧠 FEATURES */}
        <View className="w-full mt-7">
          <DetectBar />
        </View>

        {/* RESULT */}
        {aiData && (
          <View className="mt-6">
            <MealCard data={aiData} onAdd={handleAddMeal} />
          </View>
        )}
        <RecentScans />
      </ScrollView>
    </SafeAreaView>
  );
};

const Feature = ({ icon, label, color }: any) => (
  <View className="items-center">
    <Ionicons name={icon} size={18} color={color} />
    <Text className="text-gray-400 text-xs mt-1">{label}</Text>
  </View>
);

export default Upload;
