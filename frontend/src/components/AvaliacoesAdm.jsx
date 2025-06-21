import React, { useEffect, useState } from 'react';
import '../styles/AvaliacoesAdm.css';
import HeaderAdm from './HeaderAdm';
import { URL_API } from '../Api'; 

function AvaliacoesAdm() {
  const [comentarios, setComentarios] = useState([]);
  const [respostaAbertaId, setRespostaAbertaId] = useState(null); // Usar ID em vez de índice
  const [respostaTexto, setRespostaTexto] = useState('');

  
  async function fetchComentarios() {
    try {
      const response = await fetch(`${URL_API}/avaliacoes`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      
      const formattedComentarios = data.map(item => ({
        id: item.idavaliacao, 
        nome: item.nomeavaliacao,
        texto: item.comentarioavaliacao,
        data: item.dataavaliacao, 
        resposta: item.respostaavaliacao || null, 
      }));
      setComentarios(formattedComentarios);
    } catch (error) {
      console.error('Erro ao buscar avaliações:', error);
      setComentarios([]); 
    }
  }

  useEffect(() => {
    fetchComentarios(); 
  }, []); 

  const deletarComentario = async (idToDelete) => {
    try {
      const response = await fetch(`${URL_API}/avaliacoes/${idToDelete}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      setComentarios(prev => prev.filter(c => c.id !== idToDelete));
    } catch (error) {
      console.error('Erro ao deletar avaliação:', error);
      alert('Erro ao deletar avaliação. Verifique o console.');
    }
  };

  const responderComentario = async (idToRespond) => {
    const novaResposta = respostaTexto.trim();
    if (!novaResposta) return;

    try {
      
      const comentarioOriginal = comentarios.find(c => c.id === idToRespond);
      if (!comentarioOriginal) {
        console.error("Comentário não encontrado para responder.");
        return;
      }

      
      const payload = {
        idavaliacao: comentarioOriginal.id,
        nomeavaliacao: comentarioOriginal.nome,
        comentarioavaliacao: comentarioOriginal.texto,
        dataavaliacao: comentarioOriginal.data,
        respostaavaliacao: novaResposta, 
      };

      const response = await fetch(`${URL_API}/avaliacoes/${idToRespond}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedData = await response.json(); 
      
      
      const updatedComentario = {
        id: updatedData.idavaliacao,
        nome: updatedData.nomeavaliacao,
        texto: updatedData.comentarioavaliacao,
        data: updatedData.dataavaliacao,
        resposta: updatedData.respostaavaliacao,
      };

      setComentarios(prev =>
        prev.map(c => (c.id === idToRespond ? updatedComentario : c))
      );
      setRespostaAbertaId(null); 
      setRespostaTexto(''); 
    } catch (error) {
      console.error('Erro ao responder avaliação:', error);
      alert('Erro ao responder avaliação. Verifique o console.');
    }
  };

  return (
    <div className="avaliacoes-admin-container">
      <HeaderAdm />
      <h2>Avaliações de hóspedes</h2>
      <div className="comentarios-admin-lista">
        {comentarios.map((c) => ( 
          <div key={c.id} className="comentario-admin-box"> 
            <div className="comentario-admin-topo">
              <img
                src="/assets/icones/mamaloo-icone-perfil.png"
                alt="avatar"
              />
              <div>
                <strong>{c.nome}</strong>
                <div className="comentario-data">{c.data}</div>
              </div>
              <div className="comentario-botoes">
                
                {(!c.resposta || respostaAbertaId === c.id) && (
                  <button 
                    onClick={() => setRespostaAbertaId(respostaAbertaId === c.id ? null : c.id)}
                    title={respostaAbertaId === c.id ? "Fechar resposta" : "Responder"}
                  >
                    ↩
                  </button>
                )}
                <button onClick={() => deletarComentario(c.id)} title="Deletar">🗑</button>
              </div>
            </div>
            <p>{c.texto}</p>

            {c.resposta && c.resposta.trim() !== '' && (
              <div className="resposta-admin">
                <div className="resposta-admin-topo">
                  <img
                    src="/assets/icones/mamaloo-icone-perfil.png"
                    alt="Logo"
                    className="resposta-logo"
                  />
                  <strong>Mamaloo Pousada</strong>
                </div>
                <p>{c.resposta}</p>
              </div>
            )}

            {respostaAbertaId === c.id && ( 
              <div className="resposta-formulario">
                <textarea
                  placeholder="Digite sua resposta..."
                  value={respostaTexto}
                  onChange={(e) => setRespostaTexto(e.target.value)}
                ></textarea>
                <button onClick={() => responderComentario(c.id)}> 
                  Enviar resposta
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AvaliacoesAdm;