'use strict'

const GHOST = '<img class="ghost" src="imgs/ship.gif"/>';
// const GHOST = '&#9781;'

var gGhosts = []
var gIntervalGhosts;


function createGhost(board) {
    var randColor = getRandGhostColor();
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        color: randColor
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST

}

// function removeGhost(ghostLoc) {
//     var elGhost = document.querySelector(`.cell cell${ghostLoc.i}-${ghostLoc.j}`);
//     console.log(elGhost)
//     elGhost.innerHTML = '';

// }




function createGhosts(board, ghostAmount = 3) {
    console.log('MONSTER CREATED:', ghostAmount)
    if (gIntervalGhosts) clearInterval(gIntervalGhosts);
    for (var i = 0; i < ghostAmount; i++) {
        createGhost(board);
    }

    gIntervalGhosts = setInterval(moveGhosts, 1000)
}



function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];
        moveGhost(ghost)

    }
}



function moveGhost(ghost) {
    var moveDiff = getMoveDiff();
    var nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    if (nextCell === WALL) return;
    if (nextCell === GHOST) return;
    if (nextCell == PACMAN) {
        if (!gPacman.isSuper) {
            gameOver();
            return;
        }

    } else if (nextCell === CHERRY) {
        console.log('STEP ON CHERYYYYYYYYYYYYYYYYY')
        return;
    }
    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    // dom
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation;
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST;
    // dom
    if (gPacman.isSuper) {
        renderCell(ghost.location, getGhostHTML(ghost))
    } else {
        renderCell(ghost.location, GHOST)
    }

}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}



function getGhostHTML(ghost) {
    // <span style="color:red;" ></span>
    return `<span style="color:${ghost.color};">${GHOST}</span>`;
}


function getGhostById(ghostLoc) {
    var idx;
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i];
        if (currGhost.location.j === ghostLoc.j && currGhost.location.i === ghostLoc.i) {
            idx = i;
        }
    }
    return idx;
}



//     var ghostId = ghostElem.id;
//     var ghostIdx;
//     for (var i = 0; i < gGhosts.length; i++) {
//         var currGhost = gGhosts[i];
//         if (currGhost.id === ghostId) {
//             ghostIdx = i;

//         }
//     }
//     return ghostIdx;
// }
