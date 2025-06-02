from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Configuração para Neon DB
NEON_DB_URL = "postgresql://meubanco_owner:npg_F8GNfRqg9yXv@ep-proud-leaf-a8pkwm2n-pooler.eastus2.azure.neon.tech/meubanco?sslmode=require"

# Configuração para banco local (usado no Docker Compose)
LOCAL_DB_URL = "postgresql://postgres:1234@database:5432/meubanco"

# Usar Neon DB por padrão, mas pode ser sobrescrito por variável de ambiente
DATABASE_URL = os.getenv("DATABASE_URL", LOCAL_DB_URL)  # Alterado para LOCAL_DB_URL como padrão

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
    pool_timeout=30,
    connect_args={
        "connect_timeout": 10,
        "keepalives": 1,
        "keepalives_idle": 30,
        "keepalives_interval": 10,
        "keepalives_count": 5
    }
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def init_db():
    import app.models
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()