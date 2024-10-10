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
    listID: v.id('lists'),
  },

  handler: async (ctx, { listID }) => {
     const items = await ctx.db
      .query('items')
      .filter(q => q.eq(q.field('list'), listID))
      .collect()
    
    return items;
  }
})
