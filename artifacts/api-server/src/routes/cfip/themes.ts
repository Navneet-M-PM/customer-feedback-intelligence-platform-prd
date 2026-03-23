import { Router } from "express";
import { db, feedbackItemsTable, themesTable } from "@workspace/db";
import { sql, eq } from "drizzle-orm";
import {
  ListThemesQueryParams,
  ListThemesResponse,
  GetThemeParams,
  GetThemeResponse,
  UpdateThemeParams,
  UpdateThemeBody,
  UpdateThemeResponse,
  GenerateBriefParams,
  GenerateBriefResponse,
} from "@workspace/api-zod";

const router = Router();

router.get("/cfip/themes", async (req, res): Promise<void> => {
  const parsed = ListThemesQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { status, sortBy } = parsed.data;

  let query = db.select().from(themesTable);
  if (status) {
    query = query.where(sql`${themesTable.status} = ${status}`) as typeof query;
  }

  const rows = await query;

  const sorted = [...rows].sort((a, b) => {
    if (sortBy === "itemCount") return b.itemCount - a.itemCount;
    if (sortBy === "velocity") return b.velocityChange - a.velocityChange;
    return b.impactScore - a.impactScore;
  });

  res.json(ListThemesResponse.parse(sorted.map(t => ({
    ...t,
    createdAt: t.createdAt.toISOString(),
    brief: undefined,
  }))));
});

router.get("/cfip/themes/:id", async (req, res): Promise<void> => {
  const params = GetThemeParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [theme] = await db.select().from(themesTable).where(eq(themesTable.id, params.data.id));
  if (!theme) {
    res.status(404).json({ error: "Theme not found" });
    return;
  }

  const verbatimRows = await db
    .select()
    .from(feedbackItemsTable)
    .where(eq(feedbackItemsTable.themeId, theme.id))
    .limit(10);

  const verbatims = verbatimRows.map(r => ({
    ...r,
    themeId: r.themeId ?? null,
    themeLabel: theme.label,
    createdAt: r.createdAt.toISOString(),
  }));

  res.json(GetThemeResponse.parse({
    ...theme,
    createdAt: theme.createdAt.toISOString(),
    verbatims,
    brief: theme.brief ?? null,
  }));
});

router.patch("/cfip/themes/:id", async (req, res): Promise<void> => {
  const params = UpdateThemeParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const body = UpdateThemeBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const updateData: Record<string, unknown> = {};
  if (body.data.status !== undefined) updateData.status = body.data.status;
  if (body.data.label !== undefined) updateData.label = body.data.label;

  const [updated] = await db
    .update(themesTable)
    .set(updateData)
    .where(eq(themesTable.id, params.data.id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Theme not found" });
    return;
  }

  res.json(UpdateThemeResponse.parse({
    ...updated,
    createdAt: updated.createdAt.toISOString(),
  }));
});

router.post("/cfip/themes/:id/brief", async (req, res): Promise<void> => {
  const params = GenerateBriefParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [theme] = await db.select().from(themesTable).where(eq(themesTable.id, params.data.id));
  if (!theme) {
    res.status(404).json({ error: "Theme not found" });
    return;
  }

  const verbatimRows = await db
    .select({ content: feedbackItemsTable.content })
    .from(feedbackItemsTable)
    .where(eq(feedbackItemsTable.themeId, theme.id))
    .limit(5);

  const verbatimSamples = verbatimRows.map(r => `- "${r.content}"`).join("\n");

  const brief = `## Product Brief: ${theme.label}

**Impact Score:** ${theme.impactScore}/10  
**Affected Users:** ~${Math.round(theme.itemCount * 12)} estimated based on ${theme.itemCount} feedback items  
**Sentiment:** ${theme.sentimentAvg > 0.2 ? "Mostly Positive" : theme.sentimentAvg < -0.2 ? "Mostly Negative" : "Mixed"}  
**Velocity:** ${theme.velocityChange > 0 ? "+" : ""}${theme.velocityChange}% vs prior period  

### Problem Statement
${theme.description}

### Representative Feedback
${verbatimSamples || "No verbatim feedback available yet."}

### Recommended Actions
1. **Investigate root cause** — Assign a squad to deeply understand the friction points driving this theme.
2. **Quick wins** — Identify any immediate UX or copy improvements that can address the most common complaints.
3. **Roadmap prioritization** — Given the impact score of ${theme.impactScore}/10, this should be surfaced in the next quarterly planning cycle.
4. **Success metrics** — Track reduction in negative sentiment mentions and improvement in NPS for affected segments.

### Stakeholders to Loop In
- Product: Owns prioritization and solution design
- Engineering: Capacity and feasibility assessment
- Customer Success: Early signal on customer impact
- Data: Ongoing monitoring and metric tracking

_Generated by CFIP AI on ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}_`;

  await db.update(themesTable).set({ brief }).where(eq(themesTable.id, theme.id));

  res.json(GenerateBriefResponse.parse({
    themeId: theme.id,
    content: brief,
    generatedAt: new Date().toISOString(),
  }));
});

export default router;
