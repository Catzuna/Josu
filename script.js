// script.js
document.addEventListener('DOMContentLoaded', () => {
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const isTouch = window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window;

  // ======================
  // Background Music
  // ======================
  const bgMusic = document.getElementById("bgMusic");
  function playMusicFadeIn() {
    if (!bgMusic) return;
    bgMusic.currentTime = 0;
    bgMusic.volume = 0;
    bgMusic.play().catch(() => {});
    let volume = 0;
    const fadeInInterval = setInterval(() => {
      volume += 0.02;
      if (volume >= 1) {
        volume = 1;
        clearInterval(fadeInInterval);
      }
      bgMusic.volume = volume;
    }, 100);
  }
  if (bgMusic) bgMusic.addEventListener("ended", playMusicFadeIn);
  playMusicFadeIn();
  document.addEventListener("click", playMusicFadeIn, { once: true });
  document.addEventListener("keydown", playMusicFadeIn, { once: true });

  // ======================
  // Reset page to top
  // ======================
  window.scrollTo(0, 0);
  window.addEventListener('beforeunload', () => window.scrollTo(0, 0));

  // ======================
  // Smooth scroll
  // ======================
  document.querySelectorAll('.nav-links a, .btn').forEach(el => {
    el.addEventListener('click', e => {
      const href = el.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ======================
  // Navbar shrink
  // ======================
  const navbar = document.querySelector('.topbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 50) navbar.classList.add('shrink');
      else navbar.classList.remove('shrink');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ======================
  // Reveal on scroll
  // ======================
  (function revealOnScroll() {
    const hiddenElems = document.querySelectorAll('.hidden-left, .hidden-right, .hidden-bottom');
    if (!hiddenElems.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) el.classList.add('show');
        else el.classList.remove('show');
      });
    }, { threshold: 0.3 });
    hiddenElems.forEach(el => obs.observe(el));
  })();

  // ======================
  // Typewriter
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
  // Floating Particles
  // ======================
  document.querySelectorAll('section').forEach(section => {
    for (let i = 0; i < 15; i++) {
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
  // Shooting Stars
  // ======================
  function createShootingStar() {
    const star = document.createElement('div');
    star.classList.add('shooting-star');
    document.body.appendChild(star);
    star.style.top = Math.random() * 200 + 'px';
    star.style.left = Math.random() * window.innerWidth + 'px';
    setTimeout(() => star.remove(), 1000);
  }
  setInterval(() => { if (Math.random() > 0.2) createShootingStar(); }, 800);

  // ======================
  // Mobile Nav Toggle
  // ======================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // ======================
  // 3D Tilt Video
  // ======================
  const video = document.getElementById('about-video');
  if (video) {
    video.style.transition = "transform 0.18s ease-out";
    if (!isTouch) {
      video.addEventListener('mousemove', (e) => {
        const rect = video.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        const ry = clamp(x * 20, -25, 25);
        const rx = clamp(-y * 20, -25, 25);
        video.style.transform = `rotateY(${ry}deg) rotateX(${rx}deg) scale(1.03)`;
      });
      video.addEventListener('mouseleave', () => {
        video.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
      });
    } else {
      const handleTiltByScroll = () => {
        const rect = video.getBoundingClientRect();
        const offsetY = (rect.top + rect.height / 2 - window.innerHeight / 2) / (window.innerHeight / 2);
        const rx = clamp(offsetY * 20, -20, 20);
        const offsetX = (rect.left + rect.width / 2 - window.innerWidth / 2) / (window.innerWidth / 2);
        const ry = clamp(offsetX * 12, -12, 12);
        video.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      };
      window.addEventListener('scroll', handleTiltByScroll, { passive: true });
      document.addEventListener('touchmove', handleTiltByScroll, { passive: true });
      handleTiltByScroll();
    }
  }

  // ======================
  // Cursor / Touch Indicator
  // ======================
  if (!isTouch) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', (e) => {
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    });
    const interactiveElems = document.querySelectorAll('a, button, .btn, .logo');
    interactiveElems.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
  } else {
    let touchIndicator = document.getElementById('touch-indicator');
    if (!touchIndicator) {
      touchIndicator = document.createElement('div');
      touchIndicator.id = 'touch-indicator';
      Object.assign(touchIndicator.style, {
        position: 'fixed',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.03)',
        border: '2px solid rgba(168,85,247,0.95)',
        boxShadow: '0 0 12px rgba(168,85,247,0.8)',
        pointerEvents: 'none',
        transform: 'translate(-50%,-50%) scale(1)',
        transition: 'opacity 220ms linear, transform 120ms ease',
        zIndex: '9999',
        opacity: '0'
      });
      document.body.appendChild(touchIndicator);
    }

    let hideTimeout;
    const showAt = (x, y) => {
      touchIndicator.style.left = `${x}px`;
      touchIndicator.style.top = `${y}px`;
      touchIndicator.style.opacity = '1';
      clearTimeout(hideTimeout);
      hideTimeout = setTimeout(() => {
        touchIndicator.style.opacity = '0';
      }, 3000);
    };

    const updateByEvent = (e) => {
      let x, y;
      if (e.touches && e.touches[0]) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.clientX || window.innerWidth / 2;
        y = e.clientY || window.innerHeight / 2;
      }
      showAt(x, y);
    };

    document.addEventListener('touchstart', updateByEvent, { passive: true });
    document.addEventListener('touchmove', updateByEvent, { passive: true });
    document.addEventListener('click', updateByEvent);
    window.addEventListener('scroll', () => {
      showAt(window.innerWidth / 2, window.innerHeight / 2);
    }, { passive: true });
  }
});
