# AgriSense AI — AI-Powered Crop Detection & Soil Intelligence Agent

> **"Understand your soil. Know your crop. Grow smarter."**

AgriSense AI is an intelligent agricultural technology platform that combines **multimodal computer vision**, **on-device foliage analysis**, **soil chemical NPK & pH diagnostics**, and a **contextual AI assistant** to help smallholder farmers and agronomists optimize field productivity.

---

## 🌟 Key Features

1. **AI Crop Detection (Computer Vision)**:
   - Client-side image feature extraction analyzing Excess Green Index (ExG), RGB color histograms, and foliage texture vectors.
   - Real-time crop identification with confidence scores (e.g. *94% Confidence*), growing conditions, water requirements, monitored disease risks, and organic remedies.
   - Interactive drag-and-drop dropzone + **14 AgTech Sample Test Drive Presets** (*Wheat, Rice, Maize, Cotton, Sugarcane, Potato, Tomato, Soybean, Mustard, Groundnut, etc.*).

2. **Soil Intelligence Diagnostic**:
   - Interactive parameter sliders for **pH (4.0–9.0)**, **Nitrogen (N)**, **Phosphorus (P)**, **Potassium (K)**, **Moisture %**, and **Soil Type Classification** (*Loamy, Sandy Loam, Clay Loam, Clay, Sandy, Silt*).
   - Visual Soil Quality Index (0–100 score), color-coded metric badges, and targeted soil amendment recommendations.

3. **Crop Suitability Recommendation Matrix**:
   - Data-backed match engine scoring 10+ crops against user's specific soil chemistry values.
   - Suitability rank badges (*94% Match*), seasonal filters (*Rabi, Kharif*), and an expandable **Agronomic Profile Modal**.

4. **AgriSense AI Assistant**:
   - Contextual conversational agent seeded with session data (detected crop & soil pH/NPK values).
   - Pre-filled quick question prompts (*"What crop is suitable for my soil?"*, *"Why are plant leaves turning yellow?"*, *"Compare Wheat vs Mustard"*).

5. **AgTech Visual Aesthetics**:
   - **Continuous Portrait Marquee Wall**: 3-column vertical poster marquee showcasing AgTech imagery.
   - **Live Background Video**: Autoplay background video stream with atmospheric bio-mesh overlays.
   - **Fluid Slide Transitions**: Smooth page slide animations across all routes (`/`, `/dashboard`, `/crop-detection`, `/soil-analysis`, `/recommendations`, `/assistant`).

---

## 🏗️ Architecture & Technology Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS 3, Lucide React Icons, React Router DOM 6.
- **Computer Vision**: On-device HTML5 Canvas pixel feature extraction (`imageClassifier.js`).
- **Soil Math Engine**: Deterministic chemical suitability matrix matching (`soilEngine.js`).
- **Styling**: Glassmorphism, CSS keyframe animations, custom Google Fonts (*Outfit* & *Plus Jakarta Sans*).
- **Backend Options**: FastAPI (Python) with Gemini API / Mock providers in `backend/`.

```
src/
├── components/
│   ├── Navbar.jsx          # AgriSense navigation bar with desktop & mobile drawer
│   ├── Footer.jsx          # Minimal AgriSense footer
│   ├── CropUpload.jsx      # Drag-and-drop image analyzer + 14 sample test reel
│   ├── CropResult.jsx      # AI crop identification result card & details
│   ├── SoilForm.jsx        # Interactive soil parameter sliders & dropdowns
│   ├── SoilCard.jsx        # Soil metrics visualization cards (pH, N, P, K, Moisture)
│   ├── RecommendationCard.jsx # Crop suitability cards with match score
│   ├── AssistantChat.jsx   # AgriSense AI conversational assistant with quick prompts
│   ├── CropDetailModal.jsx # Full crop profile modal drawer
│   ├── ImageMarquee.jsx    # 3-column portrait marquee poster wall
│   └── AgriBackground.jsx  # Live background video & animated bio-mesh
├── data/
│   ├── cropsData.js        # Knowledge base for 10+ crops
│   └── soilTypesData.js    # Soil characteristics & target ranges
├── utils/
│   ├── imageClassifier.js  # Computer vision feature extraction & neural match engine
│   └── soilEngine.js       # Soil suitability calculation algorithm (NPK/pH match)
├── pages/
│   ├── Landing.jsx         # High-converting AgTech landing page
│   ├── Dashboard.jsx       # Overview dashboard with active session stats & widgets
│   ├── CropDetection.jsx   # Dedicated crop detection page
│   ├── SoilAnalysis.jsx    # Soil testing & intelligence breakdown page
│   ├── Recommendations.jsx # "What should I grow?" recommendation page
│   └── Assistant.jsx       # Standalone AgriSense Assistant page
├── App.jsx                 # React Router layout & state synchronization
└── main.jsx                # Entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ & npm

### Installation & Local Run

```bash
# 1. Clone the repository
git clone <your-repository-url>
cd Ai-Agriculter

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000/](http://localhost:3000/) in your browser.

### Production Build

```bash
npm run build
```

---

## 📑 Submission Documentation


- [`ARCHITECTURE.md`](ARCHITECTURE.md) — System architecture diagram and data pipelines.
- [`FAILURE_LOG.md`](FAILURE_LOG.md) — Engineering failure log, edge cases, and future roadmap.

---

## 📄 License

© 2026 AgriSense AI. All rights reserved.
