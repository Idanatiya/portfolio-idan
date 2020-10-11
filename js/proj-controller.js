console.log('Starting up');


function onInit() {
    renderProjects();
}



function renderProjects() {
    var projects = getProjects();
    var elProjContainer = document.querySelector('.projects-container');

    var strHtmls = projects.map(project => {
        return `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/${project.id}.png" alt="project-intro">
        </a>
        <div class="portfolio-caption">
          <h4>${project.name}</h4>
          <p class="text-muted">${project.desc}</p>
        </div>
      </div>`
    }).join('');
    elProjContainer.innerHTML = strHtmls;
}

