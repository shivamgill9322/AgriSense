import uuid
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.user import User
from app.models.diagnosis import Diagnosis
from app.models.followup import Followup
from app.schemas.followup import FollowupResponse
from app.schemas.common import success_response
from app.api.deps import get_current_user
from app.storage.file_storage import storage_provider
from app.services.voice_service import voice_service
from app.services.followup_service import followup_service

router = APIRouter(prefix="/diagnoses", tags=["followups"])

@router.post("/{diagnosis_id}/followup", response_model=dict)
async def create_followup(
    diagnosis_id: uuid.UUID,
    photo: Optional[UploadFile] = File(None),
    photo_url_input: Optional[str] = Form(None),
    voice_file: Optional[UploadFile] = File(None),
    symptom_text: Optional[str] = Form(None),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # 1. Validate Diagnosis ownership
    stmt = select(Diagnosis).where(Diagnosis.id == diagnosis_id, Diagnosis.user_id == current_user.id)
    res = await db.execute(stmt)
    diagnosis = res.scalar_one_or_none()
    if not diagnosis:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Original diagnosis not found or unauthorized.")

    # 2. Store Follow-up Photo
    saved_photo_url = photo_url_input
    if photo:
        saved_photo_url, _, _ = await storage_provider.save_file(photo, subfolder="photos")

    # 3. Process Follow-up Voice
    voice_obs = {}
    voice_url = None
    if voice_file:
        voice_url, safe_aud_name, _ = await storage_provider.save_file(voice_file, subfolder="audio")
        aud_bytes = await voice_file.read()
        voice_obs = await voice_service.process_voice_audio(aud_bytes, safe_aud_name)
    elif symptom_text:
        voice_obs = voice_service.extract_structured_symptoms(symptom_text)
        voice_obs["transcript"] = symptom_text

    # 4. Perform Before vs After AI Comparison
    original_dict = {
        "crop_identified": diagnosis.crop_identified,
        "primary_problem": diagnosis.primary_problem,
        "severity": diagnosis.severity,
        "raw_output": diagnosis.raw_output_json
    }

    comparison_res = await followup_service.process_followup_analysis(
        original_diagnosis=original_dict,
        followup_photo_url=saved_photo_url,
        followup_voice_obs=voice_obs
    )

    # 5. Persist Follow-up Record
    db_followup = Followup(
        diagnosis_id=diagnosis_id,
        user_id=current_user.id,
        photo_url=saved_photo_url,
        audio_url=voice_url,
        transcript=voice_obs.get("transcript"),
        symptom_text=symptom_text,
        status=comparison_res.get("status", "improved"),
        confidence_score=comparison_res.get("confidence", 0.90),
        changes_json=comparison_res.get("changes", {}),
        recommendation_text=comparison_res.get("recommendation", "")
    )
    db.add(db_followup)
    await db.commit()
    await db.refresh(db_followup)

    resp = {
        "id": str(db_followup.id),
        "diagnosis_id": str(diagnosis_id),
        "user_id": str(current_user.id),
        "photo_url": db_followup.photo_url,
        "status": db_followup.status,
        "confidence": db_followup.confidence_score,
        "changes": db_followup.changes_json,
        "recommendation": db_followup.recommendation_text,
        "created_at": db_followup.created_at.isoformat()
    }

    return success_response(resp)

@router.get("/{diagnosis_id}/followups", response_model=dict)
async def list_followups_for_diagnosis(
    diagnosis_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    stmt_diag = select(Diagnosis).where(Diagnosis.id == diagnosis_id, Diagnosis.user_id == current_user.id)
    res_diag = await db.execute(stmt_diag)
    if not res_diag.scalar_one_or_none():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Diagnosis record not found or unauthorized.")

    stmt = select(Followup).where(Followup.diagnosis_id == diagnosis_id).order_by(Followup.created_at.desc())
    res = await db.execute(stmt)
    records = res.scalars().all()

    output_list = []
    for f in records:
        output_list.append({
            "id": str(f.id),
            "diagnosis_id": str(f.diagnosis_id),
            "photo_url": f.photo_url,
            "status": f.status,
            "confidence": f.confidence_score,
            "changes": f.changes_json,
            "recommendation": f.recommendation_text,
            "created_at": f.created_at.isoformat()
        })
    return success_response(output_list)
