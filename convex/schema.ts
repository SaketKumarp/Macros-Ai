import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  foods: defineTable({
    userId: v.string(),
    name: v.string(),
    calories: v.number(),
    protein: v.number(),
    carbs: v.number(),
    sugar: v.number(),
    fat: v.number(),

    date: v.string(),
    createdAt: v.number(),
  }),

  goals: defineTable({
    userId: v.string(),
    calories: v.number(),
    protein: v.number(),
    carbs: v.number(),
    fat: v.number(),
  }),

  weights: defineTable({
    userId: v.string(),
    weight: v.number(),
    date: v.string(),
  }),
});
