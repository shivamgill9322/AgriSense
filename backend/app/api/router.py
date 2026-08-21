from fastapi import APIRouter
from app.api import auth, users, farms, crops, soil, photos, voice, diagnoses, followups

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(users.router)
api_router.include_router(farms.router)
api_router.include_router(crops.router)
api_router.include_router(soil.router)
api_router.include_router(photos.router)
api_router.include_router(voice.router)
api_router.include_router(diagnoses.router)
api_router.include_router(followups.router)
