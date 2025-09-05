# Petal Schema (Canonical)

Canonical location for the Petal entity specification. This file supersedes `../specs/petal_schema.md`.

> A Petal is the atomic, enriched, retrieval-optimized content unit powering discovery, itinerary generation, refinement and personalization.

---
## 1. Core Fields
| Field | Type | Description | Index Use | Notes |
|-------|------|-------------|-----------|-------|
| id | string (GUID) | Stable unique identifier | key | Generated server-side |
| name | string | Human-friendly title | searchable | Min length 3 |
| description | string | Canonical descriptive text (curated or AI assisted) | searchable | Sanitized & citation enriched |
| location | geo-point | Latitude/longitude | filter (geo) | Used for radius & clustering |
| region | string | Region / admin area slug | filter, facetable | Lowercased normalized |
| tags | string[] | Descriptive facets (activity types, themes) | searchable, filter, facetable | Capped (<=25) |
| seasonality | string[] | Active seasons or months | filter | Values: months ("jan") or seasons |
| duration | string | Human readable (e.g. "1h 30m") | none | Also parse to minutes int internally |
| difficulty | string | Trail/effort rating | filter | Enum: easy|moderate|hard (extensible) |
| accessibility | string[] | Accessibility/support flags | filter | e.g. wheelchair-friendly, pet-friendly |
| media | object[] | { url, type, alt, source, license } | none | Alt text required |
| source | string | Origin provider | filter | E.g. tripadvisor, google_places, user |
| source_id | string | External reference ID | filter | For rehydration / refresh |
| license_flags | string[] | Usage constraints | filter | E.g. no-cache, attribution-required |
| rating | float | Avg user rating (1–5) | sortable | 1 decimal precision |
| review_count | int | Count of ratings/reviews | sortable | Non-negative |
| status | string | visited|missed|newly-discovered | filter | User-specific overlays stored separately if personalized |
| last_updated | datetime | Freshness & invalidation | sortable | ISO 8601 UTC |

## 2. Optional / Enrichment Fields
| Field | Type | Description | Index Use | Notes |
|-------|------|-------------|-----------|-------|
| embedding | vector(float[]) | OpenAI embedding | vector | Dimension depends on model |
| sentiment_score | float | Sentiment (-1..1) | sortable | Nullable |
| summary | string | AI short blurb for cards | searchable | < 280 chars |
| user_notes | string[] | (Scoped) user-specific notes | none | Not indexed globally |
| popularity_score | float | Derived ranking score | sortable | Composite metric |
| related_petals | string[] | Similar/complementary IDs | none | Drives suggestion rails |

## 3. Indexing Configuration (Azure AI Search)
| Category | Fields |
|----------|--------|
| Searchable | name, description, summary, tags |
| Filterable | region, tags, seasonality, difficulty, accessibility, source, license_flags, status, rating, review_count, last_updated |
| Sortable | rating, review_count, popularity_score, last_updated, sentiment_score |
| Facetable | region, tags, seasonality, difficulty, accessibility, source |
| Vector | embedding |
| Key | id |
| Suggester | name, tags |

Vector: HNSW (m=16, efConstruction=400, efSearch tuned 40–80). Hybrid queries combine BM25 + vector + optional semantic rank.

## 4. Validation & Constraints
- Max tag count (<=25) & length (<=40 chars/tag)
- Strip HTML; allow safe markdown subset
- `rating` in [1.0,5.0]; `review_count` monotonic
- Arrays deduplicated
- Geo: WGS84 lat (-90..90), lon (-180..180)

## 5. Lifecycle & Invalidation
Triggers:
- Source delta (ETag/hash)
- License flag change
- Season boundary
- Freshness window (>30d general, >7d events)

## 6. Caching Keys
| Purpose | Pattern | TTL |
|---------|---------|-----|
| Provider object | provider:place:{source}:{source_id} | 2h |
| Normalized petal | petal:{id}:v1 | 6h |
| Popular region list | popular:petals:{region} | 30m |

## 7. RAG Usage
- Retrieval slices: name, summary/ truncated description, tags, seasonality, rating, region, distance bucket
- Always include `source`, `source_id` for citation
- Use `related_petals` for diversification injection

## 8. Open Questions / Future
- Multi-locale content variants
- Multi-vector per facet
- Versioning / immutable history table

---
See also: `trip_schema.md`, `user_profile_schema.md`, `../architecture_new/data_flow_rag.md`

Last updated: September 2025
