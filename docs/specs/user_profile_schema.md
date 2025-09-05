# User Profile Schema

Personalization anchor capturing stable preferences, dynamic signals, and feedback loops to influence retrieval, ranking, and generation.

---

## 1. Core Identity

| Field | Type | Description |
|-------|------|-------------|
| user_id | string (GUID) | Unique identifier |
| name | string | Display name |
| email | string | Login / notifications |
| language | string | Preferred UI language (BCP 47) |
| location | string | Home base / default region |
| created_at | datetime | Account creation |
| last_active | datetime | For engagement & churn signals |

## 2. Saved Content

| Field | Type | Description |
|-------|------|-------------|
| saved_petals | string[] | Bookmarked petals |
| saved_trips | string[] | Stored trip IDs |
| favorite_tags | string[] | Preference weighting |
| recent_searches | string[] | Last N queries (rotating) |
| discovered_petals | string[] | Found during trips |
| missed_petals | string[] | Planned but skipped |

## 3. Preferences

| Field | Type | Description |
|-------|------|-------------|
| travel_modes | string[] | campervan, bike, car, walk |
| companions | string[] | kids, partner, dog, solo |
| seasonality_pref | string[] | Preferred seasons |
| accessibility_needs | string[] | e.g. wheelchair-friendly |
| notification_opt_in | boolean | Messaging enable |

## 4. Feedback & Ratings

| Field | Type | Description |
|-------|------|-------------|
| petal_feedback | object[] | { petal_id, rating(1..5), comment } |
| trip_feedback | object[] | { trip_id, rating(1..5), comment } |
| suggested_petals | object[] | { name, geo?, tags?, note } user ideas |

## 5. Personalization Signals

| Signal | Source | Usage |
|--------|--------|-------|
| favorite_tags | explicit saves | Boost matching petals |
| discovered_petals | trip logs | Expand exploration diversity |
| missed_petals | trip logs | Make-up trip prompts |
| petal_feedback.rating | feedback form | Ranking training label |
| seasonality_pref | profile | Seasonal biasing |

## 6. Embeddings & Privacy

- Optional `preference_embedding` built from interaction vectors
- Store only hashed or truncated recent searches beyond N=20 if privacy requirement emerges
- PII minimization: separate secure store if regulatory scope expands

## 7. Caching Keys

| Purpose | Pattern | TTL |
|---------|---------|-----|
| Profile core | profile:{user_id}:v1 | 5m |
| Preference vector | profile:vec:{user_id}:v1 | 30m |

## 8. RAG Use Cases

- Inject top preference tags + companions into prompt context summary
- Use missed/discovered petals to bias retrieval diversification
- Use feedback sentiment to prune low-quality petals over time

## 9. Future Considerations

- Federated learning for personalization without exporting raw events
- Time-decay weighting of favorites
- Multi-tenant privacy partitioning

---
See also: `petal_schema.md`, `trip_schema.md`, `../rag_pipeline.md`
