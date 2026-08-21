from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
from app.storage.file_storage import storage_provider
from app.schemas.photo import PhotoUploadResponse
from app.schemas.common import success_response
from app.models.user import User
from app.api.deps import get_current_user

router = APIRouter(prefix="/photos", tags=["photos"])

@router.post("/upload", response_model=dict)
async def upload_photo(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    if not file:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No file provided.")
        
    file_url, safe_filename, size_bytes = await storage_provider.save_file(file, subfolder="photos")
    
    resp = PhotoUploadResponse(
        photo_url=file_url,
        filename=safe_filename,
        content_type=file.content_type or "image/jpeg",
        size_bytes=size_bytes
    ).model_dump(mode="json")
    
    return success_response(resp)
