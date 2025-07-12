const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusMsg = document.getElementById('statusMsg');
const restartBtn = document.getElementById('restartBtn');

let isXTurn = true;
let gameOver = false;

const WIN_COMBOS = [
  [0, 1, 2], // row 1
  [3, 4, 5], // row 2
  [6, 7, 8], // row 3
  [0, 3, 6], // col 1
  [1, 4, 7], // col 2
  [2, 5, 8], // col 3
  [0, 4, 8], // diag 1
  [2, 4, 6], // diag 2
];

function handleClick(e) {
  const cell = e.target;
  if (cell.classList.contains('x') || cell.classList.contains('o') || gameOver) return;

  const currentClass = isXTurn ? 'x' : 'o';
  cell.classList.add(currentClass);
  cell.textContent = currentClass.toUpperCase();

  if (checkWin(currentClass)) {
    statusMsg.textContent = `${currentClass.toUpperCase()} Wins!`;
    gameOver = true;
    return;
  }

  if (isDraw()) {
    statusMsg.textContent = `Draw!`;
    gameOver = true;
    return;
  }

  isXTurn = !isXTurn;
  statusMsg.textContent = `${isXTurn ? 'X' : 'O'}'s Turn`;
}

function checkWin(currentClass) {
  return WIN_COMBOS.some(combo => {
    const hasWon = combo.every(index =>
      cells[index].classList.contains(currentClass)
    );
    if (hasWon) {
      combo.forEach(i => cells[i].classList.add('winner'));
    }
    return hasWon;
  });
}

function isDraw() {
  return [...cells].every(cell =>
    cell.classList.contains('x') || cell.classList.contains('o')
  );
}

function startGame() {
  isXTurn = true;
  gameOver = false;
  statusMsg.textContent = `X's Turn`;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o', 'winner');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
}

restartBtn.addEventListener('click', startGame);

startGame();
