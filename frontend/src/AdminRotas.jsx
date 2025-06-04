import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Administrador from './Administrador'; // componente principal do admin

const AdminRotas = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="administrador" replace />} />
      <Route path="administrador" element={<Administrador />} />
      {/* outras rotas admin aqui */}
    </Routes>
  );
};

export default AdminRotas;
