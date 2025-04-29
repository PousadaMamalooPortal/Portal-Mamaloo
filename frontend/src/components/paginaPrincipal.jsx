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
    </div>
  );
};

export default PaginaPrincipal;
