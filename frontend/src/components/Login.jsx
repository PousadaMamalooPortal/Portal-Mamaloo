import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (usuario === 'admin' && senha === '1234') {
      localStorage.setItem('token', 'tokenfake');
      navigate('/adm/administrador');
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  return (
    <form className="login-card" onSubmit={handleLogin}>
      <img src="/assets/mamaloo-logo.png" alt="Logo" className="login-logo" />
      <h2>Login Administrativo</h2>
      <input
        type="text"
        placeholder="Usuário"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  );
};

export default Login;
