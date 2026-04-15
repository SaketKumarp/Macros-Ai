import { GoogleGenerativeAI } from "@google/generative-ai";
import * as FileSystem from "expo-file-system/legacy";

const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY!);

export const analyzeImageFront = async (imageUri: string) => {
  const base64 = await FileSystem.readAsStringAsync(imageUri, {
    encoding: "base64",
  });

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64,
      },
    },
    {
      text: `
Analyze this food image.

Return ONLY valid JSON.
Do NOT include any explanation or markdown.

{
  "name": "",
  "calories": number,
  "protein": number,
  "carbs": number,
  "fat": number,
  "sugar": number,
  "type": "protein | carbs | fat"
}
`,
    },
  ]);

  const text = result.response.text();
  console.log("RAW GEMINI:", text); // 👈 debug

  // 🔥 BEST CLEANING METHOD
  const match = text.match(/{[\s\S]*}/);

  if (!match) {
    throw new Error("No JSON found in response");
  }

  try {
    return JSON.parse(match[0]);
  } catch (err) {
    console.log("PARSE ERROR:", match[0], err);
    throw new Error("Invalid JSON from AI");
  }
};
