# First Query

Example prototype call (subject to change pre-stable):

Request:

```http
POST /api/v1/ideas HTTP/1.1
Content-Type: application/json

{
  "query": "Weekend art + coffee in Lisbon",
  "profile_id": "demo-user",
  "constraints": {"days": 2}
}
```

Truncated sample response:

```json
{
  "ideas": [
    {
      "title": "Lisbon Art & Roastery Loop",
      "why_now": "Mild spring weather and gallery openings",
      "petals": ["ptl_123", "ptl_456"],
      "sources": [
        {"name": "gallery site", "url": "https://example.com"}
      ]
    }
  ],
  "attribution": {"petal_count": 12}
}
```

Notes:

- Field names may version before public release.
- Stable contract announced in API section when ready.
