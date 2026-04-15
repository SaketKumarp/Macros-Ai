import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { cloudinaryApi } from "@/lib/api";
import MealCard from "@/components/frontend/Meal-Card";

import { analyzeImageFront } from "@/lib/gemini";

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

      console.log("Uploaded URL:", result.secure_url);

      return result.secure_url;
    } catch (err) {
      console.log("Upload Error:", err);
    }
  };
  // 🤖 AI Flow
  const handleAnalyze = async () => {
    if (!image) return;

    try {
      setLoading(true);

      // ✅ STEP 1: Upload image
      const cloudinaryUrl = await uploadImage(image);

      if (!cloudinaryUrl) {
        throw new Error("Upload failed");
      }

      console.log("cloudinary url", cloudinaryUrl);

      const response = await analyzeImageFront(image); // for AI;
      if (!response) {
        alert("Failed to analyze image. Try again.");
        return;
      }
      // 🔥 TEMP MOCK
      //   const response: MealAIResponse = {
      //     name: "Paneer Butter Masala",
      //     calories: 450,
      //     protein: 20,
      //     carbs: 30,
      //     fat: 25,
      //     sugar: 6,
      //     type: "fat",
      //   };

      setAiData(response);
    } catch (err) {
      console.log("Analyze Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ➕ Save to DB
  const handleAddMeal = async () => {
    if (!aiData) return;

    try {
      // await addMeal(aiData);
      console.log("Saved to DB:", aiData);

      // Reset UI
      setImage(null);
      setAiData(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="flex-1 bg-black px-6 pt-16">
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
          className="h-56 border-2 border-dashed border-[#333] rounded-2xl items-center justify-center overflow-hidden"
        >
          {image ? (
            <Image source={{ uri: image }} className="w-full h-full" />
          ) : (
            <Text className="text-gray-500">Tap to upload image</Text>
          )}
        </TouchableOpacity>

        {/* Camera + Gallery Buttons */}
        <View className="flex-row justify-between mt-4">
          <TouchableOpacity
            onPress={openCamera}
            className="flex-1 bg-[#1c1c1e] py-3 rounded-xl mr-2 items-center"
          >
            <Text className="text-white">Open Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={pickImage}
            className="flex-1 bg-[#1c1c1e] py-3 rounded-xl ml-2 items-center"
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

      {/* 🧠 AI Result Card */}
      {aiData && <MealCard data={aiData} onAdd={handleAddMeal} />}

      {/* Hint */}
      <Text className="text-gray-500 text-xs text-center mt-4">
        AI will detect calories, protein, carbs, fats & type
      </Text>
    </View>
  );
};

export default Upload;
