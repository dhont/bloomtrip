# First Query (Planned)

This guide will show an example intent submission and truncated response once the public API stabilizes.

Planned example:
```json
POST /api/intent
{
  "raw_text": "Weekend art + coffee in Lisbon",
  "profile_id": "demo-user",
  "filters": {"days":2}
}
```
