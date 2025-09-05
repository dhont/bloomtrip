# (MVP) Solution Design

Authoritative implementation blueprint for the cost‑optimized Azure MVP. For extended / legacy architecture (Redis, Cosmos DB) see `architecture/README.md`.

Sections: domain model, search index, ingestion, retrieval → ranking → RAG, prompts, APIs, service layout, security, cost, IaC, ML flow, observability, edge cases, implementation order, open follow‑ups.

> Full detailed version to be expanded (see planning conversation). Placeholder stub added to integrate navigation and clarify scope separation.

Last updated: September 2025

---
## Reference Architecture Linkage
For a visual end‑to‑end mapping of ingestion → enrichment → indexing → retrieval → generation → caching → delivery, see **Figure 9** in `feasibility-azure.md`. That diagram underpins the service decomposition described here (API boundary choices, cache tiers, and RAG delta refinement path). Future sections will inline component drill‑downs referencing the same node labels to maintain traceability from feasibility → implementation.

---
## Domain Model (Summary)

Core entities and links (full specs in `specs/`):

| Entity | Key Purpose | Linked Artifacts |
|--------|-------------|------------------|
| Petal | Atomic recommendation unit (enriched POI/activity) | Trip activities, retrieval sets |
| Trip | Container of day activities + preferences snapshot | Petal references, feedback signals |
| UserProfile | Personalization + saved content + feedback | Trip creation, ranking inputs |

See: `specs/petal_schema.md`, `specs/trip_schema.md`, `specs/user_profile_schema.md`.

### Search Index Field Classes

Searchable: name, description, summary, tags

Filterable: region, tags, seasonality, difficulty, accessibility, source, license_flags, status, rating, review_count, last_updated

Sortable: rating, review_count, popularity_score, last_updated, sentiment_score

Vector: embedding (HNSW hybrid)

### Cache Key Conventions (Excerpt)

| Layer | Pattern | Notes |
|-------|---------|-------|
| Retrieval Set | retrieval:intent:{hash}:v1 | Intent hash includes geo + filters + profile class |
| Trip Draft | tripdraft:{trip_id}:{hash} | Hash of normalized prompt context |
| Petal Object | petal:{id}:v1 | Invalidate on freshness triggers |
| Popular Region | popular:petals:{region} | Region rolling window ranking |

---

## Personalization Layer (MVP)

Inputs: UserProfile (favorite_tags, travel_modes, companions), Trip context (active day), Interaction signals (saved vs skipped vs newly discovered petals).

Algorithm (initial):

1. Build preference tag weight map (favorites + implicit from saved petals)
2. Score candidate petals: base_retrieval_score * (1 + tag_boost + novelty_bonus)
3. Inject 1–2 exploratory petals if similarity cluster tight (diversity heuristic)
4. Log outcomes (selected vs ignored) for future ranking model

Future: learned-to-rank model (Azure ML) fine-tuned quarterly.
