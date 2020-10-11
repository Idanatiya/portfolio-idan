

function getRandomInteger(min, max) {
    var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randNum;
}


function formatTimestamp(secs) {
    // console.log('secs:', secs)
    var hours = Math.floor(secs / (60 * 60));
    var minutes = Math.floor(secs / 60);
    var seconds = Math.floor(secs % 60);
    //get the portion of the decimal from the seconds
    // console.log('HOURS:', hours);
    // console.log('Minutes:', minutes);
    // console.log('Seconds:', seconds);

    //padd zeros 
    var padHours = hours < 10 ? `0${hours}` : hours;
    var padMin = minutes < 10 ? `0${minutes}` : minutes;
    var padSec = seconds < 10 ? `0${seconds}` : seconds;

    return `${padHours}:${padMin}:${padSec}`;
}



// function renderCell(location, value) {

//     // Select the elCell and set the value
//     var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
//     // if (reveal) elCell.classList.add('show');
//     console.log('cell elem:', elCell)
//     elCell.innerHTML = value;
// }


function showAlert(msg, mode) {
    var elAlert = document.createElement('div');
    mode === 's' ? elAlert.classList.add('alert-success') : elAlert.classList.add('alert-danger')
    elAlert.innerHTML = msg;
    elAlert.style.display = 'block';
    document.body.appendChild(elAlert);
    setTimeout(function () {
        elAlert.style.display = 'none';
        document.body.removeChild(elAlert);
    }, 3000)
}


function closeModal(elModal) {
    console.log('got here')
    elModal.style.display = 'none';
}

function openModal(elModal) {
    elModal.style.display = 'flex';
}

function deepCopyBoard(mat) {
    var newMat = [];
    for (var i = 0; i < mat.length; i++) {
        newMat[i] = [];
        for (var j = 0; j < mat[0].length; j++) {
            newMat[i][j] = {
                minesAroundCell: mat[i][j].minesAroundCell,
                isShowen: mat[i][j].isShowen,
                isMine: mat[i][j].isMine,
                isMarked: mat[i][j].isMarked
            }
        }
    }
    return newMat;
}

function deepCopyObj(gameInfo) {
    var game = {
        isOn: gameInfo.isOn,
        isWon: gameInfo.isWon,
        showCount: gameInfo.showCount,
        markedCount: gameInfo.markedCount,
        secsPassed: gameInfo.secsPassed,
    }
    return game
}


function getClassName(location) {
    var cellClass = `cell-${location.i}-${location.j}`
    return cellClass;
}

function renderCell(location, value) {
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
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


function getRandBackground() {
    var randIdx = getRandomInteger(0, 6);
    document.body.style.backgroundImage = `url(imgs/${randIdx}.png)`;

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

// function deepCopyMat(mat) {
//     var copyMat = [];
//     for (var i = 0; i < mat.length; i++) {
//         var rowPointer = mat[i];
//         var rowCopy = rowPointer.slice();
//         copyMat[i] = rowCopy;
//     }
//     return copyMat;
// }


