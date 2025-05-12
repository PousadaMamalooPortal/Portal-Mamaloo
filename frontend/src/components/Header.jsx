import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/assets/mamaloo-logo.png" alt="Mamaloo Pousada" className="logo" />
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/quartos">Quartos</Link></li>
          <li><Link to="/atracoes">Atrações</Link></li>
          <li><Link to="/avaliacoes">Avaliações</Link></li>
          <li><a href="#book">Reservar</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;