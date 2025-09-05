# Run Locally

Spin up a minimal local environment (API + seed data + search index mock).

## 1. Prerequisites
- Python 3.11+
- Node 20+ (for future frontend)
- Docker Desktop (optional for local search / Postgres substitutes)

## 2. Clone & Setup
```
git clone https://github.com/dhont/bloomtrip
cd bloomtrip
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt  # (placeholder file to be added)
```

## 3. Environment
Create `.env` (values may be dummy during MVP):
```
OPENAI_API_KEY=sk-test
AZURE_SEARCH_ENDPOINT=http://localhost:7700  # mock or future emulator
AZURE_SEARCH_KEY=local-dev
```

## 4. Seed Sample Data
```
python scripts/seed_sample.py  # (planned script)
```

## 5. Run API (Placeholder)
```
uvicorn app.main:app --reload --port 8000
```

## 6. Smoke Test
```
curl http://localhost:8000/health
```

If 200 OK returns JSON status, environment is healthy.

## Next
- Try First Query guide.
- Explore schemas in docs.
