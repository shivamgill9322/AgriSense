import os
from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "AgriSense AI Backend"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "AGRISENSE_SECRET_KEY_SUPER_SECURE_JWT_TOKEN_KEY_CHANGE_IN_PRODUCTION"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    ALGORITHM: str = "HS256"

    # Database
    POSTGRES_SERVER: str = "localhost"
    POSTGRES_PORT: str = "5432"
    POSTGRES_USER: str = "agri_user"
    POSTGRES_PASSWORD: str = "agri_password"
    POSTGRES_DB: str = "agrisense_db"
    DATABASE_URL: Union[str, None] = None

    # Storage
    STORAGE_TYPE: str = "local"  # 'local' or 's3'
    UPLOAD_DIR: str = "uploads"

    # AI Configuration
    AI_PROVIDER: str = "mock"  # 'gemini', 'openai', or 'mock'
    GEMINI_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    VISION_MODEL: str = "gemini-1.5-flash"
    SPEECH_MODEL: str = "whisper-1"
    REASONING_MODEL: str = "gemini-1.5-pro"

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ]

    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env", extra="allow")

    @field_validator("DATABASE_URL", mode="before")
    def assemble_db_connection(cls, v: Union[str, None], info) -> str:
        if isinstance(v, str) and v.strip():
            return v
        data = info.data
        return f"postgresql+asyncpg://{data.get('POSTGRES_USER', 'agri_user')}:{data.get('POSTGRES_PASSWORD', 'agri_password')}@{data.get('POSTGRES_SERVER', 'localhost')}:{data.get('POSTGRES_PORT', '5432')}/{data.get('POSTGRES_DB', 'agrisense_db')}"

settings = Settings()
