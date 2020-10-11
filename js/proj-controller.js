console.log('Starting up');


function onInit() {
  renderProjects();
}



function onOpenProject(projectId) {
  console.log('proj id:', projectId)
  var elModal = document.querySelector('.modal-container');
  var project = getProjectById(projectId);
  elModal.querySelector('.proj-name').innerText = project.name;
  elModal.querySelector('.proj-img').src = `img/portfolio/${project.id}.png`;
  elModal.querySelector('.proj-intro').innerText = project.desc;
  elModal.querySelector('.proj-date').innerText = `${new Date(project.publishedAt).toLocaleDateString('he-IL')}`
  elModal.querySelector('.check-proj-btn').href = `proj/${projectId}/index.html`
}

function onSendEmail(ev) {
  ev.preventDefault();
  // var email = document.querySelector('form input[name=projEmail]').value;
  var subject = document.querySelector('form input[name=projSubject]').value;
  var message = document.querySelector('.message').value;
  var myMail = 'idanatiya122@gmail.com';
  // https://mail.google.com/mail/u/0/?view=cm&fs=1&to=me@example.com&su=SUBJECT&body=BODY&bcc=someone.else@example.com&tf=1
  window.open(`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${myMail}&su=${subject}&body=${message}`);
}



function getBadgeColor() {
  var colors = ['primary', 'secondary', 'danger', 'warning', 'success', 'info', 'dark', 'light'];
  var randIdx = Math.floor(Math.random() * colors.length);
  return colors[randIdx];
}

function renderProjects() {
  var projects = getProjects();
  var elProjContainer = document.querySelector('.projects-container');
  var strHtmls = projects.map(project => {
    var badgesHTML = project.labels.map(label => {
      return `
        <span class="badge badge-${getBadgeColor()}">${label}</span>
        `
    }).join('');
    return `
        <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
          <div class="portfolio-hover" onclick="onOpenProject('${project.id}')">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="img/portfolio/${project.id}.png" alt="project-intro">
        </a>
        <div class="portfolio-caption">
          <h4>${project.name}</h4>
          <p class="text-muted">${project.title}</p>
          ${badgesHTML}
        </div>
      </div>`
  }).join('');
  elProjContainer.innerHTML = strHtmls;
}

