import uuid
from datetime import datetime, timezone, date
from typing import List, TYPE_CHECKING, Optional
from sqlalchemy import String, Date, DateTime, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.farm import Farm
    from app.models.soil import SoilMeasurement
    from app.models.observation import Observation
    from app.models.diagnosis import Diagnosis

class Crop(Base):
    __tablename__ = "crops"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    farm_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("farms.id", ondelete="SET NULL"), nullable=True, index=True)
    crop_type: Mapped[str] = mapped_column(String(100), nullable=False)  # Wheat, Rice, Tomato, Potato, etc.
    variety: Mapped[str] = mapped_column(String(100), nullable=True, default="")
    planting_date: Mapped[Optional[date]] = mapped_column(Date, nullable=True)
    growth_stage: Mapped[str] = mapped_column(String(100), nullable=True, default="Vegetative")  # Seedling, Vegetative, Flowering, Fruiting, Harvest
    crop_metadata: Mapped[dict] = mapped_column(JSON, nullable=True, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    owner: Mapped["User"] = relationship("User", back_populates="crops")
    farm: Mapped[Optional["Farm"]] = relationship("Farm", back_populates="crops")
    soil_measurements: Mapped[List["SoilMeasurement"]] = relationship("SoilMeasurement", back_populates="crop", cascade="all, delete-orphan")
    observations: Mapped[List["Observation"]] = relationship("Observation", back_populates="crop", cascade="all, delete-orphan")
    diagnoses: Mapped[List["Diagnosis"]] = relationship("Diagnosis", back_populates="crop", cascade="all, delete-orphan")
