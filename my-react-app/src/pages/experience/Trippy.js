import React, { useEffect, useState, useRef } from 'react';
import './Trippy.css';

function Trippy({ onNavigate }) {
  const [timeLeft, setTimeLeft] = useState(30);
  const [showButton, setShowButton] = useState(false);
  const [speedFactor, setSpeedFactor] = useState(1);
  const wordAreaRef = useRef(null);
  const intervalRef = useRef(null);
  const spawnIntervalRef = useRef(null);
  const wordsRef = useRef([]);
  
  useEffect(() => {
    const poemText = "So three months, huh—you've got me messed up good, too damn pretty with that brain of yours sharp as a blade, puzzles I suck at while you smirk and stay, wild like *who let her loose?* and I'm here for it, cracking jokes 'til my sides ache under your lit-up gaze, talking forever through spilled secrets and heavy silences that hit legit, you're hot—*too hot*—staring too long, that crazy streak yanking me off track, riding waves of golden highs and sudden sadness, still hooked, no take-backs, you know I've got someone but don't blink, just pull me closer with that grin, that spark I shouldn't play with, but damn you're my favorite sin, not trouble but me tripping, chasing your vibe like oxygen, spinning under your smart-gorgeous-nuts spell, not even trying to leave.";
    wordsRef.current = poemText.toLowerCase().replace(/[^a-z\\s]/g, '').split(/\\s+/).filter(word => word.length > 0);
    
    // Setup timer
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        const newSpeedFactor = 1 + (0.5 * (30 - (prev - 1)) / 10);
        setSpeedFactor(newSpeedFactor);
        return prev - 1;
      });
    }, 1000);
    
    // Show button after 5 seconds
    setTimeout(() => {
      setShowButton(true);
    }, 5000);
    
    // Spawn words
    spawnIntervalRef.current = setInterval(() => {
      if (wordAreaRef.current) {
        spawnWord();
      }
    }, 300);
    
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(spawnIntervalRef.current);
    };
  }, []);
  
  const spawnWord = () => {
    if (!wordAreaRef.current) return;
    
    const word = document.createElement('div');
    word.className = 'word';
    word.textContent = wordsRef.current[Math.floor(Math.random() * wordsRef.current.length)];
    
    const directions = ['up', 'down', 'left', 'right'];
    const direction = directions[Math.floor(Math.random() * 4)];
    
    switch (direction) {
      case 'up':
        word.style.left = `${Math.random() * 90}%`;
        word.style.top = '100%';
        word.style.animation = `moveUp ${5 / speedFactor}s linear forwards`;
        break;
      case 'down':
        word.style.left = `${Math.random() * 90}%`;
        word.style.top = '-50px';
        word.style.animation = `moveDown ${5 / speedFactor}s linear forwards`;
        break;
      case 'left':
        word.style.top = `${Math.random() * 90}%`;
        word.style.left = '100%';
        word.style.animation = `moveLeft ${5 / speedFactor}s linear forwards`;
        break;
      case 'right':
        word.style.top = `${Math.random() * 90}%`;
        word.style.left = '-50px';
        word.style.animation = `moveRight ${5 / speedFactor}s linear forwards`;
        break;
      default:
        break;
    }
    
    wordAreaRef.current.appendChild(word);
    
    // Remove word after animation completes
    setTimeout(() => {
      if (wordAreaRef.current && word.parentNode === wordAreaRef.current) {
        wordAreaRef.current.removeChild(word);
      }
    }, 5000 / speedFactor);
  };
  
  const handlePoemClick = () => {
    // Play the audio alert and transition to poem
    alert('Rusuf says: Yaaaaay!');
    onNavigate('poem');
  };
  
  return (
    <div className="trippy">
      <div id="word-area" ref={wordAreaRef}></div>
      <div id="timer">{timeLeft}</div>
      {showButton && (
        <div id="weed-button">
          <button id="to-poem" onClick={handlePoemClick}>🌿 Hey Love</button>
        </div>
      )}
    </div>
  );
}

export default Trippy;