import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const menu = [
  { label: 'Accueil', to: '/' },
  { label: 'Candidature', to: '/formulaire' },
];

const Header = () => {
  const location = useLocation();
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <img src="/ENOVA.jpeg" alt="Logo" height={70} width={70} className="logo-image" />
          </Link>
        </div>
        <nav className="nav-menu">
          {menu.map((item) =>
            <Link key={item.label} to={item.to} className={
              'nav-link' + (location.pathname === item.to ? ' active' : '')
            }>
              {item.label}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header; 