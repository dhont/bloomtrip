# Personalization & Ranking

Goal: adapt retrieval & generation per user segment without leaking private context.

Mechanics (initial heuristic):

1. Build tag weight map: favorites (+2), saved (+1.2), recent positive feedback (+1)
2. Compute personalization_boost = Σ(tag_weight * presence) / normalization
3. Novelty bonus if petal not seen in last N results
4. Diversity injection: if cluster tightness > threshold, swap in high-distance petal

Signals (collected): saves, mutes, skips, dwell (planned), adjust prompts.

Cold Start: similarity to nearest neighbor cluster (geography + top tags) + generic diversity set.

Privacy: pseudonymous user IDs; purge interaction events >90d (aggregate features retained).

Open Questions:

- Feedback granularity (multi-point rating vs binary save/mute)
- Time decay half-life for tag weights
