import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Home, About, Contact, Landing, Puzzle, Trippy, Poem } from './pages';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'landing':
        return <Landing onNavigate={setCurrentPage} />;
      case 'puzzle':
        return <Puzzle onNavigate={setCurrentPage} />;
      case 'trippy':
        return <Trippy onNavigate={setCurrentPage} />;
      case 'poem':
        return <Poem onNavigate={setCurrentPage} />;
      default:
        return <Landing onNavigate={setCurrentPage} />;
    }
  };

  // Only show navbar for regular pages (home, about, contact)
  const showNavbar = ['home', 'about', 'contact'].includes(currentPage);

  return (
    <div className="App">
      {showNavbar && <Navbar activePage={currentPage} onNavigate={setCurrentPage} />}
      <main className={`App-content ${!showNavbar ? 'full-height' : ''}`}>
        {renderPage()}
      </main>
      {showNavbar && (
        <footer className="App-footer">
          <p>&copy; {new Date().getFullYear()} My React App. All rights reserved.</p>
        </footer>
      )}
    </div>
  );
}

export default App;