import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getUserID } from "./utils";

export const getAllLists = query({
  args: {},

  handler: async (ctx) => {
    const userID = await getUserID(ctx);

    // Filter all lists by userID & where users is among participants
    const lists = await ctx.db
      .query("lists")
      .filter((q) => q.eq(q.field("creator"), userID))
      .collect();

    return lists;
  },
});

export const createList = mutation({
  args: {
    name: v.string(),
    isPrivate: v.boolean(),
    description: v.optional(v.string()),
  },

  handler: async (ctx, { name, isPrivate, description }) => {
    const userID = await getUserID(ctx);

    await ctx.db.insert("lists", {
      creator: userID,
      name: name,
      isPrivate: isPrivate,
      description: description,
    });

    return 201;
  },
});
