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
  },
  handler: async (ctx, { age, weight }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new Error("unauthorized!");
    await ctx.db.insert("users", {
      userId: user.subject,
      name: user.name ?? "NA",
      age,
      weight,
    });
  },
});
