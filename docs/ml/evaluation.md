# Evaluation & Guardrails

Key Metrics (draft):

| Metric | Definition | Target |
|--------|------------|--------|
| HitRate@6 | Relevant ideas in top 6 / total relevant | >0.65 early |
| Diversity Score | Unique primary tags / 6 | ≥4 |
| Personalization Lift | HitRate(user) - HitRate(global) | +10% |
| JSON Validity Rate | Valid structured responses | >97% |
| Hallucination Rate | Uncited claim count / ideas | <1% |

Test Harness Layers (planned): unit prompt tests, synthetic feedback simulation, red-team adversarial prompts.
