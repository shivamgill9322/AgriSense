from typing import List, Dict, Any, Optional
from pydantic import BaseModel

class ExtractedSymptoms(BaseModel):
    symptoms: List[str] = []
    duration: Optional[str] = None
    observed_pests: List[str] = []
    location: Optional[str] = None
    additional_notes: List[str] = []

class VoiceTranscribeResponse(BaseModel):
    audio_url: str
    transcript: str
    language: str = "en"
    extracted_symptoms: ExtractedSymptoms
