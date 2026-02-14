/*
==================================================
PORTFOLIO JAVASCRIPT
Author: Jeet Makhija
Description: Interactive features and animations
==================================================
*/

// ==================== SCROLL PROGRESS INDICATOR ====================

const scrollProgressBar = document.querySelector('.scroll-progress-bar');

function updateScrollProgress() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrolled = window.scrollY;
  const progress = (scrolled / documentHeight) * 100;
  scrollProgressBar.style.width = progress + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ==================== BACK TO TOP BUTTON ====================

const backToTopBtn = document.querySelector('.back-to-top');

function toggleBackToTop() {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

window.addEventListener('scroll', toggleBackToTop);

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ==================== PARALLAX EFFECTS ====================

let ticking = false;

function parallaxEffect() {
  const scrolled = window.scrollY;
  
  // Hero background parallax
  const heroGrid = document.querySelector('.hero-grid');
  if (heroGrid) {
    heroGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
  
  // Section numbers parallax
  const sectionNumbers = document.querySelectorAll('.section-number');
  sectionNumbers.forEach((num) => {
    const rect = num.getBoundingClientRect();
    const offset = (window.innerHeight - rect.top) * 0.1;
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      num.style.transform = `translateY(${offset}px)`;
    }
  });
  
  ticking = false;
}

function requestParallax() {
  if (!ticking) {
    window.requestAnimationFrame(parallaxEffect);
    ticking = true;
  }
}

window.addEventListener('scroll', requestParallax);

// ==================== SCROLL REVEAL ANIMATIONS ====================

const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      // Animate learning progress bars
      if (entry.target.classList.contains('learning-card')) {
        const progressFill = entry.target.querySelector('.learning-progress-fill');
        if (progressFill) {
          const width = progressFill.style.width;
          progressFill.style.width = '0%';
          setTimeout(() => {
            progressFill.style.width = width;
          }, 100);
        }
      }
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

reveals.forEach(reveal => {
  revealObserver.observe(reveal);
});

// ==================== SMOOTH SCROLL ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==================== FLOATING PARTICLES ====================

function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 28;
  const colors = ['rgba(88,166,255,0.5)', 'rgba(147,197,253,0.4)', 'rgba(240,246,255,0.3)', 'rgba(31,111,235,0.5)'];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');

    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 20;
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Occasionally make a small plus/cross instead of a dot
    if (Math.random() > 0.7) {
      p.style.cssText = `
        left: ${x}%;
        width: ${size + 1}px;
        height: ${size + 1}px;
        background: transparent;
        border-radius: 0;
        box-shadow: 0 ${size}px 0 ${color}, 0 -${size}px 0 ${color}, ${size}px 0 0 ${color}, -${size}px 0 0 ${color};
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
      `;
    } else {
      p.style.cssText = `
        left: ${x}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        box-shadow: 0 0 ${size * 3}px ${color};
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
      `;
    }

    container.appendChild(p);
  }
}

createParticles();
