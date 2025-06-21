import React, { useEffect, useState } from "react";
import '../styles/Administrador.css';
import ModalAtracao from './Modais/ModalAtracao';
import ModalQuarto from './Modais/ModalQuarto';
import AvaliacoesAdmin from "./AvaliacoesAdm";
import { Link } from 'react-router-dom';
import HeaderAdm from './HeaderAdm';
import { URL_API } from '../Api'; 

export default function Administrador() {
  const [quartos, setQuartos] = useState([]);
  const [atracoes, setAtracoes] = useState([]);

  const [modalAberto, setModalAberto] = useState(false);
  const [dadosEdicao, setDadosEdicao] = useState({});
  const [idEditando, setIdEditando] = useState(null);
  const [tipoModal, setTipoModal] = useState(null); 
  const [modoSubModal, setModoSubModal] = useState("adicionar"); 

  
  const fetchAllQuartos = async () => {
    try {
      const response = await fetch(`${URL_API}/quartos/`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      
      const formattedQuartos = data.map(item => ({
        id: item.IdQuarto, 
        nome: item.NomeQuarto, 
        descricao: item.descricaoQuarto || "", 
        capacidade: item.CapacidadeQuarto, 
        valor: item.ValorQuarto,
        promocao: item.promocao || "", 
        itens: item.itens || [],       
        imagens: item.imagemQuartos || [], 
      }));
      setQuartos(formattedQuartos);
    } catch (err) {
      console.error("Erro ao carregar quartos:", err);
      setQuartos([]);
    }
  };

  const fetchAllAtracoes = async () => {
    try {
      const response = await fetch(`${URL_API}/pontos-turisticos/`); 
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      
      const formattedAtracoes = data.map(item => ({
        id: item.idpontoturistico,
        nome: item.nomepontoturistico,
        descricao: item.descricaopontoturistico || "",
        imagem: item.imagem_url || "",
        mapa: item.mapa || "", 
      }));
      setAtracoes(formattedAtracoes);
    } catch (err) {
      console.error("Erro ao carregar atrações:", err);
      setAtracoes([]); 
    }
  };

  useEffect(() => {
    fetchAllQuartos();
    fetchAllAtracoes();
  }, []);

  
  const handleEdit = async (id, tipo) => {
    setModoSubModal("editar");
    setIdEditando(id); 
    setTipoModal(tipo);
    setModalAberto(true); 

    try {
      let url = "";
      if (tipo === "atracoes") {
        url = `${URL_API}/pontos-turisticos/${id}`; 
      } else if (tipo === "quartos") {
        url = `${URL_API}/quartos/${id}`; 
      } else {
        console.error("Tipo de item desconhecido para edição:", tipo);
        setModalAberto(false);
        return;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erro ao buscar ${tipo} com ID ${id}: status ${response.status}`);
      
      const data = await response.json();

      
      if (tipo === "atracoes") {
        setDadosEdicao({ 
          id: data.idpontoturistico, 
          titulo: data.nomepontoturistico || '', 
          descricao: data.descricaopontoturistico || '',
          imagem: data.imagem_url || '',
          mapa: data.mapa || '' 
        });
      } else if (tipo === "quartos") {
        setDadosEdicao({
          id: data.IdQuarto, 
          titulo: data.NomeQuarto || '', 
          descricao: data.descricaoQuarto || '',
          capacidade: data.CapacidadeQuarto || '', 
          valor: data.ValorQuarto || '',       
          promocao: data.promocao || '', 
          itens: data.itens || '',       
          imagem: data.imagemQuartos || '', 
        });
      }
    } catch (error) {
      console.error('Erro ao buscar dados para edição:', error);
      alert(`Erro ao carregar dados para edição. Verifique o console.`);
      setModalAberto(false); 
    }
  };

  
  const handleDelete = async (id, tipo) => {
    if (!window.confirm(`Tem certeza que deseja excluir este ${tipo === 'quartos' ? 'quarto' : 'atração'}?`)) {
        return; 
    }

    try {
        let url = "";
        if (tipo === "atracoes") {
            url = `${URL_API}/pontos-turisticos/${id}`; 
        } else if (tipo === "quartos") {
            url = `${URL_API}/quartos/${id}`; 
        } else {
            console.error("Tipo de item desconhecido para exclusão:", tipo);
            return;
        }

        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            
            if (response.status === 204) {
                 console.log(`${tipo} com ID ${id} excluído com sucesso (No Content).`);
            } else {
                 throw new Error(`Erro ao excluir ${tipo} com ID ${id}: status ${response.status}`);
            }
        } else {
             const result = await response.json(); 
             console.log(result);
        }

        
        if (tipo === "quartos") {
            setQuartos((prev) => prev.filter((item) => item.id !== id));
        } else if (tipo === "atracoes") {
            setAtracoes((prev) => prev.filter((item) => item.id !== id));
        }
        alert(`${tipo === 'quartos' ? 'Quarto' : 'Atração'} excluído(a) com sucesso!`);

    } catch (error) {
        console.error('Erro ao excluir item:', error);
        alert('Erro ao excluir item. Verifique o console para mais detalhes.');
    }
  };

  
  const adicionarItem = (tipo) => {
    setTipoModal(tipo);
    setModoSubModal("adicionar");
    setDadosEdicao({}); 
    setIdEditando(null); 
    setModalAberto(true);
  };

  
  const handleConfirmarModal = async (dadosDoModal) => {
    
    setModalAberto(false);
    
    
    const formData = new FormData();
    formData.append('nomepontoturistico', dadosDoModal.titulo);
    formData.append('descricaopontoturistico', dadosDoModal.descricao);
    if (dadosDoModal.imagem) { 
      formData.append('imagem_url', dadosDoModal.imagem); 
    }
    
    formData.append('mapa', dadosDoModal.mapa || ''); 

    try {
      let response;
      if (modoSubModal === "editar") {
        
        response = await fetch(`${URL_API}/pontos-turisticos/${dadosDoModal.id}`, {
          method: 'PUT',
          body: formData, 
        });
      } else {
        
        response = await fetch(`${URL_API}/pontos-turisticos/`, {
          method: 'POST',
          body: formData,
        });
      }

      if (!response.ok) {
        throw new Error(`Erro ao salvar atração: status ${response.status}`);
      }

      const result = await response.json();
      console.log('Atração salva com sucesso:', result);
      alert('Atração salva com sucesso!');
      fetchAllAtracoes(); 
    } catch (error) {
      console.error('Erro ao salvar atração:', error);
      alert('Erro ao salvar atração. Verifique o console para mais detalhes.');
    }
  };

  const handleConfirmarModalQuarto = async (dadosDoModal) => {
    
    setModalAberto(false); 

    
    const formData = new FormData();
    formData.append('NomeQuarto', dadosDoModal.titulo);
    formData.append('descricaoQuarto', dadosDoModal.descricao);
    formData.append('CapacidadeQuarto', dadosDoModal.capacidade);
    formData.append('ValorQuarto', dadosDoModal.valor);
    formData.append('promocao', dadosDoModal.promocao || '');
    formData.append('itens', dadosDoModal.itens || '');
    if (dadosDoModal.imagem) { 
      formData.append('imagemQuartos', dadosDoModal.imagem); 
    }
    


    try {
      let response;
      if (modoSubModal === "editar") {
       
        response = await fetch(`${URL_API}/quartos/${dadosDoModal.id}`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        
        response = await fetch(`${URL_API}/quartos/`, {
          method: 'POST',
          body: formData,
        });
      }

      if (!response.ok) {
        throw new Error(`Erro ao salvar quarto: status ${response.status}`);
      }

      const result = await response.json();
      console.log('Quarto salvo com sucesso:', result);
      alert('Quarto salvo com sucesso!');
      fetchAllQuartos(); 
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

    
    {modalAberto && tipoModal === 'atracoes' && (
      <ModalAtracao
        modo={modoSubModal}
        dadosIniciais={dadosEdicao} 
        onClose={() => setModalAberto(false)}
        onConfirmar={handleConfirmarModal}
      />
    )}

    
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