# VidhiLens

**Semantic Retrieval and Argument-Aware Ranking of Indian Legal Precedents**

A research prototype that helps advocates discover relevant Supreme Court judgments using semantic search, hybrid retrieval, and argument-aware ranking.

---

## Architecture

```
Browser → Next.js (port 3000)
            ├── /app/*         → Frontend UI (React, Tailwind)
            └── /app/api/*     → API Routes (replaces Express)
                    ↓
           Python ml-service (port 8000)   ← embeddings, retrieval, ranking
                    ↓
           PostgreSQL + pgvector (port 5432)
```

---

## Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| Node.js | 20+ | `node --version` |
| Python | 3.10+ | `python --version` |
| Docker Desktop | recent | `docker --version` |
| Git | any | `git --version` |

---

## Setup (first time)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/vidhilens.git
cd vidhilens
```

### 2. Set up environment variables

Copy the example file and fill in real values:
```bash
# In apps/web/ — create .env.local (never committed)
cp apps/web/.env.example apps/web/.env.local
```

Edit `apps/web/.env.local`:
```env
DATABASE_URL=postgresql://vidhi:vidhilens_dev_password@localhost:5432/vidhilens
ML_SERVICE_URL=http://localhost:8000
```

### 3. Install Node dependencies
```bash
npm install                        # root (concurrently)
npm install --prefix apps/web      # Next.js app
```

### 4. Set up Python environment
```bash
cd apps/ml-service
python -m venv .venv
.venv\Scripts\activate             # Windows
pip install -r requirements.txt
cd ../..
```

---

## Running the project

### Step 1 — Start the database
```bash
npm run db:start
```
Starts PostgreSQL + pgvector in Docker on port **5432**.

### Step 2 — Enable pgvector (first time only)
```bash
docker exec -it vidhilens_db psql -U vidhi -d vidhilens -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

### Step 3 — Start the ML service (new terminal)
```bash
cd apps/ml-service
.venv\Scripts\activate
uvicorn app.main:app --reload --port 8000
```

### Step 4 — Start the web app (new terminal)
```bash
npm run dev --prefix apps/web
```

---

## Verify everything is working

Open **http://localhost:3000** — you should see **3 green dots**:

| Service | URL | Expected |
|---------|-----|----------|
| Next.js app | http://localhost:3000 | Home page with status |
| Health API | http://localhost:3000/api/health | `{"api":"ok","db":"ok","mlService":"ok"}` |
| ML Service docs | http://localhost:8000/docs | FastAPI Swagger UI |

---

## Ports

| Port | Service |
|------|---------|
| 3000 | Next.js (frontend + API routes) |
| 5432 | PostgreSQL + pgvector |
| 8000 | Python ml-service (FastAPI) |

---

## Data attribution

Judgments are sourced from the **AWS Open Data: Indian Supreme Court Judgments** dataset  
(managed by Dattam Labs), licensed under **CC-BY-4.0**.  
See `docs/data-source-verification.md` for full attribution details.

---

## Project structure

```
vidhilens/
├── apps/
│   ├── web/           # Next.js frontend + API routes
│   └── ml-service/    # Python FastAPI (embeddings, retrieval, ranking)
├── pipeline/          # Offline ingestion scripts (run by hand)
├── db/migrations/     # SQL migration files
├── data/              # NOT in Git (PDFs, extracted text)
│   └── manifest.csv   # Provenance record (IS in Git)
├── evaluation/        # Queries, relevance labels, metrics
├── docs/              # Decision log, verification sheet, report
└── docker-compose.yml # PostgreSQL + pgvector
```

