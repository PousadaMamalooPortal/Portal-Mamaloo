import React, { useEffect, useState } from 'react';
import '../styles/cardComentario.css';

const ComentarioCard = () => {
  const [comentarios, setComentarios] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [animando, setAnimando] = useState(false);
  const comentariosPorPagina = 4;

  useEffect(() => {
    const mockData = [
      { nome: 'Beatriz', texto: 'Quarto muito espaçoso e as roupas de cama e toalhas bem limpas.', origem: 'Booking.com' },
      { nome: 'Gina', texto: 'Quarto é espaçoso, tamanho da cama é muito bom e o ar condicionado funciona bem.', origem: 'Booking.com' },
      { nome: 'Carlos', texto: 'Ambiente aconchegante, funcionários atenciosos e prestativos.', origem: 'Booking.com' },
      { nome: 'Renan', texto: 'Ambiente muito familiar e confortável! Café da manhã incrível, tudo fresco!', origem: 'Booking.com' },
      { nome: 'Ana', texto: 'Equipe super simpática e localização excelente!', origem: 'Airbnb' },
      { nome: 'João', texto: 'Limpeza impecável e café da manhã variado.', origem: 'TripAdvisor' },
      { nome: 'Larissa', texto: 'Voltarei com certeza! Fui muito bem recebida.', origem: 'Google Reviews' },
      { nome: 'Eduardo', texto: 'Ótima relação custo-benefício. Instalações modernas e confortáveis.', origem: 'Booking.com' }
    ];

    setComentarios(mockData);
  }, []);

  const totalPaginas = Math.ceil(comentarios.length / comentariosPorPagina);

  const proximaPagina = () => {
    setAnimando(true);
    setTimeout(() => {
      setPaginaAtual((prev) => (prev + 1) % totalPaginas);
      setAnimando(false);
    }, 300);
  };

  const paginaAnterior = () => {
    setAnimando(true);
    setTimeout(() => {
      setPaginaAtual((prev) => (prev - 1 + totalPaginas) % totalPaginas);
      setAnimando(false);
    }, 300);
  };

  const inicio = paginaAtual * comentariosPorPagina;
  const comentariosExibidos = comentarios.slice(inicio, inicio + comentariosPorPagina);

  return (
    <div className="comentarios-slider">
      <button className="seta seta-esquerda" onClick={paginaAnterior}>&#8249;</button>

      <div className={`comentarios-grade ${!animando ? 'mostrar' : ''}`}>
        {comentariosExibidos.map((comentario, index) => (
          <div key={index} className="comentario-card">
            <h4>{comentario.nome}</h4>
            <p className="comentario-texto">"{comentario.texto}"</p>
            <p className="comentario-origem">{comentario.origem}</p>
          </div>
        ))}
      </div>

      <button className="seta seta-direita" onClick={proximaPagina}>&#8250;</button>
    </div>
  );
};

export default ComentarioCard;
