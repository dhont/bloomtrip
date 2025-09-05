# Ranking Model

Initial heuristic blend:

```text
score = 0.55 * vector + 0.35 * bm25 + 0.10 * recency_decay
```

Planned feature groups (post-heuristic):

- Text relevance (vector, bm25)
- Popularity (review_count, rating, derived popularity_score)
- Personalization (tag_overlap, favorite_tag_boost, novelty_score)
- Context fit (seasonality_match, distance_bucket)
- Diversity controls (cluster_penalty)

Roadmap:

1. Log training data (impressions, interactions)
2. Offline eval: hit-rate@K, diversity score, personalization lift
3. Train baseline (LightGBM / LambdaMART)
4. Shadow compare vs heuristic
5. Promote w/ guardrails (latency, cost)
