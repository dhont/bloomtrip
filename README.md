# BloomTrip

**BloomTrip** is an open‑source travel planning platform that blends **Retrieval‑Augmented Generation (RAG)**, multi‑source enrichment, and intelligent caching to create personalized itineraries from both open and partner data sources.

It’s designed to help travellers discover, plan, and navigate trips — starting from any spark of inspiration: a seasonal promo, a saved place, or an AI‑powered recommendation.

---

## Features

- **Multi‑source enrichment** — Combine open data (OSM, Wikivoyage) with partner APIs (Tripadvisor, Google Places, Bing Search)  
- **Azure‑powered RAG** — Hybrid BM25 + vector search with Azure AI Search, grounded generation with Azure OpenAI  
- **Smart caching** — Azure Cache for Redis with semantic keys, TTL rules, and TOS‑compliant invalidation  
- **Flexible trip builder** — Start from a promo, saved petal, or recommendation  
- **On‑Trip mode** — Live navigation, nearby suggestions, and spontaneous discovery  
- **Open data contracts** — JSON schemas for Petal, Trip, and UserProfile

---

## Architecture

BloomTrip’s backend is built on Azure services:

- **Azure AI Search** — Hybrid retrieval (BM25 + vector) with filters  
- **Azure OpenAI** — Embeddings + grounded itinerary generation  
- **Azure Cognitive Services** — Image tagging, translation, summarization, sentiment analysis  
- **Azure Cache for Redis** — Low‑latency caching for retrieval sets and generated answers  
- **Cosmos DB** — Source of truth for Petals, Trips, and User Profiles  
- **Blob Storage** — Raw API payloads, images, generated content  
- **Azure Functions / Logic Apps** — Data ingestion and enrichment pipelines

📄 See [`/docs/architecture/README.md`](docs/architecture/README.md) for the full RAG + Caching + Storage diagram and explanation.

---

## BloomTrip Repository Structure

```text
BloomTrip/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
│
├── /docs/
│   ├── architecture/
│   │   ├── rag_caching_storage_map.png
│   │   └── README.md
│   ├── specs/
│   │   ├── petal_schema.md
│   │   ├── trip_schema.md
│   │   ├── user_profile_schema.md
│   │   └── api_endpoints.md
│   └── roadmap.md
│
├── /schemas/
│   ├── petal.schema.json
│   ├── trip.schema.json
│   └── user_profile.schema.json
│
├── /services/
│   ├── retrieval/
│   ├── cache/
│   ├── enrichment/
│   └── rag/
│
├── /config/
│
└── /tests/

---

## Quick Start

> **Note:** This is an early‑stage open‑source project. Contributions are welcome!

1. **Clone the repo**
   ```bash
   git clone https://github.com/YOUR_USERNAME/BloomTrip.git
   cd BloomTrip
