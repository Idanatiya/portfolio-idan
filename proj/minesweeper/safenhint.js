'use strict';

const MINE = '💣';
const EMPTY = '';
const FLAG = '<img class="gun" src="imgs/gun.png"/>';


var gLifeCount;
var gMinePoses;
var gGame;
var gBoard;
var gStartTimer;
var gTimerInterval;
var gIsHintClicked;
var gSafeClickLeft;
var gLevel = {};
var gElImgClicked;
var gIsManualMode;






function init() {
    var elSafeClickLeft = document.querySelector('.click-left');
    var elSafeClickModal = document.querySelector('.safe');
    var elLifeCount = document.querySelector('.life');
    var elSmiley = document.querySelector('.smile-img');
    elSmiley.src = 'imgs/normal-rick.png';
    gMinePoses = [];
    gLifeCount = 3;
    gSafeClickLeft = 3;
    gBoard = createBoard();
    gStartTimer = null;
    gIsHintClicked = false;

    gIsManualMode = false;

    gGame = {
        isOn: false,
        showCount: 0,
        markedCount: 0,
        secsPassed: 0,
        isWon: false
    }

    if (!gGame.isOn) {
        var elTimerSpan = document.querySelector('.time');
        elTimerSpan.innerText = 'Click to start';
        removeBubble();
    }
    clearInterval(gTimerInterval)

    //redisplat hitn imgs
    showHintsImgs();
    elSafeClickModal.style.display = 'none';
    elLifeCount.innerText = gLifeCount;
    elSafeClickLeft.innerText = gSafeClickLeft + ' safe clicks available ';

    gGame.isOn = true;
    renderBoard(gBoard);

}


function pickMode(size) {
    switch (size) {
        case 4:
            gLevel.size = 4;
            gLevel.mines = 2;
            init();
            break;
        case 8:
            gLevel.size = 8;
            gLevel.mines = 12;
            init();
            break;
        case 12:
            gLevel.size = 12;
            gLevel.mines = 30;
            init();
            break;

    }
}



/*create board model*/
function createBoard() {
    var board = [];
    var boardSize = gLevel.size;
    for (var i = 0; i < boardSize; i++) {
        board[i] = [];
        for (var j = 0; j < boardSize; j++) {
            board[i][j] = createCell();

        }
    }
    return board;
}



/*gte empty celles for the mines*/
function getEmptyCells(board, elCell) {
    console.log('PLACING MINES....')
    var emptyCells = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            var elCellCoord = getCellCoord(elCell.className)
            if (!currCell.isMine && elCellCoord.i !== i && elCellCoord.j !== j) {
                emptyCells.push({ i, j });
            }
        }
    }
    console.log('empty:', emptyCells)
    return emptyCells;
}


/**Get a safe click coord ***/
function getSafeCell() {
    var safeCells = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j];
            if (!cell.isShowen && !cell.isMine && !cell.isMarked) {
                safeCells.push({ i, j });
            }
        }
    }
    if (safeCells.length === 0) {
        alert('No empty cells left')
        return;
    }
    console.log(safeCells, 'length is:', safeCells.length);
    var randIdx = getRandomInteger(0, safeCells.length - 1);
    return safeCells[randIdx];
}



/**display on dom the safe cell */
function revealSafeCell() {
    var cell = getSafeCell();
    console.log('got:', cell)
    var elSafeClickLeft = document.querySelector('.click-left')
    if (gSafeClickLeft > 0) {
        --gSafeClickLeft
        elSafeClickLeft.innerText = `${gSafeClickLeft} safe clicks available`;
    } else {
        alert('You Wasted all your safe clicks')
        elSafeClickLeft.innerText = `${gSafeClickLeft} safe clicks available`;
        return;
    }

    var className = getClassName(cell);
    var elCell = document.querySelector(`.${className}`);
    elCell.classList.add('show');
    setTimeout(function () {
        elCell.classList.remove('show');
    }, 1000)


}


/*reveal mines upon loss*/
function revealMines(elCell) {
    for (var i = 0; i < gMinePoses.length; i++) {
        var currMineCoords = gMinePoses[i];
        console.log('curr mine coords', currMineCoords)
        var elCell = document.querySelector(`.cell-${currMineCoords.i}-${currMineCoords.j}`);
        elCell.innerHTML = MINE;
        elCell.classList.add('show');
    }
}



//mange img clicked
function hintClicked(elImg) {
    gIsHintClicked = true;
    elImg.classList.add('hint-effect');
    gElImgClicked = elImg;
    console.log('clicked!')
}




function manualModeActivated() {
    gIsManualMode = true;
    console.log('You entered manual mode');
}

// gBoard, elCell, cellCoords.i, cellCoords.j
function setMinesManually(board, elCell) {
    var elCellCoord = getCellCoord(elCell.className);
    gBoard[elCellCoord.i][elCellCoord.j].isMine = true;
    console.log('')
    elCell.innerHTML = MINE;
    elCell.classList.add('show')

}



function revealCellNegs(board, rowIdx, colIdx) {
    var elCells = [];
    console.log('got to REVEALCELLNEGS')
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board.length) continue;
            var cell = board[i][j];
            //get class name from of the curr cell
            var cellClassName = getClassName({ i, j });
            //get the dom elem
            var elCell = document.querySelector(`.${cellClassName}`);

            if (cell.isMine) {
                elCell.innerHTML = MINE;
            } else if (cell.minesAroundCell === 0) {
                elCell.innerHTML = EMPTY
            } else {
                elCell.innerHTML = cell.minesAroundCell;
            }
            elCell.classList.add('hint-show');
            elCells.push(elCell);
        }
    }
    setTimeout(function () {
        console.log('go to timeout')
        for (var i = 0; i < elCells.length; i++) {
            var elCell = elCells[i];
            elCell.classList.remove('hint-show');
        }
        gElImgClicked.style.display = 'none';
    }, 1000)
}



function expandShown(board, rowIdx, colIdx) {
    if (board[rowIdx][colIdx].minesAroundCell) {
        console.log('cell has number in it')
        renderCell({ i: rowIdx, j: colIdx }, board[rowIdx][colIdx].minesAroundCell);
        return;
    }
    console.log('function iniated!!!')
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board.length) continue;
            if (i === rowIdx && colIdx === j) continue;
            var cell = board[i][j]
            // console.log('CELL LINE 186:', cell)
            if (cell.isMine || cell.isMarked || cell.isShowen) continue;
            cell.isShowen = true;
            gGame.showCount += 1;
            if (cell.minesAroundCell === 0) {
                // console.log('GOT TO LINE 190')
                expandShown(board, i, j);
                renderCell({ i, j }, EMPTY);

            } else {
                // console.log('GOT TO LINE 195')
                renderCell({ i, j }, cell.minesAroundCell);

            }
            // console.log('CELL:', cell)
        }
    }
}







/*get count of the mines of a coord*/
function getMinesNegsCount(board, rowIdx, colIdx) {
    // console.log(rowIdx, colIdx)
    var minesCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= board.length) continue;
            if (i === rowIdx && colIdx === j) continue;
            var cell = board[i][j]
            if (cell.isMine) {
                minesCount += 1;
            }
        }
    }
    return minesCount;
}




function renderBoard(board) {
    var elBoard = document.querySelector('.board');
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += `<tr>`;
        for (var j = 0; j < board.length; j++) {
            var cellClass = getClassName({ i, j });
            var cellContent = board[i][j];
            cellContent = EMPTY;
            strHTML += `<td td onclick="cellClicked(this)" oncontextmenu ="cellClickedFlag(this)" class="${cellClass}"> ${cellContent}</td > `;
        }
        strHTML += `</tr > `
    }
    elBoard.innerHTML = strHTML;
}


/*manage flag logic*/
function cellClickedFlag(elCell) {
    event.preventDefault();
    var cellCoords = getCellCoord(elCell.className);
    var cellSelected = gBoard[cellCoords.i][cellCoords.j]
    if (!gTimerInterval) {
        startTimer();
    }
    if (!gGame.isOn || cellSelected.isShowen) return;

    if (cellSelected.isMarked) {
        cellSelected.isMarked = false;
        gGame.markedCount--;
        checkVictory();
        elCell.innerHTML = EMPTY;
    } else {
        cellSelected.isMarked = true;
        gGame.markedCount++;
        checkVictory();
        elCell.innerHTML = FLAG;
    }

}


/*place mines in random positions on the board model*/
function placeMines(elCell) {
    var emptyCells = getEmptyCells(gBoard, elCell);
    // console.log('num of coords before splice:', emptyCells.length)
    for (var i = 0; i < gLevel.mines; i++) {
        var randIdx = getRandomInteger(0, emptyCells.length - 1);
        var mineCoord = emptyCells.splice(randIdx, 1)[0];
        gBoard[mineCoord.i][mineCoord.j].isMine = true;
        gMinePoses.push(mineCoord);
        // console.log(`mine coord ${mineCoord.i},${mineCoord.j} is spliced!`);
    }
    // console.log('num of coords after splice:', emptyCells.length)
}


/*set in the model how many mines there are near each cell*/
function setMinesNegsCount() {
    for (let i = 0; i < gBoard.length; i++) {
        for (let j = 0; j < gBoard[0].length; j++) {
            var negsNum = getMinesNegsCount(gBoard, i, j);
            gBoard[i][j].minesAroundCell = negsNum;
        }

    }
}



function cellClicked(elCell) {
    var elSmiley = document.querySelector('.smile-img');
    var elSafeBtn = document.querySelector('.safe');
    var elLifeCount = document.querySelector('.life');
    var cellCoords = getCellCoord(elCell.className);
    var selectedCell = gBoard[cellCoords.i][cellCoords.j];
    startTimer();
    if (!gGame.isOn) return;

    /**manuel mode */
    if (gIsManualMode && gGame.showCount === 0) {
        console.log('GOT TO MANUEL LINE 400')
        setMinesManually(gBoard, elCell, cellCoords.i, cellCoords.j)
        return;
    }
    //place mines only after first click
    if (gGame.showCount < 1) {
        elSafeBtn.style.display = 'block';
        placeMines(elCell);
        setMinesNegsCount();
    }

    /**Hint feature */
    if (gIsHintClicked && gGame.showCount >= 1) {
        console.log('got to here')
        revealCellNegs(gBoard, cellCoords.i, cellCoords.j);
        gIsHintClicked = false;
        return;
    }




    expandShown(gBoard, cellCoords.i, cellCoords.j);

    var cellNegs = getMinesNegsCount(gBoard, cellCoords.i, cellCoords.j);
    if (selectedCell.isShowen || selectedCell.isMarked) return
    gBoard[cellCoords.i][cellCoords.j].isShowen = true;
    gGame.showCount += 1;
    checkVictory();
    elCell.classList.add('show');
    if (selectedCell.isMine) {
        --gLifeCount;
        elCell.innerHTML = MINE;
        if (gLifeCount === 0) {
            elLifeCount.innerText = gLifeCount;
            revealMines();
            gameOver();
            elSmiley.src = `imgs/dead-rick.png`;
        } else {
            elCell.style.backgroundColor = 'red';
            elLifeCount.innerText = gLifeCount;

        }

    } else if (cellNegs && gGame.showCount > 1) {
        gBoard[cellCoords.i][cellCoords.j].minesAroundCell = cellNegs;
        elCell.innerHTML = cellNegs;
    }
}




function checkVictory() {
    var elSmiley = document.querySelector('.smile-img');
    console.log('show count', gGame.showCount)
    console.log(gGame.markedCount)
    if (gGame.showCount + gGame.markedCount === gBoard.length ** 2) {
        elSmiley.src = 'imgs/rick-win.png';
        gGame.isWon = true;
        gameOver();
    }
}


function gameOver() {
    gGame.isOn = false;
    var elBubbleSpan = document.querySelector('.bubble-span');
    showBubble()
    console.log('GAME OVER!')
    if (gGame.isWon) {
        elBubbleSpan.innerHTML = 'YOU WON!';
    } else {
        elBubbleSpan.innerHTML = 'GAME OVER!';
    }
    clearInterval(gTimerInterval);
    console.log('cleared interval')


}


function calcTime() {
    var elSpanTimer = document.querySelector('.time')
    var now = Date.now();
    var diff = Math.floor((now - gStartTimer) / 1000);
    gGame.secsPassed = Math.floor(diff);
    var time = formatTimestamp(diff);
    elSpanTimer.innerText = time;

}

function startTimer() {
    if (gGame.showCount <= 0) {
        gStartTimer = Date.now();
        gTimerInterval = setInterval(calcTime, 10);
    }
}


function showBubble() {
    var elBubble = document.querySelector('.bubble');
    elBubble.style.display = 'block';
}

function removeBubble() {
    var elBubble = document.querySelector('.bubble');
    elBubble.style.display = 'none';
}

function showHintsImgs() {
    var elHintImgs = document.querySelectorAll('.hint');
    for (var i = 0; i < elHintImgs.length; i++) {
        var elImg = elHintImgs[i];
        elImg.style.display = 'inline-block';
        elImg.classList.remove('hint-effect');
    }
}

function createCell() {
    var cell = {
        minesAroundCell: 0,
        isShowen: false,
        isMine: false,
        isMarked: false
    }
    return cell;
}



function getClassName(location) {
    // console.log('clas:', location)
    var cellClass = `cell-${location.i}-${location.j}`
    return cellClass;
}

function renderCell(location, value) {
    // console.log('location:', location)
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    // console.log('EL CELL:', elCell)
    elCell.classList.add('show');
    elCell.innerHTML = value;
}
function getCellCoord(strClassName) {
    var sliced = strClassName;

    if (strClassName.includes('show')) {
        sliced = strClassName.slice(0, 9)
    }
    var parts = sliced.split('-');
    var coord = {
        i: +parts[1],
        j: +parts[2],
    };
    return coord;
}


// function undoClicked(elCell) {
//     var counter = 0;
//     for (var i = 0; i < gCurrModel.length; i++) {
//         for (var j = 0; j < gCurrModel[0].length; j++) {
//             var cell = gCurrModel[i][j];
//             if (cell.isShowen && counter < 1) {
//                 cell.isShowen = false;
//             }
//               counter++;
//         }
//     }
//     gBoard = gCurrModel;
//     console.log(gBoard);

// }


// function undoClicked(elCell) {
//     for (var i = 0; i < gCurrModel.length; i++) {
//         for (var j = 0; j < gCurrModel[0].length; j++) {
//             var cell = gCurrModel[i][j];
//             if (cell.isShowen) {
//                 cell.isShowen = false;
//             }
//         }
//         gBoard = gCurrModel;
//         renderBoard(gBoard);
//         gStep = gBoard;
//         console.log(gBoard);
//         console.log('rendered!')

//     }
// }

function updateBestScore() {
    var storageKey;
    var elScoreBeginner = document.querySelector('.score-beginner');
    var elScoreMedium = document.querySelector('.score-medium');
    var elScoreExpert = document.querySelector('.score-expert');
    console.log(elScoreExpert, elScoreMedium, elScoreBeginner)
    switch (gLevel.size) {
        case 4:
            if (localStorage.getItem('score-beginner') === null) {
                localStorage.setItem('score-beginner', gGame.secsPassed);
                elScoreBeginner.innerText = gGame.secsPassed + ' seconds';
                storageKey = 'score-beginner'
                elModeSpan = elScoreBeginner
            }
            break;
        case 8:
            if (localStorage.getItem('score-medium') === null) {
                localStorage.setItem('score-medium', gGame.secsPassed);
                elScoreMedium.innerText = gGame.secsPassed + ' seconds';
                storageKey = 'score-medium'
                elModeSpan = elScoreMedium;
            }
            break
        case 12:
            if (localStorage.getItem('score-medium') === null) {
                localStorage.setItem('score-medium', gGame.secsPassed);
                elScoreExpert.innerText = gGame.secsPassed + ' seconds';
                storageKey = 'score-expert'
                elModeSpan = elScoreExpert;
            }
            break
    }
    var currScore = +localStorage.getItem(storageKey);
    console.log('curr score:', currScore);
    console.log('secs passed:', gGame.secsPassed);
    if (gGame.secsPassed < currScore) {
        localStorage.setItem(storageKey, gGame.secsPassed);
        elModeSpan.innerText = gGame.secsPassed + 'seconds';
    }
}




function updateBestScore() {
    var storageScoreKey;
    var elModeSpan;
    var storageUsername;
    var elUsername;
    var elModeDate;
    var storageModeDate;
    var elScoreBeginner = document.querySelector('.td1-time');
    var elScoreMedium = document.querySelector('.td2-time');
    var elScoreExpert = document.querySelector('.td3-time');
    var elNameBeginner = document.querySelector('.td1-name');
    var elNameMedium = document.querySelector('.td2-name');
    var elNameExpert = document.querySelector('.td3-name')
    var elBeginnerDate = document.querySelector('.td1-date');
    var elMediumDate = document.querySelector('.td2-date');
    var elExpertDate = document.querySelector('.td3-date');

    console.log(elScoreExpert, elScoreMedium, elScoreBeginner)

    // var currLvlScore = +localStorage.setItem(`score-${gLevel.mode}`, gGame.secsPassed);
    // var loggedUser = localStorage.getItem('username');
    // var userName = localStorage.setItem(`name-${gLevel.mode}`, loggedUser);

    // if (gGame.secsPassed < currLvlScore) {
    //     var currDate = new Date().toLocaleString();
    //     localStorage.setItem(storageUsername, localStorage.getItem('username'));
    //     localStorage.setItem(storageModeDate, currDate);
    //     elModeSpan.innerText = `${gGame.secsPassed} seconds`;
    //     elUsername.innerText = localStorage.getItem('username');
    //     elModeDate.innerText = currDate;
    //     alert('Leaderboard has been updated...')

    // }










    switch (gLevel.size) {
        case 4:
            if (localStorage.getItem('score-beginner') === null) {
                localStorage.setItem('score-beginner', gGame.secsPassed);
                localStorage.setItem('username-beginner', localStorage.getItem('username'));
                localStorage.setItem('date-beginner', new Date().toLocaleString())
                elScoreBeginner.innerText = `${gGame.secsPassed} seconds`;
                elNameBeginner.innerText = localStorage.getItem('username')
                elBeginnerDate.innerText = localStorage.getItem('date-beginner')

            }
            storageScoreKey = 'score-beginner'
            elModeSpan = elScoreBeginner
            storageUsername = 'username-beginner';
            elUsername = elNameBeginner;
            storageModeDate = 'date-beginner';
            elModeDate = elBeginnerDate;
            break;
        case 8:
            if (localStorage.getItem('score-medium') === null) {
                localStorage.setItem('score-medium', gGame.secsPassed);
                localStorage.setItem('username-medium', localStorage.getItem('username'));
                localStorage.setItem('date-medium', new Date().toLocaleString())
                elScoreMedium.innerText = `${gGame.secsPassed} seconds`;
                elNameMedium.innerText = localStorage.getItem('username-medium')
                elMediumDate.innerText = localStorage.getItem('date-medium')
            }
            storageScoreKey = 'score-medium'
            elModeSpan = elScoreMedium;
            storageUsername = 'username-medium';
            elUsername = elNameMedium;
            storageModeDate = 'date-medium';
            elModeDate = elMediumDate;
            break
        case 12:
            if (localStorage.getItem('score-medium') === null) {
                localStorage.setItem('score-medium', gGame.secsPassed);
                localStorage.setItem('username-expert', localStorage.getItem('username'));
                localStorage.setItem('date-expert', new Date().toLocaleString())
                elScoreExpert.innerText = `${gGame.secsPassed} seconds`;
                elNameExpert.innerText = localStorage.getItem('username-expert')
                elExpertDate.innerText = localStorage.getItem('date-expert')
            }
            storageScoreKey = 'score-expert'
            elModeSpan = elScoreExpert;
            storageUsername = 'username-expert';
            elUsername = elNameExpert;
            storageModeDate = 'date-expert';
            elModeDate = elExpertDate;
            // elNameExpert.innerText = localStorage.getItem('username')
            break
    }
    var currScore = +localStorage.getItem(storageScoreKey);
    if (gGame.secsPassed < currScore) {
        var currDate = new Date().toLocaleString();
        localStorage.setItem(storageScoreKey, gGame.secsPassed);
        localStorage.setItem(storageUsername, localStorage.getItem('username'));
        localStorage.setItem(storageModeDate, currDate);
        elModeSpan.innerText = `${gGame.secsPassed} seconds`;
        elUsername.innerText = localStorage.getItem('username');
        elModeDate.innerText = currDate;
        alert('Leaderboard has been updated...')

    }
}