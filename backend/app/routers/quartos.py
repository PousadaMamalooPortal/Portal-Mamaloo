from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import Quarto, QuartoCreate, QuartoUpdate, Administrador
from app.models import Quarto as QuartoModel
from app.auth import get_current_administrador
from app.file_uploads import save_uploaded_file
import os 

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
async def create_quarto(
    nomequarto: str = Form(...),
    descricaoquarto: str = Form(...),
    capacidadequarto: int = Form(...),
    valorquarto: float = Form(...),
    imagem: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_admin: Administrador = Depends(get_current_administrador)
):
    # Salva a imagem se foi enviada
    imagemquartos = None
    if imagem:
        imagemquartos = save_uploaded_file(imagem)
    
    # Cria o quarto no banco de dados
    db_quarto = QuartoModel(
        NomeQuarto=nomequarto,
        descricaoQuarto=descricaoquarto,
        CapacidadeQuarto=capacidadequarto,
        ValorQuarto=valorquarto,
        imagemQuartos=imagemquartos
    )
    
    db.add(db_quarto)
    db.commit()
    db.refresh(db_quarto)
    return db_quarto

@router.put("/{quarto_id}", response_model=Quarto)
def update_quarto(quarto_id: int, quarto_update: QuartoUpdate, db: Session = Depends(get_db), current_admin: Administrador = Depends(get_current_administrador)):
    db_quarto = db.query(QuartoModel).filter_by(IdQuarto=quarto_id).first()
    if not db_quarto:
        raise HTTPException(status_code=404, detail="Quarto não encontrado")
    for key, value in quarto_update.model_dump(exclude_unset=True).items():
        setattr(db_quarto, key, value)
    db.commit()
    db.refresh(db_quarto)
    return db_quarto