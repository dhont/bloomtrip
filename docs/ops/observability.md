# Observability (Planned)

Goals: shorten MTTR, enable capacity planning, ensure model quality visibility.

## Pillars
- Metrics: latency (p50/p95), token usage, cache hit rate, embedding queue depth.
- Logs: structured JSON; correlation IDs per request.
- Traces: distributed tracing for retrieval + generation span timings.

## Tooling (Candidates)
| Aspect | Option A | Option B |
|--------|----------|----------|
| Metrics | Prometheus | Azure Monitor |
| Tracing | OpenTelemetry + Tempo | Jaeger |
| Logs | Vector -> S3 | ELK |

## Next Steps
1. Define metric naming conventions.
2. Add trace instrumentation to retrieval pipeline.
3. Draft SLOs (latency, quality).
