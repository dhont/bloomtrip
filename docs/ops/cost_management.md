# Cost Management

Targets:

| Metric | Target |
|--------|--------|
| Monthly Azure Spend | ≤ $150 |
| Cost / 1k Ideas Requests | < $0.40 |
| Embedding Cost Share | < 25% total |

Controls:

- Budget alerts (70%, 90%)
- Weekly cost anomaly scan
- Cache hit ratio tracking (>55% retrieval)

Scale-In Rules:

- Reduce replicas if p95 latency < target for 7d & utilization <40%
- Lower embedding batch frequency if backlog < threshold
