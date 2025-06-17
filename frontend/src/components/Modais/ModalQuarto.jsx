import React, { useState } from 'react';
import '../../styles/StyleModais/ModalQuarto.css';

export default function ModalQuarto({ modo, dadosIniciais = {}, onClose, onConfirmar }) {
  const [titulo, setTitulo] = useState(dadosIniciais.titulo || '');
  const [descricao, setDescricao] = useState(dadosIniciais.descricao || '');
  const [preco, setPreco] = useState(dadosIniciais.preco || '');
  const [promocao, setPromocao] = useState(dadosIniciais.promocao || '');
  const [itens, setItens] = useState(dadosIniciais.itens || '');
  const [imagem, setImagem] = useState(null);

  const handleConfirmar = () => {
    onConfirmar({ titulo, descricao, preco, promocao, itens, imagem });
    onClose();
  };

  return (
    <div className="modal-quarto-overlay">
      <div className="modal-quarto">
        <h2>{modo === 'editar' ? 'Editar Quarto' : 'Adicionar Quarto'}</h2>

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

        <input
          type="number"
          placeholder="Preço (R$)"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <input
          type="number"
          placeholder="Preço promocional (R$)"
          value={promocao}
          onChange={(e) => setPromocao(e.target.value)}
        />

        <textarea
          placeholder="Itens do quarto (separados por vírgula)"
          value={itens}
          onChange={(e) => setItens(e.target.value)}
        />

        <label htmlFor="imagemUpload">Realize o upload da imagem:</label>
        <input
          type="file"
          id="imagemUpload"
          onChange={(e) => setImagem(e.target.files[0])}
        />

        <div className="botoes">
          <button onClick={onClose}>
            {modo === 'editar' ? 'Cancelar' : 'Cancelar'}
          </button>
          <button onClick={handleConfirmar}>
            {modo === 'editar' ? 'Concluir edição' : 'Concluir adição'}
          </button>
        </div>
      </div>
    </div>
  );
}
