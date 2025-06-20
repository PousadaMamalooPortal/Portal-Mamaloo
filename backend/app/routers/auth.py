from datetime import datetime, timedelta
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Administrador
from app.schemas import TokenData
from fastapi import APIRouter
import warnings

# Ignora o aviso do bcrypt
warnings.filterwarnings("ignore", message=".*error reading bcrypt version.*")

router = APIRouter()

# Configurações de segurança
SECRET_KEY = "sua-chave-secreta-super-segura"  # Em produção, use variável de ambiente
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Configuração do contexto de senha
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Configuração do esquema OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

def verificar_senha(senha_simples: str, senha_hashed: str) -> bool:
    return pwd_context.verify(senha_simples, senha_hashed)

def obter_senha_hash(password: str) -> str:
    """Gera o hash da senha"""
    return pwd_context.hash(password)

def autenticar_administrador(db: Session, username: str, password: str) -> Optional[Administrador]:
    """Autentica um administrador"""
    administrador = db.query(Administrador).filter(Administrador.username == username).first()
    if not administrador:
        return None
    if not verificar_senha(password, administrador.senha):
        return None
    return administrador

def criar_acesso_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Cria um token JWT"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def obter_atual_administrador(
    token: str = Depends(oauth2_scheme), 
    db: Session = Depends(get_db)
):
    """Obtém o administrador atual baseado no token"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    
    administrador = db.query(Administrador).filter(Administrador.username == token_data.username).first()
    if administrador is None:
        raise credentials_exception
    return administrador

@router.post("/token")
async def login_para_acesso_token(
    username: str, 
    password: str, 
    db: Session = Depends(get_db)
):
    administrador = autenticar_administrador(db, username, password)
    if not administrador:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário ou senha incorretos",
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = criar_acesso_token(
        data={"sub": administrador.username}, 
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/eu")
async def ler_administrador_atual(
    current_administrador: Administrador = Depends(obter_atual_administrador)
):
    return current_administrador