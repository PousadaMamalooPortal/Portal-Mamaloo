from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy.exc import OperationalError
from datetime import timedelta
import logging
import time
from typing import Optional


# from fastapi import Request
# import requests
# from dotenv import load_dotenv
# import os
# # Carrega variáveis de ambiente
# load_dotenv()


# Importações dos módulos internos
from . import models, schemas
from .database import SessionLocal, engine, init_db, get_db
from .auth import (
    get_current_administrador,
    create_access_token,
    authenticate_administrador,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    get_password_hash,
    verify_password
)

# Configuração de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()


async def verify_captcha(captcha_response: str):
    """Verifica o CAPTCHA usando o serviço do Google reCAPTCHA"""
    secret_key = os.getenv("RECAPTCHA_SECRET_KEY")
    if not secret_key:
        raise HTTPException(
            status_code=500,
            detail="Configuração de CAPTCHA não encontrada"
        )
    
    data = {
        "secret": secret_key,
        "response": captcha_response
    }
    
    try:
        response = requests.post(
            "https://www.google.com/recaptcha/api/siteverify",
            data=data,
            timeout=5
        )
        result = response.json()
        return result.get("success", False)
    except requests.RequestException as e:
        logger.error(f"Erro ao verificar CAPTCHA: {e}")
        raise HTTPException(
            status_code=500,
            detail="Erro ao verificar CAPTCHA"
        )
        

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

# Endpoint de health check
@app.get("/health", response_class=JSONResponse)
async def health_check():
    return {"status": "healthy"}


@app.post("/token")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    administrador = authenticate_administrador(db, form_data.username, form_data.password)
    if not administrador:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Username ou senha incorretos",
        )
    access_token = create_access_token({"sub": administrador.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/administradores/")
def create_administrador(
    administrador: schemas.AdministradorCreate,
    db: Session = Depends(get_db)
):
    # Verificar se username já existe
    if db.query(models.Administrador).filter(models.Administrador.username == administrador.username).first():
        raise HTTPException(status_code=400, detail="Username já existe")
    
    hashed_password = get_password_hash(administrador.senha)
    db_admin = models.Administrador(
        nomeadministrador=administrador.nomeadministrador,
        username=administrador.username,
        senha=hashed_password
    )
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin

@app.get("/administradores/me/", response_model=schemas.Administrador)
async def read_administrador_me(
    current_administrador: schemas.Administrador = Depends(get_current_administrador)
):
    return current_administrador

# Rotas para Pontos Turísticos
@app.get("/pontos-turisticos/", response_model=list[schemas.PontoTuristico])
def read_pontos_turisticos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        pontos = db.query(models.PontoTuristico).offset(skip).limit(limit).all()
        return pontos
    except Exception as e:
        logger.error(f"Erro ao buscar pontos turísticos: {e}")
        raise HTTPException(status_code=500, detail="Erro interno ao buscar pontos turísticos")

@app.post("/pontos-turisticos/", response_model=schemas.PontoTuristico)
def create_ponto_turistico(
    ponto: schemas.PontoTuristicoCreate, 
    db: Session = Depends(get_db),
    current_administrador: schemas.Administrador = Depends(get_current_administrador)
):
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



# Rotas para Quartos
@app.get("/quartos/", response_model=list[schemas.Quarto])
def read_quartos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        quartos = db.query(models.Quarto).offset(skip).limit(limit).all()
        return quartos
    except Exception as e:
        logger.error(f"Erro ao buscar quartos: {e}")
        raise HTTPException(status_code=500, detail="Erro interno ao buscar quartos")

@app.get("/quartos/{quarto_id}", response_model=schemas.Quarto)
def read_quarto(quarto_id: int, db: Session = Depends(get_db)):
    quarto = db.query(models.Quarto).filter(models.Quarto.IdQuarto == quarto_id).first()
    if quarto is None:
        raise HTTPException(status_code=404, detail="Quarto não encontrado")
    return quarto

@app.post("/quartos/", response_model=schemas.Quarto)
def create_quarto(
    quarto: schemas.QuartoCreate, 
    db: Session = Depends(get_db),
    current_administrador: schemas.Administrador = Depends(get_current_administrador)
):
    try:
        db_quarto = models.Quarto(**quarto.dict())
        db.add(db_quarto)
        db.commit()
        db.refresh(db_quarto)
        return db_quarto
    except Exception as e:
        db.rollback()
        logger.error(f"Erro ao criar quarto: {e}")
        raise HTTPException(status_code=500, detail="Erro interno ao criar quarto")

@app.put("/quartos/{quarto_id}", response_model=schemas.Quarto)
def update_quarto(
    quarto_id: int,
    quarto_update: schemas.QuartoUpdate, 
    db: Session = Depends(get_db),
    current_administrador: schemas.Administrador = Depends(get_current_administrador)
):
    try:
        db_quarto = db.query(models.Quarto).filter(models.Quarto.IdQuarto == quarto_id).first()
        if db_quarto is None:
            raise HTTPException(status_code=404, detail="Quarto não encontrado")
        
        update_data = quarto_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_quarto, key, value)
        
        db.commit()
        db.refresh(db_quarto)
        return db_quarto
    except Exception as e:
        db.rollback()
        logger.error(f"Erro ao atualizar quarto: {e}")
        raise HTTPException(status_code=500, detail="Erro interno ao atualizar quarto")


@app.post("/avaliacoes/", response_model=schemas.Avaliacao)
async def create_avaliacao(
    avaliacao: schemas.AvaliacaoCreate, 
    db: Session = Depends(get_db),
    # request: Request
):
    # Verifica o CAPTCHA primeiro
    # if not await verify_captcha(avaliacao.captcha):
    #     raise HTTPException(
    #         status_code=400,
    #         detail="CAPTCHA inválido ou não verificado"
    #     )
    
    try:
        # Remove o campo captcha antes de salvar no banco
        # avaliacao_data = 
        # avaliacao_data.pop("captcha")
        
        db_avaliacao = models.Avaliacao(**avaliacao.dict())
        db.add(db_avaliacao)
        db.commit()
        db.refresh(db_avaliacao)
        return db_avaliacao
    except Exception as e:
        db.rollback()
        logger.error(f"Erro ao criar avaliação: {e}")
        raise HTTPException(status_code=500, detail="Erro interno ao criar avaliação")


@app.get("/avaliacoes/", response_model=list[schemas.Avaliacao])
def read_avaliacoes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        avaliacoes = db.query(models.Avaliacao).offset(skip).limit(limit).all()
        return avaliacoes
    except Exception as e:
        logger.error(f"Erro ao buscar avaliações: {e}")
        raise HTTPException(status_code=500, detail="Erro interno ao buscar avaliações")

@app.get("/avaliacoes/{avaliacao_id}", response_model=schemas.Avaliacao)
def read_avaliacao(avaliacao_id: int, db: Session = Depends(get_db)):
    avaliacao = db.query(models.Avaliacao).filter(models.Avaliacao.idavaliacao == avaliacao_id).first()
    if avaliacao is None:
        raise HTTPException(status_code=404, detail="Avaliação não encontrada")
    return avaliacao

@app.put("/avaliacoes/{avaliacao_id}", response_model=schemas.Avaliacao)
def update_avaliacao(
    avaliacao_id: int,
    avaliacao_update: schemas.AvaliacaoUpdate, 
    db: Session = Depends(get_db),
    current_administrador: schemas.Administrador = Depends(get_current_administrador)
):
    try:
        db_avaliacao = db.query(models.Avaliacao).filter(models.Avaliacao.idavaliacao == avaliacao_id).first()
        if db_avaliacao is None:
            raise HTTPException(status_code=404, detail="Avaliação não encontrada")
        
        # Apenas atualiza a resposta
        db_avaliacao.respostaavaliacao = avaliacao_update.respostaavaliacao
        
        db.commit()
        db.refresh(db_avaliacao)
        return db_avaliacao
    except Exception as e:
        db.rollback()
        logger.error(f"Erro ao atualizar avaliação: {e}")
        raise HTTPException(status_code=500, detail="Erro interno ao atualizar avaliação")