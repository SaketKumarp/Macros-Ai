import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";

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

  // 📸 Pick from Gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setAiData(null);
    }
  };

  // 📷 Open Camera
  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setAiData(null);
    }
  };

  // 🤖 AI Flow
  const handleAnalyze = async () => {
    if (!image) return;

    try {
      setLoading(true);

      // 🔥 STEP 1: Upload to Cloudinary
      // const cloudinaryUrl = await uploadToCloudinary(image);

      // 🔥 STEP 2: Gemini API call
      // const response = await analyzeWithGemini(cloudinaryUrl);

      // 🔥 TEMP MOCK (replace later)
      const response: MealAIResponse = {
        name: "Paneer Butter Masala",
        calories: 450,
        protein: 20,
        carbs: 30,
        fat: 25,
        sugar: 6,
        type: "fat",
      };

      setAiData(response);
    } catch (err) {
      console.log(err);
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
      {aiData && (
        <View className="mt-6 bg-[#111] p-4 rounded-2xl border border-[#1c1c1e]">
          <Text className="text-white text-base font-semibold">
            {aiData.name}
          </Text>

          <Text className="text-gray-400 mt-1">{aiData.calories} kcal</Text>

          <View className="flex-row justify-between mt-3">
            <Text className="text-gray-400 text-xs">
              P: <Text className="text-white">{aiData.protein}g</Text>
            </Text>
            <Text className="text-gray-400 text-xs">
              C: <Text className="text-white">{aiData.carbs}g</Text>
            </Text>
            <Text className="text-gray-400 text-xs">
              F: <Text className="text-white">{aiData.fat}g</Text>
            </Text>
            <Text className="text-gray-400 text-xs">
              S: <Text className="text-white">{aiData.sugar}g</Text>
            </Text>
          </View>

          {/* ➕ Add Button */}
          <TouchableOpacity
            onPress={handleAddMeal}
            className="mt-4 bg-[#00d2d3] py-3 rounded-xl items-center"
          >
            <Text className="text-black font-semibold">
              Add to Today’s Meals
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Hint */}
      <Text className="text-gray-500 text-xs text-center mt-4">
        AI will detect calories, protein, carbs, fats & type
      </Text>
    </View>
  );
};

export default Upload;
