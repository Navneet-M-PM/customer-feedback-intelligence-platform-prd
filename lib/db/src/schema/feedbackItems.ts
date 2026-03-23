import { pgTable, text, serial, timestamp, real, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const feedbackItemsTable = pgTable("feedback_items", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  source: text("source").notNull(),
  sentimentScore: real("sentiment_score").notNull().default(0),
  sentimentLabel: text("sentiment_label").notNull().default("neutral"),
  themeId: integer("theme_id"),
  customerSegment: text("customer_segment").notNull().default("general"),
  language: text("language").notNull().default("en"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertFeedbackItemSchema = createInsertSchema(feedbackItemsTable).omit({ id: true, createdAt: true });
export type InsertFeedbackItem = z.infer<typeof insertFeedbackItemSchema>;
export type FeedbackItem = typeof feedbackItemsTable.$inferSelect;
