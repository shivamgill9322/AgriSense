from typing import Dict, Any, List

class SoilAnalysisService:
    def evaluate_soil(self, soil_data: Dict[str, Any]) -> Dict[str, Any]:
        ph = soil_data.get("ph", 6.5)
        nitrogen = soil_data.get("nitrogen", 45.0)
        phosphorus = soil_data.get("phosphorus", 30.0)
        potassium = soil_data.get("potassium", 40.0)
        moisture = soil_data.get("moisture", 55.0)
        soil_type = soil_data.get("soil_type", "Loamy")

        ph_status = "Optimal"
        if ph < 5.8:
            ph_status = "Acidic"
        elif ph > 7.5:
            ph_status = "Alkaline"

        n_status = "Optimal"
        if nitrogen < 30:
            n_status = "Low / Deficient"
        elif nitrogen > 80:
            n_status = "Excessive"

        p_status = "Good"
        if phosphorus < 20:
            p_status = "Low"

        k_status = "Moderate"
        if potassium < 25:
            k_status = "Deficient"

        m_status = "Optimal"
        if moisture < 35:
            m_status = "Dry"
        elif moisture > 80:
            m_status = "Saturated"

        # Calculate overall score
        score = 100
        if ph < 5.8 or ph > 7.5: score -= 15
        if nitrogen < 30 or nitrogen > 80: score -= 15
        if phosphorus < 20: score -= 10
        if potassium < 25: score -= 10
        if moisture < 35 or moisture > 80: score -= 10
        score = max(50, min(98, score))

        return {
            "score": score,
            "soil_type": soil_type,
            "evaluations": {
                "ph": {"value": ph, "status": ph_status},
                "nitrogen": {"value": nitrogen, "status": n_status},
                "phosphorus": {"value": phosphorus, "status": p_status},
                "potassium": {"value": potassium, "status": k_status},
                "moisture": {"value": moisture, "status": m_status}
            }
        }

soil_analysis_service = SoilAnalysisService()
