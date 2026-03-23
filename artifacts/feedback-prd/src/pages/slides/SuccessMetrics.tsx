export default function SuccessMetrics() {
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
        <div style={{ fontSize: "1.1vw", color: "var(--accent-teal)", fontWeight: 600, letterSpacing: "0.12em", marginBottom: "1.5vh" }}>
          10 / SUCCESS METRICS
        </div>
        <h2
          className="font-display"
          style={{ fontSize: "3.5vw", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1, marginBottom: "3.5vh" }}
        >
          We measure what matters
          <span style={{ color: "var(--accent-teal)" }}> — not what's easy</span>
        </h2>
        <div className="flex gap-[2vw]" style={{ flex: 1 }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2vh" }}>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(20,184,166,0.06) 100%)",
                border: "1px solid rgba(59,130,246,0.25)",
                borderRadius: "1.2vw",
                padding: "2.5vh 2.5vw",
              }}
            >
              <div style={{ fontSize: "1.1vw", color: "var(--accent-blue)", fontWeight: 700, letterSpacing: "0.1em", marginBottom: "1vh" }}>
                NORTH STAR METRIC
              </div>
              <div className="font-display" style={{ fontSize: "2.4vw", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}>
                "Insights Activated"
              </div>
              <div style={{ fontSize: "1.3vw", color: "var(--text-secondary)", marginTop: "0.8vh", lineHeight: 1.6 }}>
                Number of feedback themes that result in a shipped feature, product change, or documented decision within 90 days. This proves the closed loop is working.
              </div>
            </div>
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1.2vw",
                padding: "2.5vh 2vw",
                flex: 1,
              }}
            >
              <div style={{ fontSize: "1.1vw", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "1.8vh" }}>
                PRODUCT HEALTH METRICS
              </div>
              <div className="flex flex-col gap-[1.5vh]">
                {[
                  { label: "Daily Active Rate", target: "> 40% of seats/week", type: "Engagement" },
                  { label: "Time-to-First-Insight", target: "< 24 hours after connect", type: "Activation" },
                  { label: "Theme-to-Ticket Rate", target: "> 30% of surfaced themes", type: "Value" },
                  { label: "Feedback Processed / Month", target: "10K+ items per workspace", type: "Scale" },
                ].map((m) => (
                  <div key={m.label} className="flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "1vh" }}>
                    <div>
                      <div style={{ fontSize: "1.2vw", color: "var(--text-primary)", fontWeight: 500 }}>{m.label}</div>
                      <div style={{ fontSize: "1vw", color: "var(--text-muted)" }}>{m.type}</div>
                    </div>
                    <div style={{ fontSize: "1.2vw", color: "var(--accent-teal)", fontWeight: 600 }}>{m.target}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2vh" }}>
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1.2vw",
                padding: "2.5vh 2vw",
                flex: 1,
              }}
            >
              <div style={{ fontSize: "1.1vw", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "1.8vh" }}>
                BUSINESS METRICS BY PHASE
              </div>
              <div className="flex flex-col gap-[1.5vh]">
                {[
                  { phase: "Phase 1 (M6)", arr: "$0 (design partners)", retention: "80% at 90 days", nps: "> 50" },
                  { phase: "Phase 2 (M12)", arr: "$200K ARR", retention: "< 10% monthly churn", nps: "> 55" },
                  { phase: "Phase 3 (M18)", arr: "$1M ARR", retention: "< 5% monthly churn", nps: "> 60" },
                ].map((row, i) => (
                  <div
                    key={row.phase}
                    style={{
                      background: i === 2 ? "rgba(59,130,246,0.06)" : "transparent",
                      border: i === 2 ? "1px solid rgba(59,130,246,0.15)" : "1px solid var(--border)",
                      borderRadius: "0.8vw",
                      padding: "1.5vh 1.5vw",
                    }}
                  >
                    <div style={{ fontSize: "1.1vw", color: "var(--accent-blue)", fontWeight: 700, marginBottom: "0.5vh" }}>{row.phase}</div>
                    <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5vw" }}>
                      <div>
                        <div style={{ fontSize: "0.9vw", color: "var(--text-muted)" }}>ARR</div>
                        <div style={{ fontSize: "1.1vw", color: "var(--text-primary)", fontWeight: 500 }}>{row.arr}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.9vw", color: "var(--text-muted)" }}>Retention</div>
                        <div style={{ fontSize: "1.1vw", color: "var(--text-primary)", fontWeight: 500 }}>{row.retention}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "0.9vw", color: "var(--text-muted)" }}>NPS</div>
                        <div style={{ fontSize: "1.1vw", color: "var(--text-primary)", fontWeight: 500 }}>{row.nps}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1.2vw",
                padding: "2.5vh 2vw",
              }}
            >
              <div style={{ fontSize: "1.1vw", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "1.5vh" }}>
                LEADING INDICATORS (WEEKLY)
              </div>
              <div className="flex flex-col gap-[0.8vh]">
                {[
                  "Sources connected per new workspace",
                  "Themes generated per active workspace",
                  "AI briefs generated this week",
                  "Workflow integrations triggered",
                  "Feedback items ingested vs. prior week",
                ].map((kpi, i) => (
                  <div key={i} className="flex items-center gap-[0.8vw]">
                    <div style={{ width: "0.3vw", height: "0.3vw", borderRadius: "50%", background: "var(--accent-teal)", flexShrink: 0 }} />
                    <div style={{ fontSize: "1.2vw", color: "var(--text-secondary)" }}>{kpi}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
