import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/Quartos.css";

export default function PaginaQuartos() {
  const [quartos, setQuartos] = useState([]);

  useEffect(() => {
    // Dados simulados (em produção, substitua por fetch da API)
    setQuartos([
      {
        id: 1,
        nome: "Quarto Quádruplo de Luxo",
        imagens: [
          "/assets/quartos/mamaloo-quarto-quadruplo.jpg",
          "/assets/quartos/mamaloo-quarto-quadruplo-2.jpg",
          "/assets/quartos/mamaloo-quarto-quadruplo-3.jpg",
        ],
        descricao:
          "Este quarto quadruplo deluxe oferece ar-condicionado, TV de tela plana, WiFi gratuito e banheiro privativo. A unidade dispõe de cama extra.",
        preco: "520",
        promocao: "420",
        itens: ["TV de tela plana", "Ar-condicionado", "WiFi gratuito"],
      },
      {
        id: 2,
        nome: "Quarto Triplo Luxo",
        imagens: [
          "/assets/quartos/mamaloo-quarto-triplo.jpg",
          "/assets/quartos/mamaloo-quarto-triplo-2.jpg",
        ],
        descricao:
          "Oferecendo amenidades de luxo e muito espaço, este quarto triplo é ideal para famílias ou grupos pequenos. Com Wi-Fi gratuito, ar-condicionado e TV de tela plana.",
        preco: "530",
        promocao: "",
        itens: ["TV de tela plana", "Ar-condicionado", "WiFi gratuito"],
      },
      {
        id: 3,
        nome: "Estúdio Deluxe",
        imagens: [
          "/assets/quartos/mamaloo-quarto-deluxe.jpg",
          "/assets/quartos/mamaloo-quarto-deluxe-2.jpg",
        ],
        descricao:
          "Oferecendo amenidades de quarto e cozinha, este estúdio deluxe é ideal para estadias mais longas. Conta com Wi-Fi gratuito, ar-condicionado, TV de tela plana e cozinha compacta.",
        preco: "540",
        promocao: "480",
        itens: ["TV de tela plana", "Ar-condicionado", "WiFi gratuito", "Cozinha compacta"],
      },
    ]);
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
        {quartos.map((quarto) => (
          <div key={quarto.id} className="card-quarto">
            <div className="carousel-wrapper">
              <Slider {...settings}>
                {quarto.imagens.map((src, i) => (
                  <img key={i} src={src} alt={`Imagem ${i + 1}`} className="imagem-quarto" />
                ))}
              </Slider>
            </div>
            <div className="info-quarto">
              <h3>{quarto.nome}</h3>
              <ul className="icones-itens">
                {quarto.itens.map((item, i) => (
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
        ))}
      </main>
    </div>
  );
}
