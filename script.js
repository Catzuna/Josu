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

  // Reveal on scroll (except Projects & Contact)
  (function revealOnScroll() {
    const hiddenElems = document.querySelectorAll(
      '.hidden-left, .hidden-right, .hidden-bottom'
    );
    if (!hiddenElems.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target;

        // Skip reveal for Projects and Contact sections
        if (el.closest('#projects') || el.closest('#contact')) {
          el.classList.remove('hidden-left', 'hidden-right', 'hidden-bottom');
          return;
        }

        if (el.id === 'home' || el.closest('#home')) {
          el.classList.remove('hidden-left', 'hidden-right', 'hidden-bottom');
          el.classList.add('show');
          return;
        }
        if (entry.isIntersecting) el.classList.add('show');
        else el.classList.remove('show');
      });
    }, { threshold: 0.3 });
    hiddenElems.forEach(el => obs.observe(el));
  })();

  // ======================
  // Typewriter Effect
  // ======================
  const typewriter = document.getElementById('typewriter');
  if (typewriter) {
    const texts = ["Information Technology", "Web Designer", "Logo Maker", "Fresh Graduate"];
    let index = 0, charIndex = 0, isDeleting = false;

    function type() {
      const current = texts[index];
      if (!isDeleting) {
        typewriter.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(type, 600);
          return;
        }
      } else {
        typewriter.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          index = (index + 1) % texts.length;
        }
      }
      setTimeout(type, isDeleting ? 40 : 80);
    }
    type();
  }

  // ======================
  // Floating Particles (ALL SECTIONS)
  // ======================
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.top = Math.random() * 100 + '%';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = Math.random() * 6 + 4 + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
      section.appendChild(particle);
    }
  });

  // ======================
  // Shooting Stars Effect (More & Faster 🌠)
  // ======================
  function createShootingStar() {
    const star = document.createElement('div');
    star.classList.add('shooting-star');
    document.body.appendChild(star);

    // Random start position (top area)
    star.style.top = Math.random() * 200 + 'px';
    star.style.left = Math.random() * window.innerWidth + 'px';

    // Remove after animation
    setTimeout(() => star.remove(), 1000);
  }

  // Appear more often (every 0.8s with 80% chance)
  setInterval(() => {
    if (Math.random() > 0.2) createShootingStar();
  }, 800);
});
