import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const BASE_MET = {
  walking: 3.5,
  running: 8,
  cycling: 7,
  gym: 5.5,
};

// 🔥 smarter running MET based on speed
function getRunningMET(speed: number) {
  if (speed < 1.5) return 4; // very slow jog
  if (speed < 2.5) return 7; // normal run
  if (speed < 3.5) return 9; // fast run
  return 11; // intense run
}

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

    // Calculate avgSpeed safely
    const avgSpeed =
      args.avgSpeed ?? (args.duration > 0 ? args.distance / args.duration : 0);

    const hours = args.duration / 3600;

    // Pick MET (smart)
    let met = BASE_MET[args.type];

    if (args.type === "running") {
      met = getRunningMET(avgSpeed);
    }

    const calories = met * myUser.weight * hours;

    await ctx.db.insert("activities", {
      userId: user.subject,
      type: args.type,
      duration: args.duration,
      distance: args.distance,
      avgSpeed,
      calories,
      source: "gps",
      createdAt: Date.now(),
    });

    return {
      calories,
      avgSpeed,
    };
  },
});

export const getTodaysActivity = query({
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
    console.log("total cal : ", totalCalories);

    return {
      totalCalories,
      totalDistance,
      totalDuration,
      avgSpeed,
    };
  },
});
