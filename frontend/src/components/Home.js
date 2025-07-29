import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleCandidature = () => {
    navigate('/formulaire');
  };

  return (
    <div className="home">
      <div className="home-content">
        <div className="hero-section">
          <h1 className="main-title">
            E-NOVA
            <span className="subtitle">— L'innovation étudiante par le numérique</span>
          </h1>

          <p className="slogan">
            Révélons le potentiel étudiant à travers l'innovation, le digital et l'entrepreneuriat.
          </p>

          <p className="description">
            E-NOVA est la Junior Entreprise de l'ESEN. Nous accompagnons les étudiants dans la réalisation de projets concrets dans les domaines du digital, du conseil et de l'innovation.
          </p>

          <button
            className="cta-button"
            onClick={handleCandidature}
          >
            Accéder au formulaire de candidature →
          </button>
        </div>

        <div className="features-section">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Communauté</h3>
              <p>Rejoignez une équipe dynamique d'étudiants passionnés</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Innovation</h3>
              <p>Développez des projets innovants dans le digital</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Croissance</h3>
              <p>Acquérez une expérience professionnelle concrète</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 