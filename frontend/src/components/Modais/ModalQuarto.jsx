import React, { useState, useEffect } from 'react';
import '../../styles/StyleModais/ModalQuarto.css';

export default function ModalQuarto({ modo, dadosIniciais = {}, onClose, onConfirmar }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [valor, setValor] = useState('');
  const [promocao, setPromocao] = useState('');
  const [imagem, setImagem] = useState(null);
  const [imagemUrlExistente, setImagemUrlExistente] = useState('');

  useEffect(() => {
    if (modo === 'editar' && dadosIniciais) {
      setTitulo(dadosIniciais.titulo || '');
      setDescricao(dadosIniciais.descricao || '');
      setCapacidade(dadosIniciais.capacidade || '');
      setValor(dadosIniciais.valor || '');
      setPromocao(dadosIniciais.promocao || '');
      setImagemUrlExistente(dadosIniciais.imagem || '');
      setImagem(null);
    } else if (modo === 'adicionar') {
      setTitulo('');
      setDescricao('');
      setCapacidade('');
      setValor('');
      setPromocao('');
      setImagem(null);
      setImagemUrlExistente('');
    }
  }, [dadosIniciais, modo]);

  const handleConfirmar = () => {
    onConfirmar({
      id: dadosIniciais.id,
      titulo,
      descricao,
      capacidade,
      valor,
      promocao,
      imagem,
    });
  };

  return (
    <div className="modal-quarto-overlay">
      <div className="modal-quarto">
        <h2>{modo === 'editar' ? 'Editar Quarto' : 'Adicionar Quarto'}</h2>

        <input
          type="text"
          placeholder="Digite o título (Nome do Quarto)"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <textarea
          placeholder="Digite a descrição do quarto"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <input
          type="number"
          placeholder="Capacidade do Quarto"
          value={capacidade}
          onChange={(e) => setCapacidade(e.target.value)}
        />

        <input
          type="number"
          placeholder="Valor do Quarto (R$)"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        
        <input
          type="text"
          placeholder="Promoção (valor promocional)"
          value={promocao}
          onChange={(e) => setPromocao(e.target.value)}
        />

        {modo === 'editar' && imagemUrlExistente && (
          <div className="imagem-preview">
            <p>Imagem atual:</p>
            <img
              src={imagemUrlExistente}
              alt="Imagem atual do quarto"
              style={{
                maxWidth: '100px',
                maxHeight: '100px',
                objectFit: 'cover',
                borderRadius: '6px',
              }}
            />
          </div>
        )}

        <label htmlFor="imagemUpload">Realize o upload da nova imagem:</label>
        <input
          type="file"
          id="imagemUpload"
          onChange={(e) => setImagem(e.target.files[0])}
        />

        <div className="botoes">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleConfirmar}>
            {modo === 'editar' ? 'Concluir edição' : 'Concluir adição'}
          </button>
        </div>
      </div>
    </div>
  );
}
