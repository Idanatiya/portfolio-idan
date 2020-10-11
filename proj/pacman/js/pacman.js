'use strict'
// const PACMAN = '😷';
const PACMAN = '<img class="pacman" src="imgs/sonic.gif"/>';


var gPacman;
var gCountGhostEaten = 0;

function createPacman(board) {
    var randPos = {
        i: getRandomIntInclusive(1, board.length - 2),
        j: getRandomIntInclusive(1, board.length - 2)
    }
    gPacman = {
        location: {
            i: randPos.i,
            j: randPos.j
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN;
    gTotalFood--;
}
function movePacman(ev) {

    if (!gGame.isOn) return;

    //IF ALL FOOD COLLECTED
    if (isAllFoodCollected()) {
        var elH3 = document.querySelector('.game-over h3')
        elH3.innerText = 'YOU WON!'
        gameOver();
        return;
    }
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === FOOD) updateScore(1);
    else if (nextCell === GHOST) {
        console.log(nextLocation)
        //if we meet a ghost and im super
        if (!gPacman.isSuper) {
            gameOver();
            renderCell(gPacman.location, EMPTY);
        } else {
            console.log('got here')
            //get the ghost idx and splice it from the ghosts artray
            var ghostIdx = getGhostById(nextLocation);
            console.log('idx:', ghostIdx)
            gGhosts.splice(ghostIdx, 1);
            gCountGhostEaten++;

        }
    } else if (nextCell === SUPER_FOOD) {
        if (gPacman.isSuper) {
            return;
        }
        gPacman.isSuper = true;
        setTimeout(function () {
            gPacman.isSuper = false;
            if (gCountGhostEaten) {
                createGhosts(gBoard, gCountGhostEaten);
                gCountGhostEaten = 0;
            }
        }, 5000)
    } else if (nextCell === CHERRY) {
        updateScore(10);
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;

    // update the dom
    renderCell(gPacman.location, EMPTY);

    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(gPacman.location, PACMAN);


}




function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            // PACMAN.classList.add('up');
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}