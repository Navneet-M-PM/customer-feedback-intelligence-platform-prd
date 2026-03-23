export default function Roadmap() {
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
        <div style={{ fontSize: "1.1vw", color: "var(--accent-amber)", fontWeight: 600, letterSpacing: "0.12em", marginBottom: "1.5vh" }}>
          09 / PRODUCT ROADMAP
        </div>
        <h2
          className="font-display"
          style={{ fontSize: "3.5vw", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1, marginBottom: "3.5vh" }}
        >
          Three phases across 18 months
          <br />
          <span style={{ color: "var(--accent-amber)" }}>— validate, scale, expand</span>
        </h2>
        <div className="flex gap-[1.5vw]" style={{ flex: 1 }}>
          {[
            {
              phase: "Phase 1",
              label: "Foundation",
              timeline: "M1 – M6",
              status: "MVP",
              color: "var(--accent-blue)",
              bg: "rgba(59,130,246,0.08)",
              border: "rgba(59,130,246,0.2)",
              goal: "Prove core value with 10 design partners",
              deliverables: [
                "Multi-source ingestion (3 connectors: Zendesk, Typeform, CSV)",
                "AI theme clustering engine (v1)",
                "Sentiment scoring dashboard",
                "Basic impact scoring",
                "Manual export (CSV, PDF)",
                "Slack notification digest",
              ],
              metrics: "10 design partners, 80% retention at 90 days",
            },
            {
              phase: "Phase 2",
              label: "Growth",
              timeline: "M7 – M12",
              status: "Scale",
              color: "var(--accent-teal)",
              bg: "rgba(20,184,166,0.08)",
              border: "rgba(20,184,166,0.2)",
              goal: "Expand integrations & launch self-serve",
              deliverables: [
                "Full connector library (10+ sources)",
                "AI Brief Generator",
                "Jira / Linear / Notion integration",
                "Churn signal detection (beta)",
                "Team collaboration features",
                "Self-serve onboarding + billing",
              ],
              metrics: "100 paying customers, $200K ARR, NPS > 50",
            },
            {
              phase: "Phase 3",
              label: "Platform",
              timeline: "M13 – M18",
              status: "Enterprise",
              color: "var(--accent-purple)",
              bg: "rgba(139,92,246,0.08)",
              border: "rgba(139,92,246,0.2)",
              goal: "Enterprise tier + platform ecosystem",
              deliverables: [
                "Custom taxonomy model training",
                "Enterprise SSO + RBAC",
                "API-first public platform",
                "Developer partner ecosystem",
                "SOC 2 Type II certification",
                "Advanced analytics + BI connectors",
              ],
              metrics: "10 enterprise deals, $1M ARR, 3 platform partners",
            },
          ].map((phase) => (
            <div
              key={phase.phase}
              style={{
                flex: 1,
                background: phase.bg,
                border: `1px solid ${phase.border}`,
                borderRadius: "1.4vw",
                padding: "3vh 2vw",
                display: "flex",
                flexDirection: "column",
                gap: "1.8vh",
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div style={{ fontSize: "1vw", color: phase.color, fontWeight: 700, letterSpacing: "0.1em" }}>
                    {phase.phase}
                  </div>
                  <div className="font-display" style={{ fontSize: "2.2vw", fontWeight: 700, color: "var(--text-primary)", marginTop: "0.3vh" }}>
                    {phase.label}
                  </div>
                </div>
                <div
                  style={{
                    padding: "0.5vh 0.9vw",
                    background: `${phase.color}20`,
                    border: `1px solid ${phase.color}40`,
                    borderRadius: "0.4vw",
                    fontSize: "1vw",
                    color: phase.color,
                    fontWeight: 600,
                  }}
                >
                  {phase.status}
                </div>
              </div>
              <div
                style={{
                  padding: "0.8vh 1.2vw",
                  background: "rgba(0,0,0,0.2)",
                  borderRadius: "0.6vw",
                  fontSize: "1.1vw",
                  color: phase.color,
                  fontWeight: 600,
                }}
              >
                {phase.timeline}
              </div>
              <div style={{ fontSize: "1.2vw", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.5 }}>
                {phase.goal}
              </div>
              <div className="flex flex-col gap-[0.7vh]" style={{ flex: 1 }}>
                {phase.deliverables.map((d, i) => (
                  <div key={i} className="flex items-start gap-[0.6vw]">
                    <div
                      style={{
                        width: "1.3vw",
                        height: "1.3vw",
                        borderRadius: "0.25vw",
                        border: `1.5px solid ${phase.color}50`,
                        marginTop: "0.2vh",
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ fontSize: "1.15vw", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      {d}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  padding: "1.2vh 1.2vw",
                  background: "rgba(0,0,0,0.25)",
                  borderRadius: "0.8vw",
                  borderLeft: `2px solid ${phase.color}`,
                }}
              >
                <div style={{ fontSize: "0.9vw", color: "var(--text-muted)", fontWeight: 600, marginBottom: "0.3vh" }}>SUCCESS CRITERIA</div>
                <div style={{ fontSize: "1.1vw", color: "var(--text-primary)" }}>{phase.metrics}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
