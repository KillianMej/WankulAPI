import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./navbar";
import Cards from './pages/Cards';
import Seasons from './pages/Seasons';
import Effigies from './pages/Effigies';
import Artists from './pages/Artists';
import Rarities from './pages/Rarities';
import Intro from './pages/Introduction';

function main() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleNavClick = () => {
    setIsMenuVisible(false);
    const nav = document.querySelector("nav");
    if (nav) {
      nav.style.left = "-100vw";
    }
  };

  return (
    <Router>
    <h1>Documentation Wankul API</h1>
    <h2>API non officielle pour les cartes Wankul</h2>
    <p id="version">Version 1.0.0</p>
    <div id="main">
        <Navbar isMenuVisible={isMenuVisible} onNavClick={handleNavClick} />
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/cartes" element={<Cards />} />
          <Route path="/saisons" element={<Seasons />} />
          <Route path="/effigies" element={<Effigies />} />
          <Route path="/artistes" element={<Artists />} />
          <Route path="/raretes" element={<Rarities />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </div>
    </Router>
  );
}

export default main;