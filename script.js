// script.js
document.addEventListener('DOMContentLoaded', () => {
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const isTouch = window.matchMedia("(pointer: coarse)").matches || 'ontouchstart' in window;

  // ======================
  // Background Music (Autoplay + Fade In + Loop)
  // ======================
  const bgMusic = document.getElementById("bgMusic");
  function playMusicFadeIn() {
    if (!bgMusic) return;
    bgMusic.loop = true;
    bgMusic.currentTime = 0;
    bgMusic.volume = 0;
    bgMusic.play().catch(() => {});
    let volume = 0;
    const fadeInInterval = setInterval(() => {
      volume += 0.02;
      if (volume >= 0.6) { // limit to 60% volume
        volume = 0.6;
        clearInterval(fadeInInterval);
      }
      bgMusic.volume = volume;
    }, 120);
  }
  if (bgMusic) {
    bgMusic.addEventListener("ended", playMusicFadeIn);
    playMusicFadeIn();
  }

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
  // Navbar smooth shrink with high FPS
  // ======================
  const navbar = document.querySelector('.topbar');
  if (navbar) {
    let currentPadding = 16;
    let targetPadding = 16;
    let animating = false;

    const updatePadding = () => {
      currentPadding += (targetPadding - currentPadding) * 0.2;
      navbar.style.paddingTop = navbar.style.paddingBottom = `${currentPadding}px`;
      if (Math.abs(targetPadding - currentPadding) > 0.1) {
        animating = true;
        requestAnimationFrame(updatePadding);
      } else {
        animating = false;
        currentPadding = targetPadding;
      }
    };

    const onScroll = () => {
      targetPadding = window.scrollY > 50 ? 10 : 16;
      if (!animating) updatePadding();
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
  // Typewriter + Galaxy Gradient Flow
  // ======================
  const typewriter = document.getElementById('typewriter');
  if (typewriter) {
    const texts = ["Information Technology", "Web Designer", "Logo Maker", "Fresh Graduate"];
    let index = 0, charIndex = 0, isDeleting = false;

    // Apply galaxy gradient style
    typewriter.style.backgroundImage = "linear-gradient(90deg, #8e2de2, #4a00e0, #1e3c72, #2a5298)";
    typewriter.style.backgroundSize = "400% 400%";
    typewriter.style.webkitBackgroundClip = "text";
    typewriter.style.backgroundClip = "text";
    typewriter.style.color = "transparent";
    typewriter.style.animation = "galaxyFlow 8s ease infinite";

    // Inject keyframes for gradient animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes galaxyFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);

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
  // Mobile Nav Toggle + Auto-hide
  // ======================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    const closeNav = () => navLinks.classList.remove('active');

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) closeNav();
    });

    window.addEventListener('scroll', () => {
      closeNav();
    }, { passive: true });
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

});
