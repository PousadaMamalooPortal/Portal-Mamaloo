
from pydantic import BaseModel, ConfigDict
from typing import Optional

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

    model_config = ConfigDict(from_attributes=True)  # Substitui a classe Config antiga

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