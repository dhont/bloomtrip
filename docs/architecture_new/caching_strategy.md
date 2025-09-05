# Caching Strategy (Planned)

Layers (proposed):

1. Client-side response memoization (short-lived)
2. In-process LRU (queries → doc ids)
3. Vector index (semantic retrieval)
4. Optional Redis for cross-process embedding & generation cache
5. CDN edge (static assets, future)

Metrics: hit ratio per layer; stale serve count; invalidation latency.

Open Questions:

- Cache key normalization for multilingual content?
- Embedding model change invalidation procedure?
