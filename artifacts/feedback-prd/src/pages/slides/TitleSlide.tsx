export default function TitleSlide() {
  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(59,130,246,0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(20,184,166,0.12) 0%, transparent 55%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)",
          backgroundSize: "6vw 6vw",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-[40vw] opacity-50"
        style={{
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.08) 100%)",
          clipPath: "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      />
      <div
        className="absolute right-[5vw] top-[12vh]"
        style={{
          width: "28vw",
          height: "28vw",
          borderRadius: "50%",
          border: "1px solid rgba(59,130,246,0.15)",
          background:
            "radial-gradient(circle at 40% 40%, rgba(59,130,246,0.1) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute right-[10vw] top-[18vh]"
        style={{
          width: "16vw",
          height: "16vw",
          borderRadius: "50%",
          border: "1px solid rgba(20,184,166,0.2)",
        }}
      />
      <div className="relative flex h-full flex-col justify-between px-[7vw] py-[8vh]">
        <div className="flex items-center gap-[1.5vw]">
          <div
            style={{
              width: "0.3vw",
              height: "4vh",
              background: "var(--accent-blue)",
              borderRadius: "2px",
            }}
          />
          <span
            className="font-display tracking-[0.15em] uppercase"
            style={{
              fontSize: "1.3vw",
              color: "var(--accent-blue)",
              fontWeight: 600,
            }}
          >
            Product Requirements Document
          </span>
        </div>
        <div>
          <div
            style={{
              fontSize: "1.1vw",
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
              marginBottom: "2.5vh",
              fontWeight: 500,
            }}
          >
            VERSION 1.0 — Q2 2026
          </div>
          <h1
            className="font-display tracking-tight"
            style={{
              fontSize: "6.5vw",
              fontWeight: 700,
              color: "var(--text-primary)",
              lineHeight: 0.95,
              maxWidth: "60vw",
            }}
          >
            Customer Feedback
            <br />
            <span style={{ color: "var(--accent-blue)" }}>Intelligence</span>{" "}
            Platform
          </h1>
          <p
            style={{
              fontSize: "1.9vw",
              color: "var(--text-secondary)",
              maxWidth: "52vw",
              marginTop: "3vh",
              lineHeight: 1.5,
              fontWeight: 400,
            }}
          >
            Transforming unstructured customer signals into actionable product decisions — powered by AI
          </p>
          <div
            className="flex items-center gap-[3vw]"
            style={{ marginTop: "4vh" }}
          >
            <div>
              <div
                style={{ fontSize: "1.1vw", color: "var(--text-muted)", fontWeight: 500 }}
              >
                Prepared by
              </div>
              <div
                style={{ fontSize: "1.5vw", color: "var(--text-primary)", fontWeight: 600 }}
              >
                Senior Product Manager
              </div>
            </div>
            <div
              style={{
                width: "1px",
                height: "4vh",
                background: "var(--border)",
              }}
            />
            <div>
              <div
                style={{ fontSize: "1.1vw", color: "var(--text-muted)", fontWeight: 500 }}
              >
                Status
              </div>
              <div
                className="flex items-center gap-[0.5vw]"
                style={{ fontSize: "1.5vw", color: "var(--accent-teal)", fontWeight: 600 }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "0.6vw",
                    height: "0.6vw",
                    borderRadius: "50%",
                    background: "var(--accent-teal)",
                  }}
                />
                Ready for Review
              </div>
            </div>
            <div
              style={{
                width: "1px",
                height: "4vh",
                background: "var(--border)",
              }}
            />
            <div>
              <div
                style={{ fontSize: "1.1vw", color: "var(--text-muted)", fontWeight: 500 }}
              >
                Horizon
              </div>
              <div
                style={{ fontSize: "1.5vw", color: "var(--text-primary)", fontWeight: 600 }}
              >
                18-Month Build
              </div>
            </div>
          </div>
        </div>
        <div
          style={{ fontSize: "1.2vw", color: "var(--text-muted)", fontWeight: 400 }}
        >
          Confidential — For Internal Review Only
        </div>
      </div>
    </div>
  );
}
