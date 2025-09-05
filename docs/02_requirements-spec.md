# Requirements Specification (Market-Aligned)

## 1. Purpose

Defines functional and non-functional requirements for the **Weekend Trip Recommender**, incorporating market analysis to ensure differentiation and user value.

---

## 2. Functional Requirements

### 2.1 User Profile & Onboarding

- **FR-1**: Capture home location, travel radius (weekend vs long weekend), interests, constraints, seasonal preferences.
- **FR-2**: Connect calendars (personal + public holidays + school vacations).
- **FR-3**: Persist and update profile for personalization.

### 2.2 Data Ingestion

- **FR-4**: Pull from weather, events, holidays, Reddit, YouTube.
- **FR-5**: Normalize stored data to consistent schema.
- **FR-6**: Enrich with geolocation, tags, popularity metrics.

### 2.3 Retrieval-Augmented Generation (RAG)

- **FR-7**: Create embeddings and store in Azure Cognitive Search.
- **FR-8**: Retrieve based on profile, date window, weather readiness, upcoming free days.
- **FR-9**: Generate trip suggestions grounded strictly in retrieved content.
- **FR-10**: Explain *why* each trip is recommended (rationale string + citations).

### 2.4 Personalization & Ranking

- **FR-11**: Rank using rule filters + ML model (initial heuristic → LightGBM/LightFM).
- **FR-12**: Adapt personalization from explicit (save/boost/mute/skip) + implicit (clicks/dwell) feedback.

### 2.5 Feedback & Adjustment

- **FR-13**: Accept natural language adjustment prompts bound to an existing idea.
- **FR-14**: Regenerate while preserving original evidence set; cite all sources.

### 2.6 Frontend

- **FR-15**: Display trip cards: title, why now, fit for you, plan, logistics, weather note, sources.
- **FR-16**: Provide filtering/sorting (distance, theme, weather suitability—phase 2).
- **FR-17**: Let users save trips and construct itineraries (basic version).

### 2.7 Governance (Deferred / Legacy)

- **FR-18**: (Future) Admin-triggered re-index & selective embedding refresh.
- **FR-19**: (Future) Health endpoint reporting ingestion freshness & model status.

---

## 3. Non-Functional Requirements

| Category | ID | Requirement | Target |
|----------|----|------------|--------|
| Performance | NFR-1 | /ideas median latency | ≤ 2.5s |
| Performance | NFR-2 | /adjust median latency | ≤ 4.0s |
| Scalability | NFR-3 | Concurrent users (MVP) | 100 |
| Reliability | NFR-4 | Ingestion retry attempts | 3 |
| Reliability | NFR-5 | Graceful degradation on source failure | Fallback cached set |
| Security | NFR-6 | Auth | OIDC (Entra ID) |
| Security | NFR-7 | Data plane | Private endpoints (phase 2) |
| Cost | NFR-8 | Monthly Azure spend | ≤ $150 |
| Cost | NFR-9 | Budget alerts | 70%, 90% |
| Observability | NFR-10 | Tracing coverage | ≥95% of request paths |
| Privacy | NFR-11 | User deletion SLA | ≤7 days |

---

## 4. Acceptance Criteria

- **AC-1**: New user receives ≥5 relevant suggestions on first query.
- **AC-2**: Each suggestion includes at least one source + rationale.
- **AC-3**: After ≥3 feedback actions, ranking changes are observable (telemetry flag).
- **AC-4**: Adjustment returns revised plan with ≥50% changed plan block content while retaining valid sources.
- **AC-5**: 0% uncited factual claims in automated test sample (hallucination guardrail).

---

## 5. Out of Scope (MVP)

- Booking API integration
- Loyalty optimization
- Mobile native app
- Multi-language (beyond EN/RO)
- Advanced geospatial clustering (isochrones)

---

## 6. Market-Driven Focus Areas

Derived from market analysis (`05_market-analysis.md`):

| Focus | Problem Solved |
|-------|----------------|
| Explainable suggestions | Generic lists w/out rationale |
| Real-time blended context | Fragmented weather/event/holiday data |
| Weekend optimization | Long-vacation bias |
| Low-friction iteration | Weak feedback loops |
| Grounded generation | AI hallucinations |
| Privacy-first | Email scraping distrust |

---

## 7. Delivery Sequence (Initial)

1. Finalize architecture (`03_architecture.md`)
2. Implement ingestion (weather, holidays, first events source)
3. Build Cognitive Search index + embedding pipeline
4. Ship /profile + /ideas + basic RAG generation
5. Add feedback actions + heuristic ranking; integrate ML ranker v1

---

## 8. Traceability

| Requirement | Market Pain Mapping |
|-------------|--------------------|
| FR-7..FR-10 | Hallucinations, generic output |
| FR-11..FR-14 | Weak feedback / iteration |
| NFR-8..NFR-9 | Cost discipline |
| NFR-6..NFR-7 | Privacy & trust |
| AC-2 / AC-5 | Explainability & grounding |

---

## 9. Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-09-05 | Market-aligned rewrite | System |
| 2025-09-05 | Added traceability section | System |

---

Last updated: September 2025
