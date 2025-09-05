# Domain Model

Core entities and relationships (detail fields in schema pages):

| Entity | Relationships | Notes |
|--------|---------------|-------|
| UserProfile | saves Trip, saves Petal, provides feedback | Personalization anchor |
| Trip | has many Days; Days have Activities referencing Petals | Snapshot of preferences at creation |
| Petal | referenced by Activities; related_petals | Atomic recommendation unit |
| Feedback Signal | belongs to UserProfile and (Petal or Trip) | Drives ranking & personalization |

Derived artifacts:

- Retrieval Set: intermediate candidate list
- RAG Context: assembled blocks tied to retrieval hash

Event triggers (planned): save_petal, mute_petal, refine_day, regenerate_trip.
