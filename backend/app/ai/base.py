from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional

class VisionProvider(ABC):
    @abstractmethod
    async def analyze_crop_image(self, image_bytes: bytes, filename: str = "") -> Dict[str, Any]:
        """Identifies crop species, disease/pest damage, and severity from image bytes."""
        pass

class SpeechProvider(ABC):
    @abstractmethod
    async def transcribe_audio(self, audio_bytes: bytes, filename: str = "") -> Dict[str, Any]:
        """Transcribes audio file to text and extracts structured symptoms."""
        pass

class ReasoningProvider(ABC):
    @abstractmethod
    async def analyze_multimodal_context(self, context: Dict[str, Any]) -> Dict[str, Any]:
        """Performs multimodal reasoning combining image, voice, soil, crop, and farm context."""
        pass

    @abstractmethod
    async def analyze_followup_comparison(
        self,
        original_diagnosis: Dict[str, Any],
        followup_context: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Compares original diagnosis against follow-up evidence for Before vs After status."""
        pass
