from typing import Dict, Any, List

class RecommendationService:
    def generate_action_plan(
        self,
        crop_name: str,
        primary_problem: str,
        severity: str,
        soil_data: Dict[str, Any],
        voice_obs: Dict[str, Any]
    ) -> Dict[str, Any]:
        immediate_actions: List[str] = []
        treatment: List[str] = []
        prevention: List[str] = []
        monitoring_items: List[str] = []
        expert_help: List[str] = []

        problem_lower = primary_problem.lower()
        severity_lower = severity.lower()

        # Immediate actions based on severity
        if severity_lower in ["severe", "critical"]:
            immediate_actions.append(f"Immediately isolate infected {crop_name} plants to halt pathogen transmission across the field.")
            immediate_actions.append("Prune and safely destroy heavily necrotic leaves by burning or deep burial.")
            expert_help.append("Contact your local agricultural extension service or certified agronomist immediately for emergency intervention.")
        elif severity_lower in ["moderate"]:
            immediate_actions.append(f"Prune affected bottom leaves of {crop_name} to improve canopy ventilation.")
            immediate_actions.append("Disinfect shears with alcohol between plant cuts.")
        else:
            immediate_actions.append("Monitor foliage daily for changes in spot size or color.")

        # Soil NPK & pH guidance
        ph = soil_data.get("ph")
        nitrogen = soil_data.get("nitrogen")
        if ph is not None and ph < 5.8:
            treatment.append("Apply agricultural lime (calcium carbonate) to correct acidic soil pH and improve nutrient uptake.")
        elif ph is not None and ph > 7.5:
            treatment.append("Incorporate elemental sulfur or organic compost to gradually lower alkaline soil pH.")

        if nitrogen is not None and nitrogen < 30:
            treatment.append("Side-dress soil with organic neem cake, vermicompost, or balanced NPK fertilizer.")

        # Treatment recommendations
        if "rust" in problem_lower or "fungal" in problem_lower or "blight" in problem_lower:
            treatment.append("Apply organic neem oil solution (5ml/L of water) or copper-based fungicide spray early in the morning.")
            treatment.append("Important Note: Always follow product label instructions and local agricultural safety regulations when applying treatments.")
            prevention.append("Switch to drip irrigation to keep leaf foliage dry.")
            prevention.append("Rotate crops with non-host species in the upcoming planting season.")
        elif "bug" in problem_lower or "pest" in problem_lower or "aphid" in problem_lower or "insect" in problem_lower:
            treatment.append("Spray foliage with insecticidal soap or neem oil spray focusing on leaf undersides.")
            prevention.append("Install yellow sticky traps across the field perimeter to monitor insect populations.")
        else:
            treatment.append("Maintain optimal soil moisture and balanced organic fertilization.")
            prevention.append("Use certified disease-resistant seeds for future plantings.")

        monitoring_items.append("Check leaf undersides every 3 days for pest larvae or fungal spores.")
        monitoring_items.append("Record soil moisture levels before morning watering.")

        expert_help.append("Seek expert guidance if symptoms persist after 7 days of treatment or affect > 25% of your crop area.")

        return {
            "immediate_actions": immediate_actions,
            "treatment": treatment,
            "prevention": prevention,
            "monitoring": {
                "next_check_days": 3,
                "what_to_check": monitoring_items
            },
            "when_to_seek_expert_help": expert_help
        }

recommendation_service = RecommendationService()
