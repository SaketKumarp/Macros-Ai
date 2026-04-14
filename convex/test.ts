import { query } from "./_generated/server";
export const test = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();

    return user;
  },
});
