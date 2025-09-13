document.addEventListener('DOMContentLoaded', () => {
  // Reset page to top on refresh
  window.scrollTo(0, 0);
  window.addEventListener('beforeunload', () => window.scrollTo(0, 0));

  // Smooth scroll for nav links & buttons
  const smoothScrollElems = document.querySelectorAll('.nav-links a, .btn');
  smoothScrollElems.forEach(el => {
    el.addEventListener('click', e => {
      const href = el.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Navbar shrink
  const navbar = document.querySelector('.topbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 50) navbar.classList.add('shrink');
      else navbar.classList.remove('shrink');
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
  }

  // About typing effect (prevents word breaks)
  (function aboutTyping() {
    const aboutEl = document.getElementById('about-paragraph');
    if (!aboutEl) return;

    const textContent = aboutEl.textContent.trim();
    aboutEl.innerHTML = '';

    let idx = 0;
    const speed = 15;

    function typeChar() {
      if (idx >= textContent.length) return;
      const char = textContent[idx];
      const span = document.createElement('span');
      span.innerHTML = char === ' ' ? '&nbsp;' : char;
      span.classList.add('visible');
      aboutEl.appendChild(span);
      idx++;
      setTimeout(typeChar, speed);
    }

    setTimeout(typeChar, 200);
  })();

  // Hero flicker
  (function flickerHero() {
    const el = document.getElementById('flicker-text');
    if (!el) return;
    const raw = el.textContent || '';
    el.textContent = '';
    const letters = [];
    for (let ch of raw) {
      const span = document.createElement('span');
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      el.appendChild(span);
      letters.push(span);
    }
    if (!letters.length) return;
    setInterval(() => {
      const idx = Math.floor(Math.random() * letters.length);
      const s = letters[idx];
      s.classList.add('active');
      setTimeout(() => s.classList.remove('active'), 500);
    }, 180);
  })();

  // Reveal on scroll
  (function revealOnScroll() {
    const hiddenElems = document.querySelectorAll('.hidden-left, .hidden-right, .hidden-bottom');
    if (!hiddenElems.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target;
        if (el.id === 'home' || el.closest('#home')) {
          el.classList.remove('hidden-left', 'hidden-right', 'hidden-bottom');
          el.classList.add('show');
          return;
        }
        if (entry.isIntersecting) el.classList.add('show');
        else el.classList.remove('show');
      });
    }, { threshold: 0.18 });
    hiddenElems.forEach(el => obs.observe(el));
  })();

  // Services glow
  (function servicesGlow() {
    const boxes = document.querySelectorAll('.services span');
    if (!boxes.length) return;
    setInterval(() => {
      const i = Math.floor(Math.random() * boxes.length);
      boxes[i].classList.add('glow');
      setTimeout(() => boxes[i].classList.remove('glow'), 700);
    }, 500);
  })();

  // Popup countdown
  (function popupCountdown() {
    const popup = document.getElementById('project-popup');
    if (!popup) return;
    const countdownEl = document.getElementById('popup-countdown');
    let counter = 3;
    if (countdownEl) countdownEl.textContent = `Closing in ${counter}s...`;
    const timer = setInterval(() => {
      counter--;
      if (countdownEl) countdownEl.textContent = `Closing in ${counter}s...`;
      if (counter <= 0) {
        clearInterval(timer);
        popup.classList.add('fade-out');
        setTimeout(() => {
          popup.style.display = 'none';
          const home = document.getElementById('home');
          if (home) home.scrollIntoView({ behavior: 'smooth' });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 900);
      }
    }, 1000);
  })();
});
