# Observability

Goals: shorten MTTR, enable capacity planning, ensure model quality visibility.

## Pillars
- Metrics: latency (p50/p95), token usage, cache hit rate, embedding queue depth.
- Logs: structured JSON; correlation IDs per request.
- Traces: distributed tracing for retrieval + generation span timings.

## Tooling (Candidates)
| Aspect | Option A | Option B |
|--------|----------|----------|
| Metrics | Azure Monitor | Prometheus (later) |
| Tracing | OpenTelemetry → App Insights | Tempo / Jaeger |
| Logs | App Insights | ELK |

## SLO Drafts

| SLO | Target | Window | Breach Condition |
|-----|--------|--------|------------------|
| API p95 latency (/ideas) | < 1200 ms | 30d | >5 days breach |
| Retrieval cache hit ratio | > 55% | 30d | <50% 3 days |
| JSON validity rate | > 97% | 30d | <95% 2 days |

## Next Steps

1. Define metric naming conventions.
2. Add trace instrumentation to retrieval pipeline.
3. Implement synthetic canary query.
