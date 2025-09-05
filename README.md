# BloomTrip

[![Documentation Status](https://readthedocs.org/projects/bloomtrip/badge/?version=latest)](https://bloomtrip.readthedocs.io/en/latest/?badge=latest)

**BloomTrip** is a travel recommendation platform (weekend / short trip focus) that blends **Retrieval‑Augmented Generation (RAG)**, multi‑source enrichment, and incremental personalization to create grounded trip ideas.

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

- **Azure Cognitive Search** — Hybrid retrieval (BM25 + vector) with filters  
- **Azure OpenAI** — Embeddings + grounded trip card generation  
- **Azure SQL Database** — Source of truth for profiles, events, feedback (Cosmos DB optional future)  
- **Blob Storage** — Raw payloads, transcripts, generated artifacts  
- **Azure Functions / Logic Apps** — Data ingestion and enrichment pipelines  
- **(Optional Future) Azure Cache for Redis** — Low‑latency cache layer once traffic justifies  

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

```

## Quick Start

> **Note:** This is an early‑stage open‑source project. Contributions are welcome!

1. **Clone the repo**

   ```bash
   git clone https://github.com/dhont/bloomtrip.git
   cd bloomtrip
   ```

2. *(Coming soon)* Setup instructions for local dev will live in `docs/getting_started.md`.

## Contributing

We welcome contributions of all kinds — code, docs, ideas, and bug reports.

Read CONTRIBUTING.md for guidelines

Check roadmap.md for planned features

Use GitHub Issues for bugs and feature requests

## License

MIT

## Community

Discussions: Use the GitHub Discussions tab for Q&A and brainstorming

Issues: Tag with good first issue for newcomers

Roadmap: Publicly visible in /docs/roadmap.md

BloomTrip — Plan smarter. Travel better.
