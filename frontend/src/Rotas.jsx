import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PaginaPrincipal from "./components/paginaPrincipal";
import Avaliacoes from "./components/Avaliacoes";
import Atracoes from "./components/Atracoes";

const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<PaginaPrincipal />} />
      <Route path="/avaliacoes" element={<Avaliacoes />} />
       <Route path="/Atracoes" element={<Atracoes />} />
    </Routes>
  );
};

export default Rotas;
