from fastapi import FastAPI
import psycopg2
from psycopg2.extras import RealDictCursor

app = FastAPI()

# Conexão com o PostgreSQL (configuração padrão para Docker)
def get_db_connection():
    conn = psycopg2.connect(
        dbname="meubanco",
        user="postgres",
        password="senha_segura",
        host="database",  # Nome do serviço no docker-compose.yml
        cursor_factory=RealDictCursor
    )
    return conn

@app.get("/")
async def root():
    return {"message": "API Online!"}

@app.get("/items/{item_id}")
async def get_item(item_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM items WHERE id = %s", (item_id,))
    item = cursor.fetchone()
    conn.close()
    return {"item": item}