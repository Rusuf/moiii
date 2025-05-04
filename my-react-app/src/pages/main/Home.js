import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <h1>Welcome to My React App</h1>
        <p>
          Edit <code>src/pages/main/Home.js</code> and save to reload.
        </p>
        <a
          className="Home-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;