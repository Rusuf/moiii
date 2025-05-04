document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------
    // SECTION 1: Landing Page (index.html)
    // -----------------------------------
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/RoiMoi/') {
        console.log('Girly hippy landing page loaded!');
    }

    // -----------------------------------
    // SECTION 2: Puzzle Page (puzzle.html)
    // -----------------------------------
    if (window.location.pathname.includes('puzzle.html') || document.querySelector('body.puzzle')) {
        console.log('Puzzle page loaded!');

        const grid = document.getElementById('grid');
        const taunt = document.getElementById('grok-taunt');
        const puzzleArea = document.getElementById('puzzle-area');
        const checkButton = document.getElementById('check-solution');

        if (!grid) console.error('Grid element not found!');
        if (!checkButton) console.error('Check button not found!');

        const taunts = ['Step it up, Evee!', 'Souf grooves better!', 'Dance, Babbyy!'];
        const cells = [];
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

        for (let y = 0; y < 6; y++) {
            for (let x = 0; x < 6; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.x = x;
                cell.dataset.y = y;
                cell.addEventListener('click', () => {
                    if (!cell.textContent) cell.textContent = 'X';
                    else if (cell.textContent === 'X') cell.textContent = 'Y';
                    else cell.textContent = '';
                    cell.className = 'cell' + (cell.textContent ? ` ${cell.textContent.toLowerCase()}` : '');
                });
                grid.appendChild(cell);
                cells.push(cell);
            }
        }

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

        checkButton.addEventListener('click', () => {
            console.log('Check Your Dance clicked!');
            const gridState = Array(6).fill().map(() => Array(6).fill(''));
            cells.forEach(cell => {
                gridState[cell.dataset.y][cell.dataset.x] = cell.textContent || '.';
            });

            console.log('Grid State:', gridState);

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
                console.log('Grid not filled');
                return;
            }

            let valid = true;
            for (let i = 0; i < 6; i++) {
                const rowX = gridState[i].filter(c => c === 'X').length;
                const colX = gridState.map(row => row[i]).filter(c => c === 'X').length;
                if (rowX !== 3 || colX !== 3) {
                    valid = false;
                    console.log(`Row ${i} X: ${rowX}, Col ${i} X: ${colX}`);
                }
            }

            for (let y = 0; y < 6; y++) {
                for (let x = 0; x < 4; x++) {
                    if (gridState[y][x] === gridState[y][x+1] && gridState[y][x] === gridState[y][x+2] && gridState[y][x] !== '.') {
                        valid = false;
                        console.log(`Row ${y} has 3 ${gridState[y][x]} at ${x}-${x+2}`);
                    }
                }
            }
            for (let x = 0; x < 6; x++) {
                for (let y = 0; y < 4; y++) {
                    if (gridState[y][x] === gridState[y+1][x] && gridState[y][x] === gridState[y+2][x] && gridState[y][x] !== '.') {
                        valid = false;
                        console.log(`Col ${x} has 3 ${gridState[y][x]} at ${y}-${y+2}`);
                    }
                }
            }

            clues.forEach(clue => {
                const c1 = gridState[clue.y1][clue.x1];
                const c2 = gridState[clue.y2][clue.x2];
                if (clue.type === '=' && c1 !== c2) {
                    valid = false;
                    console.log(`Clue = failed at (${clue.x1},${clue.y1}) and (${clue.x2},${clue.y2})`);
                }
                if (clue.type === 'x' && c1 === c2) {
                    valid = false;
                    console.log(`Clue x failed at (${clue.x1},${clue.y1}) and (${clue.x2},${clue.y2})`);
                }
            });

            if (valid) {
                alert('Rusuf approves! Onward!');
                console.log('Solution valid, redirecting to trippy.html');
                window.location.href = 'trippy.html';
            } else {
                alert('Hiyo si solution oya!');
                window.location.href = 'trippy.html';
            }
        });
    }

    // -----------------------------------
    // SECTION 3: Trippy Page (trippy.html)
    // -----------------------------------
    if (window.location.pathname.includes('trippy.html') || document.querySelector('body.trippy')) {
        console.log('Trippy page loaded!');

        const poemText = "So three months, huh—you’ve got me messed up good, too damn pretty with that brain of yours sharp as a blade, puzzles I suck at while you smirk and stay, wild like *who let her loose?* and I’m here for it, cracking jokes ‘til my sides ache under your lit-up gaze, talking forever through spilled secrets and heavy silences that hit legit, you’re hot—*too hot*—staring too long, that crazy streak yanking me off track, riding waves of golden highs and sudden sadness, still hooked, no take-backs, you know I’ve got someone but don’t blink, just pull me closer with that grin, that spark I shouldn’t play with, but damn you’re my favorite sin, not trouble but me tripping, chasing your vibe like oxygen, spinning under your smart-gorgeous-nuts spell, not even trying to leave.";
        const poemWords = poemText.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(word => word.length > 0);
        console.log('Poem words:', poemWords);

        const wordArea = document.getElementById('word-area');
        const timer = document.getElementById('timer');
        const weedButton = document.getElementById('weed-button');
        const toPoem = document.getElementById('to-poem');

        let timeLeft = 30;
        let speedFactor = 1;

        const timerInterval = setInterval(() => {
            timeLeft--;
            timer.textContent = timeLeft;
            speedFactor = 1 + (0.5 * (30 - timeLeft) / 10);
            console.log('Speed factor:', speedFactor);
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
            }
        }, 1000);

        setTimeout(() => {
            weedButton.style.display = 'block';
            console.log('Weed button appeared!');
        }, 5000);

        function spawnWord() {
            const word = document.createElement('div');
            word.className = 'word';
            word.textContent = poemWords[Math.floor(Math.random() * poemWords.length)];

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
            }

            wordArea.appendChild(word);
            setTimeout(() => {
                if (word.parentNode) word.remove();
            }, 5000 / speedFactor);
        }
        setInterval(spawnWord, 500);

        toPoem.addEventListener('click', () => {
            console.log('To poem clicked!');
            alert('Rusuf says: Yaaaaay!');
            window.location.href = 'poem.html';
        });
    }

    // -----------------------------------
    // SECTION 4: Poem Page (poem.html)
    // -----------------------------------
    if (window.location.pathname.includes('poem.html') || document.querySelector('body.poem')) {
        console.log('Poem page loaded! Roimoi’s got this!');

        const poemContainer = document.getElementById('poem');
        const replayButton = document.getElementById('replay');
        const background = document.querySelector('.poem-background');
        const audio = new Audio('typewriter.mp3'); // Ensure typewriter.mp3 is in your project folder

        function typePoem() {
            const poemLines = poemContainer.querySelectorAll('p');
            let totalDelay = 0;

            poemLines.forEach((line, lineIndex) => {
                const text = line.textContent;
                line.textContent = ''; // Clear text initially

                for (let i = 0; i < text.length; i++) {
                    setTimeout(() => {
                        line.textContent += text[i];
                        if (lineIndex === 0 && i === 0) audio.play(); // Start audio on first char
                    }, totalDelay + i * 100); // 100ms per character
                }
                totalDelay += text.length * 100 + 500; // 500ms pause after each line
            });

            setTimeout(() => {
                audio.pause();
                poemLines.forEach(line => {
                    line.style.animation = 'pulse 2s infinite';
                });
            }, totalDelay);
        }

        function spawnBackgroundElement() {
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

            background.appendChild(element);
            setTimeout(() => element.remove(), 5000); // Remove after max animation time
        }
        setInterval(spawnBackgroundElement, 600);

        typePoem();

        replayButton.addEventListener('click', () => {
            console.log('Replay clicked! Roi’s wildin’ again!');
            alert(' Rudia tena, Babbyy!');
            typePoem();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, (poemContainer.innerText.length * 100) + (poemContainer.children.length * 500) + 1000);
        });
    }
});