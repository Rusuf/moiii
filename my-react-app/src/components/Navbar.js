import React from 'react';
import './Navbar.css';

function Navbar({ activePage, onNavigate }) {
  return (
    <nav className="Navbar">
      <div className="Navbar-brand">My React App</div>
      <ul className="Navbar-menu">
        <li 
          className={activePage === 'home' ? 'active' : ''} 
          onClick={() => onNavigate('home')}
        >
          Home
        </li>
        <li 
          className={activePage === 'about' ? 'active' : ''} 
          onClick={() => onNavigate('about')}
        >
          About
        </li>
        <li 
          className={activePage === 'contact' ? 'active' : ''} 
          onClick={() => onNavigate('contact')}
        >
          Contact
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;