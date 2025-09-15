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
          setTimeout(type, 1200); // pause after typing
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
      setTimeout(type, isDeleting ? 70 : 120);
    }
    type();
  }
});
