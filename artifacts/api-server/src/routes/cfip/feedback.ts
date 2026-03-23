import { Router } from "express";
import { db, feedbackItemsTable, themesTable } from "@workspace/db";
import { sql, count, eq, and, inArray, desc } from "drizzle-orm";
import { ListFeedbackItemsQueryParams, ListFeedbackItemsResponse } from "@workspace/api-zod";

const router = Router();

router.get("/cfip/feedback", async (req, res): Promise<void> => {
  const parsed = ListFeedbackItemsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { source, sentiment, themeId, limit = 20, offset = 0 } = parsed.data;

  const conditions = [];
  if (source) conditions.push(sql`${feedbackItemsTable.source} = ${source}`);
  if (sentiment) conditions.push(sql`${feedbackItemsTable.sentimentLabel} = ${sentiment}`);
  if (themeId != null) conditions.push(eq(feedbackItemsTable.themeId, themeId));

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [totalResult] = await db
    .select({ count: count() })
    .from(feedbackItemsTable)
    .where(whereClause);

  const rows = await db
    .select({
      id: feedbackItemsTable.id,
      content: feedbackItemsTable.content,
      source: feedbackItemsTable.source,
      sentimentScore: feedbackItemsTable.sentimentScore,
      sentimentLabel: feedbackItemsTable.sentimentLabel,
      themeId: feedbackItemsTable.themeId,
      customerSegment: feedbackItemsTable.customerSegment,
      language: feedbackItemsTable.language,
      createdAt: feedbackItemsTable.createdAt,
    })
    .from(feedbackItemsTable)
    .where(whereClause)
    .orderBy(desc(feedbackItemsTable.createdAt))
    .limit(limit ?? 20)
    .offset(offset ?? 0);

  const themeIds = [...new Set(rows.map(r => r.themeId).filter((id): id is number => id != null))];
  const themeMap: Record<number, string> = {};
  if (themeIds.length > 0) {
    const themes = await db
      .select({ id: themesTable.id, label: themesTable.label })
      .from(themesTable)
      .where(inArray(themesTable.id, themeIds));
    for (const t of themes) themeMap[t.id] = t.label;
  }

  const items = rows.map(r => ({
    ...r,
    themeId: r.themeId ?? null,
    themeLabel: r.themeId ? (themeMap[r.themeId] ?? null) : null,
    createdAt: r.createdAt.toISOString(),
  }));

  res.json(ListFeedbackItemsResponse.parse({
    items,
    total: Number(totalResult?.count ?? 0),
    limit: limit ?? 20,
    offset: offset ?? 0,
  }));
});

export default router;
