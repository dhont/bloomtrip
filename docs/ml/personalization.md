# Personalization & Ranking (Planned)

Goal: adapt retrieval & generation per user segment without leaking private context.

Levers:
- Query rewriting
- Reranking model features (behavioral, recency)
- Dynamic prompt context pruning

Privacy Safeguards:
- Pseudonymous user IDs
- Differential privacy (future analysis) for aggregate signals

Open Questions:
- Cold start strategy?
- Feedback loop format (thumbs vs graded)?
