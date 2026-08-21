import uuid
from datetime import datetime
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field, ConfigDict

class CropInfo(BaseModel):
    name: str = "Unknown Crop"
    confidence: float = 0.90

class DiagnosisDetail(BaseModel):
    primary_problem: str = "Healthy"
    category: str = "disease"
    severity: str = "mild"
    confidence: float = 0.85

class EvidenceItem(BaseModel):
    evidence_type: str
    description: str
    source: Optional[str] = "multimodal"
    weight: Optional[float] = 1.0

class MonitoringPlan(BaseModel):
    next_check_days: int = 3
    what_to_check: List[str] = []

class ActionPlan(BaseModel):
    immediate_actions: List[str] = []
    treatment: List[str] = []
    prevention: List[str] = []
    monitoring: MonitoringPlan = Field(default_factory=MonitoringPlan)
    when_to_seek_expert_help: List[str] = []

class ConfidenceResult(BaseModel):
    confidence: float = 0.85
    level: str = "high"
    reliability_factors: List[str] = []
    uncertainty_factors: List[str] = []

class DiagnosisCreate(BaseModel):
    photo_url: Optional[str] = None
    voice_url: Optional[str] = None
    voice_transcript: Optional[str] = None
    symptom_text: Optional[str] = None

class StructuredDiagnosisOutput(BaseModel):
    crop: CropInfo
    diagnosis: DiagnosisDetail
    symptoms: List[str] = []
    evidence: List[EvidenceItem] = []
    alternative_diagnoses: List[Dict[str, Any]] = []
    recommendations: ActionPlan = Field(default_factory=ActionPlan)
    confidence_assessment: ConfidenceResult = Field(default_factory=ConfidenceResult)
    additional_information_needed: List[str] = []

class DiagnosisResponse(BaseModel):
    id: uuid.UUID
    crop_id: uuid.UUID
    user_id: uuid.UUID
    photo_url: Optional[str] = None
    crop_identified: str
    crop_confidence: float
    primary_problem: str
    problem_category: str
    severity: str
    confidence_score: float
    confidence_level: str
    reasoning_summary: Optional[str] = None
    structured_output: StructuredDiagnosisOutput
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
