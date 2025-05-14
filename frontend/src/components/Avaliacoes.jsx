import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Avaliacoes.css';

function Avaliacoes() {
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState('');
  const [usuario, setUsuario] = useState('');
  const [dataComentario, setDataComentario] = useState(() => {
    const hoje = new Date();
    return hoje.toISOString().slice(0, 10);
  });

  useEffect(() => {
    // Exemplo de fetch para carregar comentários do banco via API
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

    // Dados mockados para demo e testes
    setComentarios([
      {
        nome: 'Caymi',
        texto: 'Pousada muito boa. Adorei conhecer Maceió!',
        data: '13-05-2025',
        resposta: 'Obrigado pelo feedback, Caymi! Esperamos te ver novamente em breve.',
      },
      {
        nome: 'Ferreira',
        texto: 'Local legal.',
        data: '10-05-2025',
        resposta: null,
      },
      {
        nome: 'Ana',
        texto: 'Excelente local. O atendimento foi ótimo e as instalações são confortáveis.',
        data: '11-05-2025',
        resposta: '',
      },
      {
        nome: 'João',
        texto: 'Ambiente tranquilo e aconchegante. Recomendo a todos!',
        data: '12-05-2025',
        resposta: '',
      },
      {
        nome: 'Mariana',
        texto: 'Muito bom. Ficaria aqui novamente sem dúvida!',
        data: '09-05-2025',
        resposta: '',
      },
      {
        nome: 'Paulo',
        texto: 'A localização é perfeita, bem próxima das principais atrações turísticas.',
        data: '08-05-2025',
        resposta: '',
      },
      {
        nome: 'Rita',
        texto: 'Atendimento de primeira. O café da manhã é delicioso!',
        data: '07-05-2025',
        resposta: '',
      },
      {
        nome: 'Lucas',
        texto: 'A experiência foi maravilhosa. Muito obrigado a toda a equipe!',
        data: '06-05-2025',
        resposta: '',
      },
      {
        nome: 'Júlia',
        texto: 'Adorei a piscina e a tranquilidade do ambiente.',
        data: '05-05-2025',
        resposta: '',
      },
      {
        nome: 'Carlos',
        texto: 'Fui muito bem recebido, e a limpeza do local estava impecável.',
        data: '04-05-2025',
        resposta: '',
      },
      {
        nome: 'Beatriz',
        texto: 'Recomendo a todos, o ambiente é muito agradável e a localização é ótima.',
        data: '03-05-2025',
        resposta: '',
      },
      {
        nome: 'Gabriel',
        texto: 'Estadia maravilhosa, com um atendimento excelente e acomodações confortáveis.',
        data: '02-05-2025',
        resposta: '',
      },
    ]);
  }, []);

  const enviarComentario = async () => {
    if (!novoComentario.trim()) return;

    const payload = {
      nome: usuario.trim() || 'Anônimo',
      texto: novoComentario.trim(),
      data: dataComentario,
      resposta: '',
    };

    // Exemplo de envio para API (comentado)
    /*
    try {
      const response = await axios.post('/api/comentarios', payload);
      setComentarios(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Erro ao enviar comentário:', error);
    }
    */

    setComentarios(prev => [...prev, payload]);

    setNovoComentario('');
    setUsuario('');
    setDataComentario(new Date().toISOString().slice(0, 10));
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
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
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
            value={novoComentario}
            onChange={e => setNovoComentario(e.target.value)}
            className="input-comentario"
          />
          <button onClick={enviarComentario}>➤</button>
        </div>
      </div>

      <div className="comentarios-lista">
        {comentarios.map((c, idx) => (
          <div key={idx} className="comentario-box">
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
