from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.auth import authenticate_administrador, create_access_token, get_current_administrador
from app.database import get_db
from app.schemas import Administrador

router = APIRouter(prefix="/api/auth", tags=["Autenticação"])

@router.post("/token")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    admin = authenticate_administrador(db, form_data.username, form_data.password)
    if not admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Username ou senha incorretos")
    access_token = create_access_token({"sub": admin.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=Administrador)
def get_me(current_admin: Administrador = Depends(get_current_administrador)):
    return current_admin