# Deployment Topology (Canonical)

Overview of environments, network boundaries, and Azure service mapping for the MVP and near-term scale.

## Environments

| Env | Purpose | Differences |
|-----|---------|------------|
| dev | Fast iteration, feature branches | Lower SKU, no cost-critical alerts |
| staging | Pre-release validation | Same infra templates as prod, reduced scale |
| prod | Customer traffic | Autoscale + budget alerts + stricter policies |

## Azure Service Map (MVP)

| Layer | Service | Notes |
|-------|---------|-------|
| API / Backend | App Service (Linux B1) | Consolidated API + minimal SSR |
| Frontend | Static Web Apps | CDN edge + auth integration option |
| Ingestion | Functions (Consumption) | Timer & HTTP triggers |
| Storage (Raw) | Blob Storage | Versioned raw payloads (immutable) |
| Relational Data | Azure SQL (Basic) | Trips, profiles, normalized petals |
| Search / Vector | Cognitive Search (Basic) | Hybrid queries (BM25 + vector) |
| ML Inference | Azure ML Managed Endpoint or ACI | Embeddings + ranking prototype |
| Secrets / Identity | Entra ID + Key Vault (future) | Start with managed identities only |
| Observability | App Insights / Log Analytics | Centralized logs + metrics + traces |

## Network & Security (Early)

- Public endpoints acceptable MVP; plan private endpoints + VNet integration pre GA.
- Managed Identity for intra-service auth (no stored secrets).
- CORS restricted to primary domain + localhost dev.

## Scaling Path

| Pressure Signal | Action |
|-----------------|--------|
| Search query latency p95 > target | Raise Cognitive Search replica count |
| Embedding queue backlog > threshold | Add worker (Functions concurrency) |
| Model cost / req rising | Introduce smaller re-ranker + distillation |
| Cache miss ratio > planned | Add Redis tier (Basic) + semantic response cache |
| SQL DTU saturation | Move to S0 / evaluate Postgres flex for geospatial |

## IaC Notes

- Use Bicep modules per layer (api, ingestion, data, ml, monitoring).
- Parameterize SKU & region; enforce cost ceiling via policy.

Last updated: September 2025
