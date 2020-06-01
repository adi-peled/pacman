'use strict';
const WALL = '#';
const FOOD = '.';
const EMPTY = ' ';
const POWER_FOOD = '🌸';
const CHERRY = '🍒';


var gIntervalId;
var gCountFood;
var gBoard;
var gGame = {
  score: 0,
  isOn: false
};

function init() {
  document.querySelector('.btn').innerHTML = '';
  updateScore(-gGame.score)
  // gGame.score = 0;
  gCountFood = -1;
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);
  printMat(gBoard, '.board-container');
  // console.table(gBoard);
  gGame.isOn = true;
  gIntervalId = setInterval(addCherry, 7000)
}

function buildBoard() {
  var SIZE = 10;
  var board = [];

  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;


      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {



        board[i][j] = WALL;
      }
      if (i === 8 && j === 8) { board[i][j] = POWER_FOOD }
      if (i === 1 && j === 1) { board[i][j] = POWER_FOOD }
      if (i === 1 && j === 8) { board[i][j] = POWER_FOOD }
      if (i === 8 && j === 1) { board[i][j] = POWER_FOOD }

      if (board[i][j] === FOOD) gCountFood++
    }

  }
  console.log(gCountFood)






  return board;
}
function updateScore(value) {
  // Update both the model and the dom for the score

  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;

  isVictory()
}


function gameOver() {
  console.log('Game Over');
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  document.querySelector('.btn').innerHTML = ' <button> start again </button> '
  clearInterval(gIntervalId)


}





function isVictory() {

  console.log(gCountFood, gGame.score)
  if (gCountFood === gGame.score) {
    console.log('victory')
    document.querySelector('.victory').innerText = 'victory '
    document.querySelector('.btn').innerHTML = ' <button> start again </button> '
    clearInterval(gIntervalId)
    clearInterval(gIntervalGhosts);
    gGame.isOn = false;
  }
}


//setInterval(findEmptyCells, 2500)




function findEmptyCells() {
  var emptyCells = []

  for (var i = 0; i < gBoard.length; i++) {

    for (var j = 0; j < gBoard[0].length; j++) {
      var cell = gBoard[i][j]
      var cellLocation = { i: i, j: j }
      if (cell === EMPTY) {


        emptyCells.push(cellLocation)

      }
    }
  }

  return emptyCells
}


function addCherry() {
  var emptyLocations = findEmptyCells();
  if (!emptyLocations) {
    return
  }

  var random = Math.floor(Math.random() * emptyLocations.length - 1)
  var ranLocation = emptyLocations[random]
  console.log(ranLocation)
  gBoard[ranLocation.i][ranLocation.j] = CHERRY
  renderCell(ranLocation, CHERRY)

}













