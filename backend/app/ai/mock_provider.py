import random
from typing import Dict, Any
from app.ai.base import VisionProvider, SpeechProvider, ReasoningProvider

class MockVisionProvider(VisionProvider):
    async def analyze_crop_image(self, image_bytes: bytes, filename: str = "") -> Dict[str, Any]:
        fn_lower = filename.lower()
        
        # Heuristic detection based on filename keywords or random selection
        if "wheat" in fn_lower or "image11" in fn_lower:
            crop_name = "Wheat"
            problem = "Wheat Yellow Rust (Puccinia striiformis)"
            category = "fungal"
            severity = "moderate"
        elif "maize" in fn_lower or "corn" in fn_lower or "image12" in fn_lower:
            crop_name = "Maize"
            problem = "Northern Corn Leaf Blight"
            category = "fungal"
            severity = "mild"
        elif "tomato" in fn_lower or "image13" in fn_lower:
            crop_name = "Tomato"
            problem = "Early Blight (Alternaria solani)"
            category = "disease"
            severity = "moderate"
        elif "potato" in fn_lower or "image16" in fn_lower:
            crop_name = "Potato"
            problem = "Late Blight (Phytophthora infestans)"
            category = "disease"
            severity = "severe"
        else:
            crops = [
                ("Wheat", "Yellow Rust", "fungal", "mild"),
                ("Tomato", "Early Blight", "disease", "moderate"),
                ("Maize", "Common Rust", "fungal", "mild"),
                ("Rice", "Bacterial Leaf Blight", "bacterial", "moderate"),
                ("Cotton", "Aphid Infestation", "pest", "mild")
            ]
            chosen = random.choice(crops)
            crop_name, problem, category, severity = chosen

        return {
            "crop": {"name": crop_name, "confidence": round(random.uniform(0.91, 0.98), 2)},
            "diagnosis": {
                "primary_problem": problem,
                "category": category,
                "severity": severity,
                "confidence": round(random.uniform(0.85, 0.94), 2)
            },
            "visual_symptoms": [
                "Chlorotic spots observed on leaf blade",
                "Subtle leaf tip browning",
                "Irregular necrotic lesions along foliage margins"
            ]
        }

class MockSpeechProvider(SpeechProvider):
    async def transcribe_audio(self, audio_bytes: bytes, filename: str = "") -> Dict[str, Any]:
        # Return mock transcript & extracted symptoms
        sample_transcript = "The leaves started turning yellow 3 days ago and I noticed tiny insects under the leaves."
        return {
            "transcript": sample_transcript,
            "language": "en",
            "extracted_symptoms": {
                "symptoms": ["yellowing leaves", "leaf browning"],
                "duration": "3 days",
                "observed_pests": ["tiny insects under leaves"],
                "location": "underside of leaves",
                "additional_notes": ["Rapid onset over last 72 hours"]
            }
        }

class MockReasoningProvider(ReasoningProvider):
    async def analyze_multimodal_context(self, context: Dict[str, Any]) -> Dict[str, Any]:
        crop_context = context.get("crop_context", {})
        image_analysis = context.get("image_analysis", {})
        voice_obs = context.get("voice_observations", {})
        soil_data = context.get("soil_data", {})

        crop_name = crop_context.get("crop_type") or image_analysis.get("crop", {}).get("name", "Crop")
        img_diag = image_analysis.get("diagnosis", {})
        primary_problem = img_diag.get("primary_problem", "Early Blight")
        category = img_diag.get("category", "disease")
        severity = img_diag.get("severity", "moderate")

        # Evaluate soil NPK contribution
        n_val = soil_data.get("nitrogen", 45)
        ph_val = soil_data.get("ph", 6.5)
        
        evidence = []
        if image_analysis.get("visual_symptoms"):
            evidence.append({
                "evidence_type": "photo",
                "description": f"Visual symptoms: {', '.join(image_analysis.get('visual_symptoms', []))}",
                "source": "vision_model",
                "weight": 0.9
            })

        if voice_obs.get("transcript"):
            evidence.append({
                "evidence_type": "voice",
                "description": f"Farmer report: '{voice_obs.get('transcript')}'",
                "source": "speech_transcription",
                "weight": 0.85
            })

        if n_val < 30:
            evidence.append({
                "evidence_type": "soil",
                "description": f"Soil Nitrogen level is deficient ({n_val} mg/kg), contributing to chlorosis.",
                "source": "soil_engine",
                "weight": 0.8
            })

        return {
            "crop": {"name": crop_name, "confidence": 0.95},
            "diagnosis": {
                "primary_problem": primary_problem,
                "category": category,
                "severity": severity,
                "confidence": 0.88
            },
            "symptoms": ["Leaf yellowing", "Necrotic spot lesions", "Margin browning"],
            "evidence": evidence,
            "alternative_diagnoses": [
                {"problem": "Nutrient Deficiency (Nitrogen)", "probability": 0.20},
                {"problem": "Fungal Leaf Spot", "probability": 0.15}
            ],
            "recommendations": {
                "immediate_actions": [
                    "Isolate and prune severely affected bottom foliage.",
                    "Disinfect pruning tools between cuts."
                ],
                "treatment": [
                    "Apply organic neem oil solution or approved copper-based fungicide.",
                    "Ensure adequate soil NPK balance by applying well-composted organic matter."
                ],
                "prevention": [
                    "Avoid overhead irrigation; use drip lines to keep foliage dry.",
                    "Maintain proper crop spacing to improve canopy airflow."
                ],
                "monitoring": {
                    "next_check_days": 3,
                    "what_to_check": ["Inspect new leaf shoots for lesion spread and undersides for pests."]
                },
                "when_to_seek_expert_help": [
                    "If disease symptoms spread to more than 30% of field crop area despite treatment."
                ]
            },
            "confidence_assessment": {
                "confidence": 0.88,
                "level": "high",
                "reliability_factors": ["Strong visual symptom alignment", "Soil NPK chemistry corroboration"],
                "uncertainty_factors": []
            },
            "additional_information_needed": []
        }

    async def analyze_followup_comparison(
        self,
        original_diagnosis: Dict[str, Any],
        followup_context: Dict[str, Any]
    ) -> Dict[str, Any]:
        return {
            "status": "improved",
            "confidence": 0.91,
            "changes": {
                "damage": "decreased",
                "symptoms": "improved",
                "new_damage": False,
                "details": "Foliage yellowing has stabilized and lesion expansion has ceased following initial treatment."
            },
            "recommendation": "Continue the current management plan and schedule a routine check in 5 days."
        }
