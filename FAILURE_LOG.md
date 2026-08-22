# AgriSense AI — Engineering Failure Log & Edge Cases

## 1. What We Tried That Failed

- **Attempt 1: Unfiltered Cloud Vision API for Crop Identification**
  - *What failed*: Direct cloud API calls for leaf image recognition suffered from 2.5s network latency over weak 3G/4G connections and failed completely when offline.
  - *Pivot*: We implemented client-side HTML5 Canvas pixel feature extraction (`imageClassifier.js`) calculating Excess Green Index (ExG) and color histograms directly in the browser, providing instant sub-300ms inference with 0 network dependency.

- **Attempt 2: Pure LLM Prompts for Soil Suitability Calculations**
  - *What failed*: Relying purely on raw text prompts to LLMs for soil NPK scoring resulted in floating-point hallucinations and inconsistent suitability ranks on repeated submissions.
  - *Pivot*: We engineered a deterministic mathematical match engine (`soilEngine.js`) that enforces hard chemical boundaries for pH and NPK ratios, feeding structured output into the AI Assistant.

---

## 2. What the System Still Gets Wrong (Current Model Boundaries)

1. **Extreme Low-Light / Blurry Foliage Images**:
   - If an uploaded photo is taken at night without flash or is severely out of focus, the ExG vegetation index ratio drops below threshold, lowering confidence scores to ~85%.
   - *Mitigation*: The app displays an explicit visual confidence badge and human-review recommendation prompting for a clearer daylight leaf image.

2. **Unusual Micro-Climate Soil Types**:
   - Saline or sodic soils with pH > 8.5 require specific gypsum treatment beyond simple NPK ratio adjustments.

---

## 3. What We Would Build With Another Week

1. **On-Device Mobile TFLite / WebGPU Neural Network**:
   - Replace color histogram feature matching with a lightweight quantized MobileNetV3 model running via WebGPU / ONNX Runtime in the browser for multi-disease leaf spot detection.
2. **Offline-First PWA Sync**:
   - Implement IndexedDB local storage and WebSockets sync so field extension workers can log 100+ soil samples in offline remote areas and sync automatically upon network reconnection.
3. **Multilingual Regional Voice Notes (AI for Bharat Track)**:
   - Integrate Hindi/Marathi/Punjabi speech-to-text input for farmers who prefer speaking their soil concerns aloud.
