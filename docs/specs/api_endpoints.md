# API Endpoints (Legacy – Deprecated)

> NOTE: This legacy file will be removed after migration. Canonical version: `../api/endpoints_draft.md`.

Base path likely: `/api/v1`

## Proposed Routes

### Health & Meta
GET /health
GET /version

### Petals
POST /petals
GET /petals/{id}
GET /petals?type=&tag=&limit=&cursor=
PUT /petals/{id}
DELETE /petals/{id}

### Trips
POST /trips (generate or create manual)
GET /trips/{id}
GET /trips?user_id=&limit=&cursor=
PUT /trips/{id}
DELETE /trips/{id}

### User Profiles
POST /users
GET /users/{id}
PATCH /users/{id}

### Retrieval / RAG
POST /retrieval/query
POST /rag/generate
POST /rag/explain

### Enrichment
POST /enrichment/embeddings/batch
POST /enrichment/classify

## Auth
- Likely token-based (JWT or OAuth2). TBD.

## Versioning Strategy
- URL versioning + `X-API-Version` header for experimentation.
