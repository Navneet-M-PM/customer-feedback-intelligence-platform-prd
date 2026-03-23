export default function ProductFlow() {
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
          07 / USER JOURNEY
        </div>
        <h2
          className="font-display"
          style={{ fontSize: "3.5vw", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1, marginBottom: "3vh" }}
        >
          From raw signal to shipped feature
          <br />
          <span style={{ color: "var(--accent-teal)" }}>in 5 steps</span>
        </h2>
        <div className="flex items-stretch gap-0" style={{ flex: 1, position: "relative" }}>
          {[
            {
              step: "1",
              label: "Connect",
              persona: "Admin / PM",
              color: "var(--accent-blue)",
              bg: "rgba(59,130,246,0.08)",
              border: "rgba(59,130,246,0.2)",
              actions: ["Select integrations from library", "Authenticate source accounts", "Set ingestion filters & rules", "First sync runs automatically"],
            },
            {
              step: "2",
              label: "Ingest",
              persona: "System",
              color: "var(--accent-teal)",
              bg: "rgba(20,184,166,0.08)",
              border: "rgba(20,184,166,0.2)",
              actions: ["Raw feedback normalized", "Duplicates removed", "Language detected", "Initial metadata tagged"],
            },
            {
              step: "3",
              label: "Analyze",
              persona: "AI Engine",
              color: "var(--accent-purple)",
              bg: "rgba(139,92,246,0.08)",
              border: "rgba(139,92,246,0.2)",
              actions: ["Themes clustered by LLM", "Sentiment scored per item", "Impact scores calculated", "Trends detected over time"],
            },
            {
              step: "4",
              label: "Explore",
              persona: "PM / Analyst",
              color: "var(--accent-amber)",
              bg: "rgba(245,158,11,0.08)",
              border: "rgba(245,158,11,0.2)",
              actions: ["View ranked theme dashboard", "Drill into evidence per theme", "Filter by segment / source", "Generate AI brief or summary"],
            },
            {
              step: "5",
              label: "Act",
              persona: "PM / Engineering",
              color: "#EC4899",
              bg: "rgba(236,72,153,0.08)",
              border: "rgba(236,72,153,0.2)",
              actions: ["Push theme to Jira / Linear", "Auto-generate user stories", "Share digest with stakeholders", "Mark theme as 'In Progress'"],
            },
          ].map((s, i) => (
            <div key={s.step} className="flex items-stretch gap-0" style={{ flex: 1 }}>
              <div
                style={{
                  flex: 1,
                  background: s.bg,
                  border: `1px solid ${s.border}`,
                  borderRadius: "1.2vw",
                  padding: "2.5vh 1.5vw",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5vh",
                }}
              >
                <div className="flex items-center justify-between">
                  <div
                    style={{
                      width: "3vw",
                      height: "3vw",
                      borderRadius: "50%",
                      background: `${s.color}20`,
                      border: `2px solid ${s.color}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.4vw",
                      fontWeight: 700,
                      color: s.color,
                      flexShrink: 0,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {s.step}
                  </div>
                </div>
                <div>
                  <div className="font-display" style={{ fontSize: "1.7vw", fontWeight: 700, color: "var(--text-primary)" }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: "1.05vw", color: s.color, fontWeight: 600, marginTop: "0.3vh" }}>
                    {s.persona}
                  </div>
                </div>
                <div className="flex flex-col gap-[0.7vh]" style={{ flex: 1 }}>
                  {s.actions.map((action, j) => (
                    <div key={j} className="flex items-start gap-[0.5vw]">
                      <div
                        style={{
                          width: "0.3vw",
                          height: "0.3vw",
                          borderRadius: "50%",
                          background: s.color,
                          marginTop: "0.8vh",
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ fontSize: "1.15vw", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                        {action}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {i < 4 && (
                <div
                  className="flex items-center justify-center"
                  style={{ width: "2vw", flexShrink: 0 }}
                >
                  <div style={{ fontSize: "1.5vw", color: "var(--text-muted)", fontWeight: 300 }}>→</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: "2.5vh",
            padding: "1.5vh 2.5vw",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "0.8vw",
            display: "flex",
            alignItems: "center",
            gap: "3vw",
          }}
        >
          <div style={{ fontSize: "1.2vw", color: "var(--text-muted)", fontWeight: 600 }}>TARGET CYCLE TIME:</div>
          <div style={{ fontSize: "1.4vw", color: "var(--text-primary)" }}>
            <span style={{ color: "var(--accent-teal)", fontWeight: 700 }}>Under 24 hours</span> from new feedback ingested to actionable insight surfaced in dashboard
          </div>
        </div>
      </div>
    </div>
  );
}
