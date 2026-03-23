import { db, feedbackItemsTable, themesTable, sourcesTable, alertsTable } from "@workspace/db";
import { sql } from "drizzle-orm";

async function seed() {
  console.log("Seeding CFIP demo data...");

  await db.execute(sql`TRUNCATE feedback_items, themes, sources, alerts RESTART IDENTITY CASCADE`);

  const themeInserts = [
    {
      label: "Slow checkout experience",
      description: "Users report friction in the multi-step checkout flow, especially on mobile. Cart abandonment correlates with payment page load times exceeding 3s.",
      itemCount: 312,
      sentimentAvg: -0.62,
      impactScore: 9.1,
      velocityChange: 24.5,
      status: "new",
      topSource: "App Store Reviews",
    },
    {
      label: "Missing bulk export feature",
      description: "Enterprise customers frequently request bulk data export capabilities (CSV, Excel). Current one-by-one export is cited as a major workflow bottleneck.",
      itemCount: 218,
      sentimentAvg: -0.45,
      impactScore: 8.3,
      velocityChange: 18.2,
      status: "actioned",
      topSource: "Zendesk",
    },
    {
      label: "Dashboard customization",
      description: "Users want the ability to pin key metrics, rearrange widgets, and save custom views. Power users especially request saved filter sets.",
      itemCount: 187,
      sentimentAvg: -0.31,
      impactScore: 7.6,
      velocityChange: 11.4,
      status: "new",
      topSource: "G2",
    },
    {
      label: "Notification overload",
      description: "Users are overwhelmed by alert frequency and lack of prioritization. Many report disabling notifications entirely, causing them to miss critical signals.",
      itemCount: 156,
      sentimentAvg: -0.58,
      impactScore: 7.2,
      velocityChange: -5.2,
      status: "new",
      topSource: "NPS Survey",
    },
    {
      label: "Excellent AI suggestions",
      description: "Positive sentiment around the AI-driven recommendations feature. Users find the proactive nudges and automated grouping save significant time.",
      itemCount: 143,
      sentimentAvg: 0.74,
      impactScore: 6.8,
      velocityChange: 32.1,
      status: "actioned",
      topSource: "Typeform",
    },
    {
      label: "Onboarding complexity",
      description: "New users struggle with initial setup. The 7-step onboarding flow has a 41% drop-off at step 3 (connecting first data source).",
      itemCount: 129,
      sentimentAvg: -0.51,
      impactScore: 6.4,
      velocityChange: 8.7,
      status: "new",
      topSource: "Intercom",
    },
    {
      label: "API rate limiting issues",
      description: "Developer segment reports hitting rate limits during batch operations. Current 100 req/min limit is too restrictive for enterprise integrations.",
      itemCount: 98,
      sentimentAvg: -0.43,
      impactScore: 5.9,
      velocityChange: 14.3,
      status: "new",
      topSource: "Zendesk",
    },
    {
      label: "Team collaboration features",
      description: "Users want better multi-user support: shared workspaces, comment threads on insights, @mentions, and role-based access controls.",
      itemCount: 87,
      sentimentAvg: -0.22,
      impactScore: 5.4,
      velocityChange: 21.6,
      status: "dismissed",
      topSource: "G2",
    },
  ];

  const insertedThemes = await db.insert(themesTable).values(themeInserts).returning({ id: themesTable.id, label: themesTable.label });
  console.log(`Seeded ${insertedThemes.length} themes`);

  const sources = ["Zendesk", "Typeform", "App Store Reviews", "G2", "Intercom", "NPS Survey"];
  const segments = ["Enterprise", "SMB", "Startup", "Individual", "Agency"];
  const sentimentData = [
    { label: "negative", score: -0.72 },
    { label: "negative", score: -0.55 },
    { label: "negative", score: -0.41 },
    { label: "neutral", score: -0.12 },
    { label: "neutral", score: 0.05 },
    { label: "neutral", score: 0.18 },
    { label: "positive", score: 0.45 },
    { label: "positive", score: 0.67 },
    { label: "positive", score: 0.82 },
  ];

  const feedbackTemplates = [
    { themeIdx: 0, texts: [
      "The checkout takes forever on my phone. I gave up and ordered somewhere else.",
      "3 out of 5 times I try to check out on mobile, the payment step freezes.",
      "Your desktop experience is great but mobile checkout is a disaster. Fix this please.",
      "I love the product but the checkout flow is killing me. It's so slow!",
      "Payment page loaded after 8 seconds. By then I had already left.",
      "Mobile checkout = frustration. Desktop = fine. Big inconsistency.",
      "Every time I try to pay on mobile I get a timeout. This is unacceptable.",
      "I switched to a competitor just because their checkout works. Please fix yours.",
    ]},
    { themeIdx: 1, texts: [
      "We process 10k records daily and having to export one at a time is absurd.",
      "My whole team needs bulk CSV export. This is a dealbreaker for enterprise.",
      "Please add batch export. Our analysts are wasting hours doing this manually.",
      "Been requesting bulk export for 6 months. When is this coming?",
      "Can't recommend to enterprise clients without proper export functionality.",
      "The one-by-one export limitation is embarrassing for a B2B product.",
    ]},
    { themeIdx: 2, texts: [
      "I want to pin my top 3 metrics to the dashboard. Why can't I do this?",
      "Saved filter views would make my workflow 3x faster.",
      "The dashboard is rigid. Every team has different priorities, let us customize.",
      "Would pay for a premium tier just to get dashboard customization.",
      "Please let me rearrange the widgets. The current order makes no sense for me.",
    ]},
    { themeIdx: 3, texts: [
      "I get 50+ notifications a day. I turned them all off. That's a problem.",
      "Notifications should be smart and prioritized, not everything all at once.",
      "Alert fatigue is real. I'm missing the important ones because of all the noise.",
      "Please let me set notification preferences by severity. Critical vs informational.",
    ]},
    { themeIdx: 4, texts: [
      "The AI suggestions are incredibly accurate. It caught a trend I would have missed.",
      "Auto-clustering saves me at least 2 hours a week. Love this feature!",
      "The AI recommendations feel like having an analyst on my team 24/7.",
      "Finally, an analytics product that proactively surfaces insights. Brilliant.",
      "The AI grouping is spot-on. Rarely makes a mistake.",
    ]},
    { themeIdx: 5, texts: [
      "Spent 2 hours trying to connect my first data source. Still failed.",
      "Step 3 of onboarding is confusing. What is an API key and where do I find it?",
      "The setup guide assumed too much technical knowledge.",
      "Would love a guided tour or wizard for first-time setup.",
      "Onboarding drop-off is probably high. I almost gave up at step 3.",
    ]},
    { themeIdx: 6, texts: [
      "Hitting the rate limit during our nightly batch job. Need higher limits for enterprise.",
      "100 req/min is not enough for any serious integration. Needs to be 10x higher.",
      "Rate limits are blocking our ETL pipeline. Considering alternatives.",
    ]},
    { themeIdx: 7, texts: [
      "No way to share insights with colleagues. Collaboration is essential.",
      "Need @mention and comment threads on insights for team review.",
      "Role-based access is missing. Can't give read-only access to stakeholders.",
    ]},
  ];

  const feedbackRows: {
    content: string;
    source: string;
    sentimentScore: number;
    sentimentLabel: string;
    themeId: number | null;
    customerSegment: string;
    language: string;
    createdAt: Date;
  }[] = [];

  for (const group of feedbackTemplates) {
    const themeId = insertedThemes[group.themeIdx]?.id ?? null;
    for (let i = 0; i < group.texts.length; i++) {
      const sentiment = sentimentData[i % sentimentData.length];
      const daysAgo = Math.floor(Math.random() * 60);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      feedbackRows.push({
        content: group.texts[i],
        source: sources[Math.floor(Math.random() * sources.length)],
        sentimentScore: sentiment.score,
        sentimentLabel: sentiment.label,
        themeId,
        customerSegment: segments[Math.floor(Math.random() * segments.length)],
        language: "en",
        createdAt: date,
      });
    }
  }

  for (let i = 0; i < 50; i++) {
    const sentiment = sentimentData[Math.floor(Math.random() * sentimentData.length)];
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    feedbackRows.push({
      content: `General feedback item ${i + 1}: The platform has good potential but some areas need improvement.`,
      source: sources[Math.floor(Math.random() * sources.length)],
      sentimentScore: sentiment.score,
      sentimentLabel: sentiment.label,
      themeId: null,
      customerSegment: segments[Math.floor(Math.random() * segments.length)],
      language: "en",
      createdAt: date,
    });
  }

  await db.insert(feedbackItemsTable).values(feedbackRows);
  console.log(`Seeded ${feedbackRows.length} feedback items`);

  const sourcesData = [
    { name: "Zendesk", type: "support", itemCount: 187, isActive: true, status: "connected", lastSync: new Date(Date.now() - 1000 * 60 * 30) },
    { name: "Typeform", type: "survey", itemCount: 143, isActive: true, status: "connected", lastSync: new Date(Date.now() - 1000 * 60 * 120) },
    { name: "App Store Reviews", type: "reviews", itemCount: 312, isActive: true, status: "connected", lastSync: new Date(Date.now() - 1000 * 60 * 60) },
    { name: "G2", type: "reviews", itemCount: 98, isActive: true, status: "connected", lastSync: new Date(Date.now() - 1000 * 60 * 240) },
    { name: "Intercom", type: "chat", itemCount: 67, isActive: false, status: "disconnected", lastSync: new Date(Date.now() - 1000 * 60 * 60 * 48) },
    { name: "NPS Survey", type: "survey", itemCount: 156, isActive: true, status: "connected", lastSync: new Date(Date.now() - 1000 * 60 * 15) },
  ];

  await db.insert(sourcesTable).values(sourcesData);
  console.log(`Seeded ${sourcesData.length} sources`);

  const alertsData = [
    {
      type: "churn_risk",
      title: "Churn risk spike detected",
      description: "Negative sentiment around checkout has increased 24.5% week-over-week. 3 enterprise accounts flagged as churn risk.",
      severity: "critical",
      status: "open",
      themeId: insertedThemes[0]?.id ?? null,
      themeLabel: "Slow checkout experience",
    },
    {
      type: "sentiment_drop",
      title: "Notification theme sentiment dropping",
      description: "Sentiment for notification-related feedback has declined for 3 consecutive weeks. Users are increasingly disabling all notifications.",
      severity: "high",
      status: "open",
      themeId: insertedThemes[3]?.id ?? null,
      themeLabel: "Notification overload",
    },
    {
      type: "volume_spike",
      title: "Bulk export requests surging",
      description: "Feedback volume for bulk export feature has increased 18.2% this week. Multiple enterprise accounts mention it as a key missing feature.",
      severity: "high",
      status: "open",
      themeId: insertedThemes[1]?.id ?? null,
      themeLabel: "Missing bulk export feature",
    },
    {
      type: "positive_signal",
      title: "AI suggestions NPS contribution",
      description: "AI suggestions feature correlates with +12 NPS points among users who engage with it weekly. Strong retention signal.",
      severity: "medium",
      status: "open",
      themeId: insertedThemes[4]?.id ?? null,
      themeLabel: "Excellent AI suggestions",
    },
    {
      type: "onboarding_drop",
      title: "Onboarding step 3 drop-off increasing",
      description: "41% of new users abandon at the data source connection step. Pattern has worsened since last release.",
      severity: "medium",
      status: "open",
      themeId: insertedThemes[5]?.id ?? null,
      themeLabel: "Onboarding complexity",
    },
  ];

  await db.insert(alertsTable).values(alertsData);
  console.log(`Seeded ${alertsData.length} alerts`);

  console.log("Seed complete!");
  process.exit(0);
}

seed().catch(err => {
  console.error("Seed failed:", err);
  process.exit(1);
});
