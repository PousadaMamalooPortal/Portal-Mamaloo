import React, { useEffect, useState } from 'react';
import '../styles/Atracoes.css';

const URL_API = '/api';
function Atracoes() {
  const [atracoes, setAtracoes] = useState([]);

  useEffect(() => {
    
    async function fetchAtracoes() {
      try {
        const response = await fetch(`${URL_API}/pontos-turisticos/`); // Utilizando a URL base + endpoint
        const data = await response.json();

        
        const formattedData = data.map(item => ({
          id: item.idpontoturistico, 
          titulo: item.nomepontoturistico, 
          descricao: item.descricaopontoturistico, 
          imagem: item.imagem_url, 
          mapa: `https://www.google.com/maps?q=${item.nomepontoturistico}`,
        }));

        setAtracoes(formattedData); 
      } catch (error) {
        console.error('Erro ao buscar atrações:', error);
      }
    }

    fetchAtracoes(); 
  }, []);

  return (
    <div className="atracoes-container">
      <main className="atracoes-main">
        {atracoes.map((item) => (
          <section key={item.id} className="atracao-card">
            <div className="atracao-content">
              <img
                src={item.imagem}
                alt={item.titulo}
                className="atracao-imagem"
              />
              <div className="atracao-texto-container">
                <h2 className="atracao-titulo">{item.titulo}</h2>
                <p className="atracao-descricao">{item.descricao}</p>
                <button
                  className="btn-mapa"
                  onClick={() => window.open(item.mapa, '_blank')}
                >
                  Abrir Google Maps
                </button>
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default Atracoes;
