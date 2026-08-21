import os
import uuid
import pathlib
import shutil
from abc import ABC, abstractmethod
from typing import Tuple
from fastapi import UploadFile, HTTPException, status
from app.core.config import settings

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}
ALLOWED_AUDIO_TYPES = {"audio/mpeg", "audio/mp3", "audio/wav", "audio/webm", "audio/ogg", "audio/m4a", "audio/x-m4a"}
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB

class FileStorageProvider(ABC):
    @abstractmethod
    async def save_file(self, file: UploadFile, subfolder: str = "photos") -> Tuple[str, str, int]:
        """Saves a file and returns (file_url, safe_filename, size_bytes)."""
        pass

class LocalFileStorage(FileStorageProvider):
    def __init__(self, upload_dir: str = settings.UPLOAD_DIR):
        self.upload_dir = pathlib.Path(upload_dir)
        self.upload_dir.mkdir(parents=True, exist_ok=True)

    async def save_file(self, file: UploadFile, subfolder: str = "photos") -> Tuple[str, str, int]:
        # Validate MIME type
        content_type = file.content_type.lower() if file.content_type else ""
        if subfolder == "photos" and content_type not in ALLOWED_IMAGE_TYPES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unsupported image format. Allowed formats: JPEG, PNG, WEBP."
            )
        elif subfolder == "audio" and content_type not in ALLOWED_AUDIO_TYPES and not content_type.startswith("audio/"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unsupported audio format. Allowed formats: MP3, WAV, WEBM, OGG, M4A."
            )

        # Generate safe random filename to prevent path traversal
        ext = pathlib.Path(file.filename or "file").suffix.lower()
        if not ext or len(ext) > 10:
            if "jpeg" in content_type or "jpg" in content_type:
                ext = ".jpg"
            elif "png" in content_type:
                ext = ".png"
            elif "webp" in content_type:
                ext = ".webp"
            elif "mp3" in content_type or "mpeg" in content_type:
                ext = ".mp3"
            elif "wav" in content_type:
                ext = ".wav"
            else:
                ext = ".bin"

        safe_filename = f"{uuid.uuid4().hex}{ext}"
        sub_path = self.upload_dir / subfolder
        sub_path.mkdir(parents=True, exist_ok=True)
        
        target_path = sub_path / safe_filename
        
        # Read content and validate file size
        contents = await file.read()
        size_bytes = len(contents)
        
        if size_bytes > MAX_FILE_SIZE_BYTES:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"File size exceeds maximum allowed limit of {MAX_FILE_SIZE_BYTES // (1024*1024)} MB."
            )

        # Write to disk
        with open(target_path, "wb") as f:
            f.write(contents)

        file_url = f"/uploads/{subfolder}/{safe_filename}"
        return file_url, safe_filename, size_bytes

def get_storage_provider() -> FileStorageProvider:
    if settings.STORAGE_TYPE == "s3":
        # S3 storage implementation placeholder if needed
        return LocalFileStorage()
    return LocalFileStorage()

storage_provider = get_storage_provider()
