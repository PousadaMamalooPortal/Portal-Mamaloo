from pydantic import BaseModel

class PontoTuristicoBase(BaseModel):
    nomepontoturistico: str
    descricaopontoturistico: str
    linkpontoturistico: str

class PontoTuristicoCreate(PontoTuristicoBase):
    pass

class PontoTuristico(PontoTuristicoBase):
    idpontoturistico: int
    
    class Config:
        orm_mode = True