import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.user import User
from app.models.crop import Crop
from app.schemas.crop import CropCreate, CropUpdate, CropResponse
from app.schemas.common import success_response
from app.api.deps import get_current_user

router = APIRouter(prefix="/crops", tags=["crops"])

@router.post("", response_model=dict)
async def create_crop(
    crop_in: CropCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    db_crop = Crop(
        user_id=current_user.id,
        farm_id=crop_in.farm_id,
        crop_type=crop_in.crop_type,
        variety=crop_in.variety or "",
        planting_date=crop_in.planting_date,
        growth_stage=crop_in.growth_stage or "Vegetative",
        crop_metadata=crop_in.crop_metadata or {}
    )
    db.add(db_crop)
    await db.commit()
    await db.refresh(db_crop)
    
    resp = CropResponse.model_validate(db_crop).model_dump(mode="json")
    return success_response(resp)

@router.get("", response_model=dict)
async def list_crops(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Crop).where(Crop.user_id == current_user.id).order_by(Crop.created_at.desc())
    res = await db.execute(stmt)
    crops = res.scalars().all()
    
    resp = [CropResponse.model_validate(c).model_dump(mode="json") for c in crops]
    return success_response(resp)

@router.get("/{crop_id}", response_model=dict)
async def get_crop(
    crop_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Crop).where(Crop.id == crop_id, Crop.user_id == current_user.id)
    res = await db.execute(stmt)
    crop = res.scalar_one_or_none()
    
    if not crop:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Crop not found or unauthorized.")
        
    resp = CropResponse.model_validate(crop).model_dump(mode="json")
    return success_response(resp)

@router.patch("/{crop_id}", response_model=dict)
async def update_crop(
    crop_id: uuid.UUID,
    crop_in: CropUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Crop).where(Crop.id == crop_id, Crop.user_id == current_user.id)
    res = await db.execute(stmt)
    crop = res.scalar_one_or_none()
    
    if not crop:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Crop not found or unauthorized.")

    update_data = crop_in.model_dump(exclude_unset=True)
    for field, val in update_data.items():
        setattr(crop, field, val)
        
    await db.commit()
    await db.refresh(crop)
    
    resp = CropResponse.model_validate(crop).model_dump(mode="json")
    return success_response(resp)

@router.delete("/{crop_id}", response_model=dict)
async def delete_crop(
    crop_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Crop).where(Crop.id == crop_id, Crop.user_id == current_user.id)
    res = await db.execute(stmt)
    crop = res.scalar_one_or_none()
    
    if not crop:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Crop not found or unauthorized.")

    await db.delete(crop)
    await db.commit()
    
    return success_response({"deleted": True, "id": str(crop_id)})
