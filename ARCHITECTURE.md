# AgriSense AI — System Architecture & Data Flow

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
│                LOCAL AGRICULTURAL KNOWLEDGE & FALLBACK ENGINE                │
│                 (cropsData.js • soilTypesData.js • Gemini API)              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Data Pipelines

1. **Multimodal Vision Pipeline**:
   - User drops crop leaf/foliage image -> HTML5 Canvas resizing (128x128) -> RGB Pixel Extraction -> Excess Green Index (ExG = 2G - R - B) & Golden Grain Ratio calculation -> Scored against 10+ crop color signatures -> Returns predicted crop + confidence score (88%-97%) in `<300ms`.

2. **Soil Health & Suitability Pipeline**:
   - User inputs soil pH, Nitrogen, Phosphorus, Potassium, Moisture, and Soil Type -> `analyzeSoilData()` computes individual metric health statuses (Optimal, Acidic, Deficient) and overall Soil Health Score (0-100) -> Calculates weighted crop suitability ranks for all crops -> Renders interactive visual diagnostic cards.

3. **Combined Intelligence & AI Assistant Pipeline**:
   - `generateIntegratedInsight()` combines the active detected crop with physical soil metrics -> Generates contextual yield warnings (e.g. pH lockout or irrigation schedule) -> Feeds context into AgriSense Assistant for natural language user Q&A.
