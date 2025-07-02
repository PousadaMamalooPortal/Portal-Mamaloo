import os
import logging
from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import Quarto, QuartoCreate, QuartoUpdate, Administrador, QuartoImagem as QuartoImagemModel
from app.models import Quarto as QuartoModel, QuartoImagem
from app.file_uploads import save_uploaded_file

# Configuração de logging
logger = logging.getLogger(__name__)
router = APIRouter(prefix="/quartos", tags=["Quartos"])

@router.get("/", response_model=List[Quarto])
def ler_quartos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        return db.query(QuartoModel).offset(skip).limit(limit).all()
    except Exception as e:
        logger.error(f"Erro ao listar quartos: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno ao listar quartos")

@router.get("/{quarto_id}/imagens", response_model=List[QuartoImagemModel])
def listar_imagens_quarto(quarto_id: int, db: Session = Depends(get_db)):
    try:
        quarto = db.query(QuartoModel).filter_by(IdQuarto=quarto_id).first()
        if not quarto:
            raise HTTPException(status_code=404, detail="Quarto não encontrado")
        
        imagens = db.query(QuartoImagem).filter_by(IdQuarto=quarto_id).all()
        return [QuartoImagemModel.from_orm(imagem) for imagem in imagens]
    except Exception as e:
        logger.error(f"Erro ao listar imagens do quarto {quarto_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno ao listar imagens")

@router.post("/", response_model=Quarto)
async def criar_quarto(
    nomequarto: str = Form(...),
    descricaoquarto: str = Form(...),
    capacidadequarto: int = Form(...),
    valorquarto: float = Form(...),
    valorpromocaoquarto: Optional[float] = Form(None),
    imagens: Optional[List[UploadFile]] = File(None),
    db: Session = Depends(get_db),
):
    try:
        db_quarto = QuartoModel(
            NomeQuarto=nomequarto,
            descricaoQuarto=descricaoquarto,
            CapacidadeQuarto=capacidadequarto,
            ValorQuarto=valorquarto,
            valorPromocaoQuarto=valorpromocaoquarto
        )
        
        db.add(db_quarto)
        db.commit()
        db.refresh(db_quarto)
        
        if imagens:
            for imagem in imagens:
                try:
                    caminho_imagem = save_uploaded_file(imagem, "quarto")
                    db_imagem = QuartoImagem(
                        IdQuarto=db_quarto.IdQuarto,
                        caminhoImagem=caminho_imagem
                    )
                    db.add(db_imagem)
                except Exception as img_error:
                    logger.error(f"Erro ao salvar imagem: {str(img_error)}")
                    continue
        
        db.commit()
        return db_quarto
    except Exception as e:
        db.rollback()
        logger.error(f"Erro ao criar quarto: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno ao criar quarto: {str(e)}")

@router.post("/{quarto_id}/imagens", response_model=QuartoImagemModel)
async def adicionar_imagem_quarto(
    quarto_id: int,
    imagem: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    try:
        quarto = db.query(QuartoModel).filter_by(IdQuarto=quarto_id).first()
        if not quarto:
            raise HTTPException(status_code=404, detail="Quarto não encontrado")
        
        caminho_imagem = save_uploaded_file(imagem, "quarto")
        db_imagem = QuartoImagem(
            IdQuarto=quarto_id,
            caminhoImagem=caminho_imagem
        )
        
        db.add(db_imagem)
        db.commit()
        db.refresh(db_imagem)
        return db_imagem
    except Exception as e:
        db.rollback()
        logger.error(f"Erro ao adicionar imagem ao quarto {quarto_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno ao adicionar imagem: {str(e)}")

@router.get("/{quarto_id}", response_model=Quarto)
def ler_quarto(quarto_id: int, db: Session = Depends(get_db)):
    try:
        quarto = db.query(QuartoModel).filter_by(IdQuarto=quarto_id).first()
        if not quarto:
            raise HTTPException(status_code=404, detail="Quarto não encontrado")
        return quarto
    except Exception as e:
        logger.error(f"Erro ao buscar quarto {quarto_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro interno ao buscar quarto")

@router.put("/{quarto_id}", response_model=Quarto)
def atualizar_quarto(
    quarto_id: int, 
    quarto_update: QuartoUpdate, 
    db: Session = Depends(get_db), 
):
    try:
        db_quarto = db.query(QuartoModel).filter_by(IdQuarto=quarto_id).first()
        if not db_quarto:
            raise HTTPException(status_code=404, detail="Quarto não encontrado")
        
        update_data = quarto_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_quarto, key, value)
        
        db.commit()
        db.refresh(db_quarto)
        return db_quarto
    except Exception as e:
        db.rollback()
        logger.error(f"Erro ao atualizar quarto {quarto_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno ao atualizar quarto: {str(e)}")

@router.delete("/imagens/{imagem_id}")
def deletar_imagem(
    imagem_id: int,
    db: Session = Depends(get_db),
):
    try:
        imagem = db.query(QuartoImagem).filter_by(IdImagem=imagem_id).first()
        if not imagem:
            raise HTTPException(status_code=404, detail="Imagem não encontrada")
        
        # Remove arquivo físico
        caminho = imagem.caminhoImagem[1:] if imagem.caminhoImagem.startswith('/') else imagem.caminhoImagem
        if os.path.exists(caminho):
            try:
                os.remove(caminho)
            except OSError as e:
                logger.error(f"Erro ao remover arquivo {caminho}: {str(e)}")
                # Continua mesmo se falhar em remover o arquivo
        
        # Remove do banco de dados
        db.delete(imagem)
        db.commit()
        
        return {"message": "Imagem removida com sucesso"}
    except Exception as e:
        db.rollback()
        logger.error(f"Erro ao deletar imagem {imagem_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno ao deletar imagem: {str(e)}")

@router.delete("/{quarto_id}", response_model=dict)
def deletar_quarto(
    quarto_id: int,
    db: Session = Depends(get_db)
):
    try:
        quarto = db.query(QuartoModel).filter_by(IdQuarto=quarto_id).first()
        if not quarto:
            raise HTTPException(status_code=404, detail="Quarto não encontrado")
        
        # Deleta imagens associadas
        imagens = db.query(QuartoImagem).filter_by(IdQuarto=quarto_id).all()
        for imagem in imagens:
            try:
                caminho = imagem.caminhoImagem[1:] if imagem.caminhoImagem.startswith('/') else imagem.caminhoImagem
                if os.path.exists(caminho):
                    os.remove(caminho)
            except Exception as file_error:
                logger.error(f"Erro ao remover arquivo {imagem.caminhoImagem}: {str(file_error)}")
                continue
            
            db.delete(imagem)
        
        # Deleta o quarto
        db.delete(quarto)
        db.commit()
        
        return {"message": "Quarto e suas imagens foram deletados com sucesso"}
    except Exception as e:
        db.rollback()
        logger.error(f"Erro ao deletar quarto {quarto_id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro interno ao deletar quarto: {str(e)}")