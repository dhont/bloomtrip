# RAG Pipeline Details

This page decomposes the RAG flow into concrete stages with responsibilities, data contracts, metrics, and failure considerations.

> Summary: User intent + profile + (optional) trip context → cache lookup → hybrid retrieval → (conditional) external enrichment → context assembly → LLM generation → attribution + compliance → cache store → client delivery.

See domain schemas: `specs/petal_schema.md`, `specs/trip_schema.md`, `specs/user_profile_schema.md` for field definitions referenced below.

---
## 0. Visual Flow (RAG + Caching Overview)

```mermaid
flowchart LR
	subgraph Client
		Q[User Query / Action]:::step
	end
	subgraph API_Layer[API Layer]
		INT[Intention Normalization]:::step
		CK{Retrieval Set Cache Hit?}:::decision
		RETR[Hybrid Retrieval]:::step
		ENR{Needs Enrichment?}:::decision
		ENR_CALL[External Provider Calls]:::step
		CTX[Context Assembly]:::step
		GEN[Azure OpenAI Generation]:::step
		POST[Post-Process / Attribution + License Filtering]:::step
		STORE[Cache Store]:::cache
	end
	subgraph Caches
		C_RETR[(Redis: retrieval:intent:{hash})]:::cache
		C_PROV[(Redis: provider:place:{src}:{id})]:::cache
		C_SEM[(Redis: semantic:trip_seed:{hash})]:::cache
		C_DELTA[(Redis: delta:{tripId}:{scopeHash})]:::cache
	end
	subgraph Data
		DB[(SQL / Future Cosmos: Petals, Trips, Profiles)]:::store
		RAW[(Blob: Raw Payloads & Media)]:::store
		IDX[(AI Search Index)]:::store
	end
	Q --> INT --> CK
	CK -->|hit| C_RETR --> CTX
	CK -->|miss| RETR --> ENR
	ENR -->|yes| ENR_CALL --> C_PROV --> RETR
	ENR -->|no| CTX
	RETR --> IDX
	ENR_CALL --> RAW
	ENR_CALL --> DB
	CTX --> GEN --> POST --> STORE
	STORE --> C_SEM
	STORE --> C_RETR
	GEN --> C_DELTA
	RETR --> C_RETR
	DB --> RETR
	RAW --> IDX
	POST --> DB
	classDef cache fill=#fdf6e3,stroke=#d2b48c,color=#654321;
	classDef step fill=#ffffff,stroke=#1e88e5,color=#1e88e5;
	classDef decision fill=#fff3e0,stroke=#fb8c00,color=#e65100;
	classDef store fill=#e3f2fd,stroke=#64b5f6,color=#0d47a1;
	class C_RETR,C_PROV,C_SEM,C_DELTA cache;
```

		Where each hash = stable 64-bit fnv or murmur of canonical JSON subset. Version suffix bumps when prompt/template semantics change.

		Cache Entries:

		- Retrieval set (petal IDs + metadata snapshot)
		- Generated answer (trip draft or petal recommendation set)

		Eviction & TTL:

		- Retrieval: 30–120 min (seasonal / event-sensitive shorter)
		- Generation: 10–30 min unless saved / bookmarked

		## 4. Retrieval Strategy

		Primary: Azure Cognitive Search hybrid (BM25 + vector). Filters applied server-side for geo radius, tags, seasonality, accessibility.

		Diversification: if top 8 results share >60% identical tag set, replace lowest 2 with high-distance related_petals to improve itinerary variety.

		Ranking Blend (initial heuristic):

		```text
		score = 0.55 * vector_score + 0.35 * bm25 + 0.10 * recency_decay
		```

		Future: train learned-to-rank with interaction feedback.

		Failure Modes:

		- Empty result → fallback broaden filters (widen geo, relax tag strictness) once.
		- API timeout → degrade to last known cached retrieval if < 1h old.

		## 5. External Enrichment Decision Matrix

		Trigger enrichment only if:

		- Missing critical fields (e.g., opening_hours, pricing_tier)
		- Stale `last_updated` > threshold (e.g., 7 days for events, 30 for attractions)
		- License flag requires refreshed attribution.

		Rate control: token bucket per provider; circuit breaker on consecutive failures.

		## 6. Context Assembly Templates

		Context blocks:

		1. User preferences summary (derived vector tags → natural language bullet list)
		2. Trip scaffold (dates, companions, known constraints)
		3. Petal snippets (top N, grouped by thematic cluster)
		4. Preference summary (favorite tags, companions, travel modes)
		5. Safety / license directives (DO / DO NOT usage rules)

		Size Budget:

		- Target < 6k tokens pre-generation (reserve headroom for model completion).

		## 7. Prompt Strategy & Safety Filters

		Prompt sections:

		- System: role + compliance constraints
		- Context: assembled blocks
		- Instruction: requested output format (JSON itinerary or bullet recommendations)

		Safety:

		- Regex + simple policy filter post-generation for disallowed content.
		- Enforce mandatory attribution fields before returning.

		## 8. Response Post-Processing & Attribution

		Steps:

		1. Parse JSON candidate (retry with repair prompt if invalid)
		2. Attach source & license metadata per petal
		3. Insert disclaimers for AI-generated components
		4. Compute quality score (coverage, diversity, personalization alignment)

		## 9. Metrics & Observability

		| Metric | Target (MVP) | Notes |
		|--------|--------------|-------|
		| P95 end-to-end latency | < 1200 ms | Assuming warm cache path ~500–700 ms |
		| Cache hit ratio (retrieval) | > 55% | Drives cost efficiency |
		| Generation token cost / req | < $0.25 | Track by intent type |
		| Invalid JSON rate | < 3% | Above triggers prompt revision |
		| Enrichment call success | > 98% | After retries |
		| Diversification applied rate | 10–25% | Healthy exploratory injection |

		Traces: correlate `intent_id` across classification → retrieval → generation.

		## 10. Future Optimizations

		- Learned re-ranking model using interaction feedback
		- Multi-vector field indexing (separate embeddings per facet)
		- Adaptive cache TTL based on volatility score
		- Structured function calling for itinerary JSON validation
		- Distillation of large model outputs into cheaper re-ranker
		- Preference embedding refresh job (daily) feeding semantic rerank layer

		---

		Last updated: September 2025
		C_PROV[(Redis: provider:place:{src}:{id})]
