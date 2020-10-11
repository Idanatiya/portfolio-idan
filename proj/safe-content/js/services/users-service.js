var gUsers;
var gSortBy = 'NAME';
var CURR_USER_KEY = 'loggedUser';
var STORAGE_DB = 'usersDB';



function init() {
    gUsers = loadFromStorage('usersDB');
    if (!gUsers || !gUsers.length) {
        gUsers = _createUsers();
    }
    saveToStorage('usersDB', gUsers);
    var user = loadFromStorage(CURR_USER_KEY);
    if (!user) return;
    showSecretArea(user);
}



function doLogin(name, pass) {
    console.log(name, pass)
    var user = gUsers.find(function (user) {
        console.log(user.name === name && user.password === pass)
        return user.name === name && user.password === pass;
    })
    if (!user) {
        alert('User not found');
        return;
    }
    //set last login-time
    user.lastLoginTime = Date.now();
    saveToStorage(CURR_USER_KEY, user);
    //update local storage
    _saveUsers();
    return user;
}


function logout() {
    console.log('initaed!');
    localStorage.removeItem(CURR_USER_KEY);
}





function _createUsers() {
    var users = [];
    users.push(_createUser('matan', '12345', false, 'imgs/avatar2.png'));
    users.push(_createUser('idan', '123456', true, 'imgs/avatar1.png'));
    users.push(_createUser('napthlie', '12345', false, 'imgs/avatar3.png'));
    return users;
}




function _createUser(name, password, isAdmin, avatarImg) {
    var user = {
        id: makeId(),
        name,
        password,
        lastLoginTime: null,
        isAdmin,
        avatar: avatarImg
    }
    return user;
}

function getUsers() {
    return gUsers;
}

function getCurrUserKey() {
    return CURR_USER_KEY;
}



function sortUserByName(users) {
    return users.sort(function (user1, user2) {
        if (user1.txt.toLowerCase() < user2.txt.toLowerCase()) return -1;
        if (user1.txt.toLowerCase() > user2.txt.toLowerCase()) return 1;
        return 0;
    })
}

function _saveUsers() {
    saveToStorage(STORAGE_DB, gUsers)
}