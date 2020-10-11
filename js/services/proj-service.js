var gProjects;




function createProject(id, name, title, desc, url,) {
    var project = {
        id,
        name,
        title,
        desc,
        url,
        publishedAt: Date.now(),
        lables: []

    }
    return project;
}


