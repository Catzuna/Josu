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

// Navbar shrink effect
const navbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('shrink');
  } else {
    navbar.classList.remove('shrink');
  }
});

// About Me typing effect (fixed for plain text)
const aboutParagraph = document.getElementById('about-paragraph');
if (aboutParagraph) {
  const text = aboutParagraph.textContent; // ✅ plain text lang
  aboutParagraph.textContent = '';
  let i = 0;
  function typeChar() {
    if (i < text.length) {
      const char = text[i];
      const span = document.createElement('span');
      span.textContent = char;
      aboutParagraph.appendChild(span);
      setTimeout(() => span.classList.add('visible'), 10);
      i++;
      setTimeout(typeChar, 30);
    }
  }
  typeChar();
}

// RANDOM POPUP LIGHT EFFECT on hero text
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

// FADE-IN + FADE-OUT ON SCROLL
const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right, .hidden-bottom');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, { threshold: 0.2 });
hiddenElements.forEach(el => observer.observe(el));

// GLOW EFFECT for SERVICES
const serviceBoxes = document.querySelectorAll('.services span');
setInterval(() => {
  const idx = Math.floor(Math.random() * serviceBoxes.length);
  serviceBoxes[idx].classList.add('glow');
  setTimeout(() => {
    serviceBoxes[idx].classList.remove('glow');
  }, 800);
}, 500);

// POPUP countdown with smooth fade-out
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('project-popup');
  const countdownEl = document.getElementById('popup-countdown');
  if (!popup) return;

  let counter = 3;
  countdownEl.textContent = `Closing in ${counter}s...`;

  const interval = setInterval(() => {
    counter--;
    countdownEl.textContent = `Closing in ${counter}s...`;
    if (counter <= 0) {
      clearInterval(interval);
      popup.classList.add('fade-out');
      setTimeout(() => {
        popup.style.display = 'none';
        window.location.hash = '#home';
      }, 1000);
    }
  }, 1000);
});
