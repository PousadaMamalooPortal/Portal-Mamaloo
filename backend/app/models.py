from .database import Base
from sqlalchemy import Column, Integer, String, Numeric, BigInteger, Text, ARRAY

class PontoTuristico(Base):
    __tablename__ = "tab_ponto_turistico"
    idpontoturistico = Column(Integer, primary_key=True, index=True)
    nomepontoturistico = Column(String(100), nullable=False)
    descricaopontoturistico = Column(Text, nullable=False)  # Mude para Text
    linkpontoturistico = Column(String(255), nullable=False)

class Quarto(Base):
    __tablename__ = "tab_quartos"
    idquarto = Column(Integer, primary_key=True, index=True)
    capacidadequarto = Column(Integer, nullable=False)
    valorquarto = Column(Numeric(10, 2), nullable=False)
    cnpjpousada = Column(BigInteger, nullable=False)
    nomequarto = Column(String(50), nullable=False)
    descricaoquarto = Column(String(250), nullable=False)
    comodidades = Column(ARRAY(String), nullable=True, server_default="{}")

