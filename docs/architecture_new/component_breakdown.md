# Component Breakdown (Canonical)

Defines the major runtime components, their primary responsibilities, interfaces, and key dependencies.

| Component | Responsibility | Key Interfaces | Storage / External |
|-----------|----------------|----------------|--------------------|
| Ingestion Functions | Pull & normalize raw source data (events, weather, holidays, Reddit, YouTube) | Source APIs, Queue/Timer triggers | Blob (raw), SQL (normalized) |
| Enrichment Workers | Fill missing fields, refresh stale petals, derive tags & sentiment | Cognitive Services, Maps API | Blob (raw enrich), SQL (petals) |
| Embedding Pipeline | Generate embeddings + metadata slice for index | OpenAI Embeddings | Cognitive Search (index) |
| Search / Retrieval Service | Hybrid query (BM25 + vector) + filter pruning + diversification | Cognitive Search, Cache | n/a |
| Personalization Layer | Preference weighting, diversity injection, feedback capture | Retrieval Service, Profile Store | SQL (profiles), cache (session) |
| RAG Orchestrator | Context assembly + prompt construction + post-processing | OpenAI API, Cache | n/a |
| API Gateway / Backend | REST/JSON endpoints (profile, trips, ideas, feedback) | Auth provider, Retrieval, RAG | SQL (trips/profiles) |
| Frontend Web App | User interaction, feedback capture, visualization | Backend API | Local storage (offline hints) |
| Observability Stack | Metrics, logs, traces, quality dashboards | OpenTelemetry exporters | Monitor / App Insights |
| Governance Docs & ADRs | Decision traceability | Git | Repo |

## Interaction Summary

1. Ingestion populates normalized entities and triggers embedding updates.
2. Embedding pipeline upserts vectors → Cognitive Search index.
3. User request hits API → Retrieval Service (hybrid search) → personalization adjustments.
4. RAG Orchestrator assembles context, calls model, enforces attribution → returns structured response.
5. Feedback posted back (save / skip / adjust) influences future personalization weights.

## Failure Containment

- Retrieval failure → degrade to last cached retrieval (<1h) if exists.
- Embedding backlog → fall back to BM25 + filters path (log metric).
- Model timeout → offer regeneration hint to user (idempotent hash reused).

## Open Questions

- Boundary between personalization and retrieval (pre vs post re-rank) for future LTR model.
- Apply semantic cache at RAG Orchestrator or shared layer with retrieval outputs?

Last updated: September 2025
