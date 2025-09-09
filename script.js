// Smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Smooth scroll for WORK WITH ME button
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Navbar shrink effect on scroll
const navbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('shrink');
  } else {
    navbar.classList.remove('shrink');
  }
});

// RANDOM POPUP LIGHT EFFECT
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('flicker-text');
  if (!el) return;

  const raw = el.textContent;
  el.textContent = '';

  const letters = [];
  for (let i = 0; i < raw.length; i++) {
    const span = document.createElement('span');
    span.textContent = raw[i] === ' ' ? '\u00A0' : raw[i];
    el.appendChild(span);
    letters.push(span);
  }

  setInterval(() => {
    const idx = Math.floor(Math.random() * letters.length);
    letters[idx].classList.add('active');
    setTimeout(() => {
      letters[idx].classList.remove('active');
    }, 600);
  }, 200);
});

// FADE-IN + FADE-OUT ON SCROLL (EXCEPT NAVBAR)
const hiddenElements = document.querySelectorAll(
  '.hidden-left, .hidden-right, .hidden-bottom'
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show'); // fade out again
    }
  });
}, { threshold: 0.2 });

hiddenElements.forEach(el => observer.observe(el));
