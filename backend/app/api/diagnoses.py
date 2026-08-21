import uuid
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.user import User
from app.models.crop import Crop
from app.models.soil import SoilMeasurement
from app.models.diagnosis import Diagnosis, DiagnosisEvidence
from app.models.recommendation import Recommendation
from app.schemas.diagnosis import DiagnosisResponse
from app.schemas.common import success_response
from app.api.deps import get_current_user
from app.storage.file_storage import storage_provider
from app.services.voice_service import voice_service
from app.services.multimodal_service import multimodal_service

router = APIRouter(prefix="", tags=["diagnoses"])

@router.post("/crops/{crop_id}/diagnose", response_model=dict)
async def create_crop_diagnosis(
    crop_id: uuid.UUID,
    photo: Optional[UploadFile] = File(None),
    photo_url_input: Optional[str] = Form(None),
    voice_file: Optional[UploadFile] = File(None),
    symptom_text: Optional[str] = Form(None),
    ph: Optional[float] = Form(None),
    nitrogen: Optional[float] = Form(None),
    phosphorus: Optional[float] = Form(None),
    potassium: Optional[float] = Form(None),
    moisture: Optional[float] = Form(None),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # 1. Validate Crop Ownership
    from sqlalchemy.orm import selectinload
    stmt = select(Crop).options(selectinload(Crop.farm)).where(Crop.id == crop_id, Crop.user_id == current_user.id)
    res = await db.execute(stmt)
    crop = res.scalar_one_or_none()
    if not crop:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Crop not found or unauthorized.")

    # 2. Handle Photo Storage
    saved_photo_url = photo_url_input or "/images/image11.jpg"
    photo_bytes = b""
    if photo:
        photo_bytes = await photo.read()
        saved_photo_url, _, _ = await storage_provider.save_file(photo, subfolder="photos")

    # 3. Handle Voice Processing
    voice_obs = {}
    voice_url = None
    if voice_file:
        voice_url, safe_aud_name, _ = await storage_provider.save_file(voice_file, subfolder="audio")
        aud_bytes = await voice_file.read()
        voice_obs = await voice_service.process_voice_audio(aud_bytes, safe_aud_name)
    elif symptom_text:
        voice_obs = voice_service.extract_structured_symptoms(symptom_text)
        voice_obs["transcript"] = symptom_text

    # 4. Fetch / Merge Soil Measurement
    stmt_soil = select(SoilMeasurement).where(SoilMeasurement.crop_id == crop_id).order_by(SoilMeasurement.created_at.desc())
    res_soil = await db.execute(stmt_soil)
    latest_soil = res_soil.scalar_one_or_none()

    soil_data = {
        "ph": ph if ph is not None else (latest_soil.ph if latest_soil else 6.5),
        "nitrogen": nitrogen if nitrogen is not None else (latest_soil.nitrogen if latest_soil else 45.0),
        "phosphorus": phosphorus if phosphorus is not None else (latest_soil.phosphorus if latest_soil else 30.0),
        "potassium": potassium if potassium is not None else (latest_soil.potassium if latest_soil else 40.0),
        "moisture": moisture if moisture is not None else (latest_soil.moisture if latest_soil else 55.0),
        "soil_type": crop.farm.soil_type if (crop.farm and crop.farm.soil_type) else "Loamy"
    }

    # 5. Fetch Diagnostic History
    stmt_hist = select(Diagnosis).where(Diagnosis.crop_id == crop_id).order_by(Diagnosis.created_at.desc())
    res_hist = await db.execute(stmt_hist)
    hist_diagnoses = [d.primary_problem for d in res_hist.scalars().all()[:5]]

    # 6. Execute Multimodal AI Pipeline
    crop_context = {
        "crop_type": crop.crop_type,
        "variety": crop.variety,
        "growth_stage": crop.growth_stage
    }
    farm_context = {
        "name": crop.farm.name if crop.farm else "Field",
        "location": crop.farm.location if crop.farm else "",
        "soil_type": soil_data["soil_type"]
    }

    result_json = await multimodal_service.execute_diagnosis_pipeline(
        image_bytes=photo_bytes,
        filename=photo.filename if photo else "crop.jpg",
        voice_obs=voice_obs,
        soil_data=soil_data,
        crop_context=crop_context,
        farm_context=farm_context,
        previous_diagnoses=hist_diagnoses
    )

    # 7. Persist Diagnosis Record
    db_diagnosis = Diagnosis(
        crop_id=crop_id,
        user_id=current_user.id,
        photo_url=saved_photo_url,
        crop_identified=result_json["crop"]["name"],
        crop_confidence=result_json["crop"]["confidence"],
        primary_problem=result_json["diagnosis"]["primary_problem"],
        problem_category=result_json["diagnosis"]["category"],
        severity=result_json["diagnosis"]["severity"],
        confidence_score=result_json["confidence_assessment"]["confidence"],
        confidence_level=result_json["confidence_assessment"]["level"],
        reasoning_summary=f"Identified {result_json['diagnosis']['primary_problem']} with severity {result_json['diagnosis']['severity']}.",
        raw_output_json=result_json
    )
    db.add(db_diagnosis)
    await db.commit()
    await db.refresh(db_diagnosis)

    # 8. Persist Evidence Items
    for item in result_json.get("evidence", []):
        db_ev = DiagnosisEvidence(
            diagnosis_id=db_diagnosis.id,
            evidence_type=item.get("evidence_type", "photo"),
            description=item.get("description", "Visual symptom analysis"),
            source=item.get("source", "multimodal"),
            weight=item.get("weight", 1.0)
        )
        db.add(db_ev)

    # 9. Persist Recommendations
    rec_plan = result_json.get("recommendations", {})
    db_rec = Recommendation(
        diagnosis_id=db_diagnosis.id,
        immediate_actions_json=rec_plan.get("immediate_actions", []),
        treatment_json=rec_plan.get("treatment", []),
        prevention_json=rec_plan.get("prevention", []),
        monitoring_json=rec_plan.get("monitoring", {}),
        when_to_seek_expert_json=rec_plan.get("when_to_seek_expert_help", [])
    )
    db.add(db_rec)
    await db.commit()
    await db.refresh(db_diagnosis)

    # 10. Format and Return Output
    output_resp = {
        "id": str(db_diagnosis.id),
        "crop_id": str(crop_id),
        "user_id": str(current_user.id),
        "photo_url": saved_photo_url,
        "crop_identified": db_diagnosis.crop_identified,
        "crop_confidence": db_diagnosis.crop_confidence,
        "primary_problem": db_diagnosis.primary_problem,
        "problem_category": db_diagnosis.problem_category,
        "severity": db_diagnosis.severity,
        "confidence_score": db_diagnosis.confidence_score,
        "confidence_level": db_diagnosis.confidence_level,
        "reasoning_summary": db_diagnosis.reasoning_summary,
        "structured_output": result_json,
        "created_at": db_diagnosis.created_at.isoformat(),
        "updated_at": db_diagnosis.updated_at.isoformat()
    }

    return success_response(output_resp)

@router.get("/diagnoses/{diagnosis_id}", response_model=dict)
async def get_diagnosis_by_id(
    diagnosis_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    stmt = select(Diagnosis).where(Diagnosis.id == diagnosis_id, Diagnosis.user_id == current_user.id)
    res = await db.execute(stmt)
    db_diagnosis = res.scalar_one_or_none()
    
    if not db_diagnosis:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Diagnosis record not found or unauthorized.")

    output_resp = {
        "id": str(db_diagnosis.id),
        "crop_id": str(db_diagnosis.crop_id),
        "user_id": str(current_user.id),
        "photo_url": db_diagnosis.photo_url,
        "crop_identified": db_diagnosis.crop_identified,
        "crop_confidence": db_diagnosis.crop_confidence,
        "primary_problem": db_diagnosis.primary_problem,
        "problem_category": db_diagnosis.problem_category,
        "severity": db_diagnosis.severity,
        "confidence_score": db_diagnosis.confidence_score,
        "confidence_level": db_diagnosis.confidence_level,
        "reasoning_summary": db_diagnosis.reasoning_summary,
        "structured_output": db_diagnosis.raw_output_json,
        "created_at": db_diagnosis.created_at.isoformat(),
        "updated_at": db_diagnosis.updated_at.isoformat()
    }
    return success_response(output_resp)

@router.get("/crops/{crop_id}/diagnoses", response_model=dict)
async def list_crop_diagnoses(
    crop_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Verify crop ownership
    stmt_crop = select(Crop).where(Crop.id == crop_id, Crop.user_id == current_user.id)
    res_crop = await db.execute(stmt_crop)
    if not res_crop.scalar_one_or_none():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Crop not found or unauthorized.")

    stmt = select(Diagnosis).where(Diagnosis.crop_id == crop_id).order_by(Diagnosis.created_at.desc())
    res = await db.execute(stmt)
    records = res.scalars().all()

    output_list = []
    for d in records:
        output_list.append({
            "id": str(d.id),
            "crop_id": str(d.crop_id),
            "user_id": str(d.user_id),
            "photo_url": d.photo_url,
            "crop_identified": d.crop_identified,
            "primary_problem": d.primary_problem,
            "severity": d.severity,
            "confidence_score": d.confidence_score,
            "created_at": d.created_at.isoformat()
        })
    return success_response(output_list)
