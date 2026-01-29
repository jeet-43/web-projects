/*
==================================================
PORTFOLIO JAVASCRIPT
Author: Jeet Makhija
Description: Interactive features and animations
==================================================
*/

// ==================== LOADING ANIMATION ====================

let loadProgress = 0;
const loaderBar = document.querySelector('.loader-bar-fill');
const loaderPercentage = document.querySelector('.loader-percentage');

const loadInterval = setInterval(() => {
  loadProgress += Math.random() * 15;
  if (loadProgress >= 100) {
    loadProgress = 100;
    clearInterval(loadInterval);
  }
  loaderBar.style.width = loadProgress + '%';
  loaderPercentage.textContent = Math.floor(loadProgress) + '%';
}, 100);

// Hide loader when page is fully loaded
window.addEventListener('load', () => {
  loadProgress = 100;
  loaderBar.style.width = '100%';
  loaderPercentage.textContent = '100%';
  
  setTimeout(() => {
    document.querySelector('.loader').classList.add('hidden');
  }, 500);
});

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

// ==================== THEME TOGGLE ====================

const themeToggle = document.querySelector('.theme-toggle');

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
  document.body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  
  const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
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

// ==================== CUSTOM CURSOR ====================

const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.cursor-follower');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;
  
  cursorX += dx * 0.3;
  cursorY += dy * 0.3;
  
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  
  const fdx = mouseX - followerX;
  const fdy = mouseY - followerY;
  
  followerX += fdx * 0.1;
  followerY += fdy * 0.1;
  
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

// ==================== CURSOR HOVER EFFECTS ====================

const links = document.querySelectorAll('a, button, .skill-item, .project-card, .contact-item');

links.forEach(link => {
  link.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)';
    follower.style.transform = 'scale(1.3)';
  });
  link.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    follower.style.transform = 'scale(1)';
  });
});

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

// ==================== CONSOLE MESSAGE ====================

console.log('%c> Hey there! 👋', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%cLooks like you\'re curious about the code. I like that.', 'color: #888; font-size: 14px;');
console.log('%cLet\'s connect: jeetmakhija2@gmail.com', 'color: #00ff88; font-size: 14px;');
