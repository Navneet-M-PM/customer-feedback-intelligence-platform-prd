import { pgTable, text, serial, timestamp, real, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const themesTable = pgTable("themes", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  description: text("description").notNull(),
  itemCount: integer("item_count").notNull().default(0),
  sentimentAvg: real("sentiment_avg").notNull().default(0),
  impactScore: real("impact_score").notNull().default(0),
  velocityChange: real("velocity_change").notNull().default(0),
  status: text("status").notNull().default("new"),
  topSource: text("top_source").notNull().default(""),
  brief: text("brief"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertThemeSchema = createInsertSchema(themesTable).omit({ id: true, createdAt: true });
export type InsertTheme = z.infer<typeof insertThemeSchema>;
export type Theme = typeof themesTable.$inferSelect;
