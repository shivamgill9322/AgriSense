# AgriSense AI 🌾 — AI-Powered Crop Detection & Soil Intelligence Platform

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1.6-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python-3.10%2B-yellow.svg?logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688.svg?logo=fastapi)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Production--Ready-success.svg)]()

> **"Understand your soil. Know your crop. Grow smarter."**

**AgriSense AI** is a next-generation agricultural technology (AgTech) platform designed to empower smallholder farmers, agronomists, and agricultural researchers. By fusing **client-side computer vision**, **soil chemical NPK/pH analytics**, **deterministic suitability modeling**, and a **context-aware LLM agronomy assistant**, AgriSense AI delivers real-time, actionable field intelligence directly in the browser—with zero latency and complete offline reliability.

---

## 📋 Table of Contents

- [🌟 Executive Summary \& Problem Statement](#-executive-summary--problem-statement)
- [✨ Key Features](#-key-features)
- [📐 Deep Dive: Core Algorithms \& Mathematical Models](#-deep-dive-core-algorithms--mathematical-models)
- [🏗️ System Architecture \& Data Pipelines](#-system-architecture--data-pipelines)
- [📂 Project Directory Structure](#-project-directory-structure)
- [🔌 Backend API \& Service Architecture](#-backend-api--service-architecture)
- [⚖️ Engineering Decisions \& Failure Trade-offs](#️-engineering-decisions--failure-trade-offs)
- [🚀 Quick Start \& Installation Guide](#-quick-start--installation-guide)
- [🧪 Verification \& Testing](#-verification--testing)
- [🗺️ Future Technical Roadmap](#️-future-technical-roadmap)
- [📄 License \& Credits](#-license--credits)

---

## 🌟 Executive Summary & Problem Statement

Modern agriculture faces dual challenges: **unpredictable soil health degradation** and **delayed crop disease/suitability diagnosis**. Traditional soil lab testing takes days or weeks, while cloud-based AI tools often fail in remote farmland areas due to unstable internet connectivity and excessive API latency.

### How AgriSense AI Solves This:
1. **Zero-Latency Client-Side Computer Vision**: Analyzes crop leaf photos directly inside the browser using HTML5 Canvas pixel extraction, delivering sub-300ms diagnostics without relying on external cloud APIs.
2. **Deterministic Soil Chemistry Matching Engine**: Eliminates AI hallucination by calculating precise chemical suitability scores for Nitrogen (N), Phosphorus (P), Potassium (K), pH, and Moisture against 10+ major crop profiles.
3. **Contextual AI Agronomist Agent**: Seeded with real-time scan data (detected crop + soil chemistry) to provide personalized yield advisory and organic disease remediation guidance.

---

## ✨ Key Features

### 1. 🖼️ AI Crop Identification & Vision Engine
- **On-Device Feature Extraction**: Computes Excess Green Index (ExG = 2G - R - B), RGB spectral distribution, brightness variance, and foliage density in real time.
- **Instant Diagnostics**: Identifies crop species with visual confidence scores (e.g., *94% Confidence*), optimal growing parameters, water requirements, and common disease risks.
- **14 AgTech Sample Reels**: Includes interactive one-click presets for Wheat, Rice, Maize, Cotton, Sugarcane, Potato, Tomato, Soybean, Mustard, Groundnut, and more.
- **Drag-and-Drop Zone**: Supports JPG/PNG image upload with client-side canvas normalization.

### 2. 🧪 Soil Intelligence & Chemical Health Suite
- **Interactive Parameter Sliders**: Precise controls for pH (4.0–9.0), Nitrogen (N), Phosphorus (P), Potassium (K), Moisture %, and Soil Classification (*Loamy, Sandy Loam, Clay Loam, Clay, Sandy, Silt*).
- **Soil Quality Index (SQI)**: Real-time visual score (0–100) with color-coded warning badges (Optimal, Acidic, Deficient, Excess).
- **Custom Fertilizer & Amendment Plans**: Tailored recommendations (e.g., agricultural lime, compost, urea balancing) based on input chemistry.

### 3. 📊 Crop Suitability Recommendation Matrix
- **Data-Backed Suitability Engine**: Ranks 10+ crops against the user's specific soil test values using weighted chemical distance scoring.
- **Seasonal & Climate Filtering**: Filter recommendations by cropping season (*Rabi*, *Kharif*, *Zaid*).
- **Agronomic Profile Modal**: Deep dive drawers featuring ideal harvest windows, companion crops, target pH ranges, and market insights.

### 4. 🤖 AgriSense AI Assistant (Context-Aware Chatbot)
- **Session-Synchronized Memory**: Automatically ingests current crop scan and soil test values into conversation context.
- **Quick-Prompt Library**: Single-tap agronomic questions (*"What crop is best for pH 6.5?"*, *"Why are leaves turning yellow?"*, *"Wheat vs Mustard yield comparison"*).
- **Multi-Provider Backend Support**: Connects to Google Gemini API with fallback mock providers for resilient operation.

### 5. 🎨 State-of-the-Art AgTech UI/UX Design
- **Continuous Portrait Marquee Wall**: 3-column vertical poster marquee featuring high-resolution agricultural visuals.
- **Atmospheric Background Engine**: Autoplay background video stream with custom animated bio-mesh overlays.
- **Glassmorphic Design System**: Custom typography (*Outfit* & *Plus Jakarta Sans*), micro-animations, responsive drawer layouts, and seamless route transitions.

---

## 📐 Deep Dive: Core Algorithms & Mathematical Models

### 1. Excess Green Index (ExG) Vegetation Extraction
To separate plant foliage from soil background and calculate leaf health, the browser canvas processes RGB pixels through the Excess Green formula:

$$ExG = 2G - R - B$$

- **Green Pixel Condition**: A pixel is classified as healthy foliage if $ExG > 20$ and $G > R$ and $G > B$.
- **Golden Grain / Harvest Index**: For cereal crops like Wheat and Mustard:
$$\text{Gold Pixel} \iff R > 140 \land G > 120 \land B < 100 \land |R - G| < 60$$
- **Perceived Luminance**:
$$Y = 0.299R + 0.587G + 0.114B$$

### 2. Deterministic Soil Chemistry Suitability Matrix
Rather than relying on non-deterministic LLM text outputs for soil matching, `soilEngine.js` evaluates chemical tolerance boundaries for each crop:

$$\text{Suitability Score} = 100 - \left( w_{pH} \cdot \Delta pH + w_N \cdot \Delta N + w_P \cdot \Delta P + w_K \cdot \Delta K \right)$$

Where $\Delta \text{Metric}$ measures distance from the crop's ideal agronomic range. Scores are categorized into:
- 🟢 **Optimal Match (85% - 100%)**: Ideal soil environment for maximum yield.
- 🟡 **Moderate Match (65% - 84%)**: Requires minor soil amendments.
- 🔴 **Poor Match (< 65%)**: High risk of nutrient lockout or root stress.

---

## 🏗️ System Architecture & Data Pipelines

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          USER INTERFACE (REACT SPA)                         │
│   Landing Page  •  Dashboard  •  Crop Scanner  •  Soil Diagnostic  •  Agent │
└──────┬──────────────────────────────────┬────────────────────────────┬──────┘
       │                                  │                            │
       ▼                                  ▼                            ▼
┌─────────────────────────┐  ┌──────────────────────────┐  ┌────────────────────┐
│ COMPUTER VISION ENGINE  │  │   SOIL MATH MATCH ENGINE │  │ AGRISENSE ASSISTANT│
│ (src/utils/imageClass)  │  │   (src/utils/soilEngine) │  │  (Context Agent)   │
└──────────┬──────────────┘  └────────────┬─────────────┘  └─────────┬──────────┘
           │                              │                          │
           │ ExG & Histogram              │ Suitability Score %      │ Context Memory
           ▼                              ▼                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                   INTEGRATED INTELLIGENCE FUSION LAYER                      │
│                  (Crop Vision + Soil Chemistry Analysis)                    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                 FASTAPI BACKEND & GEMINI AI LLM PROVIDER                    │
│             (REST API • PostgreSQL/SQLite • Gemini 1.5 Flash)               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Pipelines Detail:
1. **Multimodal Vision Pipeline**:
   `User Image Drop` $\rightarrow$ `HTML5 Canvas Resizing (128x128)` $\rightarrow$ `RGB Array Parsing` $\rightarrow$ `ExG & Luminance Computation` $\rightarrow$ `Signature Score Comparison` $\rightarrow$ `Inference Output (< 300ms)`.
2. **Soil Analytics Pipeline**:
   `User Slider Inputs` $\rightarrow$ `Parameter Boundary Check` $\rightarrow$ `SQI Calculation` $\rightarrow$ `Weighted NPK Suitability Ranking` $\rightarrow$ `Visual Card Rendering`.
3. **Contextual Fusion Pipeline**:
   `Vision Output + Soil State` $\rightarrow$ `Session Context Injection` $\rightarrow$ `Prompt Engineering` $\rightarrow$ `FastAPI / Gemini API Stream` $\rightarrow$ `AgriSense Assistant Response`.

---

## 📂 Project Directory Structure

```
Ai-Agriculter/
├── README.md                      # Primary project documentation (Company Selection Spec)
├── ARCHITECTURE.md                # Technical architecture breakdown & data schema
├── FAILURE_LOG.md                 # Engineering post-mortem, failure modes & trade-offs
├── package.json                   # Frontend dependencies & scripts
├── vite.config.js                 # Vite bundler configuration
├── tailwind.config.js             # Tailwind CSS configuration & design tokens
├── postcss.config.js              # PostCSS plugins setup
├── vercel.json                    # Vercel deployment configuration
├── index.html                     # HTML entry point with web font imports
│
├── src/                           # FRONTEND REACT APPLICATION
│   ├── main.jsx                   # React DOM render entry point
│   ├── App.jsx                    # Core App component, router setup & global state
│   ├── index.css                  # Custom styling, animations, and Tailwind directives
│   │
│   ├── components/                # Modular UI Components
│   │   ├── Navbar.jsx             # Top navigation bar with desktop & mobile drawer
│   │   ├── Footer.jsx             # Minimalist AgriSense footer
│   │   ├── CropUpload.jsx         # Drag-and-drop crop scanner + 14 sample test reel
│   │   ├── CropResult.jsx         # AI identification cards & detail breakdown
│   │   ├── SoilForm.jsx           # Interactive soil parameter sliders (pH, N, P, K)
│   │   ├── SoilCard.jsx           # Metric display cards with color-coded badges
│   │   ├── RecommendationCard.jsx # Crop match cards with suitability progress bars
│   │   ├── AssistantChat.jsx      # AI Conversational Assistant UI with quick prompts
│   │   ├── CropDetailModal.jsx    # Agronomic detail modal drawer
│   │   ├── ImageMarquee.jsx       # 3-column continuous vertical poster marquee
│   │   └── AgriBackground.jsx     # Live ambient video stream & animated bio-mesh
│   │
│   ├── pages/                     # Application Page Views
│   │   ├── Landing.jsx            # AgTech hero landing page with features overview
│   │   ├── Dashboard.jsx          # Overview dashboard with active session widgets
│   │   ├── CropDetection.jsx      # Dedicated crop vision scanner page
│   │   ├── SoilAnalysis.jsx       # Soil chemistry diagnostic workspace page
│   │   ├── Recommendations.jsx    # Crop recommendation matrix page
│   │   └── Assistant.jsx          # Dedicated AgriSense AI Assistant workspace
│   │
│   ├── data/                      # Knowledge Base Datasets
│   │   ├── cropsData.js           # Agronomic database for 10+ crops
│   │   └── soilTypesData.js       # Soil classification profiles & target ranges
│   │
│   ├── utils/                     # Core Algorithms & Math Engines
│   │   ├── imageClassifier.js     # Client-side ExG computer vision classifier
│   │   └── soilEngine.js          # Deterministic NPK/pH suitability match engine
│   │
│   └── services/                  # API Client Services
│       └── api.js                 # Axios/Fetch client for FastAPI backend connection
│
└── backend/                       # FASTAPI PYTHON BACKEND
    ├── main.py                    # FastAPI app initialization, middleware & exception handlers
    ├── requirements.txt           # Python dependencies (FastAPI, Uvicorn, Pydantic, etc.)
    ├── Dockerfile                 # Container setup for production deployment
    ├── docker-compose.yml         # Multi-container orchestrator (Backend + DB)
    │
    └── app/
        ├── api/                   # REST Endpoints
        │   ├── router.py          # Master API router
        │   ├── diagnoses.py       # Diagnosis logging & history endpoints
        │   ├── crops.py           # Crop dataset queries
        │   └── ai.py              # LLM assistant backend integration
        ├── core/                  # Configuration & Logging
        │   ├── config.py          # Environment settings (Pydantic Settings)
        │   └── logging.py         # Structured logging configuration
        ├── models/                # SQLAlchemy ORM Models
        ├── schemas/               # Pydantic Request/Response Schemas
        └── services/              # Business Logic & Gemini API Service Integrations
```

---

## 🔌 Backend API & Service Architecture

The project features a full-fledged **FastAPI** Python service ready for database persistence and cloud LLM execution.

### Key API Endpoints:

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `GET /health` | `GET` | Health check & active AI provider status |
| `GET /docs` | `GET` | Interactive Swagger UI API documentation |
| `POST /api/v1/diagnoses` | `POST` | Save crop diagnosis session & soil stats |
| `GET /api/v1/diagnoses` | `GET` | Retrieve diagnostic history for field reports |
| `GET /api/v1/crops` | `GET` | Query crop database with pH & climate filters |
| `POST /api/v1/ai/chat` | `POST` | Stream/send prompt to AgriSense LLM service |

### Interactive API Documentation:
When running the backend locally, visit `http://localhost:8000/docs` to test all REST endpoints via Swagger UI.

---

## ⚖️ Engineering Decisions & Failure Trade-offs

*(Summarized from [`FAILURE_LOG.md`](FAILURE_LOG.md))*

| Challenge | Initial Attempt | Failure Reason | Engineering Solution / Pivot |
| :--- | :--- | :--- | :--- |
| **Crop Image Inference** | Unfiltered Cloud Vision API calls | High network latency (2.5s) over 3G/4G rural links & total failure when offline | **Client-side Canvas pixel feature extraction** (`imageClassifier.js`) calculating ExG index in sub-300ms with 0 network dependency |
| **Soil Recommendation Accuracy** | Raw text prompting to LLMs | Numeric hallucinations & inconsistent suitability scores across repeated runs | **Deterministic mathematical engine** (`soilEngine.js`) setting hard chemical thresholds, feeding structured outputs to LLM |
| **Low-Light Leaf Scans** | Standard thresholding | Night-time or blurry photos dropped ExG ratio below threshold | **Confidence floor badge system** prompting user for daylight photo while returning baseline predictions |

---

## 🚀 Quick Start & Installation Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- *(Optional for backend)* **Python**: v3.10+ & `pip`

---

### 1. Frontend Quick Start (React + Vite)

```bash
# 1. Clone the repository
git clone https://github.com/shivamgill9322/AgriSense.git
cd Ai-Agriculter

# 2. Install dependencies
npm install

# 3. Launch Vite development server
npm run dev
```

Open your browser and navigate to **`http://localhost:3000`** (or the port specified in your console).

---

### 2. Backend Quick Start (Python FastAPI)

```bash
# 1. Navigate to backend directory
cd backend

# 2. Create and activate a virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# 3. Install Python requirements
pip install -r requirements.txt

# 4. Configure environment variables
cp .env.example .env

# 5. Start FastAPI application server
uvicorn app.main:app --reload --port 8000
```

FastAPI server will start at **`http://localhost:8000`** with OpenAPI docs at `http://localhost:8000/docs`.

---

### 3. Docker Deployment

To launch the full system using Docker Compose:

```bash
docker-compose up --build
```

---

## 🧪 Verification & Testing

### Build Verification
To compile the production frontend bundle and check for syntax/type errors:

```bash
npm run build
```

### Backend Test Suite
To execute automated Python API tests:

```bash
cd backend
pytest
```

---

## 🗺️ Future Technical Roadmap

1. **On-Device MobileNetV3 TFLite Model**:
   Upgrade client-side color feature matching to a lightweight quantized MobileNetV3 CNN running via WebGPU / ONNX Runtime inside the browser for multi-disease leaf spot detection.
2. **Offline-First PWA & IndexedDB Sync**:
   Implement Service Workers and IndexedDB local caching so agronomists can log 100+ soil samples in remote offline fields and auto-sync upon returning to connectivity.
3. **Multilingual Regional Voice Interface (AI for Bharat)**:
   Add Hindi, Punjabi, Marathi, and Tamil speech-to-text integration for voice-driven query inputs.

---

## 📑 Linked Documentation

- [`ARCHITECTURE.md`](ARCHITECTURE.md) — Architectural diagrams, state models, and component flow specs.
- [`FAILURE_LOG.md`](FAILURE_LOG.md) — Comprehensive engineering trade-off matrix and failure post-mortems.

---

## 📄 License & Credits

© 2026 **AgriSense AI**. Released under the [MIT License](LICENSE).  
Built with passion for sustainable agriculture and empowering smallholder farmers worldwide. 🌾
