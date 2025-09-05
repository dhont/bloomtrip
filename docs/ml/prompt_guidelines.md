# Prompt & RAG Guidelines

Sections:

- System prompt template (role, constraints)
- Context block ordering & token budgeting
- Output format contracts (idea list, itinerary JSON)
- Repair loop (JSON validation + retry w/ diff prompt)
- Safety filters (regex / policy pass)

Constraints:

- No uncited factual claims
- All sources must list `name` + `url`
- Max 12 ideas per initial response

Repair Loop (outline):

1. Validate JSON schema
2. If invalid → extract error summary
3. Retry with appended guidance (1 attempt)
