import { ConvexError } from "convex/values";
import type { QueryCtx } from "./_generated/server";

export async function getUserID(ctx: QueryCtx) {
  const user = await ctx.auth.getUserIdentity();
  if (!user) {
    throw new ConvexError("No user found.");
  }

  return user?.tokenIdentifier;
}