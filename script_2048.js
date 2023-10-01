const gridContainer = document.getElementById('grid-container');
const gameOverDiv = document.getElementById('game-over');
const restartButton = document.querySelector('button');
const gridSize = 4;
let grid = [];

function initGrid() {
    grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(0));
    addRandomTile();
    addRandomTile();
    updateGrid();
}

function addRandomTile() {
    const availableCells = [];
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === 0) {
                availableCells.push({ row: i, col: j });
            }
        }
    }
    if (availableCells.length > 0) {
        const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        const newValue = Math.random() < 0.9 ? 2 : 4;
        grid[randomCell.row][randomCell.col] = newValue;
    }
}

function updateGrid() {
    gridContainer.innerHTML = '';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cellValue = grid[i][j];
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.textContent = cellValue !== 0 ? cellValue : '';
            cell.style.backgroundColor = getCellColor(cellValue);
            gridContainer.appendChild(cell);
        }
    }
}

function getCellColor(value) {
    // Defina cores diferentes para valores diferentes
    // Você pode personalizar as cores de acordo com sua preferência.
    switch (value) {
        case 2: return '#595064';
        case 4: return '#5e9188';
        case 8: return '#3e5954';
        case 16: return '#253342';
        case 32: return '#ce0a31';
        case 64: return '#8f9044';
        case 128: return '#fc8020';
        case 256: return '#fc8020';
        case 512: return '#ede0c8';
        case 1024: return '#ede0c8';
        case 2048: return '#ede0c8';
        default: return '#474747';
    }
}

function isGameOver() {
    // Verificar se ainda há células vazias na grade
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === 0) {
                return false; // Ainda há células vazias, o jogo não acabou
            }
        }
    }

    // Verificar se ainda há combinações possíveis entre números adjacentes
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const currentValue = grid[i][j];

            // Verificar células vizinhas (acima, abaixo, esquerda, direita)
            const neighbors = [
                { row: i - 1, col: j },
                { row: i + 1, col: j },
                { row: i, col: j - 1 },
                { row: i, col: j + 1 }
            ];

            for (const neighbor of neighbors) {
                const row = neighbor.row;
                const col = neighbor.col;

                if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
                    const neighborValue = grid[row][col];
                    if (currentValue === neighborValue) {
                        return false; // Ainda há combinações possíveis
                    }
                }
            }
        }
    }

    return true; // Se não houver células vazias nem combinações possíveis, o jogo acabou
}


function restartGame() {
    gameOverDiv.style.display = 'none';
    initGrid();
}

document.addEventListener('keydown', (e) => {
    if (isGameOver()) {
        gameOverDiv.style.display = 'block';
        return;
    }

    let moved = false;

    switch (e.key) {
        case 'ArrowUp':
            moved = moverCima();
            break;
        case 'ArrowDown':
            moved = moverBaixo();
            break;
        case 'ArrowLeft':
            moved = moverEsquerda();
            break;
        case 'ArrowRight':
            moved = moverDireita();
            break;
    }

    if (moved) {
        addRandomTile();
        updateGrid();
        if (isGameOver()) {
            gameOverDiv.style.display = 'block';
        }
    }
});

function moverCima() {
    let moved = false;

    for (let col = 0; col < gridSize; col++) {
        for (let row = 1; row < gridSize; row++) {
            if (grid[row][col] !== 0) {
                let newRow = row - 1;
                while (newRow >= 0 && grid[newRow][col] === 0) {
                    // Move a célula para cima
                    grid[newRow][col] = grid[newRow + 1][col];
                    grid[newRow + 1][col] = 0;
                    newRow--;
                    moved = true;
                }
                if (newRow >= 0 && grid[newRow][col] === grid[row][col]) {
                    // Combina as células quando são iguais
                    grid[newRow][col] *= 2;
                    grid[row][col] = 0;
                    moved = true;
                }
            }
        }
    }

    return moved;
}

function moverBaixo() {
    let moved = false;

    for (let col = 0; col < gridSize; col++) {
        for (let row = gridSize - 2; row >= 0; row--) {
            if (grid[row][col] !== 0) {
                let newRow = row + 1;
                while (newRow < gridSize && grid[newRow][col] === 0) {
                    // Move a célula para baixo
                    grid[newRow][col] = grid[newRow - 1][col];
                    grid[newRow - 1][col] = 0;
                    newRow++;
                    moved = true;
                }
                if (newRow < gridSize && grid[newRow][col] === grid[row][col]) {
                    // Combina as células quando são iguais
                    grid[newRow][col] *= 2;
                    grid[row][col] = 0;
                    moved = true;
                }
            }
        }
    }

    return moved;
}

function moverEsquerda() {
    let moved = false;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 1; col < gridSize; col++) {
            if (grid[row][col] !== 0) {
                let newCol = col - 1;
                while (newCol >= 0 && grid[row][newCol] === 0) {
                    // Move a célula para a esquerda
                    grid[row][newCol] = grid[row][newCol + 1];
                    grid[row][newCol + 1] = 0;
                    newCol--;
                    moved = true;
                }
                if (newCol >= 0 && grid[row][newCol] === grid[row][col]) {
                    // Combina as células quando são iguais
                    grid[row][newCol] *= 2;
                    grid[row][col] = 0;
                    moved = true;
                }
            }
        }
    }

    return moved;
}

function moverDireita() {
    let moved = false;

    for (let row = 0; row < gridSize; row++) {
        for (let col = gridSize - 2; col >= 0; col--) {
            if (grid[row][col] !== 0) {
                let newCol = col + 1;
                while (newCol < gridSize && grid[row][newCol] === 0) {
                    // Move a célula para a direita
                    grid[row][newCol] = grid[row][newCol - 1];
                    grid[row][newCol - 1] = 0;
                    newCol++;
                    moved = true;
                }
                if (newCol < gridSize && grid[row][newCol] === grid[row][col]) {
                    // Combina as células quando são iguais
                    grid[row][newCol] *= 2;
                    grid[row][col] = 0;
                    moved = true;
                }
            }
        }
    }

    return moved;
}

//Para android (touchscreen)

let startX, startY;

function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}

function handleTouchEnd(event) {
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    // Determine a direção do deslize e mova o jogo de acordo
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            moveRight();
        } else {
            moveLeft();
        }
    } else {
        if (deltaY > 0) {
            moveDown();
        } else {
            moveUp();
        }
    }
}



restartButton.addEventListener('click', () => {
    restartGame();
});

initGrid();
