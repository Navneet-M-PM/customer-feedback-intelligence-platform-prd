export default function MarketOpportunity() {
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
          top: "5vh",
          right: "5vw",
          width: "24vw",
          height: "24vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          border: "1px solid rgba(59,130,246,0.12)",
        }}
      />
      <div className="relative flex h-full flex-col px-[7vw] py-[7vh]">
        <div style={{ fontSize: "1.1vw", color: "var(--accent-teal)", fontWeight: 600, letterSpacing: "0.12em", marginBottom: "2vh" }}>
          02 / MARKET OPPORTUNITY
        </div>
        <h2
          className="font-display"
          style={{ fontSize: "3.8vw", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1, marginBottom: "4vh" }}
        >
          A massive, underserved market at the
          <br />
          <span style={{ color: "var(--accent-teal)" }}>intersection of AI and product intelligence</span>
        </h2>
        <div className="flex gap-[2vw]" style={{ flex: 1 }}>
          <div className="flex flex-col gap-[2vh]" style={{ flex: 1 }}>
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1.2vw",
                padding: "3vh 2.5vw",
                flex: 1,
              }}
            >
              <div
                className="font-display"
                style={{ fontSize: "5.5vw", fontWeight: 700, color: "var(--accent-blue)", lineHeight: 1 }}
              >
                $9.5B
              </div>
              <div style={{ fontSize: "1.4vw", color: "var(--text-primary)", fontWeight: 600, marginTop: "1vh" }}>
                Customer Experience Analytics Market (2025)
              </div>
              <div style={{ fontSize: "1.2vw", color: "var(--text-secondary)", marginTop: "0.8vh" }}>
                Growing at 12.4% CAGR through 2030 — driven by AI adoption and product-led growth
              </div>
            </div>
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1.2vw",
                padding: "2.5vh 2.5vw",
                flex: 1,
              }}
            >
              <div
                className="font-display"
                style={{ fontSize: "5.5vw", fontWeight: 700, color: "var(--accent-teal)", lineHeight: 1 }}
              >
                280K
              </div>
              <div style={{ fontSize: "1.4vw", color: "var(--text-primary)", fontWeight: 600, marginTop: "1vh" }}>
                Product Teams Globally (ICP)
              </div>
              <div style={{ fontSize: "1.2vw", color: "var(--text-secondary)", marginTop: "0.8vh" }}>
                B2B SaaS companies with 10–500 person teams and active user bases
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[2vh]" style={{ flex: 1 }}>
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1.2vw",
                padding: "2.5vh 2.5vw",
              }}
            >
              <div style={{ fontSize: "1.3vw", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "2vh" }}>
                MARKET TAILWINDS
              </div>
              <div className="flex flex-col gap-[1.5vh]">
                <div className="flex items-start gap-[1vw]">
                  <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "var(--accent-blue)", marginTop: "0.8vh", flexShrink: 0 }} />
                  <div style={{ fontSize: "1.4vw", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>AI democratization</span> — LLMs make qualitative analysis scalable for the first time
                  </div>
                </div>
                <div className="flex items-start gap-[1vw]">
                  <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "var(--accent-blue)", marginTop: "0.8vh", flexShrink: 0 }} />
                  <div style={{ fontSize: "1.4vw", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>PLG growth</span> — product-led companies live and die by customer signals
                  </div>
                </div>
                <div className="flex items-start gap-[1vw]">
                  <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "var(--accent-blue)", marginTop: "0.8vh", flexShrink: 0 }} />
                  <div style={{ fontSize: "1.4vw", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>Remote-first teams</span> — async decision-making demands better signal aggregation
                  </div>
                </div>
                <div className="flex items-start gap-[1vw]">
                  <div style={{ width: "0.4vw", height: "0.4vw", borderRadius: "50%", background: "var(--accent-blue)", marginTop: "0.8vh", flexShrink: 0 }} />
                  <div style={{ fontSize: "1.4vw", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>Churn pressure</span> — retention is the #1 KPI; feedback is the early warning system
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(20,184,166,0.08) 100%)",
                border: "1px solid rgba(59,130,246,0.2)",
                borderRadius: "1.2vw",
                padding: "2.5vh 2.5vw",
              }}
            >
              <div style={{ fontSize: "1.3vw", color: "var(--accent-blue)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "1vh" }}>
                OUR INITIAL TARGET
              </div>
              <div style={{ fontSize: "1.5vw", color: "var(--text-primary)", lineHeight: 1.6 }}>
                Series A–C B2B SaaS companies (50–500 employees) with dedicated product teams who generate 1,000+ feedback data points per month across multiple channels.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
