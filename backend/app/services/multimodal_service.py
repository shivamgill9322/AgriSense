from typing import Dict, Any
from app.ai.factory import get_reasoning_provider
from app.services.confidence_service import confidence_service
from app.services.recommendation_service import recommendation_service

class MultimodalService:
    async def execute_diagnosis_pipeline(
        self,
        image_bytes: bytes,
        filename: str,
        voice_obs: Dict[str, Any],
        soil_data: Dict[str, Any],
        crop_context: Dict[str, Any],
        farm_context: Dict[str, Any],
        previous_diagnoses: list = None
    ) -> Dict[str, Any]:
        # 1. Vision analysis
        from app.ai.factory import get_vision_provider
        vision_provider = get_vision_provider()
        image_analysis = await vision_provider.analyze_crop_image(image_bytes, filename)

        # 2. Build complete context payload
        context_payload = {
            "crop_context": crop_context,
            "image_analysis": image_analysis,
            "voice_observations": voice_obs,
            "soil_data": soil_data,
            "farm_context": farm_context,
            "previous_diagnoses": previous_diagnoses or []
        }

        # 3. Execute Multimodal AI Reasoning
        reasoning_provider = get_reasoning_provider()
        reasoning_result = await reasoning_provider.analyze_multimodal_context(context_payload)

        # 4. Calculate Confidence Engine Score
        conf_eval = confidence_service.calculate_confidence(
            image_analysis=image_analysis,
            voice_obs=voice_obs,
            soil_data=soil_data,
            crop_context=crop_context
        )

        # 5. Generate Personalized Action Plan
        crop_name = reasoning_result.get("crop", {}).get("name", crop_context.get("crop_type", "Wheat"))
        diag_info = reasoning_result.get("diagnosis", {})
        action_plan = recommendation_service.generate_action_plan(
            crop_name=crop_name,
            primary_problem=diag_info.get("primary_problem", "Early Blight"),
            severity=diag_info.get("severity", "moderate"),
            soil_data=soil_data,
            voice_obs=voice_obs
        )

        # 6. Combine into strict output format
        final_output = {
            "crop": {
                "name": crop_name,
                "confidence": reasoning_result.get("crop", {}).get("confidence", 0.94)
            },
            "diagnosis": {
                "primary_problem": diag_info.get("primary_problem", "Possible early blight"),
                "category": diag_info.get("category", "disease"),
                "severity": diag_info.get("severity", "moderate"),
                "confidence": conf_eval.get("confidence", 0.85)
            },
            "symptoms": reasoning_result.get("symptoms", []),
            "evidence": reasoning_result.get("evidence", []),
            "alternative_diagnoses": reasoning_result.get("alternative_diagnoses", []),
            "recommendations": action_plan,
            "confidence_assessment": conf_eval,
            "additional_information_needed": conf_eval.get("additional_information_needed", [])
        }

        return final_output

multimodal_service = MultimodalService()
