import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

class FarmCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    location: Optional[str] = ""
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    area: Optional[float] = Field(default=1.0, ge=0.0)
    soil_type: Optional[str] = "Loamy"

class FarmUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    area: Optional[float] = None
    soil_type: Optional[str] = None

class FarmResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    name: str
    location: Optional[str] = ""
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    area: Optional[float] = 1.0
    soil_type: Optional[str] = "Loamy"
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
