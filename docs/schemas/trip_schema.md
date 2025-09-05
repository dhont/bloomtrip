# Trip Schema (Canonical)

Canonical location for Trip entity specification. Supersedes `../specs/trip_schema.md`.

---
## 1. Core Fields
| Field | Type | Description | Index Use | Notes |
|-------|------|-------------|-----------|-------|
| trip_id | string (GUID) | Unique identifier | key | Distinct from internal DB PK if needed |
| title | string | Trip title | searchable |  |
| description | string | Optional overview/theme | searchable |  |
| start_date | date | Start date | filter, sortable |  |
| end_date | date | End date | filter, sortable | >= start_date |
| location_center | geo-point | Geo center | filter (geo) |  |
| created_by | string | Owner user id | filter |  |
| collaborators | string[] | Additional editors | none |  |
| status | string | draft|in-progress|finalized|completed | filter |  |
| visibility | string | private|shared|public | filter |  |
| last_updated | datetime | Sync & invalidation | sortable |  |

## 2. Itinerary Structure
| Field | Type | Description |
|-------|------|-------------|
| days | Day[] | Ordered days |

### Day
| Field | Type | Description |
|-------|------|-------------|
| date | date | Calendar date |
| activities | Activity[] | Ordered items |

### Activity
| Field | Type | Description |
|-------|------|-------------|
| petal_id | string | Reference to petal |
| time_slot | string | morning|midday|afternoon|evening|flex |
| start_time? | string | ISO local time |
| end_time? | string | Optional |
| notes | string | Rationale / user notes |
| status | string | planned|completed|skipped |

## 3. Preferences Snapshot
| Field | Type | Description |
|-------|------|-------------|
| travel_mode | string | campervan|car|e-bike|walk|mixed |
| companions | string[] | e.g. family, kids, dog |
| tags | string[] | Thematic focus |
| seasonality | string | Primary target season |
| weather_forecast? | object | Snapshot at plan time |

## 4. Feedback & Post-Trip Signals
| Field | Type | Description |
|-------|------|-------------|
| feedback | object | { rating:int(1..5), comment } overall |
| discovered_petals | string[] | Added spontaneously |
| missed_petals | string[] | Planned but not visited |

## 5. Derived / Analytics
| Field | Type | Description |
|-------|------|-------------|
| popularity_score | float | Engagement weighting |
| regeneration_count | int | AI regenerations |

## 6. RAG Integration
- Provide active day context for refinement
- Track removed activities to avoid re-addition
- Use discovered/missed to seed follow-up suggestions

## 7. Caching Keys
| Purpose | Pattern | TTL |
|---------|---------|-----|
| Trip read model | trip:{trip_id}:v1 | 10m |
| Day segment | trip:{trip_id}:day:{n} | 5m |
| Regeneration draft | tripdraft:{trip_id}:{hash} | 30m |

## 8. Versioning & Collaboration
- Append-only mutation log for audit
- Optimistic concurrency token (`etag`)
- Optional real-time diff channel (WebSocket/SignalR)

## 9. Open Questions / Future
- Same-day edit locking model?
- Activity overlap detection

---
See also: `petal_schema.md`, `user_profile_schema.md`, `../architecture_new/data_flow_rag.md`

Last updated: September 2025
