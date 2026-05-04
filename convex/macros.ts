import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addMeal = mutation({
  args: {
    name: v.string(),
    calories: v.number(),
    protein: v.number(),
    carbs: v.number(),
    sugar: v.number(),
    fat: v.number(),
    type: v.string(),

    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("unauthorized");
    const today = new Date().toISOString().split("T")[0];

    const mealId = await ctx.db.insert("foods", {
      userId: user.subject,
      name: args.name,
      calories: args.calories,
      protein: args.protein,
      carbs: args.carbs,
      sugar: args.sugar,
      fat: args.fat,
      type: args.type,
      date: today,
      image: args.image,
      createdAt: Date.now(),
    });

    return mealId;
  },
});

export const getMealsByDate = query({
  args: {
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) return [];

    return await ctx.db
      .query("foods")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", user.subject).eq("date", args.date),
      )
      .collect();
  },
});

export const getSummaryByDate = query({
  args: {
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) return null;

    const meals = await ctx.db
      .query("foods")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", user.subject).eq("date", args.date),
      )
      .collect();

    const totals = meals.reduce(
      (acc, item) => {
        acc.calories += item.calories;
        acc.protein += item.protein;
        acc.carbs += item.carbs;
        acc.fat += item.fat;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    );

    return {
      date: args.date,
      ...totals,
      count: meals.length,
    };
  },
});
export const getTodayMeals = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) return [];

    const today = new Date().toISOString().split("T")[0];

    const meals = await ctx.db
      .query("foods")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", user.subject).eq("date", today),
      )
      .collect();

    return meals;
  },
});

export const getFood = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) return [];
    const data = await ctx.db
      .query("foods")
      .withIndex("by_user", (q) => q.eq("userId", user.subject))
      .order("desc")
      .collect();

    return data;
  },
});

export const getRecentMeals = query({
  args: {},

  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("unauthorized !");
    return await ctx.db
      .query("foods")
      .withIndex("by_user", (q) => q.eq("userId", user.subject))
      .order("desc")
      .take(10); // latest 10
  },
});

//TODO: get meals by id
