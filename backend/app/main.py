from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas
from .database import SessionLocal, engine, init_db
import logging
import time
from sqlalchemy.exc import OperationalError
from fastapi.responses import JSONResponse  # Adicionado esta linha

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

def wait_for_db(max_retries=5, delay_seconds=5):
    """Tenta conectar ao banco de dados com várias tentativas"""
    retry_count = 0
    while retry_count < max_retries:
        try:
            engine.connect()
            logger.info("Conexão com o banco de dados estabelecida com sucesso")
            return True
        except OperationalError as e:
            retry_count += 1
            logger.warning(f"Tentativa {retry_count}/{max_retries} - Falha ao conectar ao banco de dados: {e}")
            if retry_count < max_retries:
                time.sleep(delay_seconds)
    raise Exception("Não foi possível conectar ao banco de dados após várias tentativas")

@app.on_event("startup")
def on_startup():
    try:
        wait_for_db()
        init_db()
        logger.info("Banco de dados inicializado com sucesso")
    except Exception as e:
        logger.error(f"Erro ao inicializar o banco de dados: {e}")
        raise

# Endpoint de health check corrigido
@app.get("/health", response_class=JSONResponse)
async def health_check():
    return {"status": "healthy"}

# Dependência para obter a sessão do banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/pontos-turisticos/", response_model=list[schemas.PontoTuristico])
def read_pontos_turisticos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        pontos = db.query(models.PontoTuristico).offset(skip).limit(limit).all()
        return pontos
    except Exception as e:
        logger.error(f"Erro ao buscar pontos turísticos: {e}")
        raise HTTPException(status_code=500, detail="Erro interno ao buscar pontos turísticos")

@app.post("/pontos-turisticos/", response_model=schemas.PontoTuristico)
def create_ponto_turistico(ponto: schemas.PontoTuristicoCreate, db: Session = Depends(get_db)):
    try:
        db_ponto = models.PontoTuristico(**ponto.dict())
        db.add(db_ponto)
        db.commit()
        db.refresh(db_ponto)
        return db_ponto
    except Exception as e:
        db.rollback()
        logger.error(f"Erro ao criar ponto turístico: {e}")
        raise HTTPException(status_code=500, detail="Erro interno ao criar ponto turístico")

@app.get("/pontos-turisticos/{ponto_id}", response_model=schemas.PontoTuristico)
def read_ponto_turistico(ponto_id: int, db: Session = Depends(get_db)):
    ponto = db.query(models.PontoTuristico).filter(models.PontoTuristico.idpontoturistico == ponto_id).first()
    if ponto is None:
        raise HTTPException(status_code=404, detail="Ponto turístico não encontrado")
    return ponto