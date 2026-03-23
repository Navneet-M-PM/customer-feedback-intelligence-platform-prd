import { Router } from "express";
import { db, alertsTable } from "@workspace/db";
import { sql, eq, desc, ne } from "drizzle-orm";
import { ListAlertsResponse, UpdateAlertBody, UpdateAlertResponse } from "@workspace/api-zod";

const router = Router();

router.get("/cfip/alerts", async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(alertsTable)
    .where(ne(alertsTable.status, "dismissed"))
    .orderBy(desc(alertsTable.createdAt));

  res.json(ListAlertsResponse.parse(rows.map(r => ({
    ...r,
    themeId: r.themeId ?? null,
    themeLabel: r.themeLabel ?? null,
    createdAt: r.createdAt.toISOString(),
  }))));
});

router.patch("/cfip/alerts", async (req, res): Promise<void> => {
  const body = UpdateAlertBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [updated] = await db
    .update(alertsTable)
    .set({ status: body.data.status })
    .where(eq(alertsTable.id, body.data.id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Alert not found" });
    return;
  }

  res.json(UpdateAlertResponse.parse({
    ...updated,
    themeId: updated.themeId ?? null,
    themeLabel: updated.themeLabel ?? null,
    createdAt: updated.createdAt.toISOString(),
  }));
});

export default router;
