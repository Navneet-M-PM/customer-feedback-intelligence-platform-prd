export default function TechnicalArchitecture() {
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
          bottom: "5vh",
          right: "5vw",
          width: "20vw",
          height: "20vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="relative flex h-full flex-col px-[7vw] py-[7vh]">
        <div style={{ fontSize: "1.1vw", color: "var(--accent-blue)", fontWeight: 600, letterSpacing: "0.12em", marginBottom: "1.5vh" }}>
          11 / TECHNICAL ARCHITECTURE
        </div>
        <h2
          className="font-display"
          style={{ fontSize: "3.2vw", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.1, marginBottom: "3vh" }}
        >
          Built for reliability, privacy, and scale
          <br />
          <span style={{ color: "var(--accent-blue)" }}>from the ground up</span>
        </h2>
        <div className="flex gap-[2vw]" style={{ flex: 1 }}>
          <div style={{ flex: 1.2 }}>
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1.2vw",
                padding: "2.5vh 2vw",
                height: "100%",
              }}
            >
              <div style={{ fontSize: "1.1vw", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "2vh" }}>
                SYSTEM ARCHITECTURE LAYERS
              </div>
              <div className="flex flex-col gap-[1.2vh]">
                {[
                  {
                    layer: "Ingestion Layer",
                    color: "var(--accent-blue)",
                    desc: "Webhook receivers, OAuth connectors, bulk importers",
                    tech: "Node.js + BullMQ queue + S3 raw storage",
                  },
                  {
                    layer: "Processing Layer",
                    color: "var(--accent-teal)",
                    desc: "Cleaning, deduplication, normalization, language detection",
                    tech: "Python workers + PostgreSQL + vector embeddings",
                  },
                  {
                    layer: "AI Engine",
                    color: "var(--accent-purple)",
                    desc: "Clustering, sentiment analysis, impact scoring, brief generation",
                    tech: "OpenAI APIs + Pinecone vector DB + custom classifiers",
                  },
                  {
                    layer: "API Layer",
                    color: "var(--accent-amber)",
                    desc: "REST + GraphQL APIs, webhook delivery, rate limiting",
                    tech: "Express / Fastify + Zod validation + Redis caching",
                  },
                  {
                    layer: "Frontend",
                    color: "#EC4899",
                    desc: "Dashboard, explorer, brief editor, admin console",
                    tech: "React + TanStack Query + Recharts + Tailwind CSS",
                  },
                  {
                    layer: "Infrastructure",
                    color: "var(--text-secondary)",
                    desc: "Multi-tenant isolation, auto-scaling, disaster recovery",
                    tech: "AWS ECS + RDS + CloudFront + Terraform",
                  },
                ].map((l) => (
                  <div
                    key={l.layer}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "0.3vw 1fr 1fr",
                      gap: "0.8vw",
                      alignItems: "start",
                      paddingBottom: "1vh",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <div style={{ width: "0.3vw", height: "100%", minHeight: "2.5vh", background: l.color, borderRadius: "2px", marginTop: "0.2vh" }} />
                    <div>
                      <div style={{ fontSize: "1.2vw", color: "var(--text-primary)", fontWeight: 600 }}>{l.layer}</div>
                      <div style={{ fontSize: "1.05vw", color: "var(--text-secondary)" }}>{l.desc}</div>
                    </div>
                    <div style={{ fontSize: "1.05vw", color: "var(--text-muted)", paddingTop: "0.2vh" }}>{l.tech}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ flex: 0.8, display: "flex", flexDirection: "column", gap: "2vh" }}>
            <div
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1.2vw",
                padding: "2.5vh 2vw",
              }}
            >
              <div style={{ fontSize: "1.1vw", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "1.8vh" }}>
                NON-FUNCTIONALS
              </div>
              <div className="flex flex-col gap-[1.2vh]">
                {[
                  { label: "Uptime SLA", value: "99.9% (Phase 2+)", color: "var(--accent-teal)" },
                  { label: "Data Processing Latency", value: "< 2 min end-to-end", color: "var(--accent-teal)" },
                  { label: "Multi-tenancy", value: "Full schema isolation", color: "var(--accent-blue)" },
                  { label: "API Rate Limit", value: "10K req/min per tenant", color: "var(--accent-blue)" },
                  { label: "Data Retention", value: "Configurable (1–7 yrs)", color: "var(--accent-purple)" },
                  { label: "Compliance", value: "SOC 2, GDPR, CCPA", color: "var(--accent-purple)" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between" style={{ borderBottom: "1px solid var(--border)", paddingBottom: "0.8vh" }}>
                    <div style={{ fontSize: "1.1vw", color: "var(--text-secondary)" }}>{item.label}</div>
                    <div style={{ fontSize: "1.1vw", color: item.color, fontWeight: 600 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(20,184,166,0.06) 100%)",
                border: "1px solid rgba(59,130,246,0.2)",
                borderRadius: "1.2vw",
                padding: "2vh 2vw",
                flex: 1,
              }}
            >
              <div style={{ fontSize: "1.1vw", color: "var(--accent-blue)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "1vh" }}>
                OPEN QUESTIONS
              </div>
              <div className="flex flex-col gap-[0.8vh]">
                {[
                  "On-premise vs. cloud-only for enterprise? (Phase 3 decision)",
                  "Custom model fine-tuning cost vs. shared model accuracy tradeoff",
                  "Realtime streaming vs. batch processing for ingestion",
                ].map((q, i) => (
                  <div key={i} className="flex items-start gap-[0.6vw]">
                    <div style={{ fontSize: "1.1vw", color: "var(--accent-amber)", marginTop: "0.1vh", flexShrink: 0 }}>?</div>
                    <div style={{ fontSize: "1.1vw", color: "var(--text-secondary)", lineHeight: 1.5 }}>{q}</div>
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
