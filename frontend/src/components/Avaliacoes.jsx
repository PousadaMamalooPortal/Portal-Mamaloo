import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Avaliacoes.css';

function Avaliacoes() {
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState('');
  const [usuario, setUsuario] = useState('');

  useEffect(() => {
    setComentarios([
      {
        nome: 'Caymi',
        texto: 'Pousada muito boa. Adorei conhecer Maceió!',
        resposta: '',
      },
      {
        nome: 'Ferreira',
        texto: 'Local legal.',
        resposta: null,
      },
      {
        nome: 'Ana',
        texto: 'Excelente local. O atendimento foi ótimo e as instalações são confortáveis.',
        resposta: '',
      },
      {
        nome: 'João',
        texto: 'Ambiente tranquilo e aconchegante. Recomendo a todos!',
        resposta: '',
      },
      {
        nome: 'Mariana',
        texto: 'Muito bom. Ficaria aqui novamente sem dúvida!',
        resposta: '',
      },
      {
        nome: 'Paulo',
        texto: 'A localização é perfeita, bem próxima das principais atrações turísticas.',
        resposta: '',
      },
      {
        nome: 'Rita',
        texto: 'Atendimento de primeira. O café da manhã é delicioso!',
        resposta: '',
      },
      {
        nome: 'Lucas',
        texto: 'A experiência foi maravilhosa. Muito obrigado a toda a equipe!',
        resposta: '',
      },
      {
        nome: 'Júlia',
        texto: 'Adorei a piscina e a tranquilidade do ambiente.',
        resposta: '',
      },
      {
        nome: 'Carlos',
        texto: 'Fui muito bem recebido, e a limpeza do local estava impecável.',
        resposta: '',
      },
      {
        nome: 'Beatriz',
        texto: 'Recomendo a todos, o ambiente é muito agradável e a localização é ótima.',
        resposta: '',
      },
      {
        nome: 'Gabriel',
        texto: 'Estadia maravilhosa, com um atendimento excelente e acomodações confortáveis.',
        resposta: '',
      }
    ]);
  }, []);

  const enviarComentario = () => {
    if (!novoComentario.trim()) return;
    const payload = {
      nome: usuario || 'Anônimo',
      texto: novoComentario
    };

    
    setComentarios(prev => [...prev, payload]);
    setNovoComentario('');
  };

  return (
    <>
      <div className="avaliacoes-container">
        <h2>Avaliações de hóspedes</h2>
        <div className="comentarios-lista">
          {comentarios.map((c, idx) => (
            <div key={idx} className="comentario-box">
              <div className="comentario-topo">
                <img src="/assets/icones/mamaloo-icone-perfil.png" alt="avatar" />
                <strong>{c.nome}</strong>
              </div>
              <p>{c.texto}</p>
              {c.resposta && (
                <div className="resposta-box">
                  <p><strong>Resposta:</strong> {c.resposta}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="formulario-avaliacao">
          <input
            type="text"
            placeholder="Escreva uma avaliação"
            value={novoComentario}
            onChange={e => setNovoComentario(e.target.value)}
          />
          <button onClick={enviarComentario}>➤</button>
        </div>
      </div>
    </>
  );
}

export default Avaliacoes;
