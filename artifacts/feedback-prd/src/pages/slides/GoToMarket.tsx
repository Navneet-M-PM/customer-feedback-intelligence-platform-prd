export default function GoToMarket() {
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
          12 / GO-TO-MARKET STRATEGY
        </div>
        <h2
          className="font-display"
          style={{ fontSize: "3.5vw", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1, marginBottom: "3.5vh" }}
        >
          Bottom-up PLG, topped with
          <br />
          <span style={{ color: "var(--accent-teal)" }}>enterprise expansion</span>
        </h2>
        <div className="flex gap-[2vw]" style={{ flex: 1 }}>
          <div style={{ flex: 1.2, display: "flex", flexDirection: "column", gap: "2vh" }}>
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1.2vw",
                padding: "2.5vh 2vw",
              }}
            >
              <div style={{ fontSize: "1.1vw", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "1.8vh" }}>
                GO-TO-MARKET MOTION
              </div>
              <div className="flex flex-col gap-[1.8vh]">
                {[
                  {
                    phase: "Phase 1: Design Partners",
                    color: "var(--accent-blue)",
                    tactics: [
                      "Recruit 10 PM communities (Lenny's, Mind the Product)",
                      "Offer free access in exchange for bi-weekly feedback sessions",
                      "Co-create case studies and social proof",
                    ],
                  },
                  {
                    phase: "Phase 2: PLG Self-Serve",
                    color: "var(--accent-teal)",
                    tactics: [
                      "Freemium tier: 500 feedback items/month, 2 sources",
                      "Virality: 'Powered by CFIP' on exported briefs + reports",
                      "SEO content: 'how to analyze customer feedback' category",
                    ],
                  },
                  {
                    phase: "Phase 3: Enterprise Sales",
                    color: "var(--accent-purple)",
                    tactics: [
                      "Expand from PM into CS and executive stakeholders",
                      "Enterprise contract via CSM-led outbound",
                      "Partner channel: PMs in consulting and PM training orgs",
                    ],
                  },
                ].map((m) => (
                  <div key={m.phase} style={{ borderLeft: `3px solid ${m.color}`, paddingLeft: "1.2vw" }}>
                    <div style={{ fontSize: "1.3vw", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.8vh" }}>{m.phase}</div>
                    <div className="flex flex-col gap-[0.5vh]">
                      {m.tactics.map((t, i) => (
                        <div key={i} className="flex items-start gap-[0.6vw]">
                          <div style={{ width: "0.3vw", height: "0.3vw", borderRadius: "50%", background: m.color, marginTop: "0.75vh", flexShrink: 0 }} />
                          <div style={{ fontSize: "1.15vw", color: "var(--text-secondary)", lineHeight: 1.5 }}>{t}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ flex: 0.9, display: "flex", flexDirection: "column", gap: "2vh" }}>
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1.2vw",
                padding: "2.5vh 2vw",
              }}
            >
              <div style={{ fontSize: "1.1vw", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "1.8vh" }}>
                PRICING MODEL
              </div>
              <div className="flex flex-col gap-[1.5vh]">
                {[
                  {
                    tier: "Free",
                    price: "$0/mo",
                    color: "var(--text-secondary)",
                    desc: "500 items/mo, 2 sources, basic clustering, CSV export",
                  },
                  {
                    tier: "Pro",
                    price: "$149/mo",
                    color: "var(--accent-blue)",
                    desc: "10K items/mo, unlimited sources, AI briefs, Jira/Linear sync, 5 seats",
                  },
                  {
                    tier: "Team",
                    price: "$499/mo",
                    color: "var(--accent-teal)",
                    desc: "100K items/mo, custom taxonomy, churn signals, 20 seats, priority support",
                  },
                  {
                    tier: "Enterprise",
                    price: "Custom",
                    color: "var(--accent-purple)",
                    desc: "Unlimited, SSO, RBAC, SOC 2, dedicated CSM, API access, SLA",
                  },
                ].map((t) => (
                  <div
                    key={t.tier}
                    style={{
                      padding: "1.2vh 1.2vw",
                      background: "rgba(0,0,0,0.2)",
                      borderRadius: "0.6vw",
                      borderLeft: `2px solid ${t.color}`,
                    }}
                  >
                    <div className="flex items-center justify-between" style={{ marginBottom: "0.4vh" }}>
                      <div style={{ fontSize: "1.2vw", fontWeight: 700, color: t.color }}>{t.tier}</div>
                      <div style={{ fontSize: "1.2vw", fontWeight: 700, color: "var(--text-primary)" }}>{t.price}</div>
                    </div>
                    <div style={{ fontSize: "1.05vw", color: "var(--text-muted)", lineHeight: 1.5 }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                background: "rgba(20,184,166,0.08)",
                border: "1px solid rgba(20,184,166,0.2)",
                borderRadius: "1.2vw",
                padding: "2vh 2vw",
              }}
            >
              <div style={{ fontSize: "1.1vw", color: "var(--accent-teal)", fontWeight: 600, marginBottom: "0.8vh" }}>
                ICP ACQUISITION HYPOTHESIS
              </div>
              <div style={{ fontSize: "1.3vw", color: "var(--text-primary)", lineHeight: 1.6 }}>
                PMs discover us through content, activate on free plan, expand to Pro when they generate their first AI brief. Teams grow from 1 seat → 5+ within 60 days of activation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
