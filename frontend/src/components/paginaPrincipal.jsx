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

   {/* Terceira seção */}
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
    </div>
  );
};

export default PaginaPrincipal;
