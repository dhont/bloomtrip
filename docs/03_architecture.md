# Architecture

## 1. Overview

The Weekend Trip Recommender is built on **Microsoft Azure** using **.NET Aspire** for orchestration, observability, and service composition.

Design priorities:

- **Cost-effectiveness** (~$150/month target)
- **Scalability** (start small, grow gradually)
- **Maintainability** (clear separation of concerns)
- **Personalization** (RAG + ML ranking)

---

## 2. High-Level Diagram (Textual Draft)

User Browser → Azure Static Web Apps (React UI) → Azure API Management (optional) → .NET Aspire Backend (App Service / Container Apps)

Side / Downstream:

- Azure Functions (Ingestion Jobs)
- Azure Blob Storage (raw data)
- Azure Cognitive Search (vector + semantic index)
- Azure OpenAI (embeddings + RAG generation)
- Azure SQL Database (profiles, events, feedback)
- Azure Machine Learning Endpoint (ranking model)
- Azure Maps (distance, travel time)

> A rendered diagram (Mermaid) can replace this section later:
>
> ```mermaid
> flowchart LR
>   A[Browser / React UI] --> B[SWA Frontend]
>   B --> C[API Management]
>   C --> D[.NET Aspire API]
>   D -->|Query| S[Azure Cognitive Search]
>   D -->|Generate| O[Azure OpenAI]
>   D -->|Rank| M[Azure ML Endpoint]
>   D -->|Profile / Feedback| Q[(Azure SQL)]
>   D -->|Distance / Time| MAPS[Azure Maps]
>   subgraph Ingestion
>     F[Azure Functions] --> BL[Blob Storage]
>     F --> S
>     F --> Q
>   end
>   O --> S
>   BL --> S
> ```

---

## 3. Components

### 3.1 Frontend

#### Azure Static Web Apps

- Hosts React UI
- Built-in global CDN + auth options
- Cost-efficient at low traffic

Features:

- Profile setup wizard
- Trip suggestion feed
- Feedback buttons (save, boost, mute, skip)
- "Prompt-to-adjust" modal

### 3.2 Backend (.NET Aspire)

#### .NET Aspire Orchestrator

- Coordinates API, ingestion triggers, ML calls
- Provides unified logging, metrics, health endpoints

#### Azure App Service or Azure Container Apps

- Hosts ASP.NET Core API
- Endpoints:
  - Profile CRUD
  - Query orchestration (retrieval → ranking → RAG)
  - Feedback processing
  - Adjustment / regeneration

### 3.3 Data Ingestion Layer

#### Azure Functions (Consumption)

- Scheduled jobs: Weather, Events, Holidays, Reddit, YouTube
- Writes raw JSON to Blob Storage

#### Logic Apps

- Low-code connectors (RSS feeds, calendar sync)

#### Azure Data Factory (Bulk / Batch)

- Future: larger partner or open data dumps (tourism boards, open GTFS, seasonal festival feeds)
- Handles schema drift detection + mapping for high-volume imports

#### Event Grid (Real-Time Partner or System Events)

- Subscription to partner push events (e.g., festival program updates, petal status changes)
- Triggers light-weight Functions to patch normalized records + invalidate caches

### 3.4 Storage

| Service | Role |
|---------|------|
| Azure Blob Storage | Raw/unstructured data (articles, transcripts) |
| Azure SQL Database (Basic) | MVP authoritative store (profiles, trips, feedback) |
| Azure Cosmos DB (Future) | Horizontal scale + multi-region latency optimizations for Petals / high-write signals |
| Azure AI Search (Basic) | Hybrid BM25 + vector + filters for Petals |
| Azure Cache for Redis (Planned) | Retrieval set cache, semantic response cache, provider raw cache |

### 3.5 AI & ML

| Component | Purpose |
|-----------|---------|
| Azure OpenAI | Embeddings + RAG generation (trip cards) |
| Azure ML Endpoint | Ranking model (LightFM/GBM) serving |
| Azure Maps | Distance, travel time, potential isochrones |
| Azure Cognitive Services (Vision / Language) | Image tagging, OCR, sentiment, summarization, translation |

### 3.6 Observability & Cost Control

| Tool | Use |
|------|-----|
| Azure Monitor + App Insights | Latency, dependency, error tracking |
| Cost Management + Budgets | Budget thresholds (70%, 90%) |
| .NET Aspire Dashboard | Unified service map & logs |
| Freshness Dashboard (Planned) | Monitors last_updated vs SLA per source & license flags |
| TOS Compliance Layer | Enforces license_flags (cacheable, attribution-required, retention) |

---

## 4. Data Flow (MVP vs Extended)

1. **Ingestion (MVP)**: Functions fetch → Blob (raw) → enrich (tags, geodata) → embed (OpenAI) → index (AI Search).
  **Extended**: Data Factory batch loads & Event Grid pushes feed incremental deltas into enrichment pipeline.
2. **Query**: UI request → API → intent classification + profile context → Redis (semantic retrieval set check) → hybrid retrieve (BM25 + vector + filters) → optional enrichment (stale/missing) → rank (heuristic / ML) → top‑k to OpenAI.
3. **Feedback**: User actions → SQL (MVP) / Cosmos (future) → freshness & popularity score updates → nightly ranker retrain (Azure ML) → redeploy model endpoint.
4. **Adjust**: User refinement prompt + original context → delta retrieval scope (segment/day) → constrained generation → attribution & compliance pass.

### 4.1 RAG + Caching Subsystem (Detailed Overview)

| Step | Description | Cache Layer | Notes |
|------|-------------|-------------|-------|
| Intent Normalization | Hash canonical intent (filters + geo cluster + profile class) | n/a | Feed into key template |
| Retrieval Set Check | Key: `retrieval:intent:{hash}:v1` | Redis (planned) | Stores petal IDs + slim metadata |
| Hybrid Retrieval | AI Search: BM25 + vector + filters (geo, seasonality, accessibility, license_flags) | n/a | Use topK ~40 then slice |
| Conditional Enrichment | External APIs on stale/missing fields | Provider cache | TTL per provider TOS |
| Context Assembly | Build prompt slices (petal snippets + profile prefs) | n/a | Token target < 6k |
| Generation | Azure OpenAI | Semantic response cache | Key: `semantic:trip_seed:{hash}:v1` |
| Post-Process | Attribution, license filtering, novelty tagging | n/a | Enforce license_flags |
| Store Generated | Save structured itinerary / suggestions | Semantic response cache | TTL 6–24h (adaptive) |
| Delivery | JSON payload to client | n/a | Client may persist offline subset |

Cache Invalidation Triggers: source update (Event Grid), user edit, license flag change, season boundary, freshness threshold.

### 4.2 Provider Abstraction
Implement a `PlacesProvider` interface to isolate partner specifics (Tripadvisor, Google Places, Bing) enabling swappable adapters and consistent enrichment + rate limit handling.

---

## 5. Cost-Effectiveness Strategies

- Serverless ingestion to avoid idle compute
- Basic tiers (SQL, Search) until utilization justifies scale up
- Batch embedding jobs (avoid per-item overhead)
- Blob Storage for cheap raw retention
- Local dev training (e.g., GPU laptop) before cloud promotion
 - Defer Redis until cacheable query volume > threshold; use in-memory LRU fallback early
 - SQL first for predictable cost, migrate hot collections (Petals, feedback signals) to Cosmos when write/partition pressure justifies

---

## 6. Deployment Strategy

| Environment | Purpose | Key Notes |
|-------------|---------|-----------|
| Local | Dev iteration | Aspire + local emulators where possible |
| Dev (Azure) | Shared preview | Smaller SKUs, feature validation |
| Prod | Live users | Autoscale policies + budgets |

CI/CD (GitHub Actions): lint → test (future) → build → deploy SWA + API + Functions → optional manual approval to prod.

Infra as Code: Bicep or Terraform modules (network, data, app, ml).

---

## 7. Next Steps

1. Provision resource group + baseline services.
2. Implement first three ingestion jobs (Weather, Events, Holidays).
3. Define Cognitive Search index & embedding field strategy.
4. Implement profile-based retrieval endpoint.
5. Integrate RAG generation + justification prompt template.
6. Deploy MVP to dev Azure environment.
 7. Prototype Redis local cache emulation & key patterns.
 8. Add initial freshness telemetry (age buckets per petal).

---

