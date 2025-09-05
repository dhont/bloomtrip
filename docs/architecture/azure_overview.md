# High-Level Azure Architecture (Legacy – Deprecated)

> Deprecated: Deployment & service mapping now maintained in `architecture_new/deployment_topology.md`. This file will be pruned after migration grace period.

This document expands the platform view into Azure-specific layers, cost posture, and rationale for service selection.

## Layered View

We group components into four layers to simplify reasoning about responsibilities and scaling decisions.

### A. Data Ingestion & Storage

| Service | Role |
|---------|------|
| **Azure Functions** | Serverless scheduled & event-driven ingestion (weather, events, Reddit, YouTube, holidays). |
| **Azure Logic Apps** | Low-code integration for RSS feeds, calendars, select social APIs. |
| **Azure Blob Storage** | Raw JSON, CSV, transcripts, media dumps. Immutable audit trail. |
| **Azure SQL Database** | Structured trip / event / geospatial reference data (can evolve to Flexible Server or Postgres if needed). |
| **Azure Cognitive Search** | Indexed content & metadata for keyword + tag search and hybrid retrieval companion to vector/RAG path. |

### B. Data Processing & Enrichment

| Service | Role |
|---------|------|
| **Azure Databricks / Azure ML Pipelines** | ETL, feature engineering, batch NLP. Start with ML pipelines; add Databricks if Spark scale required. |
| **Azure Cognitive Services – Text Analytics** | Sentiment, key phrase / entity extraction for Reddit posts, YouTube transcripts, articles. |
| **Azure Maps** | Travel time, distance matrices, route info feeding itinerary scoring. |

### C. ML Model Hosting

| Service | Usage Guidance |
|---------|----------------|
| **Azure ML Endpoints** | Default for managed deployment (versioning, autoscaling, auth). |
| **Azure Container Instances (ACI)** | Lightweight, bursty, low-cost MVP serving (single model, modest QPS). |
| **Azure Kubernetes Service (AKS)** | Only when multi-model, GPU pooling, or traffic > ACI/AML autoscale comfort. |

### D. Frontend & API Layer

| Service | Role |
|---------|------|
| **Azure App Service** | Hosts backend API (FastAPI / ASP.NET Core) + optionally SSR frontend. |
| **Azure Static Web Apps** | Cheaper static React + Functions combo (edge distribution, built-in auth providers). |
| **Azure API Management** | Central gateway: rate limiting, subscription keys, future partner exposure of recommendation API. |

## 2. ML / RAG Workflow (Current Target)

1. Ingestion (Functions / Logic Apps) persist raw payloads to Blob + normalized entities to SQL.
2. Cleaning & enrichment via AML pipeline (or Databricks as scale grows).
3. Feature engineering: join weather, events, holidays, social sentiment → feature vectors (store intermediate parquet in Blob / ADLS).
4. Model training: start with LightFM / classic recommenders (implicit feedback) or scikit-learn baselines; progress to fine-tuned transformer classifiers for category & intent.
5. Deployment: AML Managed Endpoint (promotion dev → prod) or ACI for MVP.
6. Recommendation / RAG API: orchestrates retrieval (Cognitive Search + future vector store), feature scoring, personalization.
7. Feedback loop: user interactions logged (click/save/skip) → aggregation job updates implicit feedback matrices.

## 3. Indicative Budget (~$130–140 / month MVP)

| Service | Purpose | Est. Monthly |
|---------|---------|--------------|
| Azure Functions | Ingestion jobs (consumption) | $5–10 |
| Azure SQL (Basic) | Structured reference data | ~$5 |
| Blob Storage | Raw/unstructured payloads | $2–5 |
| Cognitive Search (Basic) | Search index | ~$40 |
| Azure ML (Dev/Test) | Training + hosted endpoint | ~$50 |
| App Service (Basic) | Backend + simple frontend | ~$15 |
| Azure Maps | Routing / distance APIs | $5–10 |
| **Total** |  | **~$130–140** |

> Costs are directional; apply Azure pricing calculator with region & projected transaction volumes before committing.

### Cost Optimization Notes

- Keep Functions on consumption until sustained >70% of a basic plan.
- Defer Databricks spin-up until Spark or Delta features are justified.
- Consolidate model hosting (batch small models into one container) early on.
- Gate enrichment calls with cache-first strategy to reduce Maps & Text Analytics spend.

## 4. Why Azure Aligns

| Need | Azure Advantage |
|------|-----------------|
| Integrated AI + classic ML | Combine OpenAI + Cognitive Services + custom AML models under unified IAM. |
| Low-friction ingestion | Functions + Logic Apps reduce glue code and idle cost. |
| Gradual scale path | ACI → AML Managed Endpoint → AKS as traffic & models grow. |
| Security & Identity | Azure AD B2C / Entra ID readiness for future user auth & RBAC. |
| Observability | App Insights, Log Analytics, Monitor unify metrics & tracing. |

## 5. Next Decisions / Open Questions

| Topic | Decision Needed | Options / Notes |
|-------|-----------------|-----------------|
| Vector Store | When to add & which | Start with Cognitive Search vector; revisit for Pinecone / RedisEF if advanced filtering/perf needs. |
| Personalization Baseline | LightFM vs MF vs embedding similarity | Prototype offline AUC + hit-rate; choose lowest complexity meeting KPI. |
| Geospatial | SQL vs Postgres w/ PostGIS | If advanced spatial queries (isochrones, complex polygons) escalate to Postgres. |
| Batch Orchestration | AML vs Data Factory vs Databricks Jobs | AML pipelines first; add ADF if cross-service dependency graphs grow. |
| Caching Strategy | Redis tier & eviction policy | Start Basic tier, track hit ratio & memory fragmentation. |

## 6. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Over-provisioned services | Wasted budget | Start smallest SKU; add autoscale thresholds early. |
| Vendor feature lock-in | Migration friction | Use abstractions for search & model inference layers. |
| Data quality drift | Recommendation decay | Scheduled validation & feature distribution monitoring. |
| Latency spikes (cold Functions) | User-perceived slowness | Warm-up timer triggers; combine hot paths in App Service. |
| Unbounded enrichment calls | Cost blow-up | Rate limit + caching + quota dashboards. |

## 7. Initial KPIs (Draft)

| KPI | Target (MVP) |
|-----|--------------|
| P95 API Latency (Recommendation) | < 1200 ms |
| Cache Hit Ratio (retrieval sets) | > 55% |
| Model Retrain Cadence | Weekly (or data delta >10%) |
| Index Freshness Lag | < 10 min for critical ingest |
| Cost / 1k Recommendation Calls | < $0.40 |

---

Last updated: September 2025
