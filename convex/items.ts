import { metadata } from "./../app/layout";
import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const createItem = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    listID: v.id("lists"),
  },

  handler: async (ctx, { name, description, listID }) => {
    try {
      await ctx.db.insert("items", {
        name,
        description,
        isPurchased: false,
        list: listID,
      });
    } catch (err) {
      console.error(err);
      return 400;
    }

    return 201;
  },
});

export const getAllItems = query({
  args: {
    listID: v.id("lists"),
  },

  handler: async (ctx, { listID }) => {
    const items = await ctx.db
      .query("items")
      .filter((q) => q.eq(q.field("list"), listID))
      .collect();

    return items;
  },
});

export const removeItem = mutation({
  args: {
    id: v.id("items"),
  },

  handler: async (ctx, { id }) => {
    try {
      await ctx.db.delete(id);
    } catch (err) {
      console.error(err);
      return 400;
    }

    return 204;
  },
});
