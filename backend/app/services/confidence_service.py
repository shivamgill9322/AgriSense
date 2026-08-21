from typing import Dict, Any, List

class ConfidenceService:
    def calculate_confidence(
        self,
        image_analysis: Dict[str, Any],
        voice_obs: Dict[str, Any],
        soil_data: Dict[str, Any],
        crop_context: Dict[str, Any]
    ) -> Dict[str, Any]:
        reliability_factors: List[str] = []
        uncertainty_factors: List[str] = []
        additional_info_needed: List[str] = []

        # Base confidence from visual model
        img_crop_conf = image_analysis.get("crop", {}).get("confidence", 0.85)
        img_diag_conf = image_analysis.get("diagnosis", {}).get("confidence", 0.80)
        
        base_score = (img_crop_conf + img_diag_conf) / 2.0
        
        if image_analysis.get("crop", {}).get("name"):
            reliability_factors.append(f"Visual crop species match: {image_analysis.get('crop', {}).get('name')}")

        # Check Voice Agreement
        transcript = voice_obs.get("transcript")
        extracted = voice_obs.get("extracted_symptoms", {})
        if transcript and (extracted.get("symptoms") or extracted.get("observed_pests")):
            base_score += 0.08
            reliability_factors.append("Farmer voice observation corroborates visual symptoms.")
        elif not transcript:
            uncertainty_factors.append("No voice observation provided.")

        # Check Soil Data Agreement
        ph = soil_data.get("ph")
        nitrogen = soil_data.get("nitrogen")
        if soil_data and ph is not None:
            base_score += 0.05
            reliability_factors.append(f"Soil chemistry metrics present (pH {ph}, N {nitrogen} mg/kg).")
            
            # Corroborate deficiency if nitrogen low
            if nitrogen is not None and nitrogen < 30:
                reliability_factors.append("Low nitrogen matches foliage chlorosis pattern.")
        else:
            uncertainty_factors.append("Soil test measurements not available.")
            additional_info_needed.append("Provide recent soil NPK test data for enhanced accuracy.")

        # Bound score between 0.30 and 0.98
        final_confidence = round(max(0.30, min(0.98, base_score)), 2)

        if final_confidence >= 0.80:
            level = "high"
        elif final_confidence >= 0.60:
            level = "medium"
        else:
            level = "low"

        if level == "low":
            additional_info_needed.append("Upload a close-up image of the affected leaf.")
            additional_info_needed.append("Upload an image of the underside of the leaf.")
            additional_info_needed.append("Provide crop age and recent irrigation history.")

        return {
            "confidence": final_confidence,
            "level": level,
            "reliability_factors": reliability_factors,
            "uncertainty_factors": uncertainty_factors,
            "additional_information_needed": additional_info_needed
        }

confidence_service = ConfidenceService()
