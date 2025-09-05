# Product Roadmap

This roadmap connects our **market positioning** to a phased delivery plan.  
Each phase builds on our unique differentiators: weekend-first focus, live context blending, grounded AI, dynamic adaptability, privacy-first design, and campervan/off-grid readiness.

---

## Phase 0 — Foundation & Infrastructure (Month 0–1)

**Goal:** Establish secure, cost-effective Azure environment and baseline services.

**Key Deliverables:**

- Azure Resource Manager + Bicep modules for all core services
- EV2 deployment pipeline with environment separation (dev/test/prod)
- OIDC integration with Microsoft Entra ID for secure, secretless CI/CD
- .NET Aspire solution scaffold (frontend, backend, ingestion services)
- Azure SQL, Blob Storage, Cognitive Search (Basic), Azure Maps, Azure OpenAI provisioned
- Application Insights + budget alerts configured

**Market Tie-In:**  
Sets the stage for privacy-first, scalable delivery — a trust differentiator.

---

## Phase 1 — MVP Retrieval & RAG (Month 2–3)

**Goal:** Deliver the first usable version for internal testing.

**Key Deliverables:**

- User profile creation (home base, radius, interests, constraints)
- Ingestion for:
	- Romanian public holidays
	- Weather forecasts
	- One events API
	- One Reddit source
- Content normalization, tagging, geocoding
- Embedding + indexing in Azure Cognitive Search
- Basic retrieval (filters + vector search)
- RAG trip card generation with citations
- React frontend: profile wizard + ideas feed

**Market Tie-In:**  
Launches the **weekend-first**, **context-aware** core that competitors lack.

---

## Phase 2 — Personalization & Feedback Loop (Month 4–5)

**Goal:** Make recommendations adaptive and user-specific.

**Key Deliverables:**

- Feedback actions: Save / Boost / Mute / Skip
- User embedding updates from feedback
- ML ranker (LightGBM or LightFM) trained locally, deployed to Azure ML endpoint
- Prompt-to-adjust flow in frontend
- Expanded ingestion: YouTube playlists + transcripts
- Weather-aware suggestion filtering

**Market Tie-In:**  
Delivers **dynamic adaptability** and **feedback-driven evolution** — a rare combo in the market.

---

## Phase 3 — Multi-Modal & Social Buzz (Month 6–7)

**Goal:** Enrich content and broaden discovery sources.

**Key Deliverables:**

- Additional event APIs (local tourism boards, Eventbrite)
- More Reddit communities
- YouTube thumbnail + media embedding in trip cards
- Social buzz scoring (Reddit upvotes, YouTube views)
- Indoor/outdoor classification for weather adaptation
- Campervan/off-grid spot integration

**Market Tie-In:**  
Strengthens **multi-modal content** and **off-grid readiness** — unique differentiators.

---

## Phase 4 — Long-Weekend Expansion & Advanced Ranking (Month 8–9)

**Goal:** Handle extended trips and refine ranking.

**Key Deliverables:**

- Calendar-aware radius expansion for long weekends
- Diversification algorithm (MMR) to avoid near-duplicates
- Popularity + novelty balancing in ranker
- Seasonal priors in cold-start recommendations
- Itinerary builder (multi-day plan from saved trips)

**Market Tie-In:**  
Owns the **long-weekend** niche and improves suggestion quality.

---

## Phase 5 — Public Beta & Growth (Month 10–12)

**Goal:** Open to public testers, gather feedback, and prepare for scale.

**Key Deliverables:**

- Public beta launch
- Usage analytics dashboard
- Performance tuning for <2.5s median response
- Marketing site with positioning & messaging
- Early partnerships with tourism boards or campervan communities

**Market Tie-In:**  
Positions the product as the **go-to weekend trip planner** in Romania, ready to expand.

---

## Future Opportunities (Post-Year 1)

- Multi-language support (EN/RO/DE)
- Mobile app (React Native or MAUI)
- Booking platform integrations
- Loyalty program tie-ins
- AI itinerary co-pilot chat mode

---

## Roadmap Principles

- **Market-driven:** Every feature ties to a differentiator.
- **Privacy-first:** No features that compromise user trust.
- **Cost-conscious:** Stay within $150/month Azure budget until scale demands more.
- **Iterative:** Ship small, learn fast, adapt.

---

Last updated: 2025-09-05
