import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// add calories and activity in db
export const addActivity = mutation({
  args: {
    type: v.union(
      v.literal("walking"),
      v.literal("running"),
      v.literal("cycling"),
      v.literal("gym"),
    ),
    duration: v.number(), // seconds
    distance: v.number(), // meters
    avgSpeed: v.optional(v.number()), // allow frontend to skip
    calories: v.number(),
  },

  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("Unauthorized");

    // ✅ Validate inputs (VERY IMPORTANT)
    if (args.duration <= 0) {
      throw new Error("Invalid duration");
    }

    if (args.duration < 10) {
      throw new Error("Session too short");
    }

    if (args.distance < 0) {
      throw new Error("Invalid distance");
    }

    const myUser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", user.subject))
      .first();

    if (!myUser) throw new Error("User not found");

    const avgSpeed =
      args.avgSpeed ?? (args.duration > 0 ? args.distance / args.duration : 0);

    console.log("front-end calories : ", args.calories);

    await ctx.db.insert("activities", {
      userId: user.subject,
      type: args.type,
      duration: args.duration,
      distance: args.distance,
      avgSpeed,
      calories: args.calories,
      source: "gps",
      createdAt: Date.now(),
    });

    return {
      avgSpeed,
    };
  },
});

// get

export const getToadysCalories = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      return {
        totalCalories: 0,
        totalDistance: 0,
        totalDuration: 0,
        avgSpeed: 0,
      };
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const start = startOfDay.getTime();

    const activities = await ctx.db
      .query("activities")
      .withIndex("by_user_time", (q) =>
        q.eq("userId", user.subject).gte("createdAt", start),
      )
      .collect();

    let totalCalories = 0;
    let totalDistance = 0;
    let totalDuration = 0;

    for (const act of activities) {
      totalCalories += act.calories;
      totalDistance += act.distance;
      totalDuration += act.duration;
    }

    const avgSpeed = totalDuration > 0 ? totalDistance / totalDuration : 0;

    return {
      totalCalories,
      totalDistance,
      totalDuration,
      avgSpeed,
    };
  },
});

export const getTodaysActivity = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) return [];

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const start = startOfDay.getTime();

    const activities = await ctx.db
      .query("activities")
      .withIndex("by_user_time", (q) =>
        q.eq("userId", user.subject).gte("createdAt", start),
      )
      .collect();

    return activities;
  },
});
