from typing import List
from pydantic import BaseModel
from pydantic import BaseModel, Field, validator

COMODIDADES_VALIDAS = {
    "arcondicionado", 
    "tv_tela_plana",
    "cozinha_compacta",
    "frigobar",
    "wi_fi",
    "varanda"
}

class QuartoBase(BaseModel):
    capacidadequarto: int
    valorquarto: float
    cnpjpousada: int
    nomequarto: str
    descricaoquarto: str

class QuartoCreate(BaseModel):
    # ... outros campos ...
    comodidades: List[str] = Field(..., max_items=6)
    
    @validator('comodidades')
    def validar_comodidades(cls, v):
        if len(v) > 6:
            raise ValueError("Máximo de 6 comodidades permitidas")
        if not all(item in COMODIDADES_VALIDAS for item in v):
            raise ValueError("Comodidade inválida detectada")
        return v

class QuartoResponse(QuartoCreate):
    idquarto: int

class QuartoCreate(QuartoBase):
    pass

class Quarto(QuartoBase):
    idquarto: int
    class Config:
        orm_mode = True