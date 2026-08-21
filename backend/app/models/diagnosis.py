import uuid
from datetime import datetime, timezone
from typing import List, TYPE_CHECKING, Optional
from sqlalchemy import String, Float, Text, DateTime, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.crop import Crop
    from app.models.recommendation import Recommendation
    from app.models.followup import Followup

class Diagnosis(Base):
    __tablename__ = "diagnoses"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    crop_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("crops.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    photo_url: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    
    crop_identified: Mapped[str] = mapped_column(String(100), nullable=False, default="Unknown Crop")
    crop_confidence: Mapped[float] = mapped_column(Float, nullable=False, default=0.90)
    
    primary_problem: Mapped[str] = mapped_column(String(255), nullable=False, default="Healthy")
    problem_category: Mapped[str] = mapped_column(String(100), nullable=False, default="disease") # disease, pest, fungal, bacterial, viral, nutrient, water, heat, cold, physical, unknown
    severity: Mapped[str] = mapped_column(String(50), nullable=False, default="mild") # none, mild, moderate, severe, critical, unknown
    
    confidence_score: Mapped[float] = mapped_column(Float, nullable=False, default=0.85)
    confidence_level: Mapped[str] = mapped_column(String(50), nullable=False, default="high") # high, medium, low
    
    reasoning_summary: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    raw_output_json: Mapped[dict] = mapped_column(JSON, nullable=True, default=dict)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    owner: Mapped["User"] = relationship("User", back_populates="diagnoses")
    crop: Mapped["Crop"] = relationship("Crop", back_populates="diagnoses")
    evidence: Mapped[List["DiagnosisEvidence"]] = relationship("DiagnosisEvidence", back_populates="diagnosis", cascade="all, delete-orphan")
    recommendation: Mapped[Optional["Recommendation"]] = relationship("Recommendation", back_populates="diagnosis", uselist=False, cascade="all, delete-orphan")
    followups: Mapped[List["Followup"]] = relationship("Followup", back_populates="diagnosis", cascade="all, delete-orphan")

class DiagnosisEvidence(Base):
    __tablename__ = "diagnosis_evidence"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    diagnosis_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("diagnoses.id", ondelete="CASCADE"), nullable=False, index=True)
    evidence_type: Mapped[str] = mapped_column(String(100), nullable=False) # photo, voice, soil, history
    description: Mapped[str] = mapped_column(Text, nullable=False)
    source: Mapped[str] = mapped_column(String(100), nullable=True, default="multimodal")
    weight: Mapped[float] = mapped_column(Float, nullable=True, default=1.0)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    diagnosis: Mapped["Diagnosis"] = relationship("Diagnosis", back_populates="evidence")
