from typing import Dict, Any
from app.ai.factory import get_reasoning_provider

class FollowupService:
    async def process_followup_analysis(
        self,
        original_diagnosis: Dict[str, Any],
        followup_photo_url: str = None,
        followup_voice_obs: Dict[str, Any] = None,
        followup_soil_data: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        followup_context = {
            "photo_url": followup_photo_url,
            "voice_observations": followup_voice_obs or {},
            "soil_data": followup_soil_data or {}
        }

        reasoning_provider = get_reasoning_provider()
        comparison = await reasoning_provider.analyze_followup_comparison(
            original_diagnosis=original_diagnosis,
            followup_context=followup_context
        )

        return comparison

followup_service = FollowupService()
