import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  lists: defineTable({
    creator: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    isPrivate: v.boolean(),
    participants: v.optional(v.array(v.string())),
  }),

  items: defineTable({
    name: v.string(),
    description: v.string(),
    list: v.id("lists"),
  }),
});
