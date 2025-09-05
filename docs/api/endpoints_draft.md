# API Endpoints (Draft – Unstable)

Canonical location for evolving API surface. Supersedes `../specs/api_endpoints.md`.

Base path: `/api/v1` (subject to change before stabilization).

## Health & Meta

```
GET /health
GET /version
```

## Petals

```
POST /petals
GET /petals/{id}
GET /petals?type=&tag=&limit=&cursor=
PUT /petals/{id}
DELETE /petals/{id}
```

## Trips

```
POST /trips
GET /trips/{id}
GET /trips?user_id=&limit=&cursor=
PUT /trips/{id}
DELETE /trips/{id}
```

## User Profiles

```
POST /users
GET /users/{id}
PATCH /users/{id}
```

## Retrieval / RAG

```
POST /retrieval/query
POST /rag/generate
POST /rag/explain
```

## Enrichment

```
POST /enrichment/embeddings/batch
POST /enrichment/classify
```

## Auth

Token-based (JWT / OAuth2) – TBD. Will document scopes & flows once prototype stabilizes.

## Versioning

URL versioning + experimental header `X-API-Version` (optional) for early adopters.

Last updated: September 2025
