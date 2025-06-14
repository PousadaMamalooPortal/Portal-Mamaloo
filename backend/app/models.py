from sqlalchemy import Column, Integer, String, Text, Numeric
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

class Quarto(Base):
    __tablename__ = "tab_quartos"

    IdQuarto = Column(Integer, primary_key=True, index=True)
    NomeQuarto = Column(String(50), nullable=False)
    descricaoQuarto = Column(String(250), nullable=False)
    CapacidadeQuarto = Column(Integer, nullable=False)
    ValorQuarto = Column(Numeric(10, 2), nullable=False)
    imagem_url = Column(String(255), nullable=True)  # Novo campo para armazenar o caminho da imagem

class Avaliacao(Base):
    __tablename__ = "tab_avaliacao"
    
    idavaliacao = Column(Integer, primary_key=True, index=True)
    nomeavaliacao = Column(String(100), nullable=False)
    comentarioavaliacao = Column(Text, nullable=False)
    respostaavaliacao = Column(Text, nullable=True)  # Será preenchido pelo admin
    dataavaliacao = Column(String(50), nullable=False)