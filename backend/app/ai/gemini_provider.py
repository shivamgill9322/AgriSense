import json
import logging
from typing import Dict, Any
from app.core.config import settings
from app.ai.base import VisionProvider, SpeechProvider, ReasoningProvider
from app.ai.mock_provider import MockVisionProvider, MockSpeechProvider, MockReasoningProvider
from app.ai.prompts import MULTIMODAL_REASONING_SYSTEM_PROMPT, FOLLOWUP_COMPARISON_SYSTEM_PROMPT

logger = logging.getLogger(__name__)

class GeminiVisionProvider(VisionProvider):
    def __init__(self):
        self.mock_fallback = MockVisionProvider()
        if settings.GEMINI_API_KEY:
            try:
                import google.generativeai as genai
                genai.configure(api_key=settings.GEMINI_API_KEY)
                self.model = genai.GenerativeModel(settings.VISION_MODEL)
                self.configured = True
            except Exception as e:
                logger.warning(f"Failed to initialize Gemini SDK: {e}. Falling back to mock provider.")
                self.configured = False
        else:
            self.configured = False

    async def analyze_crop_image(self, image_bytes: bytes, filename: str = "") -> Dict[str, Any]:
        if not self.configured:
            return await self.mock_fallback.analyze_crop_image(image_bytes, filename)
        
        try:
            import google.generativeai as genai
            image_part = {
                "mime_type": "image/jpeg",
                "data": image_bytes
            }
            prompt = "Identify the crop species, detect any disease/pest damage, and return JSON with keys: crop, diagnosis, visual_symptoms."
            response = self.model.generate_content([prompt, image_part])
            
            # Parse JSON response
            text = response.text
            clean_json = text.replace("```json", "").replace("```", "").strip()
            data = json.loads(clean_json)
            return data
        except Exception as e:
            logger.error(f"Gemini Vision API error: {e}. Using fallback.")
            return await self.mock_fallback.analyze_crop_image(image_bytes, filename)

class GeminiSpeechProvider(SpeechProvider):
    def __init__(self):
        self.mock_fallback = MockSpeechProvider()

    async def transcribe_audio(self, audio_bytes: bytes, filename: str = "") -> Dict[str, Any]:
        # Gemini/Whisper speech fallback
        return await self.mock_fallback.transcribe_audio(audio_bytes, filename)

class GeminiReasoningProvider(ReasoningProvider):
    def __init__(self):
        self.mock_fallback = MockReasoningProvider()
        if settings.GEMINI_API_KEY:
            try:
                import google.generativeai as genai
                genai.configure(api_key=settings.GEMINI_API_KEY)
                self.model = genai.GenerativeModel(settings.REASONING_MODEL)
                self.configured = True
            except Exception as e:
                logger.warning(f"Failed to initialize Gemini Reasoning: {e}")
                self.configured = False
        else:
            self.configured = False

    async def analyze_multimodal_context(self, context: Dict[str, Any]) -> Dict[str, Any]:
        if not self.configured:
            return await self.mock_fallback.analyze_multimodal_context(context)

        try:
            prompt = f"{MULTIMODAL_REASONING_SYSTEM_PROMPT}\n\nEVIDENCE CONTEXT:\n{json.dumps(context, indent=2)}"
            response = self.model.generate_content(prompt)
            clean_json = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_json)
        except Exception as e:
            logger.error(f"Gemini Reasoning error: {e}. Using fallback.")
            return await self.mock_fallback.analyze_multimodal_context(context)

    async def analyze_followup_comparison(
        self,
        original_diagnosis: Dict[str, Any],
        followup_context: Dict[str, Any]
    ) -> Dict[str, Any]:
        if not self.configured:
            return await self.mock_fallback.analyze_followup_comparison(original_diagnosis, followup_context)

        try:
            prompt = f"{FOLLOWUP_COMPARISON_SYSTEM_PROMPT}\n\nORIGINAL DIAGNOSIS:\n{json.dumps(original_diagnosis, indent=2)}\n\nFOLLOW-UP EVIDENCE:\n{json.dumps(followup_context, indent=2)}"
            response = self.model.generate_content(prompt)
            clean_json = response.text.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_json)
        except Exception as e:
            logger.error(f"Gemini Followup error: {e}. Using fallback.")
            return await self.mock_fallback.analyze_followup_comparison(original_diagnosis, followup_context)
