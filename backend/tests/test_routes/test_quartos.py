import pytest
import os
from io import BytesIO
from app.models import Quarto, QuartoImagem, Administrador
from app.auth import criar_acesso_token
from fastapi import UploadFile

@pytest.fixture
def quarto_data():
    return {
        "NomeQuarto": "Quarto Teste",
        "descricaoQuarto": "Descrição teste",
        "CapacidadeQuarto": 2,
        "ValorQuarto": 100.0
    }

@pytest.fixture
def admin_data():
    return {
        "username": "admin_test",
        "senha": "secret",
        "nome": "Admin Teste",
        "email": "admin@test.com"
    }

@pytest.fixture
def test_image():
    return UploadFile(
        filename="test_image.jpg",
        file=BytesIO(b"fake image data"),
        content_type="image/jpeg"
    )

def test_ler_todos_quartos(client, db, quarto_data):
    # Cria um quarto
    quarto = Quarto(**quarto_data)
    db.add(quarto)
    db.commit()
    
    # Testa listagem
    response = client.get("/quartos/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["NomeQuarto"] == quarto_data["NomeQuarto"]
    assert data[0]["descricaoQuarto"] == quarto_data["descricaoQuarto"]

def test_ler_quarto_por_id(client, db, quarto_data):
    # Cria e busca por ID
    quarto = Quarto(**quarto_data)
    db.add(quarto)
    db.commit()
    
    response = client.get(f"/quartos/{quarto.IdQuarto}")
    assert response.status_code == 200
    data = response.json()
    assert data["NomeQuarto"] == quarto_data["NomeQuarto"]
    assert data["CapacidadeQuarto"] == quarto_data["CapacidadeQuarto"]

def test_ler_quarto_inexistente(client, db):
    response = client.get("/quartos/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Quarto não encontrado"

def test_criar_quarto(client, db, admin_data, quarto_data):
    # Cria admin e gera token
    admin = Administrador(**admin_data)
    db.add(admin)
    db.commit()
    token = criar_acesso_token({"sub": admin_data["username"]})
    
    # Testa criação com autenticação
    response = client.post(
        "/quartos/",
        headers={"Authorization": f"Bearer {token}"},
        data={
            "nomequarto": quarto_data["NomeQuarto"],
            "descricaoquarto": quarto_data["descricaoQuarto"],
            "capacidadequarto": str(quarto_data["CapacidadeQuarto"]),
            "valorquarto": str(quarto_data["ValorQuarto"])
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["NomeQuarto"] == quarto_data["NomeQuarto"]
    assert data["ValorQuarto"] == quarto_data["ValorQuarto"]
    
    # Verifica se foi criado no banco
    quarto_db = db.query(Quarto).filter_by(NomeQuarto=quarto_data["NomeQuarto"]).first()
    assert quarto_db is not None

def test_criar_quarto_com_imagens(client, db, admin_data, quarto_data, test_image):
    # Cria admin e gera token
    admin = Administrador(**admin_data)
    db.add(admin)
    db.commit()
    token = criar_acesso_token({"sub": admin_data["username"]})
    
    # Testa criação com imagens
    response = client.post(
        "/quartos/",
        headers={"Authorization": f"Bearer {token}"},
        data={
            "nomequarto": quarto_data["NomeQuarto"],
            "descricaoquarto": quarto_data["descricaoQuarto"],
            "capacidadequarto": str(quarto_data["CapacidadeQuarto"]),
            "valorquarto": str(quarto_data["ValorQuarto"])
        },
        files=[("imagens", ("test.jpg", test_image.file, "image/jpeg"))]
    )
    assert response.status_code == 200
    data = response.json()
    assert data["NomeQuarto"] == quarto_data["NomeQuarto"]
    
    # Verifica se a imagem foi associada
    imagens = db.query(QuartoImagem).filter_by(IdQuarto=data["IdQuarto"]).all()
    assert len(imagens) > 0
    # Limpa o arquivo de teste criado
    if os.path.exists(imagens[0].caminhoImagem.lstrip('/')):
        os.remove(imagens[0].caminhoImagem.lstrip('/'))

def test_atualizar_quarto(client, db, admin_data, quarto_data):
    # Cria admin, quarto e gera token
    admin = Administrador(**admin_data)
    db.add(admin)
    quarto = Quarto(**quarto_data)
    db.add(quarto)
    db.commit()
    token = criar_acesso_token({"sub": admin_data["username"]})
    
    # Dados para atualização
    update_data = {
        "NomeQuarto": "Quarto Atualizado",
        "ValorQuarto": 150.0,
        "valorPromocaoQuarto": 120.0
    }
    
    # Testa atualização
    response = client.put(
        f"/quartos/{quarto.IdQuarto}",
        headers={"Authorization": f"Bearer {token}"},
        json=update_data
    )
    assert response.status_code == 200
    data = response.json()
    assert data["NomeQuarto"] == "Quarto Atualizado"
    assert data["ValorQuarto"] == 150.0
    assert data["valorPromocaoQuarto"] == 120.0

def test_adicionar_imagem_quarto(client, db, admin_data, quarto_data, test_image):
    # Cria admin, quarto e gera token
    admin = Administrador(**admin_data)
    db.add(admin)
    quarto = Quarto(**quarto_data)
    db.add(quarto)
    db.commit()
    token = criar_acesso_token({"sub": admin_data["username"]})
    
    # Testa adição de imagem
    response = client.post(
        f"/quartos/{quarto.IdQuarto}/imagens",
        headers={"Authorization": f"Bearer {token}"},
        files={"imagem": ("test.jpg", test_image.file, "image/jpeg")}
    )
    assert response.status_code == 200
    data = response.json()
    assert "caminhoImagem" in data
    
    # Verifica se a imagem foi criada no banco
    imagens = db.query(QuartoImagem).filter_by(IdQuarto=quarto.IdQuarto).all()
    assert len(imagens) == 1
    
    # Limpa o arquivo de teste criado
    if os.path.exists(imagens[0].caminhoImagem.lstrip('/')):
        os.remove(imagens[0].caminhoImagem.lstrip('/'))

def test_listar_imagens_quarto(client, db, admin_data, quarto_data, test_image):
    # Cria admin, quarto e imagem
    admin = Administrador(**admin_data)
    db.add(admin)
    quarto = Quarto(**quarto_data)
    db.add(quarto)
    db.commit()
    
    # Adiciona imagem
    caminho = "uploads/quarto/test_image.jpg"
    imagem = QuartoImagem(IdQuarto=quarto.IdQuarto, caminhoImagem=caminho)
    db.add(imagem)
    db.commit()
    
    # Testa listagem de imagens
    response = client.get(f"/quartos/{quarto.IdQuarto}/imagens")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["caminhoImagem"] == caminho
    
    # Limpa o banco (não removemos o arquivo pois é apenas um teste)

def test_deletar_imagem(client, db, admin_data, quarto_data, test_image):
    # Cria admin, quarto e imagem
    admin = Administrador(**admin_data)
    db.add(admin)
    quarto = Quarto(**quarto_data)
    db.add(quarto)
    db.commit()
    
    # Cria arquivo de teste temporário
    test_file_path = "uploads/quarto/test_delete.jpg"
    os.makedirs(os.path.dirname(test_file_path), exist_ok=True)
    with open(test_file_path, "wb") as f:
        f.write(b"test data")
    
    # Adiciona imagem ao banco
    imagem = QuartoImagem(IdQuarto=quarto.IdQuarto, caminhoImagem=test_file_path)
    db.add(imagem)
    db.commit()
    
    token = criar_acesso_token({"sub": admin_data["username"]})
    
    # Testa deleção
    response = client.delete(
        f"/quartos/imagens/{imagem.IdImagem}",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    assert response.json()["message"] == "Imagem removida com sucesso"
    
    # Verifica se foi removido do banco
    assert db.query(QuartoImagem).filter_by(IdImagem=imagem.IdImagem).first() is None
    # Verifica se o arquivo foi removido
    assert not os.path.exists(test_file_path)

def test_deletar_quarto(client, db, admin_data, quarto_data, test_image):
    # Cria admin, quarto e imagem
    admin = Administrador(**admin_data)
    db.add(admin)
    quarto = Quarto(**quarto_data)
    db.add(quarto)
    db.commit()
    
    # Cria arquivo de teste temporário
    test_file_path = "uploads/quarto/test_delete_quarto.jpg"
    os.makedirs(os.path.dirname(test_file_path), exist_ok=True)
    with open(test_file_path, "wb") as f:
        f.write(b"test data")
    
    # Adiciona imagem ao quarto
    imagem = QuartoImagem(IdQuarto=quarto.IdQuarto, caminhoImagem=test_file_path)
    db.add(imagem)
    db.commit()
    
    token = criar_acesso_token({"sub": admin_data["username"]})
    
    # Testa deleção do quarto
    response = client.delete(
        f"/quartos/{quarto.IdQuarto}",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    assert response.json()["message"] == "Quarto e suas imagens foram deletados com sucesso"
    
    # Verifica se foi removido do banco
    assert db.query(Quarto).filter_by(IdQuarto=quarto.IdQuarto).first() is None
    # Verifica se a imagem associada foi removida
    assert db.query(QuartoImagem).filter_by(IdQuarto=quarto.IdQuarto).first() is None
    # Verifica se o arquivo foi removido
    assert not os.path.exists(test_file_path)