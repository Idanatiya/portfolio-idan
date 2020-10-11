'use strict';
var gNextId;
var gQuests;
var gCurrQuestIdx;


var gStartTimer;
var gTimerInterval;

 
var wrongAudio;
var startGameAudio;
var correctAudio;
var gameOverAudio;




function init() {
    var elStartBtn = document.querySelector('.start-button');
    var elBubbleSpan = document.querySelector('.bubble-content');
    gNextId = 0;
    gQuests = createQuests();
    console.log('shuffled:', gQuests);
    gCurrQuestIdx = 0;
    //start the timer when i press start
    gStartTimer = Date.now();
    //run it evrey 10 milisec
    gTimerInterval = setInterval(startTimer, 10);

    //hide start game btn
    elStartBtn.classList.add('hide');
    elBubbleSpan.innerText = 'Who is in the picture?';
    renderQuestion();
}



function checkAnswer(elQuestion) {
    //get data idx of the clicked question to check correwct answer
    // var questDataIdx = +elQuestion.getAttribute('data-quest');
    var optionIdx = +elQuestion.dataset.quest;
    var elBubbleSpan = document.querySelector('.bubble-content');
    //check if we are on the last question and if we are and we clicked on the correct question show win
    if (optionIdx === gQuests[gCurrQuestIdx].correctOptIdx) {
        correctAudio = new Audio('sounds/right.mp3');
        correctAudio.play();
        console.log('You are correct!')
        elBubbleSpan.innerText = '✔️ You are correct!';
        if (gCurrQuestIdx === gQuests.length - 1) {
            showVictoryBubble();
            return;
        }
        gCurrQuestIdx++;
        //render quest question
        renderQuestion();
    } else {
        console.log('You are wrong!')
        elBubbleSpan.innerText = '✖️ You are wrong!';
        wrongAudio = new Audio('sounds/wrong.wav');
        wrongAudio.play();
    }

}


//show the victory bubble
function showVictoryBubble() {
    var elWinBubble = document.querySelector('.bubble-win');
    var elBubble = document.querySelector('.bubble');
    var elQuestions = document.querySelector('.questions');
    gameOverAudio = new Audio('sounds/game-over.mp3');
    gameOverAudio.play();
    console.log('WIN!!!!')
    //clear game interval
    clearInterval(gTimerInterval);

    //show and hide bubbles
    elBubble.classList.toggle('hide');
    elWinBubble.classList.add('show');
    elQuestions.classList.toggle('hide');

}

function restGame() {
    var elWinBubble = document.querySelector('.bubble-win');
    var elBubble = document.querySelector('.bubble');
    ///remove bubble
    var elQuestions = document.querySelector('.questions');
    elWinBubble.classList.remove('show');
    //rest globals
    gNextId = 0;
    gCurrQuestIdx = 0;
    //start the game again
    init();
    elBubble.classList.add('show');
    elQuestions.classList.toggle('hide');
}



function startTimer() {
    var now = Date.now();
    // console.log('THE DIFF', now - gStartTimer)
    // console.log('calc:', now - gStartTimer)
    var diff = (now - gStartTimer) / 1000;
    var time = formatTimestamp(diff)
    // console.log(time);
    var elTimerSpan = document.querySelector('.timer');
    elTimerSpan.innerText = time;
}

function renderQuestion() {
    //catch bubble
    // var question = getQuestById(gCurrQuestIdx);
    var question = gQuests[gCurrQuestIdx];
    console.log('question:', question)
    var strHTML = '';
    strHTML += `<img class="quest-img" src="imgs/${gCurrQuestIdx + 1}.png"/> `;
    strHTML += `<ul>`;
    for (var i = 0; i < question.opts.length; i++) {
        //create li for each option
        var currOption = question.opts[i];
        console.log('question:', currOption)
        //change figure in time
        document.body.style.backgroundImage = `url('background-imgs/${gCurrQuestIdx + 1}.png')`
        strHTML += `<li onclick="checkAnswer(this)" class="question" data-quest="${i}">`;
        strHTML += currOption;
        strHTML += `</li>`;
    }
    strHTML += `</ul > `
    var elQuestions = document.querySelector('.questions')
    elQuestions.innerHTML = strHTML;

}



function formatTimestamp(secs) {
    var hours = Math.floor(secs / (60 * 60));
    var minutes = Math.floor(secs / 60);
    var seconds = Math.floor(secs % 60);
    //get the portion of the decimal from the seconds
    var milSec = (secs % 1).toFixed(3).substr(2);
    // console.log('HOURS:', hours);
    // console.log('Minutes:', minutes);
    // console.log('Seconds:', seconds);

    //padd zeros 
    var padHours = hours < 10 ? `0${hours}` : hours;
    var padMin = minutes < 10 ? `0${minutes}` : minutes;
    var padSec = seconds < 10 ? `0${seconds}` : seconds;

    return `${padHours}:${padMin}:${padSec}.${milSec}`;
}


//get the obj by id
function getQuestById(id) {
    var question
    for (var i = 0; i < gQuests.length; i++) {
        var currQuest = gQuests[i];
        if (currQuest.id === id) {
            question = currQuest;
        }
    }
    return question;
}




function createQuests() {
    var quests = [
        { id: gNextId++, opts: ['That is Cartman', 'That is Mr Towel'], correctOptIdx: 1 },
        { id: gNextId++, opts: ['That is Randy Marsh', 'That is Kyle'], correctOptIdx: 0 },
        { id: gNextId++, opts: ['That is Mysterion', 'That is Butters'], correctOptIdx: 0 }
    ];

    return quests;
}



function saveNameToStorage() {
    var elModalAlert = document.querySelector('.modal-alert');
    var elSuccessAlert = document.querySelector('.alert.success');
    var elNameInput = document.querySelector('.name');
    var elUserSpan = document.querySelector('.username');

    if (!elNameInput.value) {
        showAlert(elModalAlert);
        return;
    }
    //save username in localstorage
    localStorage.setItem('username', elNameInput.value);
    var name = localStorage.getItem('username');
    elUserSpan.innerText = name;
    elNameInput.value = '';
    //hide modal
    closeModal();
    showAlert(elSuccessAlert)
    console.log('SAVED!');
}



//load data from localStorage
function loadData() {
    var elNameInput = document.querySelector('.username');
    var username = localStorage.getItem('username');
    //if there is a username in localstorage dont show modal
    if (username) {
        elNameInput.innerText = username;
    } else {
        startGameAudio = new Audio('sounds/start-game.mp3');
        startGameAudio.play();
        showModal();
    }
}

//show and hide alert after num of seconds
function showAlert(elAlert) {
    elAlert.style.display = 'block';
    setTimeout(function () {
        elAlert.style.display = 'none';
    }, 3000)
}

function showModal() {
    var elWelcomeModal = document.querySelector('.welcome-container');
    elWelcomeModal.style.display = 'flex';
}

function closeModal() {
    console.log('clicked!')
    var elWelcomeModal = document.querySelector('.welcome-container');
    elWelcomeModal.style.display = 'none';
}

function getRandomInteger(min, max) {
    var randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randNum;
}

// //show data from localStorage
// document.addEventListener('DOMContentLoaded', loadData);




// function renderQuestions(questions) {
//     var strHTML = '';
//     for (var i = 0; i < questions.length; i++) {
//         var currQuestion = questions[i];
//         strHTML += `< img class='quest-img' src = 'imgs/${i + 1}.png'`;
//         strHTML += `< ul style = 'list-style:none;' > `
//         for (var j = 0; j < currQuestion.opts.length; j++) {
//             strHTML += `< li onclick = 'questionClicked(this) 'class='question question${i}' data - quest='${j}' > `
//             strHTML += `${ currQuestion.opts[j] } `
//             strHTML += `</ > `
//         }
//         strHTML += `</ul > `
//     }

//     var elQuestions = document.querySelector('.questions');
//     elQuestions.innerHTML = strHTML;
// }


// function renderQuestion() {
//     var strHTML = '';
//     for (var i = 0; i < 1 .length; i++) {
//         var currQuestion = questions[i];
//         strHTML += `< img class='quest-img' src = 'imgs/${i + 1}.png'`;
//         strHTML += `< ul style = 'list-style:none;' > `
//         for (var j = 0; j < currQuestion.opts.length; j++) {
//             strHTML += `< li   onclick = 'questionClicked(this) 'class='question' data - quest='${j}' > `
//             strHTML += `${ currQuestion.opts[j] } `
//             strHTML += `</ > `
//         }
//         strHTML += `</ul > `
//     }

//     var elQuestions = document.querySelector('.questions');
//     elQuestions.innerHTML = strHTML;
// }





// function handleFile(elFile) {
//     //convert file obj into a data url
//     var reader = new FileReader();


//     reader.readAsDataURL(elFile.files[0]);

//     reader.addEventListener('load', function () {
//         console.log(reader.result);
//         localStorage.setItem('recent-image', reader.result);
//         alert('File has been uploaded!')
//     })

//     console.log(elFile.files);
//     console.log('hello!');
// }





// for (var i = 0; i < gQuest.length; i++) {
//     var currQuest = gQuest[i];
//     //if they are equal
//     if (currQuest.correctOptIdx === questDataIdx) {
//         console.log('You are correct!')
//     } else {
//         console.log('You are not correct')
//     }
// }
// }



// function questionClicked(elQuestion) {
//     var questDataIdx = +elQuestion.getAttribute('data-questIdx');
//     for (var i = 0; i < gQuest.length; i++) {
//         var currQuest = gQuest[i];
//         //if they are equal
//         if (currQuest.correctOptIdx === questDataIdx) {
//             console.log('You are correct!')
//         } else {
//             console.log('You are not correct')
//         }
//     }
// }




// function createQuest() {
//     var quest = {
//         id: gNextId++,
//         opts: [],
//         correctOptIdx: 0
//     }
//     return quest;

// function createQuests() {
//     var shuffled = [];
//     var quests = [
//         { id: gNextId++, opts: ['That is Cartman', 'That is Mr Towel'], correctOptIdx: 1 },
//         { id: gNextId++, opts: ['That is Randy Marsh', 'That is Kyle'], correctOptIdx: 0 },
//         { id: gNextId++, opts: ['That is Mysterion', 'That is Butters'], correctOptIdx: 0 }
//     ];

//     for (var i = 0; i < quests.length; i++) {
//         console.log('i', i);
//         console.log('questsmlength', quests.length)
//         var randIdx = getRandomInteger(0, quests.length - 1);
//         console.log('rand idx', randIdx)
//         var splicedQuest = quests.splice(randIdx, 1)[0];
//         console.log('quest:', splicedQuest)
//         shuffled.push(splicedQuest);
//     }
//     console.log(shuffled);
//     return shuffled;
// }