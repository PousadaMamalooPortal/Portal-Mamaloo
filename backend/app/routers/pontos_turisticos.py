from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import PontoTuristico, PontoTuristicoCreate, Administrador
from app.models import PontoTuristico as PontoModel
from app.auth import get_current_administrador

router = APIRouter(prefix="/api/pontos-turisticos", tags=["Pontos Turísticos"])

@router.get("/", response_model=list[PontoTuristico])
def get_all(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(PontoModel).offset(skip).limit(limit).all()

@router.get("/{ponto_id}", response_model=PontoTuristico)
def get_by_id(ponto_id: int, db: Session = Depends(get_db)):
    ponto = db.query(PontoModel).filter_by(idpontoturistico=ponto_id).first()
    if not ponto:
        raise HTTPException(status_code=404, detail="Ponto turístico não encontrado")
    return ponto

@router.post("/", response_model=PontoTuristico)
def create(ponto: PontoTuristicoCreate, db: Session = Depends(get_db), current_admin: Administrador = Depends(get_current_administrador)):
    db_ponto = PontoModel(**ponto.dict())
    db.add(db_ponto)
    db.commit()
    db.refresh(db_ponto)
    return db_ponto