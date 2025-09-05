# Backup & Recovery

Strategy (draft):

| Asset | Backup Method | Frequency | Retention |
|-------|---------------|----------|-----------|
| SQL DB | Geo-redundant PITR | Continuous | 7d PITR + weekly full 30d |
| Blob Raw | Immutable tier (versioning) | Continuous | 30d versions |
| Config (IaC) | Git main branch | On commit | Indefinite |

Restore Test Cadence: quarterly automated restore to staging + checksum diff.
