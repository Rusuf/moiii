import React, { useEffect, useState, useRef } from 'react';
import './Puzzle.css';

function Puzzle({ onNavigate }) {
  const [cells, setCells] = useState(Array(36).fill(''));
  const [tauntMessage, setTauntMessage] = useState('');
  const cellsRef = useRef([]);
  
  useEffect(() => {
    // Setup taunts
    const taunts = ['Step it up, Evee!', 'Souf grooves better!', 'Dance, Babbyy!'];
    
    // Display random taunt occasionally
    const tauntInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomTaunt = taunts[Math.floor(Math.random() * taunts.length)];
        setTauntMessage(randomTaunt);
        setTimeout(() => setTauntMessage(''), 2000);
      }
    }, 3000);
    
    // Setup clues
    const clues = [
      { type: '=', x1: 0, y1: 0, x2: 1, y2: 0 },
      { type: 'x', x1: 1, y1: 0, x2: 2, y2: 0 },
      { type: '=', x1: 3, y1: 0, x2: 4, y2: 0 },
      { type: 'x', x1: 4, y1: 0, x2: 5, y2: 0 },
      { type: 'x', x1: 1, y1: 1, x2: 2, y2: 1 },
      { type: '=', x1: 4, y1: 1, x2: 5, y2: 1 },
      { type: '=', x1: 0, y1: 2, x2: 1, y2: 2 },
      { type: 'x', x1: 2, y1: 2, x2: 3, y2: 2 },
      { type: '=', x1: 3, y1: 2, x2: 4, y2: 2 },
      { type: '=', x1: 1, y1: 3, x2: 2, y2: 3 },
      { type: 'x', x1: 3, y1: 3, x2: 4, y2: 3 },
      { type: 'x', x1: 0, y1: 4, x2: 1, y2: 4 },
      { type: '=', x1: 1, y1: 4, x2: 2, y2: 4 },
      { type: 'x', x1: 3, y1: 4, x2: 4, y2: 4 }
    ];

    // Create refs for cells
    cellsRef.current = Array(36).fill().map((_, i) => cellsRef.current[i] || React.createRef());

    // Add clues to the DOM after the grid is rendered
    setTimeout(() => {
      const grid = document.getElementById('grid');
      if (!grid) return;

      clues.forEach(clue => {
        const clueDiv = document.createElement('div');
        clueDiv.className = 'clue';
        clueDiv.textContent = clue.type;
        const x = (clue.x1 + clue.x2) / 2 * 85 + 40;
        const y = (clue.y1 + clue.y2) / 2 * 85 + 40;
        clueDiv.style.left = `${x}px`;
        clueDiv.style.top = `${y}px`;
        clueDiv.style.transform = 'translate(-50%, -50%)';
        grid.appendChild(clueDiv);
      });
    }, 100);
    
    return () => clearInterval(tauntInterval);
  }, []);

  const handleCellClick = (index) => {
    const newCells = [...cells];
    if (!newCells[index]) newCells[index] = 'X';
    else if (newCells[index] === 'X') newCells[index] = 'Y';
    else newCells[index] = '';
    setCells(newCells);
  };

  const checkSolution = () => {
    // Create a 2D grid from our cells state
    const gridState = [];
    for (let y = 0; y < 6; y++) {
      const row = [];
      for (let x = 0; x < 6; x++) {
        const index = y * 6 + x;
        row.push(cells[index] || '.');
      }
      gridState.push(row);
    }

    // Check if grid is filled
    let isFilled = true;
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 6; x++) {
        if (gridState[y][x] === '.') {
          isFilled = false;
          break;
        }
      }
    }
    
    if (!isFilled) {
      alert('Huja fill squares zote!');
      return;
    }

    // Full validation (as in original code)
    let valid = true;
    
    // Check if each row and column has exactly 3 Xs
    for (let i = 0; i < 6; i++) {
      const rowX = gridState[i].filter(c => c === 'X').length;
      const colX = gridState.map(row => row[i]).filter(c => c === 'X').length;
      if (rowX !== 3 || colX !== 3) {
        valid = false;
      }
    }

    // Check for 3 in a row (horizontally)
    for (let y = 0; y < 6; y++) {
      for (let x = 0; x < 4; x++) {
        if (gridState[y][x] === gridState[y][x+1] && 
            gridState[y][x] === gridState[y][x+2] && 
            gridState[y][x] !== '.') {
          valid = false;
        }
      }
    }
    
    // Check for 3 in a row (vertically)
    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 4; y++) {
        if (gridState[y][x] === gridState[y+1][x] && 
            gridState[y][x] === gridState[y+2][x] && 
            gridState[y][x] !== '.') {
          valid = false;
        }
      }
    }

    // Check clues
    const clues = [
      { type: '=', x1: 0, y1: 0, x2: 1, y2: 0 },
      { type: 'x', x1: 1, y1: 0, x2: 2, y2: 0 },
      { type: '=', x1: 3, y1: 0, x2: 4, y2: 0 },
      { type: 'x', x1: 4, y1: 0, x2: 5, y2: 0 },
      { type: 'x', x1: 1, y1: 1, x2: 2, y2: 1 },
      { type: '=', x1: 4, y1: 1, x2: 5, y2: 1 },
      { type: '=', x1: 0, y1: 2, x2: 1, y2: 2 },
      { type: 'x', x1: 2, y1: 2, x2: 3, y2: 2 },
      { type: '=', x1: 3, y1: 2, x2: 4, y2: 2 },
      { type: '=', x1: 1, y1: 3, x2: 2, y2: 3 },
      { type: 'x', x1: 3, y1: 3, x2: 4, y2: 3 },
      { type: 'x', x1: 0, y1: 4, x2: 1, y2: 4 },
      { type: '=', x1: 1, y1: 4, x2: 2, y2: 4 },
      { type: 'x', x1: 3, y1: 4, x2: 4, y2: 4 }
    ];
    
    clues.forEach(clue => {
      const c1 = gridState[clue.y1][clue.x1];
      const c2 = gridState[clue.y2][clue.x2];
      if (clue.type === '=' && c1 !== c2) {
        valid = false;
      }
      if (clue.type === 'x' && c1 === c2) {
        valid = false;
      }
    });

    if (valid) {
      alert('Rusuf approves! Onward!');
    } else {
      alert('Hiyo si solution oya!');
    }
    
    // Navigate to trippy page either way (just like original)
    onNavigate('trippy');
  };

  return (
    <div className="puzzle-page">
      <h1 id="tagline">Lets play some dumb Tango ml🥹</h1>
      <div id="puzzle-area">
        <p>Fill the grid </p>
        <div id="grid">
          {Array(36).fill().map((_, index) => {
            const x = index % 6;
            const y = Math.floor(index / 6);
            return (
              <div
                key={index}
                ref={cellsRef.current[index]}
                className={`cell ${cells[index] ? cells[index].toLowerCase() : ''}`}
                data-x={x}
                data-y={y}
                onClick={() => handleCellClick(index)}
              >
                {cells[index]}
              </div>
            );
          })}
        </div>
        <button id="check-solution" onClick={checkSolution}>Check Your solution</button>
      </div>
      <div id="grok-taunt">{tauntMessage}</div>
    </div>
  );
}

export default Puzzle;