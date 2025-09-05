# BloomTrip

[![Documentation Status](https://readthedocs.org/projects/bloomtripbeta/badge/?version=latest)](https://bloomtripbeta.readthedocs.io/en/latest/?badge=latest)

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

Core Azure components:

- **Azure Cognitive Search** – Hybrid BM25 + vector retrieval
- **Azure OpenAI** – Embeddings & grounded text generation
- **Azure SQL Database** – Trips, profiles, normalized petals (relational MVP)
- **Blob Storage** – Raw ingestion payloads & media
- **Azure Functions / Logic Apps** – Ingestion & enrichment triggers
- **(Future) Azure Cache for Redis** – External cache when volume warrants

📄 Canonical architecture docs now live under `docs/architecture_new/`:

- Overview: `docs/architecture_new/overview.md`
- RAG Data Flow: `docs/architecture_new/data_flow_rag.md`
- Deployment Topology: `docs/architecture_new/deployment_topology.md`
- Caching Strategy: `docs/architecture_new/caching_strategy.md`

---

## Repository Structure (Simplified)

```text
BloomTrip/
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
│
├── docs/
│   ├── architecture_new/          # Canonical architecture pages
│   ├── schemas/ (canonical)       # Petal / Trip / User Profile specs
│   ├── api/                       # Draft API docs (unstable)
│   ├── ml/                        # Ranking, evaluation, prompt guidelines
│   ├── ops/                       # Cost, backups, incidents, observability
│   ├── ux/                        # Design system, accessibility
│   ├── governance/                # Changelog, style guide, ADRs
│   ├── quickstart/                # Run locally, first query, alpha access
│   ├── overview/                  # Intro, concepts, personas
│   └── appendix/                  # Glossary, FAQ, attribution, i18n
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

## Quick Start (Early)

```bash
git clone https://github.com/dhont/bloomtrip.git
cd bloomtrip
python -m venv .venv
. .venv/Scripts/activate  # Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Run docs locally (optional):

```bash
pip install -r requirements-docs.txt
mkdocs serve -f docs/mkdocs.yml
```

See `docs/quickstart/run_locally.md` for the fuller workflow (seed data script, env vars) as it evolves.

## Contributing

We welcome contributions (code, docs, ideas, bug reports).

1. Read `CONTRIBUTING.md` for workflow & coding standards.
2. Open a GitHub Issue for proposals (label: enhancement, docs, question).
3. For architecture changes, add an ADR in `docs/governance/adrs/`.
4. Keep PRs focused; update relevant docs alongside code.

Roadmap: `docs/roadmap.md` (high-level milestones).

## License

MIT

## Community

- Discussions: GitHub Discussions tab
- Issues: Tag `good first issue` to help newcomers
- Roadmap: `docs/roadmap.md`

---
BloomTrip — Plan smarter. Travel better.
