


var gProjects = [
    { id: 'minesweeper', name: 'Mine Sweeper', title: 'Sprint 1 Project', desc: 'This project was the first Sprint in Coding Academy bootcamp, This Mine Sweeper contains alot of cool features such as Hints,Save button and Undo!', publishedAt: new Date(2020, 9, 3, 3, 24, 0).toLocaleString(), labels: ['HTML', 'CSS', 'JS'] },
    { id: 'book-shop', name: 'Book Shop', title: 'CRUDL Project ', desc: 'This project was a coding challenge to create a book shop with CRUDL', publishedAt: new Date(2020, 9, 10, 3, 24, 0).toLocaleString(), labels: ['HTML', 'CSS', 'JS'] },
    { id: 'minesweeper', name: 'Mine Sweeper', title: 'Sprint 1 Project', desc: 'This project was the first Sprint in Coding Academy bootcamp, This Mine Sweeper contains alot of cool features such as Hints,Save button and Undo!', publishedAt: new Date(2020, 9, 3, 3, 24, 0), labels: ['HTML', 'CSS', 'JS'] },
    { id: 'minesweeper', name: 'Mine Sweeper', title: 'Sprint 1 Project', desc: 'This project was the first Sprint in Coding Academy bootcamp, This Mine Sweeper contains alot of cool features such as Hints,Save button and Undo!', publishedAt: new Date(2020, 9, 3, 3, 24, 0), labels: ['HTML', 'CSS', 'JS'] },
    { id: 'minesweeper', name: 'Mine Sweeper', title: 'Sprint 1 Project', desc: 'This project was the first Sprint in Coding Academy bootcamp, This Mine Sweeper contains alot of cool features such as Hints,Save button and Undo!', publishedAt: new Date(2020, 9, 3, 3, 24, 0), labels: ['HTML', 'CSS', 'JS'] },


]

function getProjects() {
    return gProjects;
}



function getProjectById(projectId) {
    var projects = gProjects.find(project => project.id === projectId);
    if (!projects) return;
    return projects;
}

