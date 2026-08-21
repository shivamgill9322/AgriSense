import uuid
from datetime import datetime, timezone
from typing import TYPE_CHECKING
from sqlalchemy import DateTime, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

if TYPE_CHECKING:
    from app.models.diagnosis import Diagnosis

class Recommendation(Base):
    __tablename__ = "recommendations"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    diagnosis_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("diagnoses.id", ondelete="CASCADE"), nullable=False, index=True)
    
    immediate_actions_json: Mapped[list] = mapped_column(JSON, nullable=True, default=list)
    treatment_json: Mapped[list] = mapped_column(JSON, nullable=True, default=list)
    prevention_json: Mapped[list] = mapped_column(JSON, nullable=True, default=list)
    monitoring_json: Mapped[dict] = mapped_column(JSON, nullable=True, default=dict)
    when_to_seek_expert_json: Mapped[list] = mapped_column(JSON, nullable=True, default=list)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    diagnosis: Mapped["Diagnosis"] = relationship("Diagnosis", back_populates="recommendation")
