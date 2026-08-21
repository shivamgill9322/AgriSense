from typing import Dict, Any
from app.ai.factory import get_vision_provider

class CropDetectionService:
    async def detect_crop_species(self, image_bytes: bytes, filename: str = "") -> Dict[str, Any]:
        provider = get_vision_provider()
        res = await provider.analyze_crop_image(image_bytes, filename)
        crop_data = res.get("crop", {"name": "Wheat", "confidence": 0.94})
        return {
            "name": crop_data.get("name", "Wheat"),
            "confidence": crop_data.get("confidence", 0.94)
        }

class DiseaseDetectionService:
    async def detect_disease(self, image_bytes: bytes, filename: str = "") -> Dict[str, Any]:
        provider = get_vision_provider()
        res = await provider.analyze_crop_image(image_bytes, filename)
        diag = res.get("diagnosis", {"primary_problem": "Yellow Rust", "severity": "moderate"})
        return diag

class PestDetectionService:
    async def detect_pests(self, image_bytes: bytes, filename: str = "") -> Dict[str, Any]:
        provider = get_vision_provider()
        res = await provider.analyze_crop_image(image_bytes, filename)
        return {
            "pests_detected": res.get("visual_symptoms", [])
        }

crop_detection_service = CropDetectionService()
disease_detection_service = DiseaseDetectionService()
pest_detection_service = PestDetectionService()
