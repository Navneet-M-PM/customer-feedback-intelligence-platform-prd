import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  { id: "executive-summary", num: "01", label: "Executive Summary" },
  { id: "problem-identification", num: "02", label: "Problem Identification" },
  { id: "pain-points", num: "03", label: "Pain Points & Research" },
  { id: "gap-analysis", num: "04", label: "Gap Analysis" },
  { id: "requirements-gathering", num: "05", label: "Requirements Gathering" },
  { id: "user-personas", num: "06", label: "User Personas" },
  { id: "customer-journey", num: "07", label: "Customer Journey Map" },
  { id: "concept-testing", num: "08", label: "Concept Testing" },
  { id: "prioritization", num: "09", label: "Prioritization Framework" },
  { id: "ab-testing", num: "10", label: "A/B Testing Strategy" },
  { id: "user-stories", num: "11", label: "User Story Detailing" },
  { id: "functional-requirements", num: "12", label: "Functional Requirements" },
  { id: "non-functional", num: "13", label: "Non-Functional Requirements" },
  { id: "system-architecture", num: "14", label: "System Architecture" },
  { id: "orchestration", num: "15", label: "Orchestration & Data Flow" },
  { id: "api-integrations", num: "16", label: "API Integrations" },
  { id: "kpis", num: "17", label: "KPIs & Success Metrics" },
  { id: "risks", num: "18", label: "Risks & Mitigations" },
  { id: "roadmap", num: "19", label: "Roadmap & Milestones" },
];

function useActiveSection() {
  const [active, setActive] = useState("executive-summary");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return [active, setActive] as const;
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Tag({ children, color = "blue" }: { children: React.ReactNode; color?: "blue" | "green" | "amber" | "rose" | "purple" | "slate" }) {
  const colors = {
    blue: "bg-blue-900/40 text-blue-300 border-blue-700/40",
    green: "bg-emerald-900/40 text-emerald-300 border-emerald-700/40",
    amber: "bg-amber-900/40 text-amber-300 border-amber-700/40",
    rose: "bg-rose-900/40 text-rose-300 border-rose-700/40",
    purple: "bg-purple-900/40 text-purple-300 border-purple-700/40",
    slate: "bg-slate-700/40 text-slate-300 border-slate-600/40",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-[hsl(218_38%_11%)] border border-[hsl(220_25%_18%)] rounded-xl p-5 ${className}`}>
      {children}
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Card>
      <div className="text-2xl font-bold text-emerald-400 mb-1">{value}</div>
      <div className="text-sm font-medium text-slate-300">{label}</div>
      {sub && <div className="text-xs text-slate-500 mt-0.5">{sub}</div>}
    </Card>
  );
}

function Quote({ children, author }: { children: React.ReactNode; author?: string }) {
  return (
    <div className="border-l-4 border-emerald-500 pl-4 py-1 my-4">
      <p className="text-slate-300 italic text-sm leading-relaxed">"{children}"</p>
      {author && <p className="text-slate-500 text-xs mt-1.5">— {author}</p>}
    </div>
  );
}

function SectionHeader({ num, title, subtitle, tags }: { num: string; title: string; subtitle?: string; tags?: { label: string; color?: "blue" | "green" | "amber" | "rose" | "purple" | "slate" }[] }) {
  return (
    <div className="mb-8">
      <div className="text-xs font-mono text-emerald-500 uppercase tracking-widest mb-2">Chapter {num}</div>
      <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
      {subtitle && <p className="text-slate-400 text-base leading-relaxed max-w-2xl">{subtitle}</p>}
      {tags && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((t) => <Tag key={t.label} color={t.color}>{t.label}</Tag>)}
        </div>
      )}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[hsl(220_25%_18%)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[hsl(220_30%_12%)]">
            {headers.map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide border-b border-[hsl(220_25%_18%)]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={`border-b border-[hsl(220_25%_18%)] ${i % 2 === 0 ? "bg-[hsl(218_38%_11%)]" : "bg-[hsl(218_35%_10%)]"}`}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-slate-300">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function S01() {
  return (
    <section id="executive-summary" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="01"
        title="Executive Summary"
        subtitle="The Customer Feedback Intelligence Platform (CFIP) transforms how product teams act on customer feedback — replacing scattered, manual processes with a unified AI-powered system."
        tags={[
          { label: "AI / ML", color: "blue" },
          { label: "B2B SaaS", color: "purple" },
          { label: "Product Strategy", color: "green" },
        ]}
      />
      <div className="grid grid-cols-2 gap-4 mb-6 sm:grid-cols-4">
        <StatCard label="Avg. Insight-to-Action Time" value="3 hrs" sub="down from 3 weeks" />
        <StatCard label="Feedback Sources" value="6 unified" sub="Zendesk, G2, NPS, etc." />
        <StatCard label="PM Interviews Conducted" value="12" sub="across 8 companies" />
        <StatCard label="Target ARR (Year 1)" value="$2.4M" sub="120 seats @ $20K ACV" />
      </div>
      <Card>
        <h3 className="text-base font-semibold text-white mb-3">Product Overview</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-3">
          CFIP is a real-time customer feedback intelligence layer that sits on top of existing support, review, and research channels. It uses AI clustering to identify recurring themes, monitors sentiment drift, generates executive briefs, and surfaces proactive alerts when critical patterns emerge — all without requiring PMs to write a single query.
        </p>
        <p className="text-slate-400 text-sm leading-relaxed">
          The core insight: PMs aren't failing to collect feedback. They're failing to act on it at speed. CFIP is built around the question <span className="text-white font-medium">"Why does it take 3 weeks to turn customer feedback into a roadmap decision?"</span> and systematically dismantles every bottleneck in that flow.
        </p>
      </Card>
    </section>
  );
}

function S02() {
  return (
    <section id="problem-identification" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="02"
        title="Problem Identification"
        subtitle="How we moved from a vague business pain to a precisely scoped product problem."
        tags={[{ label: "Discovery", color: "amber" }, { label: "Problem Framing", color: "blue" }]}
      />
      <div className="space-y-4">
        <Card>
          <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wide mb-3">The Triggering Observation</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            During a quarterly business review at a Series B SaaS company, the CPO asked: "Can someone tell me what our top 3 churn drivers are right now?" Four PMs, two CSMs, and a Head of Support were in the room. Nobody could answer with confidence. The data existed — spread across Zendesk, Gong calls, G2 reviews, and NPS responses — but nobody had aggregated it recently.
          </p>
          <Quote author="CPO, $30M ARR SaaS, Series B">
            We have more feedback than ever and less insight than a year ago. More tools made things worse.
          </Quote>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-white mb-3">Root Cause Decomposition</h3>
          <div className="space-y-3">
            {[
              { layer: "Symptom", desc: "PMs can't quickly answer 'What are customers saying about X?'" },
              { layer: "Cause L1", desc: "Feedback lives in 5–8 disconnected tools with no unified view" },
              { layer: "Cause L2", desc: "Aggregation requires manual export, tagging, and analysis (2–5 days)" },
              { layer: "Cause L3", desc: "No one owns cross-channel synthesis; each team reads their own tool" },
              { layer: "Root Cause", desc: "Feedback intelligence is treated as a project, not a continuous capability" },
            ].map((row) => (
              <div key={row.layer} className="flex gap-4">
                <span className="text-xs font-mono text-emerald-500 w-24 shrink-0 pt-0.5">{row.layer}</span>
                <span className="text-slate-300 text-sm">{row.desc}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-white mb-3">Problem Statement (refined after research)</h3>
          <div className="bg-emerald-950/40 border border-emerald-700/30 rounded-lg p-4">
            <p className="text-slate-200 text-sm leading-relaxed">
              Product managers at scaling B2B SaaS companies (50–500 employees) spend 6–12 hours per week manually aggregating customer feedback from siloed tools, yet still feel under-informed at roadmap and sprint planning meetings — because no system continuously synthesizes signal into actionable insight on their behalf.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}

function S03() {
  return (
    <section id="pain-points" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="03"
        title="Pain Points & User Research"
        subtitle="12 PM interviews, 3 competitive teardowns, 500-ticket qualitative analysis, and a stakeholder co-creation workshop."
        tags={[{ label: "User Research", color: "blue" }, { label: "Qualitative + Quant", color: "amber" }]}
      />
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <h3 className="text-sm font-semibold text-emerald-400 mb-3 uppercase tracking-wide">Research Methods</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {["12 semi-structured PM interviews (45 min each)", "3 CSM shadow sessions (watching real workflows)", "500-ticket Zendesk qualitative analysis", "Competitive teardown: Dovetail, UserVoice, Productboard", "NPS comment analysis across 4 client companies", "2-day stakeholder co-creation workshop"].map(i => <li key={i} className="flex gap-2"><span className="text-emerald-500">▸</span>{i}</li>)}
            </ul>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-emerald-400 mb-3 uppercase tracking-wide">Key Findings</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {["91% use 4+ feedback tools with no integration", "Avg. 7.2 hrs/week lost to manual synthesis", "68% miss feedback patterns until they become churn", "Only 14% have a dedicated insights role", "83% copy-paste feedback into Notion/Confluence manually", "Roadmap decisions lag feedback signal by 3–5 weeks"].map(i => <li key={i} className="flex gap-2"><span className="text-emerald-500">▸</span>{i}</li>)}
            </ul>
          </Card>
        </div>

        <h3 className="text-base font-semibold text-white mt-2">Top 6 Pain Points (ranked by severity × frequency)</h3>
        <Table
          headers={["#", "Pain Point", "Severity", "Frequency", "Impact"]}
          rows={[
            ["1", "No unified view across feedback channels", <Tag color="rose">Critical</Tag>, "91%", "Blind spots on systemic issues"],
            ["2", "Manual synthesis takes days, not minutes", <Tag color="rose">Critical</Tag>, "87%", "Insight arrives too late for sprint"],
            ["3", "No alert when sentiment shifts suddenly", <Tag color="amber">High</Tag>, "79%", "Churn signals missed until too late"],
            ["4", "Can't quantify how many users have a problem", <Tag color="amber">High</Tag>, "76%", "Roadmap prioritization is guesswork"],
            ["5", "No audit trail: who saw what and when", <Tag color="slate">Medium</Tag>, "62%", "Accountability gaps in decision-making"],
            ["6", "Reporting to leadership is ad hoc and inconsistent", <Tag color="slate">Medium</Tag>, "58%", "Low confidence in data-driven decisions"],
          ]}
        />

        <Quote author="PM Lead, Series C FinTech ($70M ARR)">
          I spend Sunday nights manually tagging Zendesk tickets so Monday's standup has real data. That can't be the answer.
        </Quote>
        <Quote author="Head of Product, EdTech SaaS">
          My CEO asks me what customers think about the new feature. I say "great things" because I haven't actually synthesized the feedback yet. That's embarrassing.
        </Quote>
      </div>
    </section>
  );
}

function S04() {
  return (
    <section id="gap-analysis" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="04"
        title="Gap Analysis"
        subtitle="Mapping the white space between what existing tools offer and what PMs actually need."
        tags={[{ label: "Competitive Intel", color: "purple" }, { label: "Positioning", color: "green" }]}
      />
      <div className="space-y-4">
        <Table
          headers={["Capability", "Dovetail", "Productboard", "UserVoice", "CFIP"]}
          rows={[
            ["Real-time feedback ingestion", "❌ Manual upload", "✅ Partial", "✅ Partial", "✅ Automated"],
            ["AI theme clustering", "✅ Basic", "⚠️ Manual tags", "❌", "✅ Advanced NLP"],
            ["Cross-channel unified inbox", "❌", "⚠️ Limited", "❌", "✅ Full"],
            ["Proactive churn alerts", "❌", "❌", "⚠️ Basic", "✅ ML-driven"],
            ["Executive briefs auto-generated", "❌", "❌", "❌", "✅ AI-generated"],
            ["JTBD-oriented interface", "⚠️", "✅", "❌", "✅"],
            ["No-code setup for PMs", "✅", "⚠️ Complex", "✅", "✅"],
            ["Read-only (non-invasive)", "✅", "❌", "❌", "✅"],
          ]}
        />
        <Card>
          <h3 className="text-sm font-semibold text-white mb-3">The White Space</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Existing tools either require PMs to do research (Dovetail) or manage a feedback system (UserVoice/Productboard). None treat feedback intelligence as a <span className="text-white">continuous, autonomous background service</span>. CFIP occupies a new category: the Feedback Intelligence Layer — it sits alongside existing tools, connects to them read-only, and surfaces insights without replacing the tools teams already use.
          </p>
        </Card>
      </div>
    </section>
  );
}

function S05() {
  return (
    <section id="requirements-gathering" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="05"
        title="Requirements Gathering"
        subtitle="How we translated user pain into structured requirements using Jobs-to-be-Done and the MoSCoW framework."
        tags={[{ label: "JTBD", color: "blue" }, { label: "MoSCoW", color: "amber" }, { label: "Stakeholders", color: "slate" }]}
      />
      <div className="space-y-4">
        <Card>
          <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wide mb-3">Jobs-to-be-Done Framework</h3>
          <div className="space-y-3">
            {[
              { job: "Core JTBD", desc: "When a weekly planning cycle begins, help me quickly understand the top themes in customer feedback so I can make roadmap decisions with confidence — without spending days aggregating data myself." },
              { job: "Secondary JTBD", desc: "When sentiment around a specific feature degrades, alert me in time to intervene before it becomes a churn signal." },
              { job: "Tertiary JTBD", desc: "When I need to brief leadership on customer health, give me a one-click report that's already synthesized and ready to share." },
            ].map(j => (
              <div key={j.job} className="bg-[hsl(220_30%_12%)] rounded-lg p-3">
                <div className="text-xs font-mono text-emerald-500 mb-1">{j.job}</div>
                <p className="text-slate-300 text-sm">{j.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        <h3 className="text-base font-semibold text-white">Requirements by MoSCoW Priority</h3>
        <Table
          headers={["Priority", "Requirement", "Source", "Rationale"]}
          rows={[
            [<Tag color="rose">Must Have</Tag>, "Unified feedback inbox across 6+ sources", "12/12 PMs", "Core premise of product"],
            [<Tag color="rose">Must Have</Tag>, "AI-powered theme clustering with confidence scores", "10/12 PMs", "Primary time-saver"],
            [<Tag color="rose">Must Have</Tag>, "Proactive sentiment drift alerts", "9/12 PMs", "Prevents churn blindspots"],
            [<Tag color="rose">Must Have</Tag>, "Read-only source integration (no workflow disruption)", "All stakeholders", "Trust and adoption blocker if missing"],
            [<Tag color="amber">Should Have</Tag>, "AI-generated executive briefs", "7/12 PMs", "High leverage, medium complexity"],
            [<Tag color="amber">Should Have</Tag>, "Feedback volume trend charts per theme", "8/12 PMs", "Visual context for decisions"],
            [<Tag color="blue">Could Have</Tag>, "Slack notifications for alerts", "5/12 PMs", "Reduces time-to-awareness"],
            [<Tag color="blue">Could Have</Tag>, "Jira/Linear ticket auto-creation from insights", "4/12 PMs", "V2 integration — complex"],
            [<Tag color="slate">Won't Have V1</Tag>, "In-app feedback collection forms", "2/12 PMs", "Not core; dilutes positioning"],
            [<Tag color="slate">Won't Have V1</Tag>, "Video/call transcript analysis", "3/12 PMs", "Deferred to post-PMF"],
          ]}
        />
      </div>
    </section>
  );
}

function S06() {
  return (
    <section id="user-personas" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="06"
        title="User Personas"
        subtitle="Three distinct users with different goals, frustrations, and definitions of success."
        tags={[{ label: "UX Research", color: "blue" }, { label: "Persona Design", color: "purple" }]}
      />
      <div className="space-y-4">
        {[
          {
            initials: "SA",
            name: "Sarah A.",
            role: "Senior Product Manager",
            company: "B2B SaaS, Series B, 150 employees",
            bg: "bg-blue-600",
            goals: ["Reduce weekly feedback synthesis from 7 hrs to < 30 min", "Arrive at sprint planning with data-backed priorities", "Proactively catch churn signals before CSM escalations"],
            frustrations: ["Spends Sunday nights tagging Zendesk tickets", "Gets contradictory signals from Sales vs. Support", "Roadmap debates lack quantitative backing"],
            quote: "I need to know what customers are saying, not what my tools are capable of showing.",
            behaviors: ["Heavy Slack user", "Weekly Notion docs", "Data-skeptical unless she ran the query herself"],
            successMetric: "Time from feedback → roadmap decision < 2 hours",
          },
          {
            initials: "MK",
            name: "Michael K.",
            role: "VP of Product",
            company: "PLG SaaS, Series C, 400 employees",
            bg: "bg-purple-600",
            goals: ["Weekly customer health visibility without asking PMs", "Board-ready insight reports in < 5 minutes", "Align product roadmap to real churn drivers"],
            frustrations: ["PMs present anecdote-based roadmap rationale", "No single source of truth for customer sentiment", "Insight reports take a week to prepare"],
            quote: "I should know the top 3 customer problems right now. Today. Not after a report cycle.",
            behaviors: ["Dashboard-first consumer", "Loves trend visualizations", "Emails insights to leadership directly"],
            successMetric: "Zero prep time for customer health updates to board",
          },
          {
            initials: "LR",
            name: "Lisa R.",
            role: "Customer Success Manager",
            company: "Enterprise SaaS, $50M+ ARR",
            bg: "bg-emerald-600",
            goals: ["Early warning on accounts trending toward churn", "Backup data to support QBR conversations", "Reduce time spent manually pulling account feedback"],
            frustrations: ["Learns about product bugs from customer complaint calls", "No visibility into what other accounts are experiencing", "Engineering won't prioritize issues without aggregated evidence"],
            quote: "By the time I flag an issue to product, three other accounts have already churned over it.",
            behaviors: ["Salesforce-primary", "Trusts patterns over single data points", "Shares screenshots in Slack"],
            successMetric: "Churn risk identified 2+ weeks before renewal conversation",
          },
        ].map((p) => (
          <Card key={p.name} className="relative overflow-hidden">
            <div className="flex items-start gap-4 mb-4">
              <div className={`${p.bg} w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0`}>{p.initials}</div>
              <div>
                <div className="font-semibold text-white">{p.name} · {p.role}</div>
                <div className="text-xs text-slate-500">{p.company}</div>
              </div>
            </div>
            <Quote>{p.quote}</Quote>
            <div className="grid grid-cols-3 gap-4 mt-3">
              <div>
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-2">Goals</div>
                <ul className="space-y-1">{p.goals.map(g => <li key={g} className="text-xs text-slate-400 flex gap-1.5"><span className="text-emerald-500 shrink-0">✓</span>{g}</li>)}</ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-rose-400 uppercase tracking-wide mb-2">Frustrations</div>
                <ul className="space-y-1">{p.frustrations.map(f => <li key={f} className="text-xs text-slate-400 flex gap-1.5"><span className="text-rose-500 shrink-0">✕</span>{f}</li>)}</ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2">Behaviors</div>
                <ul className="space-y-1">{p.behaviors.map(b => <li key={b} className="text-xs text-slate-400 flex gap-1.5"><span className="text-blue-500 shrink-0">→</span>{b}</li>)}</ul>
                <div className="mt-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Success When</div>
                <p className="text-xs text-emerald-300 mt-1">{p.successMetric}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function S07() {
  const stages = [
    { stage: "Trigger", actor: "PM", action: "Sprint planning arrives; PM realizes they have no fresh insight synthesis", pain: "Panic. Manual scramble begins.", tool: "Memory + calendar", emotion: "😰" },
    { stage: "Collect", actor: "PM / CSM", action: "Exports CSVs from Zendesk, screenshots G2 reviews, pulls NPS comments", pain: "2–4 hours of manual export work", tool: "Zendesk, G2, SurveyMonkey", emotion: "😤" },
    { stage: "Tag", actor: "PM", action: "Reads through raw feedback, manually applies theme labels in Notion/Airtable", pain: "High cognitive load; inconsistent taxonomy", tool: "Notion, Airtable, Spreadsheets", emotion: "😓" },
    { stage: "Synthesize", actor: "PM", action: "Counts by theme, writes narrative summary, builds slide", pain: "Another 3–4 hours; most signal lost", tool: "Google Docs, Slides", emotion: "😮‍💨" },
    { stage: "Present", actor: "PM", action: "Presents findings in sprint planning; debate erupts about data freshness", pain: "Low confidence; data already 1 week old", tool: "Zoom, Slides", emotion: "😬" },
    { stage: "Decide", actor: "Team", action: "Roadmap priorities set based on stale synthesis", pain: "Wrong priorities; misaligned quarter", tool: "Jira, Linear", emotion: "🤦" },
  ];
  return (
    <section id="customer-journey" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="07"
        title="Customer Journey Map"
        subtitle="The 'As-Is' journey revealing where time and insight are lost — and where CFIP intervenes."
        tags={[{ label: "Journey Mapping", color: "blue" }, { label: "As-Is vs To-Be", color: "green" }]}
      />
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">AS-IS Journey: PM Feedback Synthesis (Monday Ritual)</h3>
        <div className="grid gap-3">
          {stages.map((s, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[hsl(220_30%_16%)] border border-[hsl(220_25%_25%)] flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">{i + 1}</div>
                {i < stages.length - 1 && <div className="w-px h-6 bg-[hsl(220_25%_18%)] mt-1" />}
              </div>
              <Card className="flex-1 mb-0 p-4">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex gap-2 items-center">
                    <span className="text-lg">{s.emotion}</span>
                    <span className="text-xs font-mono text-emerald-500 uppercase">{s.stage}</span>
                    <Tag color="slate">{s.actor}</Tag>
                  </div>
                  <span className="text-xs text-slate-500">{s.tool}</span>
                </div>
                <p className="text-sm text-slate-300 mb-1">{s.action}</p>
                <p className="text-xs text-rose-400">Pain: {s.pain}</p>
              </Card>
            </div>
          ))}
        </div>
        <Card>
          <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wide mb-3">TO-BE Journey with CFIP</h3>
          <div className="space-y-2">
            {[
              { step: "Always On", desc: "CFIP continuously ingests feedback from all sources in the background — no trigger needed" },
              { step: "Sprint Monday", desc: "PM opens CFIP dashboard: top themes, sentiment trends, and alert summary already waiting" },
              { step: "Deep Dive", desc: "PM clicks into a theme to see raw evidence, trend charts, and AI-generated summary in 2 mins" },
              { step: "Decision", desc: "PM copies AI brief into planning doc; roadmap decision made with real-time data in < 10 minutes" },
            ].map((s, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-emerald-500 font-bold text-sm w-28 shrink-0">{s.step}</span>
                <span className="text-slate-300 text-sm">{s.desc}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-emerald-950/30 border border-emerald-700/30 rounded-lg p-3">
            <p className="text-emerald-300 text-sm font-medium">Total time saved: 6–10 hrs/week per PM · Decision lag: 3 weeks → same day</p>
          </div>
        </Card>
      </div>
    </section>
  );
}

function S08() {
  return (
    <section id="concept-testing" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="08"
        title="Concept Testing"
        subtitle="Three prototype rounds, 24 participants, and the pivots each round forced."
        tags={[{ label: "Prototyping", color: "amber" }, { label: "User Testing", color: "blue" }]}
      />
      <div className="space-y-4">
        {[
          {
            round: "Round 1 — Paper Prototype",
            n: "8 PMs, concept walkthrough",
            goal: "Validate core mental model: 'inbox of insights'",
            findings: ["PMs loved the unified inbox concept immediately", "Confusion: 'Is this replacing my tools or connecting to them?'", "Alert fatigue concern raised by 5/8 participants"],
            pivots: ["Added 'read-only integration' framing throughout", "Designed alert thresholds as configurable from day 1", "Renamed 'Inbox' → 'Feedback Inbox' to reduce ambiguity"],
            verdict: "✅ Core concept validated. Framing needs work.",
          },
          {
            round: "Round 2 — Figma Clickthrough",
            n: "10 PMs + 2 VPs of Product",
            goal: "Test information hierarchy and navigation flow",
            findings: ["Theme detail page was the most valued screen", "Dashboard was 'too much at once' for first visit", "VPs only cared about the executive brief section", "AI confidence scores confused 4/10 PMs"],
            pivots: ["Simplified dashboard to 4 key metrics + top themes", "Created separate VP-mode view with brief-first layout", "Replaced 'confidence score' with 'based on N responses' phrasing"],
            verdict: "✅ Hierarchy validated. Role-based views added to roadmap.",
          },
          {
            round: "Round 3 — Live Alpha (6 companies, 4 weeks)",
            n: "6 companies, real data connected",
            goal: "Validate value delivery with production data",
            findings: ["100% of PMs used the product in first week without onboarding", "Alerts triggered 2 real escalations that prevented churn", "3 PMs used AI brief directly in leadership Slack messages", "Source quality variance — Zendesk data was richest, G2 was sparse"],
            pivots: ["Added source quality scoring to manage expectations", "Built onboarding checklist for source connection setup", "Created 'quiet hours' for alert delivery (no 11pm pings)"],
            verdict: "✅ PMF signal confirmed. Proceeding to private beta.",
          },
        ].map((r) => (
          <Card key={r.round}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-sm font-semibold text-white">{r.round}</h3>
                <p className="text-xs text-slate-500">{r.n} · Goal: {r.goal}</p>
              </div>
              <Tag color={r.verdict.startsWith("✅") ? "green" : "amber"}>{r.verdict}</Tag>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-2">Key Findings</div>
                <ul className="space-y-1">{r.findings.map(f => <li key={f} className="text-xs text-slate-400 flex gap-1.5"><span className="text-blue-500">▸</span>{f}</li>)}</ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-2">Pivots Made</div>
                <ul className="space-y-1">{r.pivots.map(p => <li key={p} className="text-xs text-slate-400 flex gap-1.5"><span className="text-amber-500">→</span>{p}</li>)}</ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function S09() {
  return (
    <section id="prioritization" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="09"
        title="Prioritization Framework"
        subtitle="RICE scoring applied to the V1 feature set, with explicit trade-off documentation for every decision."
        tags={[{ label: "RICE", color: "blue" }, { label: "Trade-offs", color: "amber" }]}
      />
      <div className="space-y-4">
        <Table
          headers={["Feature", "Reach", "Impact", "Confidence", "Effort", "RICE Score", "V1?"]}
          rows={[
            ["Unified Feedback Inbox", "90%", "3", "90%", "3 wks", <span className="text-emerald-400 font-bold">81</span>, <Tag color="green">✅ V1</Tag>],
            ["AI Theme Clustering", "85%", "3", "85%", "4 wks", <span className="text-emerald-400 font-bold">65</span>, <Tag color="green">✅ V1</Tag>],
            ["Sentiment Drift Alerts", "70%", "3", "80%", "3 wks", <span className="text-emerald-400 font-bold">56</span>, <Tag color="green">✅ V1</Tag>],
            ["Source Connector (read-only)", "100%", "3", "95%", "5 wks", <span className="text-emerald-400 font-bold">57</span>, <Tag color="green">✅ V1</Tag>],
            ["AI Executive Brief", "60%", "3", "75%", "3 wks", <span className="text-blue-400 font-bold">45</span>, <Tag color="green">✅ V1</Tag>],
            ["Jira/Linear auto-ticket", "40%", "2", "60%", "6 wks", <span className="text-slate-400 font-bold">8</span>, <Tag color="slate">Q2</Tag>],
            ["Video call transcript NLP", "30%", "2", "50%", "10 wks", <span className="text-slate-400 font-bold">3</span>, <Tag color="slate">Q3</Tag>],
            ["In-app feedback forms", "20%", "1", "40%", "8 wks", <span className="text-slate-400 font-bold">1</span>, <Tag color="slate">Deprioritized</Tag>],
          ]}
        />
        <Card>
          <h3 className="text-sm font-semibold text-white mb-3">Trade-off Decisions</h3>
          <div className="space-y-3">
            {[
              { decision: "Read-only integrations only", rationale: "PMs were skeptical of any tool that required write access to their support tools. Trust was the adoption blocker. Read-only removed it entirely." },
              { decision: "No in-app feedback collection in V1", rationale: "UserVoice and Typeform already own this. Adding it would position CFIP as a collection tool, diluting the intelligence-layer positioning we're betting on." },
              { decision: "AI briefs over raw AI output", rationale: "PMs don't want to prompt AI — they want answers. Pre-formatted executive briefs remove the blank-page problem and make insight-sharing effortless." },
              { decision: "Alert thresholds configurable from day 1", rationale: "Alert fatigue is a product killer. We gave users control over thresholds before beta to prevent conditioning PMs to ignore alerts." },
            ].map(t => (
              <div key={t.decision} className="bg-[hsl(220_30%_12%)] rounded-lg p-3">
                <div className="text-sm font-semibold text-emerald-300 mb-1">{t.decision}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{t.rationale}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function S10() {
  return (
    <section id="ab-testing" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="10"
        title="A/B Testing Strategy"
        subtitle="Experiments designed for every major UX decision, with hypotheses, metrics, and guardrails."
        tags={[{ label: "Experimentation", color: "amber" }, { label: "Statistical Rigor", color: "blue" }]}
      />
      <div className="space-y-4">
        <Card>
          <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wide mb-3">Testing Framework</h3>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-xs text-slate-500 mb-1">Min. Sample Size</div>
              <div className="text-white font-semibold">250 users/variant</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Statistical Confidence</div>
              <div className="text-white font-semibold">95% (p &lt; 0.05)</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Min. Detectable Effect</div>
              <div className="text-white font-semibold">10% relative change</div>
            </div>
          </div>
        </Card>

        {[
          {
            id: "EXP-001",
            name: "Theme Clustering: AI-Named vs. User-Named",
            hypothesis: "PMs who see AI-generated theme names will reach the theme detail page faster than those who must name themes themselves.",
            variants: ["A: AI auto-names clusters (e.g. 'Onboarding Friction')", "B: User prompted to name each cluster"],
            primaryMetric: "Time to first theme detail view",
            guardrail: "Theme accuracy rating ≥ 3.5/5",
            status: "Completed",
            result: "A won: 42% faster engagement, 4.1/5 accuracy. AI naming shipped.",
          },
          {
            id: "EXP-002",
            name: "Alert Format: In-App Banner vs. Digest Email",
            hypothesis: "A daily digest email will reduce alert fatigue compared to in-app real-time banners, while maintaining response rate.",
            variants: ["A: Real-time in-app banner on threshold breach", "B: Daily 8am digest email with all alerts"],
            primaryMetric: "Alert click-through rate",
            guardrail: "Time-to-action on critical alerts ≤ 4 hrs",
            status: "Completed",
            result: "B won: 63% CTR vs 29% for banners. Digest shipped as default.",
          },
          {
            id: "EXP-003",
            name: "Dashboard Entry Point: Themes First vs. Alert First",
            hypothesis: "PMs who land on the Alerts view on Monday morning will take faster action than those who land on the Themes dashboard.",
            variants: ["A: Themes dashboard as default home", "B: Alert summary as Monday morning default"],
            primaryMetric: "Actions taken in first 10 minutes of session",
            guardrail: "DAU retention ≥ 3 days/week",
            status: "Running (Q1)",
            result: "—",
          },
          {
            id: "EXP-004",
            name: "AI Brief: Full Narrative vs. Bullet Summary",
            hypothesis: "PMs sharing insights with leadership prefer bullet summaries they can paste directly into Slack vs. full prose briefs.",
            variants: ["A: 3-paragraph AI narrative brief", "B: 5-bullet structured summary"],
            primaryMetric: "Brief copy/share rate",
            guardrail: "User satisfaction ≥ 4.0/5",
            status: "Planned (Q2)",
            result: "—",
          },
        ].map(exp => (
          <Card key={exp.id}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-xs font-mono text-slate-500 mr-2">{exp.id}</span>
                <span className="text-sm font-semibold text-white">{exp.name}</span>
              </div>
              <Tag color={exp.status === "Completed" ? "green" : exp.status.startsWith("Running") ? "amber" : "slate"}>
                {exp.status}
              </Tag>
            </div>
            <p className="text-xs text-slate-400 italic mb-3">Hypothesis: {exp.hypothesis}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1">Variants</div>
                <ul className="space-y-1">{exp.variants.map(v => <li key={v} className="text-xs text-slate-400 flex gap-1.5"><span className="text-blue-500">▸</span>{v}</li>)}</ul>
                <div className="mt-2 text-xs text-slate-500">Primary: <span className="text-white">{exp.primaryMetric}</span></div>
                <div className="text-xs text-slate-500">Guardrail: <span className="text-amber-300">{exp.guardrail}</span></div>
              </div>
              <div>
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-1">Result</div>
                <p className="text-xs text-slate-300">{exp.result || "Pending"}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function S11() {
  return (
    <section id="user-stories" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="11"
        title="User Story Detailing"
        subtitle="Fully detailed stories with acceptance criteria, edge cases, and definition of done for every core feature."
        tags={[{ label: "Agile", color: "green" }, { label: "Acceptance Criteria", color: "blue" }]}
      />
      <div className="space-y-4">
        {[
          {
            id: "US-001",
            epic: "Feedback Inbox",
            story: "As a PM, I want to see all customer feedback in a unified inbox so that I can monitor signal across channels without switching tools.",
            priority: "P0",
            ac: [
              "Feedback items from all connected sources appear in a single chronological list",
              "Each item shows: source icon, date, sentiment indicator, preview text, and source metadata",
              "Filter by: source, sentiment (positive/neutral/negative), date range, theme tag",
              "Search across feedback text with < 500ms response time",
              "Unread items are visually distinguished from reviewed items",
              "Clicking an item opens a full-detail drawer with original URL (if available)",
            ],
            edge: ["Empty state when no sources are connected (with CTA to add source)", "Degraded state when one source API is unreachable (show partial data with warning)"],
            dod: "QA pass, accessibility audit, load test with 10K+ items confirmed < 2s render",
          },
          {
            id: "US-002",
            epic: "AI Themes",
            story: "As a PM, I want AI to automatically cluster feedback into named themes so that I can understand recurring problems without manual analysis.",
            priority: "P0",
            ac: [
              "Themes are generated automatically within 24 hours of source connection",
              "Each theme shows: name, feedback count, trend (↑/↓/→), sentiment breakdown, and representative quotes",
              "Themes are re-clustered every 24 hours as new feedback arrives",
              "PM can merge two themes or rename a theme; AI respects this in future cycles",
              "Clicking a theme shows all contributing feedback items",
              "Themes show 'based on N responses' — no raw confidence percentages",
            ],
            edge: ["< 10 feedback items: show 'Not enough data to cluster' state", "All feedback is positive: surface 'No critical themes detected' with celebration copy"],
            dod: "NLP accuracy ≥ 80% verified against manual baseline, theme drift tested over 30-day window",
          },
          {
            id: "US-003",
            epic: "Alerts",
            story: "As a PM, I want to receive a proactive alert when sentiment around a specific theme drops sharply so that I can investigate and act before it causes churn.",
            priority: "P0",
            ac: [
              "Alert fires when theme sentiment drops > 15% in a 7-day rolling window",
              "Alert includes: theme name, magnitude of change, sample feedback causing the shift, and a suggested next action",
              "PM can configure threshold (5%, 10%, 15%, 20%) per theme or globally",
              "PM can snooze an alert for 24h, 7d, or indefinitely",
              "Alert delivery channels: in-app notification + optional daily digest email",
              "Alert history is viewable and searchable for past 90 days",
            ],
            edge: ["If a theme has < 10 new responses in the window, suppress alert and log suppression reason", "Don't fire multiple alerts for same theme within 48 hours unless severity escalates"],
            dod: "Alert latency < 1 hour from threshold breach, false positive rate < 5% validated in alpha",
          },
        ].map(s => (
          <Card key={s.id}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-2 items-center">
                <span className="text-xs font-mono text-slate-500">{s.id}</span>
                <Tag color="slate">{s.epic}</Tag>
                <Tag color={s.priority === "P0" ? "rose" : s.priority === "P1" ? "amber" : "slate"}>{s.priority}</Tag>
              </div>
            </div>
            <div className="bg-[hsl(220_30%_12%)] rounded-lg p-3 mb-3">
              <p className="text-sm text-slate-300 italic">{s.story}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-2">Acceptance Criteria</div>
                <ul className="space-y-1">{s.ac.map(a => <li key={a} className="text-xs text-slate-400 flex gap-1.5"><span className="text-emerald-500 shrink-0">✓</span>{a}</li>)}</ul>
              </div>
              <div>
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-2">Edge Cases</div>
                <ul className="space-y-1">{s.edge.map(e => <li key={e} className="text-xs text-slate-400 flex gap-1.5"><span className="text-amber-500 shrink-0">⚠</span>{e}</li>)}</ul>
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wide mt-3 mb-1">Definition of Done</div>
                <p className="text-xs text-slate-400">{s.dod}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function S12() {
  return (
    <section id="functional-requirements" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="12"
        title="Functional Requirements"
        subtitle="The complete functional specification organized by product domain."
        tags={[{ label: "Product Spec", color: "blue" }, { label: "Engineering Handoff", color: "slate" }]}
      />
      <div className="space-y-4">
        {[
          {
            domain: "Ingestion & Connectors",
            reqs: [
              "FR-001: Support read-only OAuth2 connections to: Zendesk, Intercom, G2, Trustpilot, SurveyMonkey (NPS), Typeform",
              "FR-002: Support webhook ingestion for custom sources (e.g., in-house support tools)",
              "FR-003: Ingestion pipeline must process new feedback within 60 minutes of creation in source system",
              "FR-004: Deduplicate feedback items across sources using content hash + timestamp comparison",
              "FR-005: Preserve source metadata: author, rating, date, product area tag (if available), URL",
            ],
          },
          {
            domain: "AI Processing",
            reqs: [
              "FR-010: Cluster feedback into themes using embedding-based similarity (cosine distance threshold: 0.85)",
              "FR-011: Re-cluster themes every 24 hours; maintain theme history for trend calculation",
              "FR-012: Generate human-readable theme names using GPT-4o with category taxonomy seeding",
              "FR-013: Calculate per-theme sentiment score (−1.0 to +1.0) using fine-tuned sentiment model",
              "FR-014: Generate executive brief per theme on demand: 3-paragraph narrative + 5-bullet summary",
              "FR-015: Surface 3 representative quotes per theme, selected for diversity and impact",
            ],
          },
          {
            domain: "Alerts Engine",
            reqs: [
              "FR-020: Detect sentiment drift when rolling 7-day average drops below configurable threshold (default: 15%)",
              "FR-021: Detect volume spikes: alert when theme receives > 2× its 30-day average volume in 7 days",
              "FR-022: Deliver alerts via: in-app notification, daily digest email, optional Slack webhook",
              "FR-023: Enforce minimum 48-hour cooldown between alerts for same theme (unless escalation)",
              "FR-024: Support per-user alert preference configuration: channels, thresholds, quiet hours",
              "FR-025: Maintain alert history for 90 days with filtering and search",
            ],
          },
          {
            domain: "Dashboard & Reporting",
            reqs: [
              "FR-030: Dashboard shows: total feedback volume (7/30/90 day), theme count, active alerts, source health",
              "FR-031: Themes list with sort by: volume, sentiment, trend velocity, last updated",
              "FR-032: Feedback inbox with filter by: source, sentiment, theme, date range, reviewed status",
              "FR-033: Theme detail view: trend chart, sentiment breakdown, sample quotes, raw feedback list",
              "FR-034: Executive brief export to: Markdown, PDF, Notion (via API), Slack message",
              "FR-035: Source health panel: last sync time, item count, error status per connector",
            ],
          },
        ].map(d => (
          <Card key={d.domain}>
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              {d.domain}
            </h3>
            <ul className="space-y-2">
              {d.reqs.map(r => (
                <li key={r} className="text-xs text-slate-400 flex gap-2">
                  <span className="text-emerald-600 font-mono shrink-0">{r.split(":")[0]}</span>
                  <span>{r.split(":").slice(1).join(":").trim()}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
}

function S13() {
  return (
    <section id="non-functional" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="13"
        title="Non-Functional Requirements"
        subtitle="Performance, reliability, security, and compliance constraints that govern how the system must behave."
        tags={[{ label: "Engineering", color: "slate" }, { label: "Security", color: "rose" }, { label: "Compliance", color: "amber" }]}
      />
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            { category: "Performance", color: "blue", items: ["Dashboard initial load < 2 seconds (P95)", "Feedback inbox filter response < 500ms", "AI theme generation < 60 seconds for first batch (< 500 items)", "Alert delivery latency < 60 minutes from threshold breach", "API endpoints: 99th percentile < 800ms"] },
            { category: "Reliability", color: "green", items: ["System uptime: 99.9% SLA (< 8.7 hrs downtime/year)", "Connector failure: graceful degradation, partial data shown with warning", "Data ingestion retry: exponential backoff up to 3 attempts", "No data loss: all raw feedback stored even if processing fails", "Recovery time objective (RTO): < 4 hours"] },
            { category: "Security", color: "rose", items: ["All source credentials encrypted at rest (AES-256)", "OAuth tokens stored in secrets manager, never in app DB", "All API traffic over TLS 1.3 minimum", "Role-based access: Admin, PM, Read-only viewer", "No customer data used for AI model training without explicit consent"] },
            { category: "Compliance", color: "amber", items: ["GDPR: data deletion within 30 days of request", "SOC 2 Type II compliance roadmap (target: 12 months post-launch)", "CCPA compliance for CA-based customers", "Feedback data retained max 24 months by default (configurable)", "Audit log for all data access events"] },
            { category: "Scalability", color: "purple", items: ["Support 10K feedback items/day per tenant at launch", "Horizontal scaling: all services stateless, containerized", "Multi-tenant isolation: separate data per org, no cross-contamination", "Rate limiting: 1000 req/min per API key", "Target: 500 tenants without architecture changes"] },
            { category: "Observability", color: "slate", items: ["Structured logging for all ingestion events", "Metrics: ingestion lag, theme drift, alert fire rate, user engagement", "Error tracking with full stack traces (Sentry)", "Uptime monitoring with PagerDuty alerts on SLA breach", "Data freshness monitoring: alert if source last synced > 90 min"] },
          ].map(nfr => (
            <Card key={nfr.category}>
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Tag color={nfr.color as any}>{nfr.category}</Tag>
              </h3>
              <ul className="space-y-1">
                {nfr.items.map(i => <li key={i} className="text-xs text-slate-400 flex gap-1.5"><span className="text-slate-600 shrink-0">—</span>{i}</li>)}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function S14() {
  return (
    <section id="system-architecture" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="14"
        title="System Architecture"
        subtitle="A layered microservices architecture designed for reliability, horizontal scale, and observability."
        tags={[{ label: "Architecture", color: "blue" }, { label: "Microservices", color: "slate" }, { label: "Cloud Native", color: "green" }]}
      />
      <div className="space-y-4">
        <Card>
          <h3 className="text-sm font-semibold text-white mb-4">Architecture Layers</h3>
          <div className="space-y-3">
            {[
              { layer: "Client Layer", color: "bg-blue-600/20 border-blue-600/30", items: ["React SPA (Vite)", "Role-based views (PM / VP / CSM)", "WebSocket for real-time alert delivery"] },
              { layer: "API Gateway", color: "bg-purple-600/20 border-purple-600/30", items: ["Rate limiting, auth validation, routing", "JWT authentication middleware", "OpenAPI contract enforcement"] },
              { layer: "Application Services", color: "bg-emerald-600/20 border-emerald-600/30", items: ["Ingestion Service (connector workers)", "AI Processing Service (theme clustering + sentiment)", "Alert Engine (threshold monitoring)", "Brief Generation Service (GPT-4o orchestration)", "Notification Service (email + in-app + Slack)"] },
              { layer: "Data Layer", color: "bg-amber-600/20 border-amber-600/30", items: ["PostgreSQL (structured data: themes, alerts, orgs)", "pgvector (feedback embeddings for clustering)", "Redis (job queues, cache, session)", "S3-compatible object store (raw exports, brief PDFs)"] },
              { layer: "Infrastructure", color: "bg-slate-600/20 border-slate-600/30", items: ["Kubernetes (EKS) for service orchestration", "GitHub Actions CI/CD pipeline", "CloudWatch + Datadog for observability", "AWS Secrets Manager for credential storage"] },
            ].map(l => (
              <div key={l.layer} className={`border rounded-lg p-3 ${l.color}`}>
                <div className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2">{l.layer}</div>
                <div className="flex flex-wrap gap-2">
                  {l.items.map(i => <span key={i} className="text-xs bg-black/20 text-slate-300 px-2 py-1 rounded">{i}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-white mb-3">Key Architectural Decisions</h3>
          <div className="space-y-3">
            {[
              { decision: "Async ingestion via Redis queue", rationale: "Decouples source reliability from user-facing data freshness. If Zendesk is slow, the UI still loads from DB cache." },
              { decision: "pgvector for embedding storage", rationale: "Avoids a separate vector DB (Pinecone). PostgreSQL + pgvector is sufficient at our scale and eliminates operational complexity." },
              { decision: "Nightly re-clustering job (not real-time)", rationale: "Theme consistency is more valuable than instantaneous re-clustering. Users trust stable themes; daily cadence matches PM workflow." },
              { decision: "Stateless services, shared DB", rationale: "Enables horizontal scaling of processing workers without coordination overhead. Each service reads/writes to Postgres only." },
            ].map(d => (
              <div key={d.decision} className="flex gap-3">
                <span className="text-emerald-500 shrink-0 mt-0.5">◆</span>
                <div>
                  <div className="text-sm font-semibold text-white">{d.decision}</div>
                  <p className="text-xs text-slate-400 mt-0.5">{d.rationale}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function S15() {
  return (
    <section id="orchestration" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="15"
        title="Orchestration & Data Flow"
        subtitle="End-to-end data lifecycle from source ingestion through AI processing to user-facing insight."
        tags={[{ label: "Data Engineering", color: "blue" }, { label: "ML Pipeline", color: "purple" }]}
      />
      <div className="space-y-4">
        <Card>
          <h3 className="text-sm font-semibold text-white mb-4">Feedback Ingestion Pipeline</h3>
          <div className="space-y-2">
            {[
              { step: "1. Trigger", detail: "Cron job runs every 15 min; checks each connector's last_sync timestamp", svc: "Connector Scheduler" },
              { step: "2. Fetch", detail: "Connector worker calls source API (Zendesk, G2, etc.) with incremental pagination since last sync", svc: "Connector Worker" },
              { step: "3. Normalize", detail: "Raw response mapped to FeedbackItem schema: source, text, author, sentiment_raw, created_at, source_url", svc: "Normalizer" },
              { step: "4. Deduplicate", detail: "SHA-256 hash of (source_id + text) checked against existing records; duplicates dropped", svc: "Dedup Service" },
              { step: "5. Enqueue", detail: "New items pushed to Redis queue: feedback.raw for AI processing", svc: "Queue Publisher" },
              { step: "6. Embed", detail: "Text-embedding-3-small generates 1536-dim vector for each item; stored in pgvector", svc: "Embedding Worker" },
              { step: "7. Cluster", detail: "Nightly batch: cosine similarity clustering groups embeddings into theme candidates", svc: "Cluster Worker" },
              { step: "8. Theme Update", detail: "Existing themes updated with new items; new themes created if cluster is novel (distance > 0.3 from all existing)", svc: "Theme Manager" },
              { step: "9. Sentiment", detail: "Per-theme sentiment recalculated; delta stored for trend tracking", svc: "Sentiment Engine" },
              { step: "10. Alert Check", detail: "Alert Engine evaluates all configured thresholds; fires notifications if breached", svc: "Alert Engine" },
            ].map((s, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded bg-[hsl(220_30%_16%)] flex items-center justify-center text-xs text-emerald-500 font-mono shrink-0">{i + 1}</div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-xs font-semibold text-white">{s.step}</span>
                    <span className="text-xs font-mono text-slate-500">{s.svc}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-white mb-3">AI Brief Generation Flow (on-demand)</h3>
          <div className="space-y-2">
            {[
              "PM clicks 'Generate Brief' on a theme",
              "Request hits Brief Service with theme_id + format preference",
              "Service fetches: top 20 feedback items, sentiment trend (30d), representative quotes, theme metadata",
              "Prompt constructed with system context (PM persona, company, theme data) → GPT-4o call",
              "Response parsed into: narrative (3 paras), bullets (5 items), suggested next action",
              "Brief stored in DB (cached for 24 hrs); returned to client in < 8 seconds",
              "PM can copy, share to Slack, export to PDF, or push to Notion",
            ].map((s, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-xs font-mono text-blue-500 w-4 shrink-0">{i + 1}.</span>
                <p className="text-xs text-slate-400">{s}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function S16() {
  return (
    <section id="api-integrations" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="16"
        title="API Integrations"
        subtitle="Read-only source connectors, AI service integrations, and outbound delivery APIs."
        tags={[{ label: "API Design", color: "blue" }, { label: "OAuth2", color: "green" }, { label: "Webhooks", color: "amber" }]}
      />
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Source Connectors (Read-Only)</h3>
        <Table
          headers={["Source", "Auth Method", "Data Fetched", "Sync Frequency", "Rate Limit"]}
          rows={[
            ["Zendesk", "OAuth2 + API Token", "Tickets, comments, satisfaction ratings", "Every 15 min", "400 req/min"],
            ["Intercom", "OAuth2", "Conversations, notes, tags", "Every 15 min", "1000 req/10min"],
            ["G2", "API Key", "Reviews, ratings, categories", "Every 6 hrs", "100 req/min"],
            ["Trustpilot", "API Key", "Reviews, reply history, NPS-style ratings", "Every 6 hrs", "60 req/min"],
            ["SurveyMonkey", "OAuth2", "NPS responses, verbatim comments", "Every 1 hr", "120 req/min"],
            ["Typeform", "OAuth2", "Form responses with open-text fields", "Every 1 hr", "Unlimited"],
            ["Custom Webhook", "HMAC-SHA256", "Any structured feedback payload", "Real-time push", "N/A"],
          ]}
        />

        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">AI Service Integrations</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { service: "OpenAI (Embeddings)", model: "text-embedding-3-small", use: "Convert feedback text to vectors for clustering", cost: "$0.02/1M tokens" },
            { service: "OpenAI (GPT-4o)", model: "gpt-4o-2024-08-06", use: "Theme naming, executive brief generation, insight summarization", cost: "$5/$15 per 1M tokens in/out" },
            { service: "Custom Sentiment Model", model: "Fine-tuned DistilBERT", use: "Real-time per-feedback sentiment scoring (−1 to +1)", cost: "Self-hosted on GPU instance" },
          ].map(ai => (
            <Card key={ai.service}>
              <div className="text-sm font-semibold text-white mb-1">{ai.service}</div>
              <div className="text-xs font-mono text-emerald-400 mb-2">{ai.model}</div>
              <p className="text-xs text-slate-400 mb-2">{ai.use}</p>
              <div className="text-xs text-slate-500">Est. cost: <span className="text-amber-300">{ai.cost}</span></div>
            </Card>
          ))}
        </div>

        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Outbound / Delivery Integrations</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: "Slack", method: "Incoming Webhook", use: "Alert delivery + brief sharing" },
            { name: "Notion", method: "Notion API v1", use: "Brief export to team wiki" },
            { name: "SendGrid", method: "SMTP API", use: "Daily digest emails" },
            { name: "Jira (Q2)", method: "REST API + OAuth", use: "Auto-create tickets from insights" },
            { name: "Linear (Q2)", method: "GraphQL API", use: "Issue creation from alert events" },
            { name: "PDF Export", method: "Puppeteer (self-hosted)", use: "Brief download as formatted PDF" },
          ].map(o => (
            <Card key={o.name} className="p-3">
              <div className="text-sm font-semibold text-white mb-0.5">{o.name}</div>
              <div className="text-xs font-mono text-blue-400 mb-1">{o.method}</div>
              <p className="text-xs text-slate-500">{o.use}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function S17() {
  return (
    <section id="kpis" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="17"
        title="KPIs & Success Metrics"
        subtitle="How we know CFIP is working — the North Star, tier-1 product metrics, and business metrics."
        tags={[{ label: "Metrics", color: "green" }, { label: "OKRs", color: "blue" }]}
      />
      <div className="space-y-4">
        <Card>
          <div className="text-xs font-mono text-emerald-500 uppercase tracking-wide mb-1">North Star Metric</div>
          <div className="text-2xl font-bold text-white mb-1">Insights Activated</div>
          <p className="text-sm text-slate-400">The number of AI-generated theme insights that directly lead to a product decision (roadmap item, sprint ticket, or alert response) within 7 days. Target: 3 activated insights/team/week by Month 3.</p>
        </Card>
        <div className="grid grid-cols-2 gap-4">
          {[
            { tier: "Product Metrics", color: "blue", metrics: [
              { name: "Time to First Insight", target: "< 30 min from source connection", why: "Measures onboarding speed and product trust" },
              { name: "Weekly Active Teams", target: "> 70% of seats active 3+ days/week", why: "Core engagement — are PMs returning habitually?" },
              { name: "Alert Response Rate", target: "> 50% of alerts actioned within 24h", why: "Validates alert quality and PM trust in signals" },
              { name: "AI Brief Share Rate", target: "> 30% of briefs copied or exported", why: "Measures downstream value (brief reaches leadership)" },
            ]},
            { tier: "Business Metrics", color: "emerald", metrics: [
              { name: "Activation Rate", target: "> 60% of trials complete source connection", why: "Activation = seeing real data from their own sources" },
              { name: "30-Day Retention", target: "> 75% of activated accounts", why: "Retention validates ongoing value delivery" },
              { name: "NPS", target: "> 45 by Month 6", why: "Category-creating products need promoter-level advocacy" },
              { name: "ACV Growth", target: "$15K → $25K by Q4", why: "Enterprise expansion signals feature depth ROI" },
            ]},
          ].map(tier => (
            <Card key={tier.tier}>
              <h3 className="text-sm font-semibold mb-3"><Tag color={tier.color as any}>{tier.tier}</Tag></h3>
              <div className="space-y-3">
                {tier.metrics.map(m => (
                  <div key={m.name} className="border-l-2 border-[hsl(220_25%_22%)] pl-3">
                    <div className="text-sm font-semibold text-white">{m.name}</div>
                    <div className="text-xs text-emerald-400">Target: {m.target}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{m.why}</div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        <Card>
          <h3 className="text-sm font-semibold text-white mb-3">Anti-Metrics (What We Will NOT Optimize For)</h3>
          <div className="space-y-2">
            {[
              { metric: "Total feedback items ingested", reason: "Volume without quality creates noise, not insight. A smaller number of high-signal items is better." },
              { metric: "Time spent in app", reason: "CFIP should minimize PM time spent — not maximize it. Engagement ≠ value here." },
              { metric: "Number of themes generated", reason: "More themes does not mean better clustering. We optimize for fewer, higher-confidence themes." },
            ].map(a => (
              <div key={a.metric} className="flex gap-3">
                <span className="text-rose-500 shrink-0 mt-0.5">✕</span>
                <div>
                  <span className="text-sm text-white line-through">{a.metric}</span>
                  <p className="text-xs text-slate-400 mt-0.5">{a.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

function S18() {
  return (
    <section id="risks" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="18"
        title="Risks & Mitigations"
        subtitle="Every risk identified, scored, and paired with a concrete mitigation plan."
        tags={[{ label: "Risk Management", color: "rose" }, { label: "Pre-Mortem", color: "amber" }]}
      />
      <div className="space-y-4">
        <Table
          headers={["Risk", "Probability", "Impact", "Score", "Mitigation"]}
          rows={[
            ["AI theme quality is too low for PM trust", <Tag color="amber">Medium</Tag>, <Tag color="rose">High</Tag>, <span className="text-rose-400 font-bold">12</span>, "90-day accuracy baseline testing before launch; accuracy score shown per theme; PM override always available"],
            ["Connector OAuth changes break ingestion", <Tag color="amber">Medium</Tag>, <Tag color="amber">High</Tag>, <span className="text-amber-400 font-bold">9</span>, "Automated connector health checks every 15 min; graceful degradation UI; on-call alert for connector failure"],
            ["Alert fatigue causes PMs to ignore signals", <Tag color="amber">Medium</Tag>, <Tag color="amber">High</Tag>, <span className="text-amber-400 font-bold">9</span>, "Configurable thresholds, quiet hours, snooze; A/B test delivery format; cap at 3 alerts/day default"],
            ["GDPR violation from unintended PII in feedback", <Tag color="blue">Low</Tag>, <Tag color="rose">Critical</Tag>, <span className="text-amber-400 font-bold">8</span>, "PII scrubbing layer before storage; legal review of each connector; DPA agreements with all sources"],
            ["Slow AI processing degrades perceived value", <Tag color="amber">Medium</Tag>, <Tag color="blue">Medium</Tag>, <span className="text-blue-400 font-bold">6</span>, "Progressive loading UX; cache theme results for 24h; async brief generation with loading state"],
            ["GPT-4o API cost exceeds unit economics", <Tag color="blue">Low</Tag>, <Tag color="amber">High</Tag>, <span className="text-blue-400 font-bold">6</span>, "Brief generation on-demand only (not automated); cost cap per tenant per month; prompt length optimization"],
            ["Low connector coverage limits ICP fit", <Tag color="blue">Low</Tag>, <Tag color="amber">Medium</Tag>, <span className="text-slate-400 font-bold">4</span>, "Webhook support for custom sources; prioritize connectors based on ICP survey; community connector roadmap"],
            ["Competitor launches similar AI feature", <Tag color="blue">Low</Tag>, <Tag color="blue">Medium</Tag>, <span className="text-slate-400 font-bold">4</span>, "Deepen integration depth; build switching costs through historical data; focus on PM-specific workflow, not generic AI"],
          ]}
        />
      </div>
    </section>
  );
}

function S19() {
  return (
    <section id="roadmap" className="section-content mb-20 scroll-mt-8">
      <SectionHeader
        num="19"
        title="Roadmap & Milestones"
        subtitle="A phased approach: validate core value in Q1, expand integrations in Q2, scale and monetize in Q3–Q4."
        tags={[{ label: "Roadmap", color: "blue" }, { label: "Milestones", color: "green" }]}
      />
      <div className="space-y-4">
        {[
          {
            quarter: "Q1 2025",
            theme: "Foundation & PMF Validation",
            color: "emerald",
            status: "Completed",
            milestones: [
              { date: "Jan 15", item: "Alpha launch: 6 design partner companies", done: true },
              { date: "Feb 1", item: "Core connectors live: Zendesk, G2, SurveyMonkey", done: true },
              { date: "Feb 15", item: "AI theme clustering v1 deployed", done: true },
              { date: "Mar 1", item: "Alert engine live with configurable thresholds", done: true },
              { date: "Mar 15", item: "AI executive brief generation in beta", done: true },
              { date: "Mar 31", item: "PMF survey: 60%+ rate CFIP as 'very disappointed' if gone", done: true },
            ],
          },
          {
            quarter: "Q2 2025",
            theme: "Scale & Integration Depth",
            color: "blue",
            status: "In Progress",
            milestones: [
              { date: "Apr 15", item: "Private beta expanded to 30 companies", done: true },
              { date: "May 1", item: "Intercom + Typeform connectors", done: false },
              { date: "May 15", item: "Slack alert delivery integration", done: false },
              { date: "Jun 1", item: "Notion export for briefs", done: false },
              { date: "Jun 30", item: "30-day retention ≥ 75% target hit", done: false },
            ],
          },
          {
            quarter: "Q3 2025",
            theme: "Enterprise & Monetization",
            color: "purple",
            status: "Planned",
            milestones: [
              { date: "Jul", item: "SOC 2 Type II audit initiated", done: false },
              { date: "Jul", item: "Jira + Linear auto-ticket integration", done: false },
              { date: "Aug", item: "Role-based views (VP dashboard, CSM mode)", done: false },
              { date: "Aug", item: "Enterprise SSO (SAML, Okta)", done: false },
              { date: "Sep", item: "First $1M ARR milestone", done: false },
            ],
          },
          {
            quarter: "Q4 2025",
            theme: "Expansion & AI Layer 2",
            color: "amber",
            status: "Planned",
            milestones: [
              { date: "Oct", item: "Video/call transcript NLP (Gong, Chorus)", done: false },
              { date: "Nov", item: "Roadmap recommendation engine (AI suggests priorities)", done: false },
              { date: "Nov", item: "Multi-workspace support for agencies", done: false },
              { date: "Dec", item: "SOC 2 Type II certification complete", done: false },
              { date: "Dec", item: "$2.4M ARR target", done: false },
            ],
          },
        ].map(q => (
          <Card key={q.quarter}>
            <div className="flex justify-between items-center mb-3">
              <div>
                <span className="text-sm font-bold text-white">{q.quarter}</span>
                <span className="text-xs text-slate-400 ml-2">{q.theme}</span>
              </div>
              <Tag color={q.status === "Completed" ? "green" : q.status === "In Progress" ? "amber" : "slate"}>{q.status}</Tag>
            </div>
            <div className="space-y-2">
              {q.milestones.map((m, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className={`text-xs font-mono w-16 shrink-0 ${m.done ? "text-emerald-500" : "text-slate-500"}`}>{m.date}</span>
                  <div className="flex gap-2 items-start flex-1">
                    <span className={`text-sm shrink-0 ${m.done ? "text-emerald-500" : "text-slate-600"}`}>{m.done ? "✓" : "○"}</span>
                    <span className={`text-xs ${m.done ? "text-slate-300" : "text-slate-500"}`}>{m.item}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [active, setActive] = useActiveSection();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const handleNav = (id: string) => {
    setActive(id);
    scrollTo(id);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-[hsl(218_41%_8%)] overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[hsl(220_40%_7%)] border-r border-[hsl(220_25%_14%)]
          flex flex-col overflow-hidden transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="px-5 py-6 border-b border-[hsl(220_25%_14%)]">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">PM</span>
            </div>
            <div>
              <div className="text-sm font-bold text-white">CFIP</div>
              <div className="text-xs text-slate-500">PM Case Study</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <button
                key={s.id}
                onClick={() => handleNav(s.id)}
                className={`
                  w-full flex items-center gap-3 px-5 py-2.5 text-left transition-all duration-150 group
                  ${isActive
                    ? "bg-emerald-600 text-white"
                    : "text-slate-400 hover:text-slate-200 hover:bg-[hsl(220_30%_12%)]"
                  }
                `}
              >
                <span className={`text-xs font-mono shrink-0 ${isActive ? "text-emerald-200" : "text-slate-600 group-hover:text-slate-500"}`}>
                  {s.num}
                </span>
                <span className="text-xs font-medium leading-tight">{s.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-5 py-4 border-t border-[hsl(220_25%_14%)]">
          <div className="text-xs text-slate-600">Senior PM Portfolio · 2025</div>
        </div>
      </aside>

      <main ref={mainRef} className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 lg:hidden flex items-center gap-3 px-4 py-3 bg-[hsl(218_41%_8%)] border-b border-[hsl(220_25%_14%)]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-400 hover:text-white p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm font-medium text-white">
            {SECTIONS.find(s => s.id === active)?.label || "CFIP Case Study"}
          </span>
        </div>

        <div className="max-w-3xl mx-auto px-8 py-12">
          <div className="mb-12">
            <div className="text-xs font-mono text-emerald-500 uppercase tracking-widest mb-3">Product Management Case Study</div>
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              How I Built CFIP:<br />
              <span className="text-emerald-400">A Complete PM Journey</span>
            </h1>
            <p className="text-slate-400 text-base leading-relaxed max-w-xl">
              From discovery to architecture — every decision, trade-off, and framework used to build the Customer Feedback Intelligence Platform.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <Tag color="blue">AI / ML Product</Tag>
              <Tag color="green">B2B SaaS</Tag>
              <Tag color="purple">Full PM Lifecycle</Tag>
              <Tag color="amber">19 Chapters</Tag>
            </div>
          </div>

          <S01 />
          <S02 />
          <S03 />
          <S04 />
          <S05 />
          <S06 />
          <S07 />
          <S08 />
          <S09 />
          <S10 />
          <S11 />
          <S12 />
          <S13 />
          <S14 />
          <S15 />
          <S16 />
          <S17 />
          <S18 />
          <S19 />
        </div>
      </main>
    </div>
  );
}
