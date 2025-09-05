# Deployment

Deployment guidance will evolve with the codebase. Current draft assumptions.

## 1. Environments

| Env | Purpose | Notes |
|-----|---------|-------|
| dev | Rapid iteration / feature spikes | May use lighter SKUs |
| staging | Pre-prod validation, load tests | Mirrors prod config flags |
| prod | Live traffic | Observability SLO enforced |

## 2. Infrastructure as Code

Prefer Bicep modules (or Terraform if multi-cloud required). Core stacks: network/base, data (SQL, Storage, Search, Redis), app (Functions/App Service), ml (AML workspace + endpoint).

## 3. Secrets & Key Vault

All API keys, connection strings stored in Azure Key Vault; access via managed identity. Local dev uses `.env.local` (excluded from VCS).

## 4. CI/CD (Planned Flow)

| Step | Action |
|------|--------|
| Lint | Markdown + schema validation |
| Test | Unit / integration suites |
| Build | Containerize services (if present) |
| Deploy staging | Bicep deploy & AML model update |
| Smoke tests | Basic health + endpoint contract checks |
| Promote prod | Manual approval gate |

## 5. Rollback Strategy

- Keep previous container images & AML model versions tagged.
- Fast revert: switch active AML deployment version + redeploy previous infra template if drift.

## 6. Release Strategy

Start with blue/green (staging acts as blue); graduate to canary (percentage routing via Front Door / APIM) when traffic justifies.

---

Last updated: September 2025
