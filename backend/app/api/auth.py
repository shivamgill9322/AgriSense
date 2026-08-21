from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import get_password_hash, verify_password, create_access_token
from app.models.user import User
from app.schemas.auth import UserRegister, UserLogin, Token, UserResponse
from app.schemas.common import success_response, error_response
from app.api.deps import get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=dict)
async def register(user_in: UserRegister, db: AsyncSession = Depends(get_db)):
    # Check existing user
    stmt = select(User).where(User.email == user_in.email)
    res = await db.execute(stmt)
    if res.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists."
        )

    db_user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name or ""
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)

    user_resp = UserResponse.model_validate(db_user).model_dump(mode="json")
    return success_response(user_resp)

@router.post("/login", response_model=dict)
async def login(user_in: UserLogin, db: AsyncSession = Depends(get_db)):
    stmt = select(User).where(User.email == user_in.email)
    res = await db.execute(stmt)
    user = res.scalar_one_or_none()
    
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password."
        )

    token_str = create_access_token(user.id)
    user_resp = UserResponse.model_validate(user).model_dump(mode="json")
    
    return success_response({
        "access_token": token_str,
        "token_type": "bearer",
        "user": user_resp
    })

@router.get("/me", response_model=dict)
async def get_me(current_user: User = Depends(get_current_user)):
    user_resp = UserResponse.model_validate(current_user).model_dump(mode="json")
    return success_response(user_resp)
