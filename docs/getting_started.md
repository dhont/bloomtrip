# Getting Started

This guide orients new contributors and sets up a local docs preview.

## 1. Prerequisites

- Python 3.11+ (for MkDocs Material build)
- Node (future frontend services – optional now)
- Git

## 2. Clone & Install Docs Dependencies

Create a virtual environment and install mkdocs-material when ready:

```powershell
python -m venv .venv
./.venv/Scripts/Activate.ps1
pip install mkdocs-material
```

## 3. Serve Documentation Locally

```powershell
mkdocs serve
```

Navigate to <http://127.0.0.1:8000>

## 4. Directory Layout (Current Focus)

| Path | Purpose |
|------|---------|
| `docs/architecture/` | System & cloud architecture docs |
| `docs/specs/` | Domain & API specifications |
| `docs/operations/` | Monitoring / deployment playbooks |
| `schemas/` | JSON Schema contracts |
| `services/` | (Future) Service implementation folders |

## 5. Validating Schemas (Planned)

Add a Python script or Node task to validate JSON instances against `schemas/*.json` (tooling TBD).

## 6. Contributing Flow (Draft)

1. Branch from `main` (`feat/`, `fix/` prefix)
2. Update or add docs alongside code changes
3. Open PR; include rationale & any trade-offs
4. After merge, Read the Docs auto-build (future CI)

## 7. Next Additions

- Define lint tooling for schemas & markdown
- Add retrieval + cache POC service modules
- Introduce test harness (pytest or similar)

---

Last updated: September 2025
