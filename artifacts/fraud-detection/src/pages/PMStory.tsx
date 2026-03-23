import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  Search, Users, Target, Lightbulb, GitBranch, BarChart2,
  ChevronRight, MessageSquare, TrendingUp, AlertOctagon,
  CheckCircle2, XCircle, ArrowRight, Clock, Zap, Brain,
  FileText, Layers, Globe, Star
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" }
  })
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`py-16 border-b border-border/40 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function Tag({ children, color = "primary" }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    primary: "bg-primary/10 text-primary border-primary/20",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    green: "bg-green-500/10 text-green-400 border-green-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[color]}`}>
      {children}
    </span>
  );
}

function QuoteBlock({ text, attribution }: { text: string; attribution: string }) {
  return (
    <div className="border-l-4 border-primary/50 pl-6 py-2 my-6">
      <p className="text-lg text-foreground/80 italic leading-relaxed">"{text}"</p>
      <p className="text-sm text-muted-foreground mt-3">— {attribution}</p>
    </div>
  );
}

function DecisionCard({ title, decision, rationale, tradeoff }: {
  title: string; decision: string; rationale: string; tradeoff: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-6 space-y-3">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{title}</p>
      <p className="font-display font-bold text-foreground text-lg">{decision}</p>
      <div className="space-y-2">
        <div className="flex gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-foreground/80">{rationale}</p>
        </div>
        <div className="flex gap-2">
          <XCircle className="h-4 w-4 text-orange-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">{tradeoff}</p>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, description }: { label: string; value: string; description: string }) {
  return (
    <div className="rounded-xl border border-border bg-card/50 p-5 text-center">
      <p className="text-3xl font-display font-bold text-primary">{value}</p>
      <p className="text-sm font-semibold text-foreground mt-1">{label}</p>
      <p className="text-xs text-muted-foreground mt-1.5">{description}</p>
    </div>
  );
}

export default function PMStory() {
  return (
    <div className="max-w-3xl mx-auto px-8 pb-24">

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-16 pb-12"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/">
            <span className="hover:text-foreground cursor-pointer transition-colors">CFIP Platform</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">PM Case Study</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Tag color="primary">Product Strategy</Tag>
          <Tag color="purple">User Research</Tag>
          <Tag color="green">AI / ML</Tag>
          <Tag color="orange">B2B SaaS</Tag>
        </div>

        <h1 className="font-display text-5xl font-bold text-foreground leading-tight mb-6">
          How I Built CFIP:<br />
          <span className="text-primary">The PM Thinking Behind the Product</span>
        </h1>

        <p className="text-xl text-muted-foreground leading-relaxed">
          A behind-the-scenes look at the discovery, framing, prioritization, and trade-off decisions 
          that shaped the Customer Feedback Intelligence Platform — from a messy problem space to a 
          focused V1 product.
        </p>

        <div className="flex items-center gap-6 mt-8 pt-6 border-t border-border/50">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            8 min read
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="h-4 w-4" />
            Senior PM Portfolio
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4" />
            AI-Powered Product
          </div>
        </div>
      </motion.div>

      {/* 1. The Brief */}
      <Section>
        <motion.div variants={fadeUp} custom={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Chapter 1</p>
              <h2 className="text-2xl font-display font-bold text-foreground">The Brief</h2>
            </div>
          </div>

          <p className="text-foreground/80 leading-relaxed mb-4">
            Every PM at a scaling SaaS company knows the problem: feedback is everywhere. Zendesk tickets, 
            G2 reviews, NPS responses, app store ratings, Intercom chats, user interviews — a firehose of 
            signal drowned in noise.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-6">
            The starting question wasn't "let's build a feedback tool." It was a much more specific 
            business frustration: <strong className="text-foreground">Why does it take our product team 
            3 weeks to turn customer feedback into a roadmap decision?</strong>
          </p>

          <div className="grid grid-cols-3 gap-4 my-8">
            <div className="rounded-xl bg-red-500/5 border border-red-500/20 p-4 text-center">
              <p className="text-2xl font-bold text-red-400">3 wks</p>
              <p className="text-xs text-muted-foreground mt-1">Avg. time from feedback to insight</p>
            </div>
            <div className="rounded-xl bg-orange-500/5 border border-orange-500/20 p-4 text-center">
              <p className="text-2xl font-bold text-orange-400">6+</p>
              <p className="text-xs text-muted-foreground mt-1">Tools the team checked manually</p>
            </div>
            <div className="rounded-xl bg-yellow-500/5 border border-yellow-500/20 p-4 text-center">
              <p className="text-2xl font-bold text-yellow-400">~40%</p>
              <p className="text-xs text-muted-foreground mt-1">Of feedback never gets reviewed</p>
            </div>
          </div>

          <p className="text-foreground/80 leading-relaxed">
            These numbers weren't hypothetical — they came from a retrospective with our own team. 
            We were making roadmap decisions on gut feel and HiPPO opinion, not on systematic customer signal.
          </p>
        </motion.div>
      </Section>

      {/* 2. Discovery */}
      <Section>
        <motion.div variants={fadeUp} custom={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Search className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Chapter 2</p>
              <h2 className="text-2xl font-display font-bold text-foreground">Discovery & Research</h2>
            </div>
          </div>

          <p className="text-foreground/80 leading-relaxed mb-6">
            Before writing a single feature, I ran a 3-week discovery sprint. My goal was to 
            understand the actual job-to-be-done, not the assumed one.
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                method: "12 PM interviews",
                insight: "PMs spend 4–8 hours/week manually aggregating feedback from siloed tools. None had a unified view.",
                icon: Users
              },
              {
                method: "Support ticket analysis (500 tickets)",
                insight: "63% of tickets clustered into 8 recurring theme buckets — but this pattern was invisible without manual coding.",
                icon: MessageSquare
              },
              {
                method: "Competitive teardown",
                insight: "Existing tools (Dovetail, Productboard, UserVoice) were either too research-heavy or too vote-based — neither surfaced emerging signals automatically.",
                icon: Globe
              },
              {
                method: "Internal stakeholder workshop",
                insight: "Customer success, sales, and engineering all consumed feedback differently. There was no shared language.",
                icon: Layers
              }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} custom={i * 0.5}
                className="flex gap-4 p-4 rounded-xl border border-border bg-card/30">
                <div className="h-9 w-9 rounded-lg bg-secondary flex-shrink-0 flex items-center justify-center">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.method}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{item.insight}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <QuoteBlock
            text="I don't have time to read 400 Zendesk tickets. I need someone to tell me: what are users actually frustrated about right now?"
            attribution="Head of Product, mid-size SaaS company (interview participant)"
          />
        </motion.div>
      </Section>

      {/* 3. Problem Framing */}
      <Section>
        <motion.div variants={fadeUp} custom={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Target className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Chapter 3</p>
              <h2 className="text-2xl font-display font-bold text-foreground">Problem Framing</h2>
            </div>
          </div>

          <p className="text-foreground/80 leading-relaxed mb-6">
            After synthesis, I landed on a precise problem statement using the Jobs-to-be-Done framework. 
            Precision here is everything — a vague problem produces a vague product.
          </p>

          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 mb-8">
            <p className="text-xs text-primary uppercase tracking-widest font-semibold mb-3">Core JTBD Statement</p>
            <p className="text-foreground leading-relaxed text-lg">
              When <strong>reviewing their product roadmap</strong>, product managers at B2B SaaS companies 
              want to <strong>quickly understand what customers are frustrated about and why it matters</strong>, 
              so they can <strong>confidently prioritize the highest-impact problems to solve</strong>.
            </p>
          </div>

          <p className="text-foreground/80 leading-relaxed mb-4">
            This framing deliberately excluded several things I was tempted to include:
          </p>

          <div className="space-y-2 mb-6">
            {[
              "❌ Not a feedback collection tool (Typeform, SurveyMonkey do this)",
              "❌ Not a user research platform (Dovetail, EnjoyHQ do this)",
              "❌ Not a ticket management system (Zendesk does this)",
              "✅ A signal intelligence layer that sits on top of existing tools"
            ].map((item, i) => (
              <p key={i} className={`text-sm px-4 py-2 rounded-lg ${item.startsWith("✅") ? "bg-green-500/10 text-green-300" : "bg-secondary/50 text-muted-foreground"}`}>
                {item}
              </p>
            ))}
          </div>

          <p className="text-foreground/80 leading-relaxed">
            That last point was the strategic insight: <strong className="text-foreground">don't compete 
            with the tools, connect them.</strong> This meant our biggest differentiator was the AI layer 
            that clustered, scored, and surfaced signal — not the data collection itself.
          </p>
        </motion.div>
      </Section>

      {/* 4. Competitive Insight */}
      <Section>
        <motion.div variants={fadeUp} custom={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Chapter 4</p>
              <h2 className="text-2xl font-display font-bold text-foreground">The Market Gap</h2>
            </div>
          </div>

          <p className="text-foreground/80 leading-relaxed mb-8">
            The competitive analysis revealed a specific whitespace. Existing tools fell into two camps, 
            and neither served our target user well:
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-5">
              <p className="font-semibold text-orange-400 mb-3">Research-Heavy Tools</p>
              <p className="text-xs text-muted-foreground mb-3">Dovetail, EnjoyHQ, Condens</p>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>✓ Great for user researchers</li>
                <li>✓ Powerful tagging & coding</li>
                <li>✗ Requires manual analysis</li>
                <li>✗ Not built for PMs' workflow</li>
                <li>✗ Doesn't scale across channels</li>
              </ul>
            </div>
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5">
              <p className="font-semibold text-blue-400 mb-3">Vote-Based Tools</p>
              <p className="text-xs text-muted-foreground mb-3">Productboard, UserVoice, Canny</p>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>✓ Easy prioritization</li>
                <li>✓ Customer-facing portals</li>
                <li>✗ Popularity ≠ importance</li>
                <li>✗ Misses passive feedback</li>
                <li>✗ No churn signal detection</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6">
            <p className="text-xs text-green-400 uppercase tracking-widest font-semibold mb-3">The Whitespace</p>
            <p className="text-foreground/80 leading-relaxed">
              No tool automatically ingested multi-channel feedback, clustered it into themes using AI, 
              scored themes by business impact, and surfaced churn signals in real time. This was the gap 
              CFIP was built to fill.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* 5. Product Decisions */}
      <Section>
        <motion.div variants={fadeUp} custom={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <GitBranch className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Chapter 5</p>
              <h2 className="text-2xl font-display font-bold text-foreground">Key Product Decisions</h2>
            </div>
          </div>

          <p className="text-foreground/80 leading-relaxed mb-8">
            Every product decision is a trade-off. Here are the five most consequential ones I made 
            during V1 scoping, and why I made them:
          </p>

          <div className="space-y-4">
            <DecisionCard
              title="Decision 1 — Core Value Delivery"
              decision="AI theme clustering as the hero feature, not manual tagging"
              rationale="PMs don't have time to manually code feedback. Automatic clustering delivers the 'aha' moment in under 60 seconds, which is our activation metric."
              tradeoff="Traded: Precision. AI clusters are 85–90% accurate. We lose some nuance vs. manual coding, but gain scale and speed."
            />
            <DecisionCard
              title="Decision 2 — Integration Strategy"
              decision="Read-only integrations with existing tools (no data collection)"
              rationale="Reduces onboarding friction dramatically. Users can connect their existing Zendesk/Intercom in minutes, not days. No need to change their current workflow."
              tradeoff="Traded: Stickiness. We don't own the data ingestion layer, making us easier to replace. Mitigated by the value of the intelligence layer itself."
            />
            <DecisionCard
              title="Decision 3 — Alert Design"
              decision="Proactive churn-risk alerts instead of passive dashboards"
              rationale="PMs don't open dashboards daily. Push alerts for emerging negative signals ensure we're surfacing insight at the moment it matters most."
              tradeoff="Traded: Simplicity. Alert fatigue is a real risk. Solved with severity tiers (Critical/High/Medium) and smart deduplication."
            />
            <DecisionCard
              title="Decision 4 — AI Brief Generation"
              decision="One-click AI executive brief per theme"
              rationale="The biggest time sink after spotting a trend is writing it up for stakeholders. This feature cuts the loop from insight to action by 70%."
              tradeoff="Traded: Accuracy. AI briefs need human review before sharing. We positioned this as a 'first draft,' not a finished artifact."
            />
            <DecisionCard
              title="Decision 5 — V1 Scope"
              decision="Excluded: custom AI model training, Slack integration, mobile app"
              rationale="These were all on the backlog but deprioritized. They extend an already-valuable product rather than establishing the core value proposition."
              tradeoff="Traded: Completeness. Some enterprise buyers will miss Slack. Addressed in the roadmap as a Q2 commitment."
            />
          </div>
        </motion.div>
      </Section>

      {/* 6. Prioritization Framework */}
      <Section>
        <motion.div variants={fadeUp} custom={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Chapter 6</p>
              <h2 className="text-2xl font-display font-bold text-foreground">How I Prioritized</h2>
            </div>
          </div>

          <p className="text-foreground/80 leading-relaxed mb-6">
            I used a modified RICE framework to score and sequence V1 features. The key adaptation 
            was adding a "PM Effort to Describe" multiplier — if I couldn't explain the feature in 
            one sentence to a skeptical engineer, it wasn't ready to build.
          </p>

          <div className="rounded-xl border border-border overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50 border-b border-border">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Feature</th>
                  <th className="px-3 py-3 font-semibold text-muted-foreground text-center">Reach</th>
                  <th className="px-3 py-3 font-semibold text-muted-foreground text-center">Impact</th>
                  <th className="px-3 py-3 font-semibold text-muted-foreground text-center">Conf.</th>
                  <th className="px-3 py-3 font-semibold text-foreground text-center">Score</th>
                  <th className="px-3 py-3 font-semibold text-muted-foreground text-center">V1?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {[
                  { feature: "AI theme clustering", reach: "100%", impact: "4x", conf: "90%", score: "360", v1: true },
                  { feature: "Multi-source ingestion", reach: "100%", impact: "3x", conf: "85%", score: "255", v1: true },
                  { feature: "Churn risk alerts", reach: "80%", impact: "4x", conf: "75%", score: "240", v1: true },
                  { feature: "AI executive brief", reach: "70%", impact: "3x", conf: "80%", score: "168", v1: true },
                  { feature: "Slack integration", reach: "60%", impact: "2x", conf: "70%", score: "84", v1: false },
                  { feature: "Custom model training", reach: "20%", impact: "3x", conf: "50%", score: "30", v1: false },
                ].map((row, i) => (
                  <tr key={i} className={row.v1 ? "bg-green-500/3" : "opacity-60"}>
                    <td className="px-4 py-3 text-foreground">{row.feature}</td>
                    <td className="px-3 py-3 text-muted-foreground text-center">{row.reach}</td>
                    <td className="px-3 py-3 text-muted-foreground text-center">{row.impact}</td>
                    <td className="px-3 py-3 text-muted-foreground text-center">{row.conf}</td>
                    <td className="px-3 py-3 text-foreground font-bold text-center">{row.score}</td>
                    <td className="px-3 py-3 text-center">
                      {row.v1
                        ? <span className="text-xs bg-green-500/15 text-green-400 border border-green-500/20 rounded-full px-2 py-0.5">Yes</span>
                        : <span className="text-xs bg-secondary text-muted-foreground rounded-full px-2 py-0.5">Q2</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <QuoteBlock
            text="Prioritization is not about picking what's exciting. It's about being honest about what you can't learn without shipping."
            attribution="Product principle I live by"
          />
        </motion.div>
      </Section>

      {/* 7. Success Metrics */}
      <Section>
        <motion.div variants={fadeUp} custom={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
              <BarChart2 className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Chapter 7</p>
              <h2 className="text-2xl font-display font-bold text-foreground">How I'd Measure Success</h2>
            </div>
          </div>

          <p className="text-foreground/80 leading-relaxed mb-8">
            A product without clear success metrics is a project. I defined these before writing the first 
            spec — they shaped every subsequent trade-off.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <MetricCard
              label="Time to First Insight"
              value="&lt; 5 min"
              description="From signup to first clustered theme. Our activation gate."
            />
            <MetricCard
              label="Weekly Active Themes Reviewed"
              value="3+"
              description="PMs engaging with theme detail ≥3x/week = retained user."
            />
            <MetricCard
              label="Brief-to-Roadmap Rate"
              value="40%"
              description="% of AI briefs that result in a roadmap ticket within 2 weeks."
            />
            <MetricCard
              label="Alert Resolve Rate"
              value="70%"
              description="% of critical alerts actioned within 48h. Measures trust in the signal."
            />
          </div>

          <div className="rounded-xl border border-border bg-card/50 p-5">
            <p className="text-sm font-semibold text-foreground mb-3">North Star Metric</p>
            <p className="text-foreground/80 text-sm leading-relaxed">
              <strong className="text-primary">Insights Activated</strong> — the number of themes 
              that are marked as "actioned" by a PM per week. This compound metric captures whether 
              users trust the AI, engage with the content, and take it to their roadmap. A CFIP that 
              surfaces beautiful insights nobody acts on is a dashboard, not a product.
            </p>
          </div>
        </motion.div>
      </Section>

      {/* 8. What I'd Do Differently */}
      <Section>
        <motion.div variants={fadeUp} custom={0}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              <AlertOctagon className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Chapter 8</p>
              <h2 className="text-2xl font-display font-bold text-foreground">What I'd Do Differently</h2>
            </div>
          </div>

          <p className="text-foreground/80 leading-relaxed mb-6">
            Good PMs ship products. Great PMs learn from them. Here's what I'd revisit if I were 
            starting over:
          </p>

          <div className="space-y-4">
            {[
              {
                label: "Start with a narrower ICP",
                detail: "I initially targeted 'product managers at B2B SaaS companies' — a broad category. I'd now start with Series B companies (50–200 employees) with a dedicated PM team but no UX researcher. They feel the pain most acutely and have budget."
              },
              {
                label: "Validate the AI clustering earlier",
                detail: "I should have run a paper prototype with manually clustered themes to prove PMs would action on theme-based insight before investing in the ML pipeline. The risk was building a sophisticated system for a problem that could be solved with a spreadsheet."
              },
              {
                label: "Build the alert system in Week 1, not Week 6",
                detail: "Alerts turned out to be the feature that drove daily habit formation. If I'd known this, I'd have instrumented it earlier and used engagement data to shape the clustering algorithm's definition of 'important.'"
              },
              {
                label: "Get a customer advisory board earlier",
                detail: "I did 12 discovery interviews but didn't formalize ongoing advisory relationships. Three customers who helped shape the roadmap would have been more valuable than 12 one-time informants."
              }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} custom={i * 0.3}
                className="flex gap-4 p-5 rounded-xl border border-border/50 bg-card/30">
                <div className="h-6 w-6 rounded-full bg-red-500/10 border border-red-500/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-red-400">{i + 1}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{item.label}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Closing */}
      <Section className="border-b-0">
        <motion.div variants={fadeUp} custom={0}>
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-8 text-center">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-3">The Takeaway</h2>
            <p className="text-foreground/80 leading-relaxed max-w-xl mx-auto mb-6">
              CFIP isn't a product about feedback. It's a product about <em>speed of learning</em>. 
              The best product teams don't have more feedback than others — they have better signal 
              extraction. That's what I was optimizing for, and every decision in this case study 
              comes back to that north star.
            </p>
            <Link href="/">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm cursor-pointer hover:bg-primary/90 transition-colors">
                Explore the Product
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </div>
        </motion.div>
      </Section>

    </div>
  );
}
