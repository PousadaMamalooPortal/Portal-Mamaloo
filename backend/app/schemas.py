
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
    pass

class Quarto(QuartoBase):
    IdQuarto: int

    class Config:
        orm_mode = True

class QuartoUpdate(BaseModel):
    NomeQuarto: Optional[str] = None
    descricaoQuarto: Optional[str] = None
    CapacidadeQuarto: Optional[int] = None
    ValorQuarto: Optional[float] = None