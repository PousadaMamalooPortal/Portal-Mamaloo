import React from "react";
import { Link, useNavigate } from "react-router-dom";

function HeaderAdm() {
  const navigate = useNavigate();

  const realizarLogout = () => {
    localStorage.removeItem('token');
    navigate('/adm/login');
  };

  return (
    <header className="header">
      <img
        src="/assets/mamaloo-logo.png"
        alt="Logo Mamaloo Pousada"
        className="logo"
      />
      <nav>
        <Link to="/adm/administrador">Editar</Link>
        <Link to="/adm/avaliacoesadm">Avaliações</Link>
        <a href="#" className="nav-link" onClick={realizarLogout}>
          Sair
        </a>
      </nav>
    </header>
  );
}

export default HeaderAdm;
