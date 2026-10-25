const root = document.documentElement;
const themeButton = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const storedTheme = localStorage.getItem('portfolio-theme');

if (storedTheme === 'light') {
  root.dataset.theme = 'light';
  themeIcon.textContent = '☾';
  themeButton.setAttribute('aria-label', 'Switch to dark theme');
}

themeButton.addEventListener('click', () => {
  const light = root.dataset.theme !== 'light';
  if (light) {
    root.dataset.theme = 'light';
    localStorage.setItem('portfolio-theme', 'light');
    themeIcon.textContent = '☾';
    themeButton.setAttribute('aria-label', 'Switch to dark theme');
  } else {
    delete root.dataset.theme;
    localStorage.setItem('portfolio-theme', 'dark');
    themeIcon.textContent = '☼';
    themeButton.setAttribute('aria-label', 'Switch to light theme');
  }
});

const menuButton = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
});

nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  })
);

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  entries =>
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...nav.querySelectorAll('a')];

window.addEventListener(
  'scroll',
  () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 150) current = s.id;
    });
    links.forEach(a =>
      a.classList.toggle('active', a.getAttribute('href') === '#' + current)
    );
  },
  { passive: true }
);