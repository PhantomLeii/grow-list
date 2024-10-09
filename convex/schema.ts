import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  lists: defineTable({
    creator: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    isPrivate: v.boolean(),
    items: v.optional(v.array(v.object({
      itemName: v.string(),
      itemDescription: v.string(),
      isPurchased: v.boolean()
    }))),
    participants: v.optional(v.array(v.string()))
  })
})