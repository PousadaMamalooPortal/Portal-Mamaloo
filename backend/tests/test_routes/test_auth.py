import pytest
from app.models import Administrador
from app.auth import create_access_token, get_password_hash  # Adicione esta importação


def test_login_success(client, db, admin_data):
    from app.auth import get_password_hash
    
    # Cria admin com senha hasheada
    admin = Administrador(
        nomeadministrador=admin_data["nomeadministrador"],
        username=admin_data["username"],
        senha=get_password_hash(admin_data["senha"])  # Aqui hash da senha
    )
    db.add(admin)
    db.commit()
    
    # Testa o login
    response = client.post(
        "/api/auth/token",
        data={"username": admin_data["username"], "password": admin_data["senha"]}
    )
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_invalid_credentials(client, db, admin_data):
    # Cria admin com senha hasheada
    admin = Administrador(
        nomeadministrador=admin_data["nomeadministrador"],
        username=admin_data["username"],
        senha=get_password_hash(admin_data["senha"])
    )
    db.add(admin)
    db.commit()
    
    # Testa com credenciais inválidas
    response = client.post(
        "/api/auth/token",
        data={"username": "wronguser", "password": "wrongpass"}
    )
    assert response.status_code == 401
    assert response.json()["detail"] == "Username ou senha incorretos"

def test_get_me(client, db, admin_data):
    # Cria admin com senha hasheada
    admin = Administrador(
        nomeadministrador=admin_data["nomeadministrador"],
        username=admin_data["username"],
        senha=get_password_hash(admin_data["senha"])
    )
    db.add(admin)
    db.commit()
    
    token = create_access_token({"sub": admin_data["username"]})
    
    # Testa o endpoint /me
    response = client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    assert response.json()["username"] == admin_data["username"]
    assert response.json()["nomeadministrador"] == admin_data["nomeadministrador"]