import React, { useState, useEffect } from 'react';
import '../../styles/StyleModais/modalAtracao.css';

export default function ModalAtracao({ modo, dadosIniciais = {}, onClose, onConfirmar }) {
 
  const [titulo, setTitulo] = useState(dadosIniciais.titulo || ''); 
 
  const [descricao, setDescricao] = useState(dadosIniciais.descricao || ''); 
  
  const [imagem, setImagem] = useState(null); 

  const [imagemUrlExistente, setImagemUrlExistente] = useState(dadosIniciais.imagem || ''); 

  
  useEffect(() => {
    if (modo === 'editar' && dadosIniciais) {
      setTitulo(dadosIniciais.titulo || '');
      setDescricao(dadosIniciais.descricao || '');
      setImagem(null); 
      setImagemUrlExistente(dadosIniciais.imagem || ''); 
    } else if (modo === 'adicionar') {
      setTitulo('');
      setDescricao('');
      setImagem(null);
      setImagemUrlExistente('');
    }
  }, [dadosIniciais, modo]);

  const handleConfirmar = () => {
    
    onConfirmar({
      id: dadosIniciais.id, 
      titulo,
      descricao,
      imagem 
    });
  };

  return (
    <div className="modal-atracao-overlay">
      <div className="modal-atracao">
        <h2>{modo === 'editar' ? 'Editar Atração' : 'Adicionar Atração'}</h2>

        <input
          type="text"
          placeholder="Digite o título (nome da atração)"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <textarea
          placeholder="Digite a descrição da atração"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        
        {modo === 'editar' && imagemUrlExistente && (
            <div className="imagem-preview">
                <p>Imagem atual:</p>
                
                <img src={imagemUrlExistente} alt="Imagem atual da atração" style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }} />
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