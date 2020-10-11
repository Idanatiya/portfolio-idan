


var gProjects = [
    { id: 'minesweeper', name: 'Mine Sweeper', title: 'Sprint 1 Project', desc: 'This project was the first Sprint in Coding Academy bootcamp, This Mine Sweeper contains alot of cool features such as Hints,Save button and Undo!', publishedAt: Date.now(), labels: ['HTML', 'CSS', 'JS'] },
    { id: 'book-shop', name: 'Book Shop', title: 'CRUDL Project ', desc: 'This project was a coding challenge to create a book shop with CRUDL', publishedAt: new Date(2020, 9, 10, 3, 24, 0).toLocaleString(), labels: ['HTML', 'CSS', 'JS'] },
    { id: 'in-picture', name: 'What is in the picture', title: 'cool project', desc: 'This project was the first time i rendered dynmically in js', publishedAt: Date.now(), labels: ['HTML', 'CSS', 'JS'] },
    { id: 'pacman', name: 'Sonic Pacman', title: 'Pacman project', desc: 'This project was a good project to learn how to manage file ', publishedAt: Date.now(), labels: ['HTML', 'CSS', 'JS'] },
    { id: 'safe-content', name: 'Safe Content', title: 'MVC Login + Admin Page', desc: 'This project was a good project to practice MVC', publishedAt: Date.now(), labels: ['HTML', 'CSS', 'JS'] },
    { id: 'ball-board', name: 'Ball Board', title: 'Collect Dragon Balls', desc: 'This prokect was a good project to practice Matrix and rendering', publishedAt: Date.now(), labels: ['HTML', 'CSS', 'JS'] },


]

function getProjects() {
    return gProjects;
}




function getProjectById(projectId) {
    var projects = gProjects.find(project => project.id === projectId);
    if (!projects) return;
    return projects;
}

