// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // convex/schema.ts
  foods: defineTable({
    userId: v.string(),
    name: v.string(),
    calories: v.number(),
    protein: v.number(),
    carbs: v.number(),
    sugar: v.number(),
    fat: v.number(),
    type: v.string(),
    image: v.string(),
    date: v.string(), // "YYYY-MM-DD"
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_date", ["userId", "date"]), // 🔥 CRITICAL

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
