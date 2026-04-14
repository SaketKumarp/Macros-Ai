// convex/macros.ts
import { v } from "convex/values";
import { action } from "./_generated/server";

export const generateMacros = action({
  args: {
    weight: v.number(),
    height: v.number(),
    age: v.number(),
    gender: v.string(),
    goal: v.string(),
    activity: v.number(),
  },
  handler: async (_, args) => {
    const s = args.gender === "male" ? 5 : -161;

    const bmr = 10 * args.weight + 6.25 * args.height - 5 * args.age + s;

    let calories = bmr * args.activity;

    if (args.goal === "bulk") calories += 400;
    if (args.goal === "cut") calories -= 400;

    const protein = args.weight * 2; // grams
    const fat = (calories * 0.25) / 9;
    const carbs = (calories - (protein * 4 + fat * 9)) / 4;

    return { calories, protein, fat, carbs };
  },
});
