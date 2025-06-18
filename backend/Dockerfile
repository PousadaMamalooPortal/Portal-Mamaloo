FROM python:3.9

WORKDIR /app

# 1. Copia o requirements.txt primeiro (para aproveitar o cache do Docker)
COPY ./requirements.txt /app/requirements.txt

# 2. Instala as dependências (incluindo bcrypt e passlib atualizados)
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt && \
    pip install --no-cache-dir --upgrade bcrypt passlib

# 3. Copia o restante do aplicativo
COPY ./app /app

# 4. Define o comando de execução
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8025", "--reload"]