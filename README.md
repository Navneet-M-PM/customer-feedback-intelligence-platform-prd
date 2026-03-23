# Customer Feedback Intelligence Platform (CFIP)

> **A full-stack AI-powered product built as a Senior PM portfolio piece** — from discovery through delivery.  
> Includes a working web app, a 15-slide PRD deck, and a 19-chapter interactive PM case study covering every stage of the product lifecycle.

---

## What Is CFIP?

CFIP is a **real-time feedback intelligence layer** for B2B SaaS product teams. It connects to existing support, review, and research channels — Zendesk, Intercom, G2, Trustpilot, SurveyMonkey — and uses AI to continuously cluster feedback into themes, detect sentiment drift, surface proactive alerts, and generate executive-ready briefs.

The core problem it solves:

> *"Product managers at scaling B2B SaaS companies spend 6–12 hours per week manually aggregating customer feedback from siloed tools, yet still feel under-informed at roadmap and sprint planning meetings — because no system continuously synthesizes signal into actionable insight on their behalf."*

**Before CFIP:** 3 weeks from feedback → roadmap decision  
**After CFIP:** Same day

---

## Portfolio Artifacts

This repository contains three portfolio pieces built as a single cohesive project:

| Artifact | Description | Live |
|---|---|---|
| **PM Case Study** | 19-chapter interactive document covering the full PM lifecycle — from problem identification to system architecture, A/B testing, user stories, and roadmap | [View →](https://portfolio-showcase-ai.replit.app/pm-case-study/) |

---

## PM Case Study — Chapter Index

The interactive case study walks through the full product thinking journey. Each chapter is clickable in the left-hand sidebar:

| # | Chapter | Frameworks Used |
|---|---|---|
| 01 | Executive Summary | North Star metric, target ARR |
| 02 | Problem Identification | Root cause decomposition, problem statement |
| 03 | Pain Points & Research | 12 PM interviews, 500-ticket analysis, competitive teardown |
| 04 | Gap Analysis | Feature comparison matrix, whitespace identification |
| 05 | Requirements Gathering | JTBD framework, MoSCoW prioritization |
| 06 | User Personas | 3 distinct personas (PM, VP Product, CSM) |
| 07 | Customer Journey Map | As-Is vs. To-Be, emotion mapping |
| 08 | Concept Testing | 3 prototype rounds, findings, and pivots |
| 09 | Prioritization Framework | RICE scoring, explicit trade-off documentation |
| 10 | A/B Testing Strategy | 4 experiments with hypotheses, metrics, guardrails |
| 11 | User Story Detailing | Acceptance criteria, edge cases, definition of done |
| 12 | Functional Requirements | 35 FRs across 4 domains |
| 13 | Non-Functional Requirements | Performance, security, compliance, scalability |
| 14 | System Architecture | 5-layer microservices design |
| 15 | Orchestration & Data Flow | 10-step ingestion pipeline, AI brief generation flow |
| 16 | API Integrations | 7 source connectors, 3 AI services, 6 delivery APIs |
| 17 | KPIs & Success Metrics | North Star, tier-1 metrics, anti-metrics |
| 18 | Risks & Mitigations | 8 risks scored by probability × impact |
| 19 | Roadmap & Milestones | Q1–Q4 2025 phased delivery plan |

---

## Product Decisions & Trade-offs

Key decisions made during the build, documented with rationale:

**Read-only integrations only (V1)**  
PMs were skeptical of any tool requiring write access to support systems. Trust was the adoption blocker. Read-only eliminated it entirely without limiting core value.

**AI theme naming over manual taxonomy**  
A/B tested: AI-generated theme names resulted in 42% faster time-to-insight vs. user-named clusters with a 4.1/5 accuracy rating. AI naming shipped as default.

**Daily digest alerts over real-time banners**  
Alert fatigue is a product killer. Testing showed 63% click-through on digest vs. 29% for in-app banners. Digest became the default; real-time remains configurable.

**No in-app feedback collection (V1)**  
Explicitly excluded to protect positioning. CFIP is an intelligence layer, not a collection tool. Adding forms would dilute the category we're creating.

---

## Tech Stack

### Frontend
- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** with custom design system
- **Shadcn/ui** component library
- **Recharts** for data visualization
- **Framer Motion** for animations
- **Wouter** for client-side routing
- **TanStack Query** for server state management

### Backend
- **Node.js** + **Express** + **TypeScript**
- **PostgreSQL** with **Drizzle ORM**
- **Zod** for runtime schema validation
- **OpenAPI 3.0** contract-first API design

### AI / ML
- OpenAI `text-embedding-3-small` — feedback vectorization
- OpenAI `GPT-4o` — theme naming, executive brief generation
- Custom fine-tuned DistilBERT — per-feedback sentiment scoring
- `pgvector` — embedding storage and cosine similarity clustering

### Infrastructure
- **pnpm workspaces** monorepo
- **Kubernetes (EKS)** for service orchestration (prod target)
- **Redis** for job queues and caching
- **AWS Secrets Manager** for credential storage
- **GitHub Actions** CI/CD

---

## Project Structure

```
/
├── artifacts/
│   ├── pm-case-study/          # 19-chapter interactive PM case study (React/Vite)
│   ├── fraud-detection/        # CFIP web application (React/Vite)
│   ├── feedback-prd/           # 15-slide PRD deck (React/Vite)
│   └── api-server/             # Express + PostgreSQL REST API
├── lib/
│   ├── db/                     # Drizzle ORM schema & migrations
│   ├── api-spec/               # OpenAPI 3.0 specification
│   └── api-zod/                # Generated Zod validation schemas
└── scripts/                    # Database seeding & utilities
```

---

## Running Locally

**Prerequisites:** Node.js 20+, pnpm 9+, PostgreSQL 15+

```bash
# 1. Clone the repository
git clone https://github.com/Navneet-M-PM/customer-feedback-intelligence-platform-prd.git
cd customer-feedback-intelligence-platform-prd

# 2. Install dependencies
pnpm install

# 3. Set environment variables
cp .env.example .env
# Add: DATABASE_URL, PORT values per artifact

# 4. Push database schema
pnpm --filter @workspace/db run push

# 5. Seed demo data
pnpm --filter @workspace/scripts run seed

# 6. Start all services
pnpm --filter @workspace/api-server run dev      # API on :8080
pnpm --filter @workspace/fraud-detection run dev  # CFIP app on :5173
pnpm --filter @workspace/pm-case-study run dev    # Case study on :5174
pnpm --filter @workspace/feedback-prd run dev     # PRD slides on :5175
```

---

## API Overview

All CFIP endpoints are under `/api/cfip/`. Full spec in [`lib/api-spec/openapi.yaml`](lib/api-spec/openapi.yaml).

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/cfip/dashboard` | Aggregate stats: feedback volume, theme count, active alerts |
| `GET` | `/api/cfip/feedback` | Paginated feedback inbox with filter/search |
| `GET` | `/api/cfip/themes` | AI-clustered themes with sentiment + trend data |
| `GET` | `/api/cfip/themes/:id` | Theme detail: quotes, trend chart, raw feedback |
| `GET` | `/api/cfip/sources` | Connected source health + last sync status |
| `GET` | `/api/cfip/alerts` | Active and historical sentiment drift alerts |

---

## Data Model

```
feedback_items     → Raw ingested feedback (source, text, sentiment, created_at)
themes             → AI-generated clusters (name, sentiment_score, feedback_count)
theme_feedback     → Junction: maps feedback items to themes
sources            → Connected integration sources
alerts             → Triggered sentiment drift notifications
```

---

## Research Inputs

This product was built on real discovery work:

- **12 semi-structured PM interviews** (45 min each, Series B–D SaaS companies)
- **3 CSM shadow sessions** observing live feedback synthesis workflows
- **500-ticket Zendesk qualitative analysis** across 4 client companies
- **Competitive teardown** of Dovetail, Productboard, and UserVoice
- **3 rounds of prototype testing** (paper → Figma → live alpha with 6 companies)

Key finding: **91% of PMs use 4+ feedback tools with no integration**, losing an average of **7.2 hours per week** to manual synthesis.

---

## Success Metrics

| Metric | Target | Why It Matters |
|---|---|---|
| **North Star: Insights Activated** | 3/team/week by Month 3 | Measures real downstream product decisions |
| Time to First Insight | < 30 min from source connection | Validates onboarding and trust |
| Weekly Active Teams | > 70% active 3+ days/week | Habitual use = sustained value |
| Alert Response Rate | > 50% actioned within 24h | Validates alert quality |
| 30-Day Retention | > 75% of activated accounts | Ongoing value delivery |
| NPS | > 45 by Month 6 | Category-creating products need promoters |

---

## About This Portfolio

This project was built to demonstrate Senior PM thinking across the full product lifecycle — not just strategy, but the actual execution: writing acceptance criteria, making trade-off calls, defining system architecture, designing experiments, and shipping working software.

The goal: show that a Senior PM can go from ambiguous business problem → validated product concept → functional prototype → documented system → measurable outcomes — and articulate every decision clearly.

---

*Built with Replit · Documented with care · Shipped as a portfolio*
