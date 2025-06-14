import os
from fastapi import UploadFile
from datetime import datetime

UPLOAD_DIR_QUARTOS = "uploads/quartos"
UPLOAD_DIR_PONTOS = "uploads/pontos_turisticos"

def save_uploaded_file(file: UploadFile, tipo: str) -> str:
    if tipo == "quarto":
        upload_dir = UPLOAD_DIR_QUARTOS
    elif tipo == "ponto_turistico":
        upload_dir = UPLOAD_DIR_PONTOS
    else:
        raise ValueError("Tipo de upload inválido")
    
    os.makedirs(upload_dir, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}_{file.filename}"
    file_path = os.path.join(upload_dir, filename)
    
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())
    
    return f"/{file_path}"