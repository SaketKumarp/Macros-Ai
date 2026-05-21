import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const test = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();

    return user;
  },
});

export const addUser = mutation({
  args: {
    age: v.number(),
    weight: v.number(),
    height: v.number(),
    goal: v.string(),
    // add goal as cut or bulk
  },
  handler: async (ctx, { age, weight, height, goal }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("unauthorized!");

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", user.subject))
      .unique();

    if (existingUser) {
      throw new Error("user detail exists");
    }

    await ctx.db.insert("users", {
      userId: user.subject,
      name: user.name ?? "NA",
      age,
      weight,
      height,
      goal,
    });

    return { success: true };
  },
});

export const checkNewUser = mutation({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", user.subject))
      .unique();

    return {
      isNewUser: !existingUser,
    };
  },
});

export const getuserDetails = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      return null;
    }
    const details = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", user.subject))
      .first();

    return details;
  },
});

// export const getUser = query({
//   handler: async (ctx) => {
//     const user = await ctx.auth.getUserIdentity();
//     if (!user) return null;
//     const data = await ctx.db
//       .query("users")
//       .withIndex("by_userId", (q) => q.eq("userId", user.subject))
//       .unique();

//     return data;
//   },
// });
