import React from 'react';
import '../styles/Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/public/assets/mamaloo-logo.png" alt="Mamaloo Pousada" className="logo" />
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li><a href="#home">Home</a></li>
          <li><a href="#rooms">Quartos</a></li>
          <li><a href="#attractions">Atrações</a></li>
          <li><a href="#reviews">Avaliações</a></li>
          <li><a href="#book">Reservar</a></li>
        </ul>
      </nav>
    </header>

  );
};

export default Header;
