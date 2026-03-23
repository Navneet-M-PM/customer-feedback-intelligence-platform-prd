export default function ProblemStatement() {
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
        className="absolute bottom-0 right-0"
        style={{
          width: "30vw",
          height: "30vw",
          background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)",
        }}
      />
      <div className="relative flex h-full flex-col px-[7vw] py-[7vh]">
        <div className="flex items-center gap-[1vw]" style={{ marginBottom: "3.5vh" }}>
          <div
            style={{
              fontSize: "1.1vw",
              color: "var(--accent-amber)",
              fontWeight: 600,
              letterSpacing: "0.12em",
            }}
          >
            01 / PROBLEM STATEMENT
          </div>
        </div>
        <h2
          className="font-display"
          style={{
            fontSize: "4vw",
            fontWeight: 700,
            color: "var(--text-primary)",
            lineHeight: 1.1,
            marginBottom: "1.5vh",
          }}
        >
          Companies are drowning in feedback
          <br />
          <span style={{ color: "var(--accent-amber)" }}>— yet flying blind</span>
        </h2>
        <p
          style={{
            fontSize: "1.7vw",
            color: "var(--text-secondary)",
            maxWidth: "58vw",
            lineHeight: 1.6,
            marginBottom: "4vh",
          }}
        >
          The average B2B SaaS company collects feedback from 6+ sources but has no unified way to make sense of it — resulting in missed signals, slow decisions, and products built on gut feel.
        </p>
        <div className="grid gap-[2vh]" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "1.2vw",
              padding: "2.5vh 2vw",
              borderTop: "3px solid rgba(245,158,11,0.6)",
            }}
          >
            <div
              className="font-display"
              style={{ fontSize: "3.5vw", fontWeight: 700, color: "var(--accent-amber)" }}
            >
              6+
            </div>
            <div style={{ fontSize: "1.4vw", color: "var(--text-primary)", fontWeight: 600, marginTop: "0.8vh" }}>
              Disconnected Sources
            </div>
            <div style={{ fontSize: "1.2vw", color: "var(--text-secondary)", marginTop: "0.5vh", lineHeight: 1.5 }}>
              App reviews, support tickets, NPS surveys, sales calls, social media — all siloed
            </div>
          </div>
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "1.2vw",
              padding: "2.5vh 2vw",
              borderTop: "3px solid rgba(239,68,68,0.6)",
            }}
          >
            <div
              className="font-display"
              style={{ fontSize: "3.5vw", fontWeight: 700, color: "#EF4444" }}
            >
              73%
            </div>
            <div style={{ fontSize: "1.4vw", color: "var(--text-primary)", fontWeight: 600, marginTop: "0.8vh" }}>
              Feedback Never Acted On
            </div>
            <div style={{ fontSize: "1.2vw", color: "var(--text-secondary)", marginTop: "0.5vh", lineHeight: 1.5 }}>
              Most teams lack the bandwidth to process what they already collect
            </div>
          </div>
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "1.2vw",
              padding: "2.5vh 2vw",
              borderTop: "3px solid rgba(139,92,246,0.6)",
            }}
          >
            <div
              className="font-display"
              style={{ fontSize: "3.5vw", fontWeight: 700, color: "var(--accent-purple)" }}
            >
              4 wks
            </div>
            <div style={{ fontSize: "1.4vw", color: "var(--text-primary)", fontWeight: 600, marginTop: "0.8vh" }}>
              Average Insight Lag
            </div>
            <div style={{ fontSize: "1.2vw", color: "var(--text-secondary)", marginTop: "0.5vh", lineHeight: 1.5 }}>
              By the time a team synthesizes feedback, the window to act has passed
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "3vh",
            padding: "2vh 2.5vw",
            background: "rgba(245,158,11,0.06)",
            border: "1px solid rgba(245,158,11,0.2)",
            borderRadius: "1vw",
            fontSize: "1.5vw",
            color: "var(--text-primary)",
            lineHeight: 1.6,
            maxWidth: "80vw",
          }}
        >
          <span style={{ color: "var(--accent-amber)", fontWeight: 700 }}>Root cause: </span>
          There is no intelligent layer between raw customer signals and product decisions. Teams manually read, categorize, and interpret thousands of data points — a process that is slow, inconsistent, and biased.
        </div>
      </div>
    </div>
  );
}
