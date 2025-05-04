import React, { useEffect, useRef, useState } from 'react';
import './Poem.css';

function Poem({ onNavigate }) {
  const poemContainerRef = useRef(null);
  const backgroundRef = useRef(null);
  const [poemLines, setPoemLines] = useState([
    "So, three months, huh? You've got me messed up good",
    "too damn pretty, that brain of yours a blade,",
    "puzzles I suck at, but you just smirk and stay.",
    "You're wild, like,who let her loose? and I'm here for it,",
    "cracking jokes 'til my sides hurt, your eyes all lit.",
    "We talk forever, late nights, spilling dumb secrets,",
    "then bam—sometimes it's heavy, quiet, legit.",
    "You're hot, no lie, like I'm staring too long,",
    "that crazy streak? Keeps me guessing, off track.",
    "We're good, we're golden, then sad outta nowhere",
    "still, I'm hooked, no taking that back.",
    "You know I've got someone, you don't even blink,",
    "You're a mess, but so am I, so it's cool,",
    "just pull me closer with that look, that grin",
    "girl, you're a spark I shouldn't play with,",
    "but damn, you're my favorite sin.",
    "I'd say you're trouble, but I'm the one tripping,",
    "chasing your vibe like it's all I need to breathe.",
    "Smart, gorgeous, nuts, you've got me spinning,",
    "and I'm not even trying to leave."
  ]);
  const [displayedLines, setDisplayedLines] = useState(
    Array(poemLines.length).fill('')
  );
  const [typingDone, setTypingDone] = useState(false);
  
  useEffect(() => {
    // Add background effects
    if (backgroundRef.current) {
      // Add particles
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${5 + Math.random() * 10}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        backgroundRef.current.appendChild(particle);
      }
      
      // Add comets
      for (let i = 0; i < 5; i++) {
        const comet = document.createElement('div');
        comet.className = 'comet';
        comet.style.left = `${Math.random() * 100}%`;
        comet.style.top = `${Math.random() * 100}%`;
        comet.style.animationDuration = `${7 + Math.random() * 15}s`;
        comet.style.animationDelay = `${Math.random() * 5}s`;
        backgroundRef.current.appendChild(comet);
      }
    }
    
    // Start continuous spawning of background elements
    const backgroundInterval = setInterval(() => {
      spawnBackgroundElement();
    }, 600);
    
    // Begin the typing effect
    typePoem();
    
    return () => {
      clearInterval(backgroundInterval);
    };
  }, []);
  
  const spawnBackgroundElement = () => {
    if (!backgroundRef.current) return;
    
    const type = Math.random();
    const element = document.createElement('div');
    const startLeft = Math.random() * 100;

    if (type < 0.3) {
      element.className = 'rocket';
      element.textContent = '🚀';
      element.style.left = `${startLeft}%`;
      element.style.animation = `fall ${3 + Math.random() * 2}s linear`;
    } else if (type < 0.7) {
      element.className = 'particle';
      element.textContent = ['✨', '★', '●', '◇'][Math.floor(Math.random() * 4)];
      element.style.left = `${startLeft}%`;
      element.style.animation = `fall ${2 + Math.random() * 2}s ease-in`;
    } else {
      element.className = 'comet';
      element.style.left = `${startLeft}%`;
      element.style.animation = `fall ${1.5 + Math.random() * 1}s linear`;
    }

    backgroundRef.current.appendChild(element);
    setTimeout(() => {
      if (element && element.parentNode === backgroundRef.current) {
        backgroundRef.current.removeChild(element);
      }
    }, 5000);
  };
  
  const typePoem = () => {
    // Simulate typewriter effect by updating one character at a time
    const newDisplayedLines = [...displayedLines];
    let totalDelay = 0;
    
    poemLines.forEach((line, lineIndex) => {
      for (let i = 0; i < line.length; i++) {
        setTimeout(() => {
          setDisplayedLines(prev => {
            const newLines = [...prev];
            newLines[lineIndex] = line.substring(0, i + 1);
            return newLines;
          });
        }, totalDelay + i * 50); // 50ms per character
      }
      totalDelay += line.length * 50 + 500; // 500ms pause after each line
    });
    
    // Set typing done when complete
    setTimeout(() => {
      setTypingDone(true);
    }, totalDelay);
  };
  
  const handleReplay = () => {
    alert('Rudia tena, Babbyy!');
    // Reset displayed lines
    setDisplayedLines(Array(poemLines.length).fill(''));
    setTypingDone(false);
    
    // Start typing again
    setTimeout(() => {
      typePoem();
    }, 500);
    
    // After the poem finishes typing, go back to landing
    setTimeout(() => {
      onNavigate('landing');
    }, 1000 + poemLines.join('').length * 50 + poemLines.length * 500);
  };
  
  return (
    <div className="poem-page">
      <div className="poem-background" ref={backgroundRef}></div>
      <div id="poem-container" ref={poemContainerRef}>
        <div id="poem">
          {displayedLines.map((line, index) => (
            <p key={index} className={typingDone ? 'pulse' : ''}>
              {line}
            </p>
          ))}
        </div>
      </div>
      <button id="replay" onClick={handleReplay}>AGAIN?, My Love❤️🥹</button>
    </div>
  );
}

export default Poem;