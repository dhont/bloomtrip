# Trip Schema

Container for itinerary structure, collaborative edits, personalization context, and generation lineage.

---

## 1. Core Fields

| Field | Type | Description | Index Use | Notes |
|-------|------|-------------|-----------|-------|
| trip_id | string (GUID) | Unique identifier | key | Distinct from internal DB PK if needed |
| title | string | Trip title | searchable |  |
| description | string | Optional overview/theme | searchable |  |
| start_date | date | Start date | filter, sortable |  |
| end_date | date | End date | filter, sortable | Must be >= start_date |
| location_center | geo-point | Center for retrieval radius | filter (geo) |  |
| created_by | string | Owner user id | filter |  |
| collaborators | string[] | Additional editors | none | Access control layer |
| status | string | draft\|in-progress\|finalized\|completed | filter |  |
| visibility | string | private\|shared\|public | filter |  |
| last_updated | datetime | Sync & cache invalidation | sortable |  |

## 2. Itinerary Structure

| Field | Type | Description |
|-------|------|-------------|
| days | Day[] | Ordered days |

### Day

| Field | Type | Description |
|-------|------|-------------|
| date | date | Calendar date |
| activities | Activity[] | Ordered / slotted items |

### Activity

| Field | Type | Description |
|-------|------|-------------|
| petal_id | string | Reference to petal |
| time_slot | string | morning\|midday\|afternoon\|evening\|flex |
| start_time? | string | Optional ISO local time |
| end_time? | string | Optional |
| notes | string | User notes or AI suggestion rationale |
| status | string | planned\|completed\|skipped |

## 3. Preferences Snapshot

| Field | Type | Description |
|-------|------|-------------|
| travel_mode | string | campervan\|car\|e-bike\|walk\|mixed |
| companions | string[] | e.g. family, kids, dog |
| tags | string[] | Thematic focus |
| seasonality | string | Primary target season |
| weather_forecast? | object | Snapshot at plan time |

## 4. Feedback & Post-Trip Signals

| Field | Type | Description |
|-------|------|-------------|
| feedback | object | { rating:int(1..5), comment:string } overall |
| discovered_petals | string[] | Added spontaneously |
| missed_petals | string[] | Planned but not visited |

## 5. Derived / Analytics

| Field | Type | Description |
|-------|------|-------------|
| popularity_score | float | Engagement weighting |
| regeneration_count | int | Number of AI regenerations |

## 6. RAG Integration

- Provide active day context (previous, current, next) for refinement prompts
- Track activity-level overrides to avoid model re-adding removed petals
- Use `discovered_petals` + `missed_petals` to seed make-up or follow-up trip suggestions

## 7. Caching Keys

| Purpose | Pattern | TTL |
|---------|---------|-----|
| Trip read model | trip:{trip_id}:v1 | 10m |
| Day segment | trip:{trip_id}:day:{n} | 5m |
| Regeneration draft | tripdraft:{trip_id}:{hash} | 30m |

## 8. Versioning & Collaboration

- Write-ahead log of itinerary mutations (append-only) for audit & rollback
- Optimistic concurrency token per trip (`etag`)
- Optional real-time channel (WebSocket/SignalR) broadcasting diff patches

## 9. Open Questions / Future

- Locking model for simultaneous same-day edits?
- Activity conflict detection (overlapping durations)

---
See also: `petal_schema.md`, `user_profile_schema.md`, `../rag_pipeline.md`
