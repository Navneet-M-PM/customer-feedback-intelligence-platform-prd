export default function SolutionOverview() {
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
      <div
        className="absolute"
        style={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(59,130,246,0.07) 0%, transparent 65%)",
        }}
      />
      <div className="relative flex h-full flex-col px-[7vw] py-[7vh]">
        <div style={{ fontSize: "1.1vw", color: "var(--accent-teal)", fontWeight: 600, letterSpacing: "0.12em", marginBottom: "1.5vh" }}>
          05 / SOLUTION OVERVIEW
        </div>
        <h2
          className="font-display"
          style={{ fontSize: "3.6vw", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1, marginBottom: "1.5vh" }}
        >
          CFIP: The intelligence layer between
          <br />
          <span style={{ color: "var(--accent-teal)" }}>customer signals and product decisions</span>
        </h2>
        <p style={{ fontSize: "1.6vw", color: "var(--text-secondary)", maxWidth: "65vw", lineHeight: 1.6, marginBottom: "4vh" }}>
          A unified platform that ingests feedback from any source, uses AI to cluster and prioritize themes, and surfaces actionable insights directly into product workflows.
        </p>
        <div className="flex gap-[1.5vw]" style={{ flex: 1 }}>
          {[
            {
              icon: "01",
              label: "Ingest",
              title: "Universal Feedback Hub",
              desc: "Connect any feedback source — app store reviews, Zendesk, Intercom, Typeform, Slack, CSV uploads — via native integrations and API.",
              color: "var(--accent-blue)",
              bg: "rgba(59,130,246,0.08)",
              border: "rgba(59,130,246,0.2)",
            },
            {
              icon: "02",
              label: "Analyze",
              title: "AI Theme Engine",
              desc: "LLM-powered clustering identifies recurring themes, sentiment trends, and emerging pain points without manual tagging.",
              color: "var(--accent-teal)",
              bg: "rgba(20,184,166,0.08)",
              border: "rgba(20,184,166,0.2)",
            },
            {
              icon: "03",
              label: "Prioritize",
              title: "Impact Scoring",
              desc: "Themes are automatically scored by volume, sentiment velocity, customer segment, and potential churn risk — giving you an evidence-backed priority stack.",
              color: "var(--accent-purple)",
              bg: "rgba(139,92,246,0.08)",
              border: "rgba(139,92,246,0.2)",
            },
            {
              icon: "04",
              label: "Act",
              title: "Product Workflow Integration",
              desc: "Push insights directly to Jira, Linear, or Notion. Auto-generate user stories, feature briefs, and stakeholder summaries from any theme.",
              color: "var(--accent-amber)",
              bg: "rgba(245,158,11,0.08)",
              border: "rgba(245,158,11,0.2)",
            },
          ].map((step) => (
            <div
              key={step.icon}
              style={{
                flex: 1,
                background: step.bg,
                border: `1px solid ${step.border}`,
                borderRadius: "1.4vw",
                padding: "3vh 2vw",
                display: "flex",
                flexDirection: "column",
                gap: "1.5vh",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  fontSize: "5vw",
                  fontWeight: 700,
                  color: step.color,
                  opacity: 0.15,
                  position: "absolute",
                  bottom: "-1vh",
                  right: "0.5vw",
                  lineHeight: 1,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {step.icon}
              </div>
              <div
                style={{
                  fontSize: "1vw",
                  color: step.color,
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                }}
              >
                STEP {step.icon}
              </div>
              <div
                style={{
                  fontSize: "1vw",
                  color: step.color,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {step.label}
              </div>
              <div
                className="font-display"
                style={{ fontSize: "1.6vw", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.2 }}
              >
                {step.title}
              </div>
              <div style={{ fontSize: "1.25vw", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {step.desc}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: "2.5vh",
            display: "flex",
            alignItems: "center",
            gap: "3vw",
            padding: "1.5vh 2.5vw",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "1vw",
          }}
        >
          <div style={{ fontSize: "1.3vw", color: "var(--text-muted)", fontWeight: 600 }}>KEY PRINCIPLE:</div>
          <div style={{ fontSize: "1.4vw", color: "var(--text-primary)", lineHeight: 1.5 }}>
            CFIP is not a data warehouse — it is a decision accelerator. Every feature is designed to reduce the time from "customer said X" to "we built Y."
          </div>
        </div>
      </div>
    </div>
  );
}
