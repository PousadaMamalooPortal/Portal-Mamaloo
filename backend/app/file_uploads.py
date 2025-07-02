import os
import re
from fastapi import HTTPException, UploadFile
from datetime import datetime
from typing import Tuple

UPLOAD_DIR_QUARTOS = "uploads/quartos"
UPLOAD_DIR_PONTOS = "uploads/pontos_turisticos"

ALLOWED_IMAGE_TYPES = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp"
}

MAX_FILENAME_LENGTH = 100
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

def sanitize_filename(filename: str) -> Tuple[str, str]:
    """Trata o nome do arquivo e extrai a extensão."""
    # Separa nome e extensão
    base, ext = os.path.splitext(filename)
    
    # Remove caracteres inválidos (mantém apenas letras, números, hífens e underscores)
    base = re.sub(r'[^\w\-_]', '', base)
    
    # Remove múltiplos hífens/underscores consecutivos
    base = re.sub(r'[\-_]+', '-', base)
    
    # Remove hífens/underscores no início/fim
    base = base.strip('-_')
    
    # Limita o tamanho do nome
    if len(base) > MAX_FILENAME_LENGTH:
        base = base[:MAX_FILENAME_LENGTH]
    
    return base.lower(), ext.lower()

def save_uploaded_file(file: UploadFile, tipo: str) -> str:
    # Verifica o tipo do conteúdo
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Tipo de arquivo não suportado. Tipos permitidos: {', '.join(ALLOWED_IMAGE_TYPES.keys())}"
        )
    
    # Verifica o tamanho do arquivo
    file.file.seek(0, os.SEEK_END)
    file_size = file.file.tell()
    file.file.seek(0)
    
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail=f"Arquivo muito grande. Tamanho máximo permitido: {MAX_FILE_SIZE//(1024*1024)}MB"
        )
    
    # Define o diretório de upload
    if tipo == "quarto":
        upload_dir = UPLOAD_DIR_QUARTOS
    elif tipo == "ponto_turistico":
        upload_dir = UPLOAD_DIR_PONTOS
    else:
        raise ValueError("Tipo de upload inválido")
    
    # Cria o diretório se não existir
    os.makedirs(upload_dir, exist_ok=True)
    
    # Gera timestamp e trata o nome do arquivo
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    base_name, file_ext = sanitize_filename(file.filename)
    
    # Usa a extensão correta baseada no content-type (evita problemas com extensões falsas)
    correct_ext = ALLOWED_IMAGE_TYPES[file.content_type]
    if file_ext[1:] != correct_ext:  # Remove o ponto da extensão
        file_ext = f".{correct_ext}"
    
    # Monta o nome final do arquivo
    filename = f"{timestamp}_{base_name}{file_ext}"
    file_path = os.path.join(upload_dir, filename)
    
    # Salva o arquivo
    try:
        with open(file_path, "wb") as buffer:
            buffer.write(file.file.read())
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erro ao salvar o arquivo: {str(e)}"
        )
    
    return f"/{file_path}"