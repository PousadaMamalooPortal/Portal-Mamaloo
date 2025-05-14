import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import '../styles/Atracoes.css';

function Atracoes() {
  const [atracoes, setAtracoes] = useState([]);

  useEffect(() => {
    // async function fetchAtracoes() {
    //   try {
    //     const response = await axios.get('/api/atracoes');
    //     setAtracoes(response.data);
    //   } catch (error) {
    //     console.error('Erro ao buscar atrações:', error);
    //   }
    // }
    // fetchAtracoes();

    setAtracoes([
      {
        id: 1,
        titulo: 'Piscinas Naturais de Pajuçara',
        descricao:
          'Imagine um lugar onde as águas cristalinas convidam ao mergulho e os peixinhos coloridos fazem companhia. As piscinas naturais de Pajuçara são um dos principais cartões-postais de Maceió. Para chegar até elas, basta pegar uma jangada na orla. A experiência é única!',
        imagem: '/assets/atracoes/mamaloo-atracoes-pv.jpg',
        mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7866.2321430439715!2d-35.71873150558946!3d-9.671122785282494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x701450e8e289e4d%3A0x96e3565ae6187a56!2sPraia%20de%20Paju%C3%A7ara!5e0!3m2!1spt-BR!2sbr!4v1747255720117!5m2!1spt-BR!2sbr',
      },
      {
        id: 2,
        titulo: 'Praia de Ponta Verde',
        descricao:
          'Se você busca sol, sombra e água fresca, a praia de Ponta Verde é o destino certo. Com águas mornas e tranquilas, coqueiros e barracas com petiscos deliciosos, é o cenário perfeito para um dia relaxante à beira-mar. Ideal para famílias e casais.',
        imagem: '/assets/atracoes/mamaloo-atracoes-pajucara.jpg',
        mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7866.506367507769!2d-35.70479590559017!3d-9.659394984958352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x70145009f13b6eb%3A0x597cf37096164562!2sPraia%20de%20Ponta%20Verde!5e0!3m2!1spt-BR!2sbr!4v1747255686591!5m2!1spt-BR!2sb',
      },
      {
        id: 3,
        titulo: 'Marco dos Corais',
        descricao:
          'O Marco dos Corais é uma estrutura arquitetônica charmosa que oferece uma das vistas mais bonitas do mar de Maceió. O espaço abriga exposições, eventos culturais e é um ótimo ponto para tirar fotos. Um ótimo lugar para apreciar o pôr do sol.',
        imagem: '/assets/atracoes/mamaloo-atracoes-marco.jpeg',
        mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.1760745476754!2d-35.69897922422394!3d-9.665992202154682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x70145cfa4e7299b%3A0x94538b313028864a!2sMarco%20dos%20Corais!5e0!3m2!1spt-BR!2sbr!4v1747255653477!5m2!1spt-BR!2sbr',
      },
      {
        id: 4,
        titulo: 'Pavilhão do Artesanato',
        descricao:
          'O Pavilhão do Artesanato é o local ideal para conhecer a rica cultura alagoana. Lá, você encontra peças únicas feitas à mão, desde bordados a cerâmicas, além de comidas típicas. Um verdadeiro mergulho nas tradições locais e uma ótima opção de lembrança.',
        imagem: '/assets/atracoes/mamaloo-atracoes-pavilhao.jpg',
        mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.202592641144!2d-35.710679424223834!3d-9.663723902121154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7014508534e6cf9%3A0x72e571ab5d4d588!2sPavilh%C3%A3o%20do%20Artesanato!5e0!3m2!1spt-BR!2sbr!4v1747255620616!5m2!1spt-BR!2sbr',
      },
      {
        id: 5,
        titulo: 'Museu Théo Brandão',
        descricao:
          'O Museu Théo Brandão é o lugar perfeito para quem deseja conhecer a história e a cultura popular de Alagoas. Com exposições permanentes e temporárias, o espaço é rico em arte, folclore e tradição. Uma visita imperdível para quem valoriza cultura.',
        imagem: '/assets/atracoes/mamaloo-atracoes-museu.jpeg',
        mapa: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.137423295884!2d-35.73515842422371!3d-9.669297402203496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x701457b27e7963f%3A0x72dca893a2ff067d!2zTXVzZXUgVGjDqW8gQnJhbmTDo28!5e0!3m2!1spt-BR!2sbr!4v1747255019561!5m2!1spt-BR!2sbr',
      },
    ]);
  }, []);

  return (
    <>
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
    </>
  );
}

export default Atracoes;
