import React, { useState } from 'react';
import '../../styles/StyleModais/modalAtracao.css';

export default function ModalAtracao({ modo, dadosIniciais = {}, onClose, onConfirmar }) {
  const [titulo, setTitulo] = useState(dadosIniciais.titulo || '');
  const [descricao, setDescricao] = useState(dadosIniciais.descricao || '');
  const [imagem, setImagem] = useState(null);

  const handleConfirmar = () => {
    onConfirmar({ titulo, descricao, imagem });
    onClose();
  };

  return (
    <div className="modal-atracao-overlay">
      <div className="modal-atracao">
        <h2>{modo === 'editar' ? 'Editar Atração' : 'Adicionar Atração'}</h2>

        <input
          type="text"
          placeholder="Digite o título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <textarea
          placeholder="Digite a descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <label htmlFor="imagemUpload">Realize o upload da imagem:</label>
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
