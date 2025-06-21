import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Quartos.css";
import { URL_API } from '../Api';    

export default function PaginaQuartos() {
  const [quartos, setQuartos] = useState([]);

  useEffect(() => {
    async function fetchQuartos() {
      try {
        const response = await fetch(`${URL_API}/quartos/`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const formattedData = data.map(item => {
          const defaultItens = ["TV de tela plana", "Ar-condicionado", "WiFi gratuito"];
          
          // Imagens temporarias para o carrossel
          const defaultLocalImages = [
            "/assets/quartos/mamaloo-quarto-deluxe.jpg",
            "/assets/quartos/mamaloo-quarto-quadruplo.jpg",
            "/assets/quartos/mamaloo-quarto-triplo.jpg",
          ];
          
          let imagensDoQuarto = [];
          if (Array.isArray(item.imagemQuartos) && item.imagemQuartos.length > 0) {
              imagensDoQuarto = item.imagemQuartos;
          } else if (typeof item.imagemQuartos === 'string' && item.imagemQuartos.trim() !== '') {
              imagensDoQuarto = item.imagemQuartos.split(',').map(img => img.trim());
          }

          
          if (imagensDoQuarto.length === 0) {
              imagensDoQuarto = defaultLocalImages;
          }
          

          return {
            id: item.IdQuarto, 
            nome: item.NomeQuarto, 
            imagens: imagensDoQuarto, 
            descricao: item.descricaoQuarto,
            preco: item.ValorQuarto,
            promocao: item.promocao || "", 
            itens: item.itens && item.itens.length > 0 ? item.itens : defaultItens, 
          };
        });

        setQuartos(formattedData);
      } catch (error) {
        console.error('Erro ao buscar quartos:', error);
        setQuartos([]); 
      }
    }

    fetchQuartos();
  }, []);

  const formatarPreco = (valor) =>
    parseFloat(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <div className="pagina-quartos">
      <main className="conteudo">
        {quartos.length > 0 ? ( 
          quartos.map((quarto) => (
            <div key={quarto.id} className="card-quarto">
              <div className="carousel-wrapper">
                <Slider {...settings}>
                  
                  {quarto.imagens.map((src, i) => (
                    <img 
                      key={i} 
                      src={src} 
                      alt={`${quarto.nome} - Imagem ${i + 1}`} 
                      className="imagem-quarto" 
                    />
                  ))}
                </Slider>
              </div>
              <div className="info-quarto">
                <h3>{quarto.nome}</h3>
                <ul className="icones-itens">
                  {quarto.itens && quarto.itens.length > 0 && quarto.itens.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <p className="descricao">{quarto.descricao}</p>
                <div className="precos">
                  {quarto.promocao ? (
                    <>
                      <span className="preco-original">{formatarPreco(quarto.preco)}</span>
                      <span className="preco-promocional">{formatarPreco(quarto.promocao)}</span>
                    </>
                  ) : (
                    <span className="preco-unico">{formatarPreco(quarto.preco)}</span>
                  )}
                </div>
                <a
                  className="btn-reservar"
                  href="https://api.whatsapp.com/send?phone=5582981815454"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reservar
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="mensagem-carregando-erro">Carregando quartos...</p>
        )}
      </main>
    </div>
  );
}