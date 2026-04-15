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

import { cloudinaryApi } from "@/lib/api";
import MealCard from "@/components/frontend/Meal-Card";
import { analyzeImageFront } from "@/lib/gemini";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/providers/toast";
import { useRouter } from "expo-router";

interface MealAIResponse {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  sugar: number;
  type: string;
}

const Upload = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiData, setAiData] = useState<MealAIResponse | null>(null);
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

    try {
      const res = await fetch(cloudinaryApi, {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const result = await res.json();
      return result.secure_url;
    } catch (err) {
      console.log("Upload Error:", err);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;

    try {
      setLoading(true);

      const cloudinaryUrl = await uploadImage(image);
      if (!cloudinaryUrl) throw new Error("Upload failed");
      setImgurl(cloudinaryUrl);

      const response = await analyzeImageFront(image);

      if (!response) {
        alert("Failed to analyze image. Try again.");
        return;
      }

      setAiData(response);
    } catch (err) {
      console.log("Analyze Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMeal = async () => {
    if (!aiData) return;

    try {
      const response = await addMeal({
        name: aiData.name,
        calories: aiData.calories,
        protein: aiData.protein,
        carbs: aiData.carbs,
        fat: aiData.fat,
        sugar: aiData.sugar,
        type: aiData.type,
        date: new Date().toISOString(),
        image: imgurl ?? "", //cloudinary url
      });

      if (response) showToast("meal added", "success");
      router.push("/(tabs)");

      setImage(null);
      setAiData(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          paddingBottom: insets.bottom + 80,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 🔥 Title */}
        <Text className="text-white text-2xl font-bold text-center">
          Add Meal
        </Text>
        <Text className="text-gray-400 text-center mt-1">
          Capture or upload food & let AI calculate macros
        </Text>

        {/* 📸 Image Preview */}
        <View className="mt-8">
          <TouchableOpacity
            onPress={pickImage}
            className="w-full h-40 border-2 border-dashed border-[#333] rounded-2xl items-center justify-center overflow-hidden"
          >
            {image ? (
              <Image source={{ uri: image }} className="w-full h-full" />
            ) : (
              <Text className="text-gray-500">Tap to upload image</Text>
            )}
          </TouchableOpacity>

          {/* Camera + Gallery */}
          <View className="flex-row mt-4">
            <TouchableOpacity
              onPress={openCamera}
              className="flex-1 bg-[#1c1c1e] py-3 rounded-xl mx-1 items-center"
            >
              <Text className="text-white">Open Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={pickImage}
              className="flex-1 bg-[#1c1c1e] py-3 rounded-xl mx-1 items-center"
            >
              <Text className="text-white">Gallery</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 🤖 Analyze Button */}
        <TouchableOpacity
          onPress={handleAnalyze}
          disabled={!image || loading}
          className={`mt-6 py-4 rounded-xl items-center ${
            image ? "bg-[#00d2d3]" : "bg-[#333]"
          }`}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text className="text-black font-semibold text-base">
              Analyze with AI
            </Text>
          )}
        </TouchableOpacity>

        {/* 🧠 AI Result */}
        {aiData && (
          <View className="mt-6">
            <MealCard data={aiData} onAdd={handleAddMeal} />
          </View>
        )}

        {/* Hint */}
        <Text className="text-gray-500 text-xs text-center mt-6">
          AI will detect calories, protein, carbs, fats & type
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Upload;
