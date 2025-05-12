// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Rotas from './Rotas';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Rotas />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
