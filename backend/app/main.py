from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from app.routers import auth, administradores, quartos, pontos_turisticos, avaliacoes
from app.database import init_db
from fastapi.staticfiles import StaticFiles
import os
# Por (novo):
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(
    lifespan=lifespan,
    title="API da Pousada Mamaloo",
    description="Sistema para gestão de quartos, pontos turísticos e avaliações.",
    version="1.0.0",
    openapi_tags=[
        {"name": "Autenticação", "description": "Operações de login e geração de token."},
        {"name": "Administradores", "description": "Gerenciamento de administradores."},
        {"name": "Quartos", "description": "Operações de criação, leitura e atualização de quartos."},
        {"name": "Pontos Turísticos", "description": "Listagem e cadastro de pontos turísticos."},
        {"name": "Avaliações", "description": "Envio e resposta de avaliações."},
    ]
)


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    
    openapi_schema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
    )
    
    # Adicionando a logo e configurações de tema
    openapi_schema["info"]["x-logo"] = {
        "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRWmxw9kQfZj-3Roe7XE6LliSkTFfmRzBd0w&s",
        "altText": "Pousada Mamaloo Logo"
    }
    
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

# @app.on_event("startup")
# def on_startup():
#     init_db()


@app.get("/", tags=["Inicial"])
async def health_check():
    return {"status": "Funcionando"}


# Cria o diretório se não existir
os.makedirs("uploads/quartos", exist_ok=True)
os.makedirs("uploads/pontos_turisticos", exist_ok=True)

# Depois monte o StaticFiles
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(auth.router)
app.include_router(administradores.router)
app.include_router(quartos.router)
app.include_router(pontos_turisticos.router)
app.include_router(avaliacoes.router)

# Configuração do tema Swagger UI
app.swagger_ui_parameters = {
    "syntaxHighlight.theme": "obsidian",
    "tryItOutEnabled": True,
    "displayRequestDuration": True,
    "filter": True,
    "theme": {
        "css": {
            "swagger-ui": """
                :root {
                    --swagger-ui-theme-color: #E67E22;
                    --swagger-ui-theme-color-hover: #D35400;
                    --swagger-ui-background-color: #F5F5F5;
                    --swagger-ui-text-color: #333;
                    --swagger-ui-border-color: #D5D5D5;
                    --swagger-ui-header-bg-color: #5D4037;
                    --swagger-ui-header-text-color: #FFF;
                    --swagger-ui-tag-bg-color: #8D6E63;
                    --swagger-ui-tag-text-color: #FFF;
                    --swagger-ui-input-bg-color: #FFF;
                    --swagger-ui-input-border-color: #D5D5D5;
                    --swagger-ui-input-text-color: #333;
                    --swagger-ui-success-color: #2E7D32;
                    --swagger-ui-error-color: #C62828;
                }
                .opblock-summary-control:focus {
                    outline: 2px solid var(--swagger-ui-theme-color);
                }
                .opblock-tag {
                    background-color: var(--swagger-ui-tag-bg-color);
                    color: var(--swagger-ui-tag-text-color);
                    border-radius: 4px;
                    padding: 4px 8px;
                }
                .topbar {
                    background-color: var(--swagger-ui-header-bg-color);
                }
                .topbar-wrapper img {
                    content:url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRWmxw9kQfZj-3Roe7XE6LliSkTFfmRzBd0w&s');
                    height: 40px;
                }
                .btn {
                    background: var(--swagger-ui-theme-color);
                }
                .btn:hover {
                    background: var(--swagger-ui-theme-color-hover);
                }
            """
        }
    }
}