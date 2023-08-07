
const cells = document.querySelectorAll('.cell');
var origBoard;

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
]

const $cells = document.querySelectorAll('.cell');
const $restartBtn = document.querySelector('.restart');
const $turnIndicator = document.querySelector('.turnIndicator');

const player = 'X';
const comp = 'O';

let check = false;
let compMov = false;


const finishGame = (c1, c2, c3) => {
  c1.classList.add("red");
  c2.classList.add("red");
  c3.classList.add("red");
  
  $turnIndicator.innerHTML = `Player ${check ? 'X' : 'O'} WIN!`
  
  $cells.forEach((cell) => {
    cell.removeEventListener('click', cellEvent);
  })
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
      document.getElementById(index).style.backgroundColor =
          gameWon.player == 'X' ? "blue" : "red";
  }
  for (var i = 0; i < cells.length; i++) {
      cells[i].removeEventListener('click', turnClick, false);
  }
  declareWinner(gameWon.player == 'X' ? "You win!" : "You lose.");
}

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
}

function checkTie() {
  if (emptySquares().length == 0) {
      for (var i = 0; i < cells.length; i++) {
          cells[i].style.backgroundColor = "yellow";
          cells[i].removeEventListener('click', turnClick, false);
      }
      declareWinner("Tie Game!")
      return true;
  }
  return false;
}

function cellEvent(cell) {
  if (typeof origBoard[cell.target.id] == 'number') {
      turn(cell.target.id, 'X');
      if (!checkWin(origBoard, 'X') && !checkTie()) turn(minimax(origBoard, 'X', 'O', 0, true).index, 'O');

  }
}

function turn(squareId, player) {
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(origBoard, player)
  if (gameWon) gameOver(gameWon)
}


function startGame() {
  origBoard = Array.from(Array(9).keys());
  check = true;
  $turnIndicator.innerHTML = check ? 'player X turn' : 'player 0 turn';
  $cells.forEach((cell) => {
    cell.innerText = '';
    cell.classList.remove('red');
    cell.addEventListener('click', cellEvent, false)
  })
}

$restartBtn.addEventListener('click', startGame)

startGame();







const evaluateBoard = (board) => {
  let row = 0;
  let col = 0;
  while (row < 9) {
      if (board[row] === board[row + 1] && board[row] === board[row + 2]) {
          if (board[row] === comp) {
              return 10;
          }
          else if (board[row] === player) {
              return -10;
          }
      }
          
      row += 3;
  }

  while (col < 3) { 
      if (board[col] === board[col + 3] && board[col] === board[col + 6]) {
          if (board[col] === comp) {
              return 10;
          }
          else if (board[col] === player) {
              return -10;
          }
          
      }
      col += 1;
  }

  if ((board[4] === board[0] && board[4]=== board[8]) ||
  (board[4] === board[2] && board[4] === board[6])) {
      if (board[4] === comp) {
          return 10;
      }
      else if (board[4] === player) {
          return -10;
      }
  }

  return 0;
}



function checkWin(board, player) {
  let plays = board.reduce((a, e, i) =>
      (e === player) ? a.concat(i) : a, []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
          gameWon = { index: index, player: player };
          break;
      }
  }
  return gameWon;
}

function emptySquares() {
  return origBoard.filter(s => typeof s == 'number');
}


const minimax = (nBoard, player, comp, depth, isComp) => {
  
  var availSpots = emptySquares();

  var score = evaluateBoard(nBoard);

  if (score === 10) return {score: 10};
  if (score === -10) return {score: -10};
  if (availSpots.length === 0) return {score: 0};

  var moves = [];

  for (var i = 0; i < availSpots.length; i++) {
          var move = {};
          move.index = nBoard[availSpots[i]];
          nBoard[availSpots[i]] = isComp ? 'O' : 'X';
          if (isComp) {
              var res = minimax(nBoard, 'X', 'O', depth + 1, false);
              move.score = res.score;
          }
          else {
              var res = minimax(nBoard, 'X', 'O', depth + 1, true);
              move.score = res.score;
          }

          nBoard[availSpots[i]] = move.index;
          moves.push(move);
  }

  var bestMove;
  if (isComp) {
      var bestScore = -10000;
      for (var i = 0; i < moves.length; i++) {
          if (moves[i].score > bestScore) {
              bestScore = moves[i].score;
              bestMove = i;
          }
      }
  } else {
      var bestScore = 10000;
      for (var i = 0; i < moves.length; i++) {
          if (moves[i].score < bestScore) {
              bestScore = moves[i].score;
              bestMove = i;
          }
      }
  }

  return moves[bestMove];
}



