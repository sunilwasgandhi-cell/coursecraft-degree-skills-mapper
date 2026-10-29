const filterButtons = [...document.querySelectorAll('.filter-chip')];
const projectCards = [...document.querySelectorAll('.project-card')];
const nav = document.querySelector('.main-nav');
const menuToggle = document.querySelector('.menu-toggle');

function filterProjects(program) {
  filterButtons.forEach(button => {
    const active = button.dataset.filter === program;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  projectCards.forEach(card => {
    const visible = program === 'all' || card.dataset.program === program;
    card.classList.toggle('is-hidden', !visible);
  });
}

filterButtons.forEach(button => button.addEventListener('click', () => filterProjects(button.dataset.filter)));
document.querySelectorAll('[data-filter-link]').forEach(link => link.addEventListener('click', () => {
  filterProjects(link.dataset.filterLink);
}));

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
