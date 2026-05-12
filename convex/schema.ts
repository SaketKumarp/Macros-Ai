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
    image: v.optional(v.string()),
    date: v.string(), // "YYYY-MM-DD"
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_date", ["userId", "date"]),

  goals: defineTable({
    userId: v.string(),
    calories: v.number(),
    protein: v.number(),
    carbs: v.number(),
    fat: v.number(),
  }), // this is for set-up of goal using ai and in general formula

  weights: defineTable({
    userId: v.string(),
    weight: v.number(),
    createdAt: v.number(),
  }).index("by_user_date", ["userId", "createdAt"]),

  users: defineTable({
    userId: v.string(),
    name: v.string(),
    weight: v.number(), // current weight (fast access)
    age: v.number(),
    height: v.number(),
  }).index("by_userId", ["userId"]),

  activities: defineTable({
    userId: v.string(),

    type: v.union(
      v.literal("walking"),
      v.literal("running"),
      v.literal("cycling"),
      v.literal("gym"),
    ),

    duration: v.number(), // seconds
    distance: v.number(), // meters

    avgSpeed: v.number(), // m/s

    calories: v.number(),

    source: v.optional(v.union(v.literal("manual"), v.literal("gps"))),

    createdAt: v.number(), //  timestamp only
  }).index("by_user_time", ["userId", "createdAt"]),
});
