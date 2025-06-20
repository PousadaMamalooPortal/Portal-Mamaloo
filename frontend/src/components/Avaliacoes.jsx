import React, { useEffect, useState } from 'react';
import { URL_API } from '../Api.js'; 
import '../styles/Avaliacoes.css';

function Avaliacoes() {
  const [comentarios, setComentarios] = useState([]);
  const [novoComentarioTexto, setNovoComentarioTexto] = useState(''); 
  const [nomeUsuario, setNomeUsuario] = useState(''); 
  const [dataComentario, setDataComentario] = useState(() => { 
    const hoje = new Date();
    return hoje.toISOString().slice(0, 10);
  });

  useEffect(() => {
    async function fetchComentarios() {
      try {
        
        const response = await fetch(`${URL_API}/avaliacoes`);
        
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        
        const formattedData = data.map(item => ({
          idavaliacao: item.idavaliacao,
          nome: item.nomeavaliacao,
          texto: item.comentarioavaliacao,
          data: item.dataavaliacao,
          resposta: item.respostaavaliacao,
        }));
        setComentarios(formattedData);
      } catch (error) {
        console.error('Erro ao buscar avaliações:', error);
      }
    }
    fetchComentarios();
  }, []);

  const enviarComentario = async () => {
    if (!novoComentarioTexto.trim()) return;

    
    const payload = {
      nomeavaliacao: nomeUsuario.trim() || 'Anônimo',
      comentarioavaliacao: novoComentarioTexto.trim(),
      dataavaliacao: dataComentario,
      respostaavaliacao: '', 
    };

    try {
      
      const response = await fetch(`${URL_API}/avaliacoes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(payload), 
      });

      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      
      
      const newComment = {
        idavaliacao: responseData.idavaliacao,
        nome: responseData.nomeavaliacao,
        texto: responseData.comentarioavaliacao,
        data: responseData.dataavaliacao,
        resposta: responseData.respostaavaliacao,
      };
      setComentarios(prev => [...prev, newComment]);
      
      
      setNovoComentarioTexto('');
      setNomeUsuario('');
      setDataComentario(new Date().toISOString().slice(0, 10)); 
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
    }
  };

  return (
    <>
      <div className="avaliacoes-container">
        <h2>Avaliações de hóspedes</h2>

        <div className="formulario-avaliacao">
          <div className="inputs-superiores">
            <input
              type="text"
              placeholder="Seu nome"
              value={nomeUsuario}
              onChange={e => setNomeUsuario(e.target.value)}
              className="input-nome"
            />
            <input
              type="date"
              value={dataComentario}
              onChange={e => setDataComentario(e.target.value)}
              className="input-data"
            />
          </div>

          <div className="input-comentario-container">
            <input
              type="text"
              placeholder="Escreva uma avaliação"
              value={novoComentarioTexto}
              onChange={e => setNovoComentarioTexto(e.target.value)}
              className="input-comentario"
            />
            <button onClick={enviarComentario}>➤</button>
          </div>
        </div>

        <div className="comentarios-lista">
          {comentarios.map((c) => (
            <div key={c.idavaliacao} className="comentario-box"> 
              <div className="comentario-topo">
                <img
                  src="/assets/icones/mamaloo-icone-perfil.png"
                  alt="avatar"
                />
                <strong>{c.nome}</strong>
                <span className="data-comentario">{c.data}</span>
              </div>
              <p>{c.texto}</p>
              {typeof c.resposta === 'string' && c.resposta.trim() !== '' && (
                <div className="resposta-box">
                  <div className="resposta-header">
                    <img
                      src="/assets/icones/mamaloo-icone-perfil.png"
                      alt="Logo Mamaloo"
                      className="resposta-logo"
                    />
                    <strong className="resposta-nome">Mamaloo Pousada</strong>
                  </div>
                  <p className="resposta-texto">{c.resposta}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Avaliacoes;