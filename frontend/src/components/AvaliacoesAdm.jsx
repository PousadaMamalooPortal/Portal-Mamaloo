import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AvaliacoesAdm.css';
import HeaderAdm from './HeaderAdm';

function AvaliacoesAdm() {
  const [comentarios, setComentarios] = useState([]);
  const [respostaAberta, setRespostaAberta] = useState(null);
  const [respostaTexto, setRespostaTexto] = useState('');

  useEffect(() => {
    // API real (comentada para testes)
    /*
    async function fetchComentarios() {
      try {
        const response = await axios.get('/api/comentarios');
        setComentarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar comentários:', error);
      }
    }
    fetchComentarios();
    */

    // ✅ Dados mockados para testes locais
    setComentarios([
      {
        nome: 'Caymi',
        texto: 'Pousada muito boa. Adorei conhecer Maceió!',
        data: '13-05-2025',
        resposta: 'Obrigado pelo feedback, Caymi! Esperamos te ver novamente em breve.'
      },
      {
        nome: 'Ferreira',
        texto: 'Local legal.',
        data: '10-05-2025',
        resposta: null
      },
      {
        nome: 'Ana',
        texto: 'Excelente local. Atendimento ótimo!',
        data: '11-05-2025',
        resposta: ''
      }
    ]);
  }, []);

  const deletarComentario = async (index) => {
    const comentario = comentarios[index];
    try {
      // await axios.delete(`/api/comentarios/${comentario.id}`);
      setComentarios(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Erro ao deletar comentário:', error);
    }
  };

  const responderComentario = async (index) => {
    const comentario = comentarios[index];
    const novaResposta = respostaTexto.trim();
    if (!novaResposta) return;

    try {
      const updated = { ...comentario, resposta: novaResposta };
      // await axios.put(`/api/comentarios/${comentario.id}`, updated);
      setComentarios(prev =>
        prev.map((c, i) => (i === index ? updated : c))
      );
      setRespostaAberta(null);
      setRespostaTexto('');
    } catch (error) {
      console.error('Erro ao responder comentário:', error);
    }
  };

  return (
    <div className="avaliacoes-admin-container">
      <HeaderAdm />
      <h2>Avaliações de hóspedes</h2>
      <div className="comentarios-admin-lista">
        {comentarios.map((c, idx) => (
          <div key={idx} className="comentario-admin-box">
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
                <button onClick={() => setRespostaAberta(respostaAberta === idx ? null : idx)}>↩</button>
                <button onClick={() => deletarComentario(idx)}>🗑</button>
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

            {respostaAberta === idx && (
              <div className="resposta-formulario">
                <textarea
                  placeholder="Digite sua resposta..."
                  value={respostaTexto}
                  onChange={(e) => setRespostaTexto(e.target.value)}
                ></textarea>
                <button onClick={() => responderComentario(idx)}>
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