import re
from typing import Dict, Any, List
from app.ai.factory import get_speech_provider

class VoiceService:
    async def process_voice_audio(self, audio_bytes: bytes, filename: str = "") -> Dict[str, Any]:
        speech_provider = get_speech_provider()
        res = await speech_provider.transcribe_audio(audio_bytes, filename)
        
        transcript = res.get("transcript", "")
        extracted = res.get("extracted_symptoms") or self.extract_structured_symptoms(transcript)
        
        return {
            "transcript": transcript,
            "language": res.get("language", "en"),
            "extracted_symptoms": extracted
        }

    def extract_structured_symptoms(self, transcript: str) -> Dict[str, Any]:
        text_lower = transcript.lower()
        
        symptoms: List[str] = []
        observed_pests: List[str] = []
        location = None
        duration = None

        # Check symptoms
        if "yellow" in text_lower or "chlorosis" in text_lower:
            symptoms.append("yellow leaves")
        if "brown" in text_lower or "spot" in text_lower or "lesion" in text_lower:
            symptoms.append("leaf spots / browning")
        if "wilt" in text_lower or "dry" in text_lower:
            symptoms.append("wilting foliage")

        # Check pests
        if "insect" in text_lower or "bug" in text_lower or "aphid" in text_lower or "worm" in text_lower:
            observed_pests.append("pests / insects on foliage")
        if "fly" in text_lower or "whitefly" in text_lower:
            observed_pests.append("whiteflies")

        # Check location
        if "under" in text_lower or "underside" in text_lower:
            location = "underside of leaves"
        elif "top" in text_lower or "upper" in text_lower:
            location = "upper surface of leaves"
        elif "stem" in text_lower:
            location = "stem and stalk"

        # Check duration
        duration_match = re.search(r"(\d+)\s*(day|days|week|weeks)", text_lower)
        if duration_match:
            duration = f"{duration_match.group(1)} {duration_match.group(2)}"

        return {
            "symptoms": symptoms if symptoms else ["unspecified symptom"],
            "duration": duration or "recent",
            "observed_pests": observed_pests,
            "location": location or "leaves",
            "additional_notes": []
        }

voice_service = VoiceService()
