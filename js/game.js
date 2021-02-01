'use strict'
const WALL = '🔳'
const FOOD = '🥦'
const EMPTY = ' ';
const SUPER_FOOD = '🍔'
const CHERRY = '🍒';


var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
var gWonOrEaten;
var gIntervalCherry;
var gFoodCount;

function init() {
    console.log('hello')
    gFoodCount = 0;
    gRemovedGhosts=[];
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true;
    gIntervalCherry = setInterval(addCherry, 15000);
}

function buildBoard() {
    var SIZE = 12;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gFoodCount++;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2) ||
                (j === 9 && i > 2 && i < SIZE - 6) ||
                (i === 2 && j > 3 && j < SIZE - 5) ||
                (i === 9 && j > 5 && j < SIZE - 3)) {
                board[i][j] = WALL;
                gFoodCount--;
            }
        }
    }
    board[1][1] = board[SIZE - 2][1] = board[SIZE - 2][SIZE - 2] = board[1][SIZE - 2] = SUPER_FOOD;
    console.log('gFoodCount start:', gFoodCount)
    return board;
}

function addCherry() {
    var emptyCell = (randomEmptyCell()) ? randomEmptyCell() : null;
    if (emptyCell) {
        //update the modal
        gBoard[emptyCell.i][emptyCell.j] = CHERRY;
        //update the DOM
        renderCell(emptyCell, CHERRY);
    }
    return;
}



// update model and dom
function updateScore(diff) {
    gGame.score += diff
    var elScore = document.querySelector('h2 span')
    elScore.innerText = gGame.score
}

function isVictory() {
    if (gFoodCount === 0) return true;
    return false;
}

// TODO
function gameOver() {
    var id = gWonOrEaten ? 'win' : 'lost';
    console.log('You ' + id);
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    gIntervalGhosts = null
    var elModal = document.getElementById(id);
    elModal.classList.remove('hidden');
    var elSpan = elModal.querySelector('.score');
    elSpan.innerText = gGame.score;
}

function playAgain() {
    init();
    var id = gWonOrEaten ? 'win' : 'lost';
    var elModal = document.getElementById(id);
    elModal.classList.add('hidden');
    gGame.score = 0;
    var elScore = document.querySelector('h2 span')
    elScore.innerText = gGame.score;
    gIntervalCherry = null;
}

