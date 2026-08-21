import uuid
from datetime import datetime, date
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field, ConfigDict

class CropCreate(BaseModel):
    crop_type: str = Field(..., min_length=1, max_length=100)
    farm_id: Optional[uuid.UUID] = None
    variety: Optional[str] = ""
    planting_date: Optional[date] = None
    growth_stage: Optional[str] = "Vegetative"
    crop_metadata: Optional[Dict[str, Any]] = None

class CropUpdate(BaseModel):
    crop_type: Optional[str] = None
    farm_id: Optional[uuid.UUID] = None
    variety: Optional[str] = None
    planting_date: Optional[date] = None
    growth_stage: Optional[str] = None
    crop_metadata: Optional[Dict[str, Any]] = None

class CropResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    farm_id: Optional[uuid.UUID] = None
    crop_type: str
    variety: Optional[str] = ""
    planting_date: Optional[date] = None
    growth_stage: Optional[str] = "Vegetative"
    crop_metadata: Optional[Dict[str, Any]] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
