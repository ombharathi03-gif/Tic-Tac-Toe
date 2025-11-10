// Select DOM elements
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');

// Initialize game state
let currentPlayer = 'X';
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// All possible winning combinations (rows, columns, diagonals)
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

/**
 * Handles a cell click event
 */
function handleCellClick(e) {
  const index = e.target.dataset.index;

  // Prevent overwriting or playing after game ends
  if (boardState[index] !== "" || !gameActive) return;

  // Update board state and UI
  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer);

  // Check game result
  checkResult();
}

/**
 * Checks for win or tie
 */
function checkResult() {
  let roundWon = false;

  // Check all win patterns
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
    gameActive = false;
    disableBoard();
    return;
  }

  // Check for tie
  if (!boardState.includes("")) {
    statusText.textContent = "🤝 It's a Tie!";
    gameActive = false;
    return;
  }

  // Switch turns
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

/**
 * Disables board interaction after game ends
 */
function disableBoard() {
  cells.forEach(cell => cell.classList.add('disabled'));
}

/**
 * Resets the game to start again
 */
function resetGame() {
  currentPlayer = 'X';
  boardState = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = "Player X's Turn";

  // Clear board and re-enable clicks
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove('X', 'O', 'disabled');
  });
}

/* ---- Event Listeners ---- */
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
