import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.user import User
from app.models.farm import Farm
from app.schemas.farm import FarmCreate, FarmUpdate, FarmResponse
from app.schemas.common import success_response
from app.api.deps import get_current_user

router = APIRouter(prefix="/farms", tags=["farms"])

@router.post("", response_model=dict)
async def create_farm(
    farm_in: FarmCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    db_farm = Farm(
        user_id=current_user.id,
        name=farm_in.name,
        location=farm_in.location,
        latitude=farm_in.latitude,
        longitude=farm_in.longitude,
        area=farm_in.area,
        soil_type=farm_in.soil_type
    )
    db.add(db_farm)
    await db.commit()
    await db.refresh(db_farm)
    
    resp = FarmResponse.model_validate(db_farm).model_dump(mode="json")
    return success_response(resp)

@router.get("", response_model=dict)
async def list_farms(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Farm).where(Farm.user_id == current_user.id).order_by(Farm.created_at.desc())
    res = await db.execute(stmt)
    farms = res.scalars().all()
    
    resp = [FarmResponse.model_validate(f).model_dump(mode="json") for f in farms]
    return success_response(resp)

@router.get("/{farm_id}", response_model=dict)
async def get_farm(
    farm_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Farm).where(Farm.id == farm_id, Farm.user_id == current_user.id)
    res = await db.execute(stmt)
    farm = res.scalar_one_or_none()
    
    if not farm:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Farm not found or unauthorized.")
        
    resp = FarmResponse.model_validate(farm).model_dump(mode="json")
    return success_response(resp)

@router.patch("/{farm_id}", response_model=dict)
async def update_farm(
    farm_id: uuid.UUID,
    farm_in: FarmUpdate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Farm).where(Farm.id == farm_id, Farm.user_id == current_user.id)
    res = await db.execute(stmt)
    farm = res.scalar_one_or_none()
    
    if not farm:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Farm not found or unauthorized.")

    update_data = farm_in.model_dump(exclude_unset=True)
    for field, val in update_data.items():
        setattr(farm, field, val)
        
    await db.commit()
    await db.refresh(farm)
    
    resp = FarmResponse.model_validate(farm).model_dump(mode="json")
    return success_response(resp)

@router.delete("/{farm_id}", response_model=dict)
async def delete_farm(
    farm_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Farm).where(Farm.id == farm_id, Farm.user_id == current_user.id)
    res = await db.execute(stmt)
    farm = res.scalar_one_or_none()
    
    if not farm:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Farm not found or unauthorized.")

    await db.delete(farm)
    await db.commit()
    
    return success_response({"deleted": True, "id": str(farm_id)})
