import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict

class SoilCreate(BaseModel):
    ph: float = Field(default=6.5, ge=0.0, le=14.0, description="pH level (0-14)")
    nitrogen: float = Field(default=45.0, ge=0.0, le=500.0, description="Nitrogen level mg/kg")
    phosphorus: float = Field(default=30.0, ge=0.0, le=300.0, description="Phosphorus level mg/kg")
    potassium: float = Field(default=40.0, ge=0.0, le=600.0, description="Potassium level mg/kg")
    organic_carbon: Optional[float] = Field(default=0.75, ge=0.0, le=20.0, description="Organic carbon %")
    moisture: float = Field(default=55.0, ge=0.0, le=100.0, description="Moisture percentage (0-100%)")
    ec_salinity: Optional[float] = Field(default=1.2, ge=0.0, le=30.0, description="Electrical conductivity dS/m")
    temperature: Optional[float] = Field(default=24.0, ge=-20.0, le=60.0, description="Soil temperature °C")
    soil_type: Optional[str] = Field(default="Loamy", description="Soil texture classification")

class SoilResponse(BaseModel):
    id: uuid.UUID
    crop_id: uuid.UUID
    user_id: uuid.UUID
    ph: float
    nitrogen: float
    phosphorus: float
    potassium: float
    organic_carbon: Optional[float] = 0.75
    moisture: float
    ec_salinity: Optional[float] = 1.2
    temperature: Optional[float] = 24.0
    soil_type: Optional[str] = "Loamy"
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
