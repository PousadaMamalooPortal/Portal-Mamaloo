import React from 'react';
import '../styles/paginaPrincipal.css'; 

const PaginaPrincipal = () => {
  return (
    <div className="pagina-principal">
     {/* Primeira seção */}
     <section className="background-section"></section>
      
      {/* Segunda seção  */}
      <section className="content-section">
      <div className="inner-content">
        <div className="text">
          <h2>Por que escolher a Mamaloo Pousada?</h2>
          <p>
            Se você busca conforto e praticidade em Maceió, a Mamaloo Pousada é a escolha ideal.
            Com quartos equipados com ar-condicionado, TV de tela plana e banheiro privativo, 
            oferecemos uma estadia aconchegante e funcional. Algumas unidades contam com cozinha 
            compacta para maior comodidade.
          </p>
          <p>
            Nosso café da manhã variado, Wi-Fi gratuito e estacionamento privativo garantem uma 
            experiência completa. Estamos próximos das belas praias de Cruz das Almas e Jatiúca, 
            além de atrações como as Piscinas Naturais de Pajuçara e o Farol de Maceió. O Aeroporto 
            Internacional está a apenas 23 km de distância.
          </p>
          <p>
            Seja a lazer ou negócios, hospede-se na Mamaloo Pousada e aproveite o melhor de Maceió!
          </p>
        </div>
        <div className="image">
          <img src="/src/assets/mamaloo-recepcao.jpg" alt="Imagem da Pousada" />
        </div>
        </div>
      </section>

   {/* Terceira seção - Quartos*/}
   <section className="rooms-section">
        <div className="rooms-cards">
          <div className="room-card">
            <img src="/src/assets/quartos/mamaloo-quarto-quadruplo.jpg" alt="Quarto Quádruplo" />
            <div className="room-info">
              <h3>Quarto Quádruplo de Luxo</h3>
              <button>Ver quarto</button>
            </div>
          </div>
          <div className="room-card">
            <img src="/src/assets/quartos/mamaloo-quarto-triplo.jpg" alt="Quarto Triplo" />
            <div className="room-info">
              <h3>Quarto Triplo Luxo</h3>
              <button>Ver quarto</button>
            </div>
          </div>
          <div className="room-card">
            <img src="/src/assets/quartos/mamaloo-quarto-deluxe.jpg" alt="Estúdio Deluxe" />
            <div className="room-info">
              <h3>Estúdio Deluxe</h3>
              <button>Ver quarto</button>
            </div>
          </div>
        </div>
      </section>
 {/* Quarta seção - Google Maps  */}
 <section className="map-section">
        <div className="location-container">
          <div className="location-info">
            <div className="location-icon">
            <img src="/src/assets/icones/mamaloo-icone-loc.png" alt="Ícone de Localização" />
            </div>
            <div className="location-text">
              <h3>Venha viver Maceió com a Mamaloo Pousada!</h3>
              <p>
                Maceió é um verdadeiro paraíso tropical, com mar azul-turquesa, coqueirais,
                culinária irresistível e um povo acolhedor que conquista corações. Aqui, cada dia
                é uma oportunidade de descobrir praias deslumbrantes, como Pajuçara, Jatiúca e Cruz
                das Almas, e vivenciar passeios únicos pelas piscinas naturais, falésias coloridas
                e lagoas encantadoras.
              </p>
              <p>
                Venha descobrir o melhor de Maceió. Estamos te esperando na Mamaloo Pousada!
              </p>
              <button onClick={() => window.open("https://www.google.com/maps?q=Mamaloo+Pousada,Maceió,Alagoas")}>
                Abrir Google Maps
              </button>
            </div>
          </div>
          <div className="map-container">
            <iframe
              title="Mapa Mamaloo Pousada"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.4349238195255!2d-35.70833602422409!3d-9.64382820182776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x70145033f4722a7%3A0x899a273c4d978552!2sMamaloo%20Pousada!5e0!3m2!1spt-BR!2sbr!4v1746052635987!5m2!1spt-BR!2sbr"
              width="100%"
              height="450"
              style={{ border: '0' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
   {/* Quinta seção - Café da manhã */}
   <section className="sessao-cafe">
      <h2 className="titulo-cafe">
        Comece o dia com o sabor de Maceió na Mamaloo Pousada
      </h2>

      <div className="imagens-cafe">
        <img src="/src/assets/cafe/mamaloo-cafe-mesas.jpg" alt="Mesa com cadeiras" />
        <img src="/src/assets/cafe/mamaloo-cafe01.jpg" alt="Balcão de sucos e bebidas" />
        <div className='empilhadas'>
        <img src="/src/assets/cafe/mamaloo-cafe02.jpg" alt="Mesa com itens do café" />
        <img src="/src/assets/cafe/mamaloo-cafe03.jpg" alt="Mesa com frutas e cereais" />
        </div>
      </div>

      <p className="texto-cafe">
        Na Mamaloo Pousada, o café da manhã é mais do que uma refeição — é um
        convite para começar o dia com energia e sabor. Servido diariamente em um ambiente
        acolhedor, nosso café oferece diversas opções para agradar todos os paladares.
      </p>
    </section>
    </div>
  );
};

export default PaginaPrincipal;
