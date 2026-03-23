import { pgTable, text, serial, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const sourcesTable = pgTable("sources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  itemCount: integer("item_count").notNull().default(0),
  lastSync: timestamp("last_sync", { withTimezone: true }),
  isActive: boolean("is_active").notNull().default(true),
  status: text("status").notNull().default("connected"),
});

export const insertSourceSchema = createInsertSchema(sourcesTable).omit({ id: true });
export type InsertSource = z.infer<typeof insertSourceSchema>;
export type Source = typeof sourcesTable.$inferSelect;
