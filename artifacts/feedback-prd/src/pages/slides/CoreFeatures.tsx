export default function CoreFeatures() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "0.4vh",
          background: "linear-gradient(90deg, var(--accent-blue) 0%, var(--accent-teal) 100%)",
        }}
      />
      <div className="relative flex h-full flex-col px-[7vw] py-[7vh]">
        <div style={{ fontSize: "1.1vw", color: "var(--accent-blue)", fontWeight: 600, letterSpacing: "0.12em", marginBottom: "1.5vh" }}>
          06 / CORE FEATURES
        </div>
        <h2
          className="font-display"
          style={{ fontSize: "3.5vw", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1, marginBottom: "3.5vh" }}
        >
          Six feature pillars — built for scale
        </h2>
        <div className="grid gap-[2vh]" style={{ gridTemplateColumns: "1fr 1fr 1fr", flex: 1 }}>
          {[
            {
              num: "F1",
              title: "Multi-Source Ingestion",
              color: "var(--accent-blue)",
              items: [
                "Native connectors: Zendesk, Intercom, Typeform, App Store, G2, Slack",
                "CSV/JSON bulk upload with auto-parsing",
                "Webhook API for custom data sources",
                "Real-time ingestion with deduplication",
              ],
            },
            {
              num: "F2",
              title: "AI Theme Clustering",
              color: "var(--accent-teal)",
              items: [
                "Unsupervised LLM clustering across 10K+ data points",
                "Auto-labeling with confidence scores",
                "Custom taxonomy training per workspace",
                "Multilingual support (15+ languages)",
              ],
            },
            {
              num: "F3",
              title: "Sentiment & Trend Analysis",
              color: "var(--accent-purple)",
              items: [
                "Granular sentiment scoring (not just positive/negative)",
                "Trend velocity tracking — rising vs. fading issues",
                "Segment-level sentiment breakdown",
                "Alert system for sudden sentiment shifts",
              ],
            },
            {
              num: "F4",
              title: "Impact Scoring Engine",
              color: "var(--accent-amber)",
              items: [
                "Composite score: volume + sentiment + churn risk",
                "Customer segment weighting (enterprise vs. SMB)",
                "Revenue impact estimation per theme",
                "Confidence-adjusted priority ranking",
              ],
            },
            {
              num: "F5",
              title: "AI Brief Generator",
              color: "#EC4899",
              items: [
                "One-click user story generation from any theme",
                "Auto-generated stakeholder summary reports",
                "PRD draft export with evidence citations",
                "Slack/email digest with weekly top themes",
              ],
            },
            {
              num: "F6",
              title: "Workflow Integration",
              color: "var(--accent-teal)",
              items: [
                "Push to Jira, Linear, Notion, Asana natively",
                "Bi-directional sync — ticket status updates theme",
                "Role-based access (PM, CS, Exec views)",
                "Audit trail for every decision made",
              ],
            },
          ].map((feat) => (
            <div
              key={feat.num}
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1.1vw",
                padding: "2.2vh 2vw",
                display: "flex",
                flexDirection: "column",
                gap: "1.2vh",
              }}
            >
              <div className="flex items-center gap-[0.8vw]">
                <div
                  style={{
                    width: "2.8vw",
                    height: "2.8vw",
                    borderRadius: "0.5vw",
                    background: `${feat.color}20`,
                    border: `1px solid ${feat.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1vw",
                    fontWeight: 700,
                    color: feat.color,
                    flexShrink: 0,
                  }}
                >
                  {feat.num}
                </div>
                <div className="font-display" style={{ fontSize: "1.4vw", fontWeight: 700, color: "var(--text-primary)" }}>
                  {feat.title}
                </div>
              </div>
              <div className="flex flex-col gap-[0.6vh]">
                {feat.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-[0.6vw]">
                    <div
                      style={{
                        width: "0.35vw",
                        height: "0.35vw",
                        borderRadius: "50%",
                        background: feat.color,
                        marginTop: "0.75vh",
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ fontSize: "1.15vw", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
