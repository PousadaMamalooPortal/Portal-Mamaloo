from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import AdministradorCreate, Administrador
from app.models import Administrador as AdministradorModel
from app.auth import get_password_hash

router = APIRouter(prefix="/api/administradores", tags=["Administradores"])

@router.post("/", response_model=Administrador)
def create_administrador(administrador: AdministradorCreate, db: Session = Depends(get_db)):
    if db.query(AdministradorModel).filter_by(username=administrador.username).first():
        raise HTTPException(status_code=400, detail="Username já existe")

    hashed = get_password_hash(administrador.senha)
    db_admin = AdministradorModel(
        nomeadministrador=administrador.nomeadministrador,
        username=administrador.username,
        senha=hashed
    )
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin
