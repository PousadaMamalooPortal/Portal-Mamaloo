import os
from fastapi import UploadFile
from datetime import datetime

UPLOAD_DIR_QUARTOS = "uploads/quartos"

def save_uploaded_file(file: UploadFile) -> str:
    # Cria diretório se não existir
    os.makedirs(UPLOAD_DIR_QUARTOS, exist_ok=True)
    
    # Gera nome único para o arquivo
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{timestamp}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR_QUARTOS, filename)
    
    # Salva o arquivo
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())
    
    return f"/{file_path}"  # Retorna o caminho relativo