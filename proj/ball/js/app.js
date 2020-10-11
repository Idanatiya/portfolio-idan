'use strict';

const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';
const GLUE = 'GLUE';

// const GAMER_IMG = '<img src="img/goku.png"/>';
const GAMER_IMG = '<img  class="son-goku" src="img/gg.gif"/>';
const BALL_IMG = '<img src="img/dragon-ball.png"/>';
const GLUE_IMG = '<img src="img/shenron.png"/>';

var gGamerPos;
var gBoard;
var gInterval;


var gIntervalGlue;
var gBallsCount;

var gBallsTotal = 8;
var gBallCollectAudio;

var gIsStuck;



function init() {
	var elBallCount = document.querySelector('.ball-count');

	if (!gInterval) {
		closeModal();
	}
	gGamerPos = { i: 1, j: 1 };
	gBoard = buildBoard();
	gBallsCount = 0;
	//evrey few sec generate a rand ball
	renderBoard(gBoard);

	//generate ball
	// gInterval = setInterval(generateRndBall, 5000);

	gInterval = setInterval(function () {
		generateRndItem(BALL, BALL_IMG)
	}, 3000)

	gIsStuck = false;
	//generate glue
	gIntervalGlue = setInterval(function () {
		generateRndItem(GLUE, GLUE_IMG)
	}, 5000)

	closeModal();
	elBallCount.innerText = 'None';
}







//build the board
function buildBoard() {
	var board = [];
	for (var i = 0; i < 10; i++) {
		board[i] = [];
		for (var j = 0; j < 12; j++) {
			board[i][j] = {
				gameElement: null
			};
			//if the i of the cell im loop through is equal to those values i show a wall
			if (i === 0 || i === 9 || j === 0 || j === 11) {
				board[i][j].type = WALL;
			} else {
				board[i][j].type = FLOOR;
			}
			//{type: FLOOR | WALL, gameElement:GAMER | NULL}
		}
	}

	//place gamer
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	//place ball
	board[1][5].gameElement = BALL;

	// board[3][3].gameElement = GLUE;
	//HARD CODED PASSEGES
	board[0][5].type = board[9][5].type = board[5][0].type = board[5][11].type = FLOOR;

	console.log(board);
	console.log('BOARD:', board)
	console.table(board)
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var elBoard = document.querySelector('.board');
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		var row = board[i];
		for (var j = 0; j < row.length; j++) {

			//curr cell obj coordinate
			var currCell = row[j];

			var cellClass = getClassName({ i: i, j: j })
			// console.log('CELL CLASS:', cellClass)

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			// strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';
			strHTML += `\t<td class="cell ${cellClass}"  onclick="moveTo(${i}, ${j})" >\n`;

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			} else if (currCell.gameElement === GLUE) {
				strHTML += GLUE_IMG;
			}
			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	// console.log('strHTML is:');
	// console.log(strHTML);
	elBoard.innerHTML = strHTML;
}






// Move the player to a specific location
function moveTo(i, j) {

	//if we are stuck or we collect all balls we return
	if (gIsStuck || gBallsCount === gBallsTotal) return;
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	// console.log('iAbsDiff', iAbsDiff)
	var jAbsDiff = Math.abs(j - gGamerPos.j);
	// console.log('jAbsDiff', jAbsDiff)

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {
		//Paassges
		//change the i position if is equal to 0 0 ---> UP
		if (gGamerPos.i === 0) {
			i = gBoard.length - 2;
			console.log('i:', i)

		} else if (gGamerPos.i === gBoard.length - 1) { // --->DOWN
			i = 1;
		} else if (gGamerPos.j === gBoard[0].length - 1) { // ---> RIGHT
			console.log('go right')
			j = 1
		} else if (gGamerPos.j === 0) { // ---> LEFT
			j = gBoard[0].length - 2;
		}

		var targetCell = gBoard[i][j];

		console.log('target cell:', targetCell);
		if (targetCell.type === WALL) return;

		else if (targetCell.gameElement === GLUE) {
			var elAlert = document.querySelector('.stuck')
			gIsStuck = true;
			//MODEL
			targetCell.gameElement = GAMER;
			elAlert.style.display = 'block';
			renderCell({ i, j }, GAMER_IMG);

			setTimeout(function () {
				gIsStuck = false;
				elAlert.style.display = 'none';
			}, 3000)
		}

		else if (targetCell.gameElement === BALL) {
			var elBallCount = document.querySelector('.ball-count');
			console.log('ball collected!')
			gBallsCount++;
			gBallCollectAudio = new Audio('sounds/correct-db.mp3')
			gBallCollectAudio.play();
			elBallCount.innerText = gBallsCount;
			checkVictory();
		}
		// Update MODEL
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Update DOM
		renderCell(gGamerPos, '');

		// Update MODEL
		gGamerPos = { i: i, j: j };
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		// Update DOM
		renderCell(gGamerPos, GAMER_IMG);


	}

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	//get access to the specifc cell in the dom and change its value
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}



//check victory
function checkVictory() {
	var elModal = document.querySelector('.restart-container')
	console.log(elModal)
	if (gBallsCount !== gBallsTotal) return;
	console.log('VICTORY!')
	clearInterval(gInterval);
	clearInterval(gIntervalGlue);
	console.log('interval cleared!')
	elModal.style.display = 'flex';


}

function closeModal() {
	var elModal = document.querySelector('.restart-container');
	elModal.style.display = 'none';
}


function generateRndItem(item, itemImg) {
	//more efficent
	var emptyCells = [];
	for (var i = 1; i < gBoard.length - 1; i++) {
		for (var j = 1; j < gBoard[0].length - 1; j++) {
			var cell = gBoard[i][j];
			//check if cell is floor and there is no player or ball in the cell
			if (cell.type === FLOOR && !cell.gameElement) {
				emptyCells.push({ i, j })
			}

		}
	}

	//get rand idx from the empty cells 
	var randIdx = getRandomInteger(0, emptyCells.length - 1);
	//get the rand cell
	var randCell = emptyCells[randIdx];

	//update modal
	gBoard[randCell.i][randCell.j].gameElement = item;

	renderCell(randCell, itemImg);
	//AFTER 3 SEC REMOVE THE DRAGON

	if (!gIsStuck) {
		setTimeout(function () {
			//if im on the cell where there is a gamer we retun
			if (gBoard[randCell.i][randCell.j].gameElement === GAMER) return;
			//else i render the cell
			renderCell(randCell, '');
		}, 3000)
	}
}

// Move the player by keyboard arrows
function handleKey(ev) {
	console.log(ev)
	var i = gGamerPos.i;
	var j = gGamerPos.j;

	switch (ev.key) {
		case 'ArrowLeft':
		case 'A':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
		case 'D':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
		case 'W':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
		case 'S':
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}








// Every few seconds a new ball is added in a random empty cell
// function generateRndBall() {
// 	//more efficent
// 	var emptyCells = [];
// 	for (var i = 1; i < gBoard.length - 1; i++) {
// 		for (var j = 1; j < gBoard[0].length - 1; j++) {
// 			var cell = gBoard[i][j];
// 			//check if cell is floor and there is no player or ball in the cell
// 			if (cell.type === FLOOR && cell.gameElement === null) {
// 				emptyCells.push({ i, j })
// 			}

// 		}
// 	}

// 	//get rand idx from the empty cells 
// 	var randIdx = getRandomInteger(0, emptyCells.length - 1);
// 	//get the rand cell
// 	var randCell = emptyCells[randIdx];
// 	gBoard[randCell.i][randCell.j].gameElement = BALL;
// 	renderCell(randCell, BALL_IMG);
// }



// function passengerMove(i, j) {
// 	if (gGamerPos.i === i) {
// 		i = gBoard.length - 2;
// 		console.log('i:', i)
// 	} else if (gGamerPos.i === gBoard.length - 1) { // --->DOWN
// 		i = 1;
// 	} else if (gGamerPos.j === gBoard[0].length - 1) { // ---> RIGHT
// 		console.log('go right')
// 		j = 1
// 	} else if (gGamerPos.j === 0) { // ---> LEFT
// 		j = gBoard[0].length - 2;
// 	}
// 	return { i, j };
// }


// //check if board is empty
// function isBoardEmpty() {
// 	for (var i = 1; i < gBoard.length; i++) {
// 		var row = gBoard[i];
// 		//get access to each row
// 		for (var j = 1; j < row.length; j++) {
// 			var cell = row[j];
// 			if (cell.gameElement === BALL) return false;
// 		}
// 	}
// 	return true

// }


	// //if the pos type is wall or ball or gamer i want to return
	// if (gBoard[pos.i][pos.j].type === WALL || gBoard[pos.i][pos.j].type === BALL || gBoard[pos.i][pos.j].gameElement === GAMER) return
	// //if its an empty floor i want to change the pos game elem to ball and render it
	// gBoard[pos.i][pos.j].gameElement = BALL;
	// console.log("ball:", gBoard[pos.i][pos.j])

	// //show ball in dom
	// renderCell(pos, BALL_IMG);
