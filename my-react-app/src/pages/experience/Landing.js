import React from 'react';
import './Landing.css';

function Landing({ onNavigate }) {
  return (
    <div className="landing-container">
      <h1>hey love, wanna check this out🥹?</h1>
      <button className="puzzle-button" onClick={() => onNavigate('puzzle')}>Hell Yeah!</button>
    </div>
  );
}

export default Landing;