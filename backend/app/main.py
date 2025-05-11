from fastapi import FastAPI, HTTPException, Depends  # Adicione Depends aqui
from pydantic import BaseModel
from typing import List
from sqlalchemy.orm import Session  # Adicione esta importação
from .database import SessionLocal, engine
from .models import PontoTuristico, Base  # Certifique-se que Base está importado

app = FastAPI()

# Cria as tabelas no banco de dados (apenas para desenvolvimento)
Base.metadata.create_all(bind=engine)

# Modelo Pydantic
class PontoTuristicoCreate(BaseModel):
    nomepontoturistico: str
    descricaopontoturistico: str
    linkpontoturistico: str

class PontoTuristicoResponse(PontoTuristicoCreate):
    idpontoturistico: int
    
    class Config:
        orm_mode = True

# Dependência de banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/pontos-turisticos/", response_model=List[PontoTuristicoResponse])
def listar_pontos(db: Session = Depends(get_db)):
    return db.query(PontoTuristico).all()

@app.post("/pontos-turisticos/", response_model=PontoTuristicoResponse)
def criar_ponto(ponto: PontoTuristicoCreate, db: Session = Depends(get_db)):
    db_ponto = PontoTuristico(**ponto.dict())
    db.add(db_ponto)
    db.commit()
    db.refresh(db_ponto)
    return db_ponto

@app.get("/")
def read_root():
    return {"message": "API funcionando!"}