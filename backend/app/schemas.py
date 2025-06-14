
from pydantic import BaseModel, ConfigDict
from typing import Optional
from fastapi import UploadFile

class PontoTuristicoBase(BaseModel):
    nomepontoturistico: str
    descricaopontoturistico: str
    linkpontoturistico: str

class PontoTuristicoCreate(PontoTuristicoBase):
    pass

class PontoTuristico(PontoTuristicoBase):
    idpontoturistico: int
    
class Config:
    from_attributes = True



class AdministradorBase(BaseModel):
    nomeadministrador: str
    username: str

    model_config = ConfigDict(from_attributes=True) 

class AdministradorCreate(AdministradorBase):
    senha: str

class Administrador(AdministradorBase):
    idadministrador: int

class LoginSchema(BaseModel):
    username: str
    senha: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None



class QuartoBase(BaseModel):
    NomeQuarto: str
    descricaoQuarto: str
    CapacidadeQuarto: int
    ValorQuarto: float

class QuartoCreate(QuartoBase):
    imagem: UploadFile = None  # Adicionado campo para upload de arquivo

class Quarto(QuartoBase):
    IdQuarto: int
    imagem_url: Optional[str] = None

    model_config = ConfigDict(from_attributes=True) 

class QuartoUpdate(BaseModel):
    NomeQuarto: Optional[str] = None
    descricaoQuarto: Optional[str] = None
    CapacidadeQuarto: Optional[int] = None
    ValorQuarto: Optional[float] = None


class AvaliacaoBase(BaseModel):
    nomeavaliacao: str
    comentarioavaliacao: str
    dataavaliacao: str
    # captcha: str  # Adicionando o campo para o CAPTCHA

class AvaliacaoCreate(AvaliacaoBase):
    pass

class Avaliacao(AvaliacaoBase):
    idavaliacao: int
    respostaavaliacao: Optional[str] = None

    model_config = ConfigDict(from_attributes=True) 

class AvaliacaoUpdate(BaseModel):
    respostaavaliacao: str