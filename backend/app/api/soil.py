import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.models.user import User
from app.models.crop import Crop
from app.models.soil import SoilMeasurement
from app.schemas.soil import SoilCreate, SoilResponse
from app.schemas.common import success_response
from app.api.deps import get_current_user
from app.services.soil_analysis_service import soil_analysis_service

router = APIRouter(prefix="/crops", tags=["soil"])

@router.post("/{crop_id}/soil", response_model=dict)
async def create_soil_data(
    crop_id: uuid.UUID,
    soil_in: SoilCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Verify crop ownership with selectinload for farm
    stmt = select(Crop).options(selectinload(Crop.farm)).where(Crop.id == crop_id, Crop.user_id == current_user.id)
    res = await db.execute(stmt)
    crop = res.scalar_one_or_none()
    if not crop:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Crop not found or unauthorized.")

    soil_type_val = soil_in.soil_type or (crop.farm.soil_type if crop.farm else "Loamy")

    db_soil = SoilMeasurement(
        crop_id=crop_id,
        user_id=current_user.id,
        ph=soil_in.ph,
        nitrogen=soil_in.nitrogen,
        phosphorus=soil_in.phosphorus,
        potassium=soil_in.potassium,
        organic_carbon=soil_in.organic_carbon,
        moisture=soil_in.moisture,
        ec_salinity=soil_in.ec_salinity,
        temperature=soil_in.temperature,
        soil_type=soil_type_val
    )
    db.add(db_soil)
    await db.commit()
    await db.refresh(db_soil)

    analysis_res = soil_analysis_service.evaluate_soil(soil_in.model_dump())
    soil_resp = SoilResponse.model_validate(db_soil).model_dump(mode="json")
    soil_resp["analysis"] = analysis_res

    return success_response(soil_resp)

@router.get("/{crop_id}/soil", response_model=dict)
async def get_soil_data(
    crop_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Verify crop ownership
    stmt = select(Crop).where(Crop.id == crop_id, Crop.user_id == current_user.id)
    res = await db.execute(stmt)
    crop = res.scalar_one_or_none()
    if not crop:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Crop not found or unauthorized.")

    stmt_soil = select(SoilMeasurement).where(SoilMeasurement.crop_id == crop_id).order_by(SoilMeasurement.created_at.desc())
    res_soil = await db.execute(stmt_soil)
    measurements = res_soil.scalars().all()

    resp = []
    for m in measurements:
        m_dict = SoilResponse.model_validate(m).model_dump(mode="json")
        m_dict["analysis"] = soil_analysis_service.evaluate_soil(m_dict)
        resp.append(m_dict)

    return success_response(resp)
