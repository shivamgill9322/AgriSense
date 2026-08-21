from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
from app.storage.file_storage import storage_provider
from app.services.voice_service import voice_service
from app.schemas.voice import VoiceTranscribeResponse
from app.schemas.common import success_response
from app.models.user import User
from app.api.deps import get_current_user

router = APIRouter(prefix="/voice", tags=["voice"])

@router.post("/transcribe", response_model=dict)
async def transcribe_voice(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    if not file:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No audio file provided.")
        
    file_url, safe_filename, size_bytes = await storage_provider.save_file(file, subfolder="audio")
    
    # Read audio bytes for transcription engine
    audio_bytes = await file.read()
    res = await voice_service.process_voice_audio(audio_bytes, safe_filename)
    
    resp = VoiceTranscribeResponse(
        audio_url=file_url,
        transcript=res.get("transcript", ""),
        language=res.get("language", "en"),
        extracted_symptoms=res.get("extracted_symptoms", {})
    ).model_dump(mode="json")
    
    return success_response(resp)
