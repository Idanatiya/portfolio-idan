
var gIsToggled = false;
var gCurrUsers;

function initAdminPanel() {
    checkAccess();
    // loadFromStorage('usersDB')
    renderUsersTable();
    renderUsersCards();

    // _saveUsers();

}


function getPrevStorage() {
    return gUsers;
}
function checkAccess() {
    var loggedUser = loadFromStorage(CURR_USER_KEY);
    // if (!loggedUser) window.location.href = 'index.html';
    if (!loggedUser || !loggedUser.isAdmin) {
        window.location.href = 'index.html';
    }
}


function renderUsersTable() {
    // var users = loadFromStorage('usersDB')
    var users = getUsersForDisplay()
    console.log('Users in table:', users)
    var elUserTable = document.querySelector('.user-table');
    var strHTML = '';
    users.forEach(function (user) {
        var formatLoginTime = new Date(user.lastLoginTime).toLocaleString();
        strHTML += `<tr>`
        strHTML += `<td>${user.name}</td>`
        strHTML += `<td>${user.password}</td>`
        strHTML += `<td>${!user.lastLoginTime ? 'None' : formatLoginTime}</td>`
        strHTML += `<td>${user.isAdmin}</td>`
        strHTML += `</tr>`
    })
    elUserTable.innerHTML = strHTML;
}


function renderUsersCards() {
    var users = loadFromStorage('usersDB');
    console.log('Users:', users)
    var elCardsContainer = document.querySelector('.cards-container');
    var strHTML = '';
    users.forEach(function (user) {
        var formatLoginTime = new Date(user.lastLoginTime).toLocaleString();
        strHTML += `<div class="card">`
        strHTML += `<img src="${user.avatar}" class="avatar-img"/>`
        strHTML += `<h3>${user.name}</h3>`;
        strHTML += `<p>${!user.lastLoginTime ? 'None' : formatLoginTime}</p>`;
        strHTML += `</div>`;
    })

    elCardsContainer.innerHTML = strHTML;

}


function onToggleMode() {
    var elCardsContainer = document.querySelector('.cards-container');
    var elTableContainer = document.querySelector('.table-container');
    var elModeBtn = document.querySelector('.mode-btn');

    gIsToggled = !gIsToggled;
    if (gIsToggled) {
        elTableContainer.classList.toggle('hide');
        elCardsContainer.classList.toggle('show')
        elModeBtn.innerText = 'Show Table'
    } else {
        elTableContainer.classList.toggle('hide')
        elCardsContainer.classList.toggle('show')
        elModeBtn.innerText = 'Show Cards'
    }
}



function onSetSort(sortBy) {
    console.log('sorting by:', sortBy)
    setSort(sortBy)
    renderUsersTable()
}