import uuid
from datetime import datetime
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field, ConfigDict

class FollowupChanges(BaseModel):
    damage: str = "decreased"
    symptoms: str = "improved"
    new_damage: bool = False
    details: Optional[str] = None

class FollowupCreate(BaseModel):
    photo_url: Optional[str] = None
    voice_url: Optional[str] = None
    voice_transcript: Optional[str] = None
    symptom_text: Optional[str] = None

class FollowupResponse(BaseModel):
    id: uuid.UUID
    diagnosis_id: uuid.UUID
    user_id: uuid.UUID
    photo_url: Optional[str] = None
    status: str
    confidence: float = Field(..., alias="confidence_score")
    changes: FollowupChanges
    recommendation: Optional[str] = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
