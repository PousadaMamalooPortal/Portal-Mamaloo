from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import Quarto, QuartoCreate, QuartoUpdate, Administrador
from app.models import Quarto as QuartoModel
from app.auth import get_current_administrador

router = APIRouter(prefix="/api/quartos", tags=["Quartos"])

@router.get("/", response_model=list[Quarto])
def read_quartos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(QuartoModel).offset(skip).limit(limit).all()

@router.get("/{quarto_id}", response_model=Quarto)
def read_quarto(quarto_id: int, db: Session = Depends(get_db)):
    quarto = db.query(QuartoModel).filter_by(IdQuarto=quarto_id).first()
    if not quarto:
        raise HTTPException(status_code=404, detail="Quarto não encontrado")
    return quarto

@router.post("/", response_model=Quarto)
def create_quarto(quarto: QuartoCreate, db: Session = Depends(get_db), current_admin: Administrador = Depends(get_current_administrador)):
    db_quarto = QuartoModel(**quarto.dict())
    db.add(db_quarto)
    db.commit()
    db.refresh(db_quarto)
    return db_quarto

@router.put("/{quarto_id}", response_model=Quarto)
def update_quarto(quarto_id: int, quarto_update: QuartoUpdate, db: Session = Depends(get_db), current_admin: Administrador = Depends(get_current_administrador)):
    db_quarto = db.query(QuartoModel).filter_by(IdQuarto=quarto_id).first()
    if not db_quarto:
        raise HTTPException(status_code=404, detail="Quarto não encontrado")
    for key, value in quarto_update.dict(exclude_unset=True).items():
        setattr(db_quarto, key, value)
    db.commit()
    db.refresh(db_quarto)
    return db_quarto