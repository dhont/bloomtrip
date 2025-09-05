# Monitoring & Logging

This page will define observability standards for the platform.

## 1. Key Metrics (Draft)

| Category | Metric | Purpose |
|----------|--------|---------|
| Performance | p95_recommendation_latency_ms | User experience & SLO tracking |
| Retrieval | cache_hit_ratio | Cost + latency optimization |
| Model | tokens_per_request | Cost forecasting |
| Errors | generation_error_rate | Quality & stability |
| Infra | function_cold_starts | Tuning warm strategy |

## 2. Dashboards

- Azure Monitor workbook: latency, error rates, cost overlay.
- App Insights dashboards: dependency durations (Search, OpenAI, Redis).

## 3. Log Schema / Correlation

Structured log fields: `timestamp`, `level`, `intent_id`, `request_id`, `profile_id_hash`, `stage`, `latency_ms`, `result_count`.

## 4. Alert Rules (Initial)

| Alert | Condition | Action |
|-------|-----------|--------|
| High latency | p95_recommendation_latency_ms > 1500 for 5m | Page / Slack channel |
| Low cache hit | cache_hit_ratio < 40% for 30m | Investigate retrieval filter drift |
| Elevated errors | generation_error_rate > 5% | Trigger rollback / inspect prompts |

## 5. Tracing Strategy

Adopt OpenTelemetry SDK; propagate `traceparent` headers across API → retrieval → generation.

---

Last updated: September 2025
