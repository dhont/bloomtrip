# Compliance & Licensing

This page defines how source licensing, user privacy, and retention shape caching and generation.

## 1. Data Source Inventory

| Source | Type | License / Terms | Cached? | Notes |
|--------|------|-----------------|---------|-------|
| Tripadvisor | POI metadata | API TOS | Partial ( IDs + derived features ) | Raw text not stored long-term. |
| Google Places | POI | API TOS | Minimal | Consider place ID only; enrich on demand. |
| OSM / Wikivoyage | Open data | ODbL / CC BY-SA | Yes (with attribution) | Keep attribution list. |
| Weather API | Forecast | Commercial | Ephemeral | No long-term retention. |
| Events API | Events | Varies | Yes (normalized) | Purge past-dated events. |

## 2. License Flags & Meanings

| Flag | Meaning | Effect |
|------|---------|--------|
| `cache_ok` | Content can be cached with TTL | Enables Redis store |
| `no_cache` | Must not persist body | Only derived embeddings allowed |
| `attrib_required` | Must display source attribution | UI badge + link |
| `restricted_use` | Limited downstream usage | Blocks inclusion in public exports |

## 3. Cache Eligibility Matrix

| Content Type | Short-term Cache | Long-term Store | Notes |
|--------------|------------------|-----------------|-------|
| Petal metadata | Yes | Yes | Normalized & versioned |
| External raw response | No | Optional (temp <24h) | Debug bucket only |
| Generated itinerary | Yes (user) | Yes (if saved) | User-owned asset |
| Generated recommendation set | Yes | No | Recompute if expired |

## 4. Retention & Purge Policy

- Event data: purge 30 days after event end.
- Raw external API payloads: auto-delete after 24h.
- Unused draft trips: purge after 14 days inactivity.
- Logs with user IDs: retain 30 days, then anonymize.

## 5. Attribution Rendering Rules

- Collect all `attrib_required` sources per response.
- De-duplicate; order by prominence (primary POIs first).
- Append license footnote for ODbL / CC BY-SA.

## 6. User Data & Privacy Considerations

- Minimize stored PII (avoid free-text bios in early phase).
- Hash or pseudonymize internal analytics identifiers.
- Provide delete endpoint for profile + generated trips (soft delete → 7 day hard purge).

---

Last updated: September 2025
