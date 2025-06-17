import React, { useEffect, useState } from "react";
import '../styles/Administrador.css';
import ModalAtracao from './Modais/ModalAtracao';
import ModalQuarto from './Modais/ModalQuarto';
import AvaliacoesAdmin from "./AvaliacoesAdm";
import { Link } from 'react-router-dom';
import HeaderAdm from './HeaderAdm';


export default function Administrador() {
  const [quartos, setQuartos] = useState([]);
  const [atracoes, setAtracoes] = useState([]);

  const [modalAberto, setModalAberto] = useState(false);
  const [modoModal, setModoModal] = useState("adicionar");
  const [dadosEdicao, setDadosEdicao] = useState({});
  const [idEditando, setIdEditando] = useState(null);
  const [tipoModal, setTipoModal] = useState(null);
  const [modoSubModal, setModoSubModal] = useState("adicionar");

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
      {
        id: 4,
        nome: "Quarto Quádruplo de Luxo",
        descricao: "Descrição do quarto 4",
        preco: "300",
        promocao: "250",
        itens: "Ar condicionado, TV, Wi-Fi"
      },
      {
        id: 5,
        nome: "Quarto Triplo de Luxo",
        descricao: "Descrição do quarto 5",
        preco: "250",
        promocao: "230",
        itens: "Frigobar, Wi-Fi"
      },
      {
        id: 6,
        nome: "Estúdio Deluxe",
        descricao: "Descrição do estúdio",
        preco: "400",
        promocao: "350",
        itens: "Jacuzzi, TV 50', Wi-Fi Premium"
      }
    ]);
    setAtracoes([
      { id: 7, nome: "Piscinas Naturais de Pajuçara" },
      { id: 8, nome: "Praia de Ponta Verde" },
      { id: 9, nome: "Marco dos Corais" },
      { id: 10, nome: "Pavilhão do Artesanato" },
      { id: 11, nome: "Museu Théo Brandão" },
    ]);
  }, []);

  const handleEdit = (id, tipo) => {
    if (tipo === "atracoes") {
      const atracao = atracoes.find(item => item.id === id);
      if (atracao) {
        setModoSubModal("editar");
        setTipoModal("atracoes");
        setDadosEdicao({ titulo: atracao.nome, descricao: "" });
        setIdEditando(id);
        setModalAberto(true);
      }
    } else if (tipo === "quartos") {
      const quarto = quartos.find(item => item.id === id);
      if (quarto) {
        setModoSubModal("editar");
        setTipoModal("quartos");
        setDadosEdicao({
          titulo: quarto.nome || '',
          descricao: quarto.descricao || '',
          preco: quarto.preco || '',
          promocao: quarto.promocao || '',
          itens: quarto.itens || '',
          imagem: null
        });
        setIdEditando(id);
        setModalAberto(true);
      }
    }
  };

  const handleDelete = (id, tipo) => {
    console.log(`Excluir item do tipo ${tipo} com id:`, id);
    if (tipo === "quartos") {
      setQuartos((prev) => prev.filter((item) => item.id !== id));
    } else if (tipo === "atracoes") {
      setAtracoes((prev) => prev.filter((item) => item.id !== id));
    }
  };

 

  const gerarNovoId = (lista) => {
    return lista.length > 0 ? Math.max(...lista.map((item) => item.id)) + 1 : 1;
  };

  const adicionarItem = (tipo) => {
    setTipoModal(tipo);
    setModoSubModal("adicionar");
    setDadosEdicao({});
    setModalAberto(true);
  };

  const handleConfirmarModal = async ({ titulo, descricao, imagem }) => {
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);
    if (imagem) {
      formData.append('imagem', imagem);
    }

    try {
      if (modoSubModal === "editar") {
        const response = await fetch(`link api${idEditando}`, {
          method: 'PUT',
          body: formData,
        });

        if (!response.ok) throw new Error('Erro ao editar atração');

        const dadosAtualizados = await response.json();

        setAtracoes(prev =>
          prev.map(item =>
            item.id === idEditando ? dadosAtualizados : item
          )
        );

      } else {
        const response = await fetch('link api', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Erro ao adicionar atração');

        const novaAtracao = await response.json();
        setAtracoes(prev => [...prev, novaAtracao]);
      }

    } catch (error) {
      console.error('Erro ao salvar atração:', error);
      alert('Erro ao salvar atração. Verifique o console para mais detalhes.');
    }
  };

  const handleConfirmarModalQuarto = async ({ titulo, descricao, preco, promocao, itens, imagem }) => {
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);
    formData.append('preco', preco);
    formData.append('promocao', promocao);
    formData.append('itens', itens);
    if (imagem) {
      formData.append('imagem', imagem);
    }

    try {
      if (modoSubModal === "editar") {
        const response = await fetch(`https://suaapi.com/quartos/${idEditando}`, {
          method: 'PUT',
          body: formData,
        });

        if (!response.ok) throw new Error('Erro ao editar quarto');
        const dadosAtualizados = await response.json();

        setQuartos(prev =>
          prev.map(item =>
            item.id === idEditando ? dadosAtualizados : item
          )
        );
      } else {
        const response = await fetch('https://suaapi.com/quartos', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Erro ao adicionar quarto');
        const novoQuarto = await response.json();
        setQuartos(prev => [...prev, novoQuarto]);
      }

    } catch (error) {
      console.error('Erro ao salvar quarto:', error);
      alert('Erro ao salvar quarto. Verifique o console para mais detalhes.');
    }
  };

  const CardItem = ({ id, nome, onEdit, onDelete }) => (
    <div className="card-item">
      <span>{nome}</span>
      <div className="card-icons">
       <button aria-label="Editar" title="Editar" className="btn-icon btn-editar" onClick={onEdit}>
          <img src="/assets/icones/mamaloo-icone-editar.png" alt="Editar" className="icon" />
        </button>
        <button aria-label="Deletar" title="Deletar" className="btn-icon btn-delete" onClick={onDelete}>
          <img src="/assets/icones/mamaloo-icone-lixeira.png" alt="Deletar" className="icon" />
        </button>
      </div>
    </div>
  );

  return (
    <>
   <div className="admin-page">
        <HeaderAdm />

      <main className="container">
        <section id="quartos" className="section">
          <h2>Quartos</h2>
          <div className="cards-container">
            {quartos.map((item) => (
              <CardItem
                key={item.id}
                id={item.id}
                nome={item.nome}
                onEdit={() => handleEdit(item.id, "quartos")}
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
                onEdit={() => handleEdit(item.id, "atracoes")}
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
    </div>

    {/* Modal de Atrações */}
    {modalAberto && tipoModal === 'atracoes' && (
      <ModalAtracao
        modo={modoSubModal}
        dadosIniciais={dadosEdicao}
        onClose={() => setModalAberto(false)}
        onConfirmar={handleConfirmarModal}
      />
    )}

    {/* Modal de Quartos */}
    {modalAberto && tipoModal === 'quartos' && (
      <ModalQuarto
        modo={modoSubModal}
        dadosIniciais={dadosEdicao}
        onClose={() => setModalAberto(false)}
        onConfirmar={handleConfirmarModalQuarto}
      />
    )}
    </>
  );
}
