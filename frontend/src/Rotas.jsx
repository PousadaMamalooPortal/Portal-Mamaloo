// src/Rotas.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PaginaPrincipal from "./components/paginaPrincipal";
import Avaliacoes from "./components/Avaliacoes";


const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<PaginaPrincipal />} />
      <Route path="/avaliacoes" element={<Avaliacoes />} />
    </Routes>
  );
};

export default Rotas;
