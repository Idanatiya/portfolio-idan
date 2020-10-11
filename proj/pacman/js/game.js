'use strict'


const WALL = '<span class="wall">💈</span>';
// const FOOD = '.'
const FOOD = '<img class="food" src="imgs/food3.png"/>';
const EMPTY = ' ';
const SUPER_FOOD = '<img class="super-food" src="imgs/superfood1.png"/>';
const CHERRY = '🍒';

var gAudioFood;
var gIntervalCherry;
var gTotalFood;
var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    console.log('hello')
    //if the game is not in i close the restart modal and clean the ghosts
    gCountGhostEaten = 0;
    gTotalFood = 0;
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true;
    gIntervalCherry = setInterval(function () {
        placeCherry(gBoard);
    }, 1000)
}



function resetGame() {
    gGhosts = [];
    gGame.score = 0;
    gGame.isOn = true;
    clearInterval(gIntervalGhosts);
    clearInterval(gIntervalCherry);
    init();
    closeModal();
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            //add to food count
            gTotalFood++;
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gTotalFood--;
            }

            if (i === 8 && j === 1 ||
                i === 8 && j === 8 ||
                i === 1 && j === 1 ||
                i === 1 && j === 8) {
                board[i][j] = SUPER_FOOD;
            }


        }
    }
    return board;
}



function updateScore(diff) {
    gAudioFood = new Audio('sound/food-collect.wav');
    gAudioFood.play();
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
}


function gameOver() {
    var elScoreSpan = document.querySelector('.score');
    elScoreSpan.innerText = '0';
    console.log('Game Over');
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalCherry);
    showModal();
}



function placeCherry(board) {
    var emptyCells = [];
    for (var i = 1; i < board.length - 1; i++) {
        for (var j = 1; j < board[0].length - 1; j++) {
            var currCell = board[i][j];
            if (currCell === EMPTY) {
                emptyCells.push({ i, j });
            }
        }
    }
    //if there are no empty cells i return (in the beginning)
    if (!emptyCells.length) return;

    var randIdx = getRandomIntInclusive(0, emptyCells.length - 1);
    var randCherryCell = emptyCells[randIdx];
    //update model
    console.log('rand cheery cell', randCherryCell)
    board[randCherryCell.i][randCherryCell.j] = CHERRY;

    renderCell(randCherryCell, CHERRY);

    console.log('empty:', emptyCells);
}


function isAllFoodCollected() {
    return gGame.score >= gTotalFood;
}



function showModal() {
    var elGameOverModal = document.querySelector('.game-over');
    elGameOverModal.style.display = 'flex';
}

function closeModal() {
    var elGameOverModal = document.querySelector('.game-over');
    elGameOverModal.style.display = 'none';
}



















// function countFood(board) {
//         var countFood = 0;
//         for (var i = 0; i < board.length; i++) {
//             var row = board[i];
//             for (var j = 0; j < row.length; j++) {
//                 var currCell = row[j];
//                 if (currCell !== FOOD) continue;
//                 countFood++;
//             }
//         }
//         return countFood;
//     }



// function isAllFoodCollected(board) {
//     for (var i = 0; i < board.length; i++) {
//         var row = board[i];
//         for (var j = 0; j < row.length; j++) {
//             var currCell = row[j];
//             console.log(currCell)
//             if (currCell !== EMPTY) return false;
//         }
//     }
//     return true;
// }
