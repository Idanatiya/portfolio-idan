


function onLogin() {
    var elNameInput = document.querySelector('.name');
    var elPassInput = document.querySelector('.password');
    var elLogoutBtn = document.querySelector('.logout');


    var name = elNameInput.value.toLowerCase();
    var password = elPassInput.value.toLowerCase();
    if (!name || !password) {
        alert('Enter all credentials');
        return;
    }
    console.log('here')
    var userLogged = doLogin(name, password);
    console.log('user logged:', userLogged);
    elLogoutBtn.classList.toggle('show');
    showSecretArea(userLogged);
    console.log(userLogged);

    elNameInput.value = '';
    elPassInput.value = '';
}


function onLogout() {
    var elFormContainer = document.querySelector('.form-container');
    var elSecretArea = document.querySelector('.secret-area');
    logout();
    elFormContainer.style.display = 'block';
    elSecretArea.classList.toggle('show');

}

function showSecretArea(userLogged) {
    var elAdminLink = document.querySelector('.admin-panel');
    var elLastLogin = document.querySelector('.last-login');
    var elFormContainer = document.querySelector('.form-container');
    var elLoggedUser = document.querySelector('.logged-user');
    var elSecretArea = document.querySelector('.secret-area');
    if (userLogged.isAdmin) elAdminLink.classList.add('show');
    else elAdminLink.classList.remove('show');

    elLoggedUser.innerText = userLogged.name + '!';
    elLastLogin.innerText = new Date(userLogged.lastLoginTime).toLocaleString();
    elSecretArea.classList.toggle('show');
    // elFormContainer.classList.toggle('show');    
    toggleElement(elFormContainer, 'show')
    // elFormContainer.style.display = 'none';
}















