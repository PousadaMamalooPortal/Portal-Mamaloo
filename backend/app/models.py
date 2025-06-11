from sqlalchemy import Column, Integer, String, Text
from .database import Base

class PontoTuristico(Base):
    __tablename__ = "tab_ponto_turistico"
    
    idpontoturistico = Column(Integer, primary_key=True, index=True)
    nomepontoturistico = Column(String(100), nullable=False)
    descricaopontoturistico = Column(Text, nullable=False)
    linkpontoturistico = Column(String(255), nullable=False)
    
class Administrador(Base):
    __tablename__ = "tab_administrador"
    
    idadministrador = Column(Integer, primary_key=True, index=True)
    nomeadministrador = Column(String(100), nullable=False)
    username = Column(String(50), unique=True, nullable=False)  # Alterado de email para username
    senha = Column(String(255), nullable=False)