import pytest
from fastapi.testclient import TestClient
from app.main import app  # Importe sua aplicação FastAPI
from app.database import SessionLocal, Base, engine

@pytest.fixture(scope="module")
def client():
    # Configura um cliente de teste para a API
    with TestClient(app) as c:
        yield c

@pytest.fixture(scope="function")
def db():
    # Configura um banco de dados temporário para cada teste
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    yield db
    db.close()
    Base.metadata.drop_all(bind=engine)