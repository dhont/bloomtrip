# Project Overview

## 1. Problem Statement

Planning short trips is time-consuming. Most tools focus on long vacations, offer generic suggestions, or require juggling multiple apps for weather, events, and bookings. Existing AI planners often hallucinate, lack transparency, and ignore personal context like family composition, interests, or constraints.

## 2. Goal

Build a **weekend-trip-first** planning system that:

- Suggests 2–4 day trips tailored to the user’s profile
- Uses real-time data (events, weather, holidays, social buzz)
- Grounds all AI output in retrieved, verifiable sources
- Adapts dynamically to context (weather, long weekends, school breaks)
- Runs cost-effectively on Azure (~$150/month)

## 3. Market Landscape & Pain Points (Summary)

### 3.1 Existing Tools (Selective)

- **Wanderlog** — Strong collaboration & itinerary UX; still manual research.
- **TripIt** — Great for post-booking organization; not for discovery.
- **Roadtrippers** — Good for long road itineraries; weak for short regional getaways.
- **Tripadvisor** — Massive breadth; overwhelming, generic feeds.
- **AI planners (Mindtrip, Layla)** — Fast ideas; often ungrounded or trend-skewed.

### 3.2 Common Pain Points

| Pain | Description |
|------|-------------|
| Generic output | No deep personalization or explanation |
| Fragmented data | Weather / events / holidays separated |
| Weekend neglect | Optimized for long vacations, not short notice |
| Overload | Long, unranked POI lists with no rationale |
| Weak feedback | Little ability to refine results iteratively |
| Hallucinations | AI inventions without citations |
| Privacy concerns | Email scraping / opaque usage |

## 4. Competitive Feature Comparison

| Feature / Capability | BloomTrip (MVP) | Wanderlog | TripIt | Roadtrippers | Tripadvisor | Mindtrip (AI) |
|----------------------|-----------------|-----------|--------|--------------|------------|---------------|
| Weekend‑first focus | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Profile personalization | ✅ | ⚠️ | ❌ | ❌ | ❌ | ⚠️ |
| Real‑time events integration | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Weather‑aware suggestions | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Holiday & school break awareness | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Social buzz integration | ✅ | ❌ | ❌ | ❌ | ❌ | ⚠️ |
| Grounded RAG with citations | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Feedback loop (Save/Boost/Mute/Skip) | ✅ | ❌ | ❌ | ❌ | ❌ | ⚠️ |
| Prompt‑to‑adjust | ✅ | ❌ | ❌ | ❌ | ❌ | ⚠️ |
| Multi‑modal content | ✅ | ⚠️ | ❌ | ✅ | ✅ | ⚠️ |
| Privacy‑first design | ✅ | ⚠️ | ❌ (email parsing) | ❌ | ❌ | ❌ |
| Campervan / off‑grid support | ✅ | ❌ | ❌ | ⚠️ | ❌ | ❌ |
| Cost transparency | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

✅ = Strong, ⚠️ = Partial, ❌ = Missing

## 5. Unique Value Proposition

> *“The only weekend trip planner that blends your profile, live events, weather, and social buzz into grounded, explainable suggestions you can tweak instantly — all without giving up your privacy.”*

Key differentiators:

- **Context-aware personalization** — Profile + live data + seasonal context
- **Weekend-first focus** — Optimized for short trips with intelligent long-weekend expansion
- **RAG transparency** — Every suggestion cites its sources (no silent hallucinations)
- **Feedback-driven evolution** — Save / Boost / Mute / Skip + prompt-to-adjust
- **Multi-modal context** — Text, maps, media (YouTube, Reddit)
- **Privacy-first** — OIDC login, no email scraping, managed identities only

## 6. Target Users

- Families or individuals in Romania (initially)
- Time-constrained users wanting curated, relevant trip ideas
- Web-first users comfortable with progressive enhancement (mobile web before native)

## 7. High-Level Workflow

1. Profile setup (home base, interests, constraints, travel radius)
2. Multi-source ingestion (events, weather, holidays, Reddit, YouTube)
3. Enrichment (tags, seasonality, embeddings, drive time)
4. Personalized retrieval (filters + vector + profile adaptation)
5. ML ranking (rules + model features + diversity)
6. RAG generation (grounded trip cards with rationale & sources)
7. Feedback + adjustment loop (immediate user vector update; nightly model refresh)

## 8. Why Azure

- Integrated AI (OpenAI + Cognitive Search + ML endpoints)
- Cost-efficient serverless ingestion (Functions, Logic Apps)
- Managed identity + OIDC for secretless CI/CD
- Incremental scale path (Basic SKUs → autoscale)
- Built-in geospatial (Azure Maps API)

## 9. Next Steps

- Finalize requirements spec (`docs/02_requirements-spec.md`)
- Build ingestion scripts for first data sources
- Set up Azure baseline infrastructure (Bicep)
- Implement MVP retrieval + RAG pipeline
- Launch public landing ([BloomTripApp.com](https://BloomTripApp.com)) for alpha email capture
- Add one-pager (`one-pager.md`) to pitch materials

---

Last updated: September 2025 (updated with domain & one-pager references)
