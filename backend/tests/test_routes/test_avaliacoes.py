def test_create_avaliacao(client, db):
    # Teste para criar uma avaliação
    response = client.post(
        "/api/avaliacoes/",
        json={
            "nomeavaliacao": "João",
            "comentarioavaliacao": "Ótimo serviço!",
            "dataavaliacao": "2023-01-01"
        }
    )
    assert response.status_code == 200
    assert "idavaliacao" in response.json()

def test_get_avaliacoes(client, db):
    # Teste para listar avaliações
    response = client.get("/api/avaliacoes/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)