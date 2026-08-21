from pydantic import BaseModel

class PhotoUploadResponse(BaseModel):
    photo_url: str
    filename: str
    content_type: str
    size_bytes: int
