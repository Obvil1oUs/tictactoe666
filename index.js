let cells = document.querySelectorAll('td');
let message = document.querySelector('#message');
let currentPlayer = 'x';

for (const cell of cells) {
  cell.addEventListener('click', handleCellClick);
}

function handleCellClick() {
  if (this.textContent === '' && message.textContent === '') {
    this.classList.add(currentPlayer);
    this.textContent = currentPlayer.toUpperCase();

    checkForWin();

    if (message.textContent === '') {
      currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    } else {
      for (const cell of cells) {
        cell.removeEventListener('click', handleCellClick);
      }
    }
  }
}

function checkForWin() {
  let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const combination of winningCombinations) {
    let a = combination[0];
    let b = combination[1];
    let c = combination[2];

    if (
      cells[a].classList.contains('x') &&
      cells[b].classList.contains('x') &&
      cells[c].classList.contains('x')
    ) {
      message.textContent = 'X wins!';
      document.querySelector('#x-wins').textContent =
        parseInt(document.querySelector('#x-wins').textContent) + 1;
      return;
    } else if (
      cells[a].classList.contains('o') &&
      cells[b].classList.contains('o') &&
      cells[c].classList.contains('o')
    ) {
      message.textContent = 'O wins!';
      document.querySelector('#o-wins').textContent =
        parseInt(document.querySelector('#o-wins').textContent) + 1;
      return;
    }
  }

  let isDraw = true;
  for (const cell of cells) {
    if (cell.textContent === '') {
      isDraw = false;
      break;
    }
  }

  if (isDraw) {
    message.textContent = 'Draw!';
    document.querySelector('#draws').textContent =
    parseInt(document.querySelector('#draws').textContent) + 1;
  }
}

let restartButton = document.querySelector('#restart');
restartButton.addEventListener('click', restart);

function restart() {
  for (const cell of cells) {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
    cell.addEventListener('click', handleCellClick);
  }

  message.textContent = '';
  currentPlayer = 'x';
}