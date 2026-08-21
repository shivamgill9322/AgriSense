# AgriSense AI — Multimodal Crop Health FastAPI Backend

A production-ready Python FastAPI + PostgreSQL backend for AI-powered crop health monitoring, multimodal diagnostic reasoning, soil intelligence, and before-and-after follow-up progress tracking.

---

## 🌟 Features & Core Architecture

1. **Multimodal Diagnostic Reasoning**:
   * Combines **Crop Image Vision**, **Farmer Voice Transcriptions & Symptoms**, **Soil NPK Chemistry Data**, and **Farm/Crop Context**.
   * Multi-factor **Confidence Engine** calculating score, reliability, and uncertainty factors.
   * Personal Action Plans containing immediate actions, treatments, prevention, and monitoring plans.
2. **Before vs. After Follow-up Progress Tracking**:
   * Evaluates follow-up photos, voice symptoms, and soil changes against initial diagnostic records.
   * Returns progression status (`improved`, `significantly_improved`, `unchanged`, `worsened`, `new_problem`, `uncertain`).
3. **AI Vendor Provider Abstraction**:
   * Abstracted Vision, Speech, and Reasoning provider interfaces (`VisionProvider`, `SpeechProvider`, `ReasoningProvider`).
   * Google Gemini SDK integration with automatic fallback to local heuristic ML engines when API keys are unconfigured.
4. **Security & Ownership**:
   * JWT authentication with bcrypt password hashing.
   * Strict user-level ownership checks ensuring farmers can only access their own farms, crops, diagnoses, soil, and audio/photos.
5. **Storage Abstraction**:
   * Local storage abstraction supporting JPEG, PNG, WEBP images and MP3, WAV, WEBM audio with MIME validation and safe filename generation.

---

## 🚀 Quickstart & Installation

### 1. Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### 2. Local Python Installation

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server with Uvicorn
uvicorn app.main:app --reload --port 8000
```

### 3. Docker Compose (Recommended)

Run backend and PostgreSQL database together:

```bash
docker compose up --build
```

Access Interactive API Documentation at:
* **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
* **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
* **OpenAPI Schema**: [http://localhost:8000/api/v1/openapi.json](http://localhost:8000/api/v1/openapi.json)

---

## 🗄️ Database Migrations (Alembic)

```bash
# Run latest migrations
alembic upgrade head

# Generate a new migration
alembic revision --autogenerate -m "Add new field"
```

---

## 🧪 Running Pytest Test Suite

```bash
pytest -v --cov=app
```

---

## 📌 API Endpoints Overview

| Category | Method | Endpoint | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/v1/auth/register` | Register new user account |
| **Auth** | `POST` | `/api/v1/auth/login` | Login and receive JWT token |
| **Auth** | `GET` | `/api/v1/auth/me` | Fetch active user profile |
| **Farms** | `POST` / `GET` | `/api/v1/farms` | Create / List user farms |
| **Crops** | `POST` / `GET` | `/api/v1/crops` | Create / List user crops |
| **Soil** | `POST` / `GET` | `/api/v1/crops/{crop_id}/soil` | Add / Fetch soil NPK measurements |
| **Photos** | `POST` | `/api/v1/photos/upload` | Secure image upload |
| **Voice** | `POST` | `/api/v1/voice/transcribe` | Transcribe audio & extract symptoms |
| **Diagnosis** | `POST` | `/api/v1/crops/{crop_id}/diagnose` | Run Multimodal AI Reasoning |
| **Follow-up** | `POST` | `/api/v1/diagnoses/{diagnosis_id}/followup` | Run Before vs After Analysis |
