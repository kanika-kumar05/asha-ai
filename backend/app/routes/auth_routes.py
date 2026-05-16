from fastapi import APIRouter, Depends, HTTPException, Header

from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.user_model import User

from app.schemas.user_schema import (
    UserCreate,
    UserLogin
)

from app.utils.hashing import (
    hash_password,
    verify_password
)

from app.utils.jwt_handler import create_access_token, verify_token

router = APIRouter()

# Database Dependency
def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

# REGISTER ROUTE
@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    # Check if email already exists
    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_pw = hash_password(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_pw
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "User Registered Successfully"
    }

# LOGIN ROUTE
@router.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    # Check user exists
    if not existing_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid Email"
        )

    # Verify password
    if not verify_password(
        user.password,
        existing_user.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid Password"
        )

    # Create JWT Token
    access_token = create_access_token(
        data={"sub": existing_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get("/me")
def get_current_user(
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    if authorization is None:
        raise HTTPException(
            status_code=401,
            detail="Token missing"
        )

    token = authorization.replace("Bearer ", "")

    email = verify_token(token)

    if email is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }