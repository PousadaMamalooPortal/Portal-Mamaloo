import React from 'react';
import '../styles/Footer.css'; // ou o caminho correto do CSS

const Footer = () => {
  return (
    <footer className="rodape">
      <div className="info-contato">
        <span>
          <a href="https://www.instagram.com/mamaloopousada/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/icones/mamaloo-icone-instagram.png" alt="Instagram" />
            @mamaloopousada
          </a>
        </span>
        <span>
          <a href="mailto:mamaloo@gmail.com">
            <img src="/assets/icones/mamaloo-icone-email.png" alt="Email" />
            mamaloo@gmail.com
          </a>
        </span>
        <span>
          <a href="https://api.whatsapp.com/send?phone=5582981815454" target="_blank" rel="noopener noreferrer">
            <img src="/assets/icones/mamaloo-icone-whats.png" alt="Telefone" />
            +55 (82) 98181-5454
          </a>
        </span>
      </div>

      <div className="info-local">
        <strong>Pousada Mamaloo</strong><br />
        R. Dr. Waldemíro Alencar, 37, 126 - Jatiúca, Maceió - AL, 57035-860
      </div>

      <p className="desenvolvimento">
      2025 © Todos os direitos reservados. <br></br>Desenvolvido por: Alunos IFAL
      </p>
    </footer>
  );
};

export default Footer;
