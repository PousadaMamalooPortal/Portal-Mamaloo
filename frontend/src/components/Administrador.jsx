import React, { useEffect, useState } from "react";
import '../styles/Administrador.css';

export default function Administrador() {
  // Removido quartosHome
  const [quartos, setQuartos] = useState([]);
  const [atracoes, setAtracoes] = useState([]);

  useEffect(() => {
    /*
    fetch("https://suaapi.com/quartos")
      .then((res) => res.json())
      .then((data) => setQuartos(data))
      .catch((err) => console.error("Erro ao carregar quartos:", err));

    fetch("https://suaapi.com/atracoes")
      .then((res) => res.json())
      .then((data) => setAtracoes(data))
      .catch((err) => console.error("Erro ao carregar atrações:", err));
    */

    setQuartos([
      { id: 4, nome: "Quarto Quádruplo de Luxo" },
      { id: 5, nome: "Quarto Triplo de Luxo" },
      { id: 6, nome: "Estúdio Deluxe" },
    ]);
    setAtracoes([
      { id: 7, nome: "Piscinas Naturais de Pajuçara" },
      { id: 8, nome: "Praia de Ponta Verde" },
      { id: 9, nome: "Marco dos Corais" },
      { id: 10, nome: "Pavilhão do Artesanato" },
      { id: 11, nome: "Museu Théo Brandão" },
    ]);
  }, []);

  const handleEdit = (id) => {
    console.log("Editar item com id:", id);
  };

  const handleDelete = (id, tipo) => {
    console.log(`Excluir item do tipo ${tipo} com id:`, id);
    if (tipo === "quartos") {
      setQuartos((prev) => prev.filter((item) => item.id !== id));
    } else if (tipo === "atracoes") {
      setAtracoes((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const realizarLogout = () => { 
    localStorage.removeItem('token'); 
    navegar("/adm/login"); 
  };

  const gerarNovoId = (lista) => {
    return lista.length > 0 ? Math.max(...lista.map((item) => item.id)) + 1 : 1;
  };

  const adicionarItem = (tipo) => {
    const nomeNovo = prompt(`Digite o nome do novo item para ${tipo}:`);
    if (!nomeNovo) return;

    if (tipo === "quartos") {
      const novoItem = { id: gerarNovoId(quartos), nome: nomeNovo };
      setQuartos((prev) => [...prev, novoItem]);
    } else if (tipo === "atracoes") {
      const novoItem = { id: gerarNovoId(atracoes), nome: nomeNovo };
      setAtracoes((prev) => [...prev, novoItem]);
    }
  };

  const CardItem = ({ id, nome, onEdit, onDelete }) => (
    <div className="card-item">
      <span>{nome}</span>
      <div className="card-icons">
       <button aria-label="Editar" title="Editar" className="btn-icon" onClick={onEdit}>
          <img src="/assets/icones/mamaloo-icone-editar.png" alt="Editar" className="icon" />
        </button>
        <button aria-label="Deletar" title="Deletar" className="btn-icon" onClick={onDelete}>
          <img src="/assets/icones/mamaloo-icone-lixeira.png" alt="Deletar" className="icon" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <header className="header">
        <img
          src="/assets/mamaloo-logo.png"
          alt="Logo Mamaloo Pousada"
          className="logo"
        />
        <nav>
          <a href="#quartos" className="nav-link">Editar</a>
          <a href="#atracoes" className="nav-link">Avaliações</a>
           <a href="#" className="nav-link" onClick={realizarLogout}>Sair</a>
        </nav>

      </header>

      <main className="container">
        <section id="quartos" className="section">
          <h2>Quartos</h2>
          <div className="cards-container">
            {quartos.map((item) => (
              <CardItem
                key={item.id}
                id={item.id}
                nome={item.nome}
                onEdit={() => handleEdit(item.id)}
                onDelete={() => handleDelete(item.id, "quartos")}
              />
            ))}
          </div>
          <button
            className="btn-adicionar"
            onClick={() => adicionarItem("quartos")}
          >
            Adicionar
          </button>
        </section>

        <section id="atracoes" className="section">
          <h2>Atrações</h2>
          <div className="cards-container">
            {atracoes.map((item) => (
              <CardItem
                key={item.id}
                id={item.id}
                nome={item.nome}
                onEdit={() => handleEdit(item.id)}
                onDelete={() => handleDelete(item.id, "atracoes")}
              />
            ))}
          </div>
          <button
            className="btn-adicionar"
            onClick={() => adicionarItem("atracoes")}
          >
            Adicionar
          </button>
        </section>
      </main>
    </>
  );
}
