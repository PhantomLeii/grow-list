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
      // TODO: Filter by participants
      .filter((q) => q.eq(q.field("creator"), userID))
      .order("desc")
      .collect();

    return lists;
  },
});

export const getList = query({
  args: {
    id: v.string(),
  },

  handler: async (ctx, { id }) => {
    const userID = await getUserID(ctx);

    const list = await ctx.db
      .query("lists")
      .filter((q) => q.eq(q.field("creator"), id))
      .first();

    if (!list) {
      return 404;
    }

    if (list.creator !== userID) {
      return 403;
    }

    return list;
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
