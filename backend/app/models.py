from sqlalchemy import Column, Integer, String, Text
from .database import Base

class PontoTuristico(Base):
    __tablename__ = "tab_ponto_turistico"
    
    idpontoturistico = Column(Integer, primary_key=True, index=True)
    nomepontoturistico = Column(String(100), nullable=False)
    descricaopontoturistico = Column(Text, nullable=False)
    linkpontoturistico = Column(String(255), nullable=False)