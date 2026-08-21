import uuid
from datetime import datetime, timezone
from typing import TYPE_CHECKING
from sqlalchemy import Float, String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.core.database import Base

if TYPE_CHECKING:
    from app.models.crop import Crop

class SoilMeasurement(Base):
    __tablename__ = "soil_measurements"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    crop_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("crops.id", ondelete="CASCADE"), nullable=False, index=True)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    ph: Mapped[float] = mapped_column(Float, nullable=False, default=6.5)
    nitrogen: Mapped[float] = mapped_column(Float, nullable=False, default=45.0)       # mg/kg or ppm
    phosphorus: Mapped[float] = mapped_column(Float, nullable=False, default=30.0)     # mg/kg or ppm
    potassium: Mapped[float] = mapped_column(Float, nullable=False, default=40.0)      # mg/kg or ppm
    organic_carbon: Mapped[float] = mapped_column(Float, nullable=True, default=0.75)   # %
    moisture: Mapped[float] = mapped_column(Float, nullable=False, default=55.0)       # %
    ec_salinity: Mapped[float] = mapped_column(Float, nullable=True, default=1.2)      # dS/m
    temperature: Mapped[float] = mapped_column(Float, nullable=True, default=24.0)     # Celsius
    soil_type: Mapped[str] = mapped_column(String(100), nullable=True, default="Loamy")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    crop: Mapped["Crop"] = relationship("Crop", back_populates="soil_measurements")
