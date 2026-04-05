/*
==================================================
ENHANCED PORTFOLIO JAVASCRIPT
Author: Jeet Makhija
Description: Interactive features and animations
==================================================
*/

// ==================== UTILITY FUNCTIONS ====================

// Debounce function for performance
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit = 16) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ==================== SCROLL PROGRESS INDICATOR ====================

let scrollProgressBar;

function updateScrollProgress() {
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - windowHeight;
  const scrolled = window.scrollY;
  const progress = (scrolled / documentHeight) * 100;
  if (scrollProgressBar) scrollProgressBar.style.width = `${Math.min(progress, 100)}%`;
}

window.addEventListener('scroll', throttle(updateScrollProgress, 10));

// ==================== MOBILE MENU ====================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// Back-to-top now handled by progress ring (see above)

// ==================== PARALLAX EFFECTS ====================

const parallaxConfig = [
  { selector: '.hero-grid', speed: 0.035, max: 30 },
  { selector: '.hero-orb-1', speed: 0.06, max: 36 },
  { selector: '.hero-orb-2', speed: 0.08, max: 42 },
  { selector: '.section-header', speed: 0.03, max: 22 },
  { selector: '.section-divider', speed: 0.02, max: 16 },
  { selector: '.marquee-section', speed: 0.02, max: 14 }
];
const parallaxTargets = parallaxConfig.flatMap((cfg) => {
  return Array.from(document.querySelectorAll(cfg.selector)).map((el) => ({
    el,
    speed: cfg.speed,
    max: cfg.max
  }));
});
let parallaxQueued = false;

function parallaxEffect() {
  if (!parallaxTargets.length) return;

  const viewportCenter = window.innerHeight * 0.5;
  parallaxTargets.forEach((item) => {
    const rect = item.el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const elementCenter = rect.top + rect.height * 0.5;
      const distanceFromCenter = elementCenter - viewportCenter;
      const unclamped = -distanceFromCenter * item.speed;
      const offset = Math.max(-item.max, Math.min(item.max, unclamped));
      item.el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    }
  });
}

function queueParallax() {
  if (parallaxQueued) return;
  parallaxQueued = true;
  requestAnimationFrame(() => {
    parallaxEffect();
    parallaxQueued = false;
  });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  window.addEventListener('scroll', queueParallax, { passive: true });
}

// ==================== SCROLL REVEAL ANIMATIONS ====================

const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      // Unobserve after revealing to improve performance
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -30px 0px'
});

reveals.forEach(reveal => {
  revealObserver.observe(reveal);
});



// ==================== SMOOTH SCROLL ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#hero') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = target.offsetTop - navHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== FLOATING PARTICLES ====================

function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 28;
  const colors = [
    'rgba(88,166,255,0.5)', 
    'rgba(147,197,253,0.4)', 
    'rgba(240,246,255,0.3)', 
    'rgba(31,111,235,0.5)'
  ];

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

function initHeroParticles3D() {
  const hero = document.querySelector('.hero');
  const canvas = document.getElementById('hero-particles-3d');
  if (!hero || !canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (prefersReducedMotion || !finePointer) {
    canvas.style.display = 'none';
    return;
  }

  let width = 0;
  let height = 0;
  let centerX = 0;
  let centerY = 0;
  let particles = [];
  let rafId = 0;
  let pointerX = 0;
  let pointerY = 0;
  let targetPointerX = 0;
  let targetPointerY = 0;
  let pointerCanvasX = 0;
  let pointerCanvasY = 0;
  let targetPointerCanvasX = 0;
  let targetPointerCanvasY = 0;
  let pointerActive = false;
  let visibleParticles = [];

  function createParticle() {
    const z = Math.random() * 980 + 150;
    return {
      x: (Math.random() - 0.5) * width * 1.2,
      y: (Math.random() - 0.5) * height * 1.2,
      z,
      radius: Math.random() * 1.35 + 0.3,
      speed: Math.random() * 0.95 + 0.38,
      twinkle: Math.random() * Math.PI * 2,
      hueShift: Math.random() * 0.22 + 0.84,
      driftX: (Math.random() - 0.5) * 0.42,
      driftY: (Math.random() - 0.5) * 0.42
    };
  }

  function setupParticles() {
    const count = Math.min(260, Math.max(96, Math.floor(width / 8)));
    particles = Array.from({ length: count }, createParticle);
  }

  function resizeCanvas() {
    const rect = hero.getBoundingClientRect();
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    centerX = width / 2;
    centerY = height / 2;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.8);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    pointerCanvasX = centerX;
    pointerCanvasY = centerY;
    targetPointerCanvasX = centerX;
    targetPointerCanvasY = centerY;

    setupParticles();
  }

  function drawParticle(p, index, time) {
    p.z -= p.speed;
    p.x += p.driftX;
    p.y += p.driftY;

    if (p.x < -width * 0.75 || p.x > width * 0.75) p.driftX *= -1;
    if (p.y < -height * 0.75 || p.y > height * 0.75) p.driftY *= -1;

    if (p.z <= 40) {
      particles[index] = createParticle();
      particles[index].z = 980;
      return;
    }

    const perspective = 540 / p.z;
    let x = centerX + (p.x + pointerX * 22) * perspective;
    let y = centerY + (p.y + pointerY * 16) * perspective;
    const radius = p.radius * perspective * 2.4;

    const dx = x - pointerCanvasX;
    const dy = y - pointerCanvasY;
    const distance = Math.hypot(dx, dy);
    const influenceRadius = 170;
    if (pointerActive && distance < influenceRadius && distance > 0.001) {
      const force = (1 - distance / influenceRadius) * 20 * perspective;
      x += (dx / distance) * force;
      y += (dy / distance) * force;
    }

    if (x < -20 || x > width + 20 || y < -20 || y > height + 20) {
      particles[index] = createParticle();
      return;
    }

    const alphaBase = Math.max(0.08, 1 - p.z / 1250);
    const twinkle = (Math.sin(time * 0.0009 + p.twinkle) + 1) / 2;
    const alpha = Math.min(0.58, alphaBase * (0.48 + twinkle * 0.4));

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, Math.max(1.2, radius * 2.2));
    gradient.addColorStop(0, `rgba(127, 195, 222, ${alpha * p.hueShift})`);
    gradient.addColorStop(0.55, `rgba(61, 156, 207, ${alpha * 0.48})`);
    gradient.addColorStop(1, 'rgba(61, 156, 207, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, Math.max(0.6, radius * 1.7), 0, Math.PI * 2);
    ctx.fill();

    visibleParticles.push({ x, y, alpha });
  }

  function drawPointerField(time) {
    const maxLinkDistance = pointerActive ? 150 : 0;
    if (!maxLinkDistance) return;

    // Draw a subtle energetic aura around the pointer.
    const pulse = 26 + Math.sin(time * 0.008) * 5;
    const aura = ctx.createRadialGradient(pointerCanvasX, pointerCanvasY, 0, pointerCanvasX, pointerCanvasY, 160);
    aura.addColorStop(0, 'rgba(127, 195, 222, 0.16)');
    aura.addColorStop(0.4, 'rgba(61, 156, 207, 0.08)');
    aura.addColorStop(1, 'rgba(61, 156, 207, 0)');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(pointerCanvasX, pointerCanvasY, 160, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(127, 195, 222, 0.28)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(pointerCanvasX, pointerCanvasY, pulse, 0, Math.PI * 2);
    ctx.stroke();

    // Draw short streaks from nearby particles to the pointer.
    for (let i = 0; i < visibleParticles.length; i++) {
      const p = visibleParticles[i];
      const dx = p.x - pointerCanvasX;
      const dy = p.y - pointerCanvasY;
      const dist = Math.hypot(dx, dy);
      if (dist >= maxLinkDistance || dist <= 0.001) continue;

      const strength = 1 - dist / maxLinkDistance;
      ctx.strokeStyle = `rgba(127, 195, 222, ${0.05 + strength * 0.2})`;
      ctx.lineWidth = 0.6 + strength * 0.6;
      ctx.beginPath();
      ctx.moveTo(pointerCanvasX, pointerCanvasY);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
  }

  function animate(time) {
    pointerX += (targetPointerX - pointerX) * 0.06;
    pointerY += (targetPointerY - pointerY) * 0.06;
    pointerCanvasX += (targetPointerCanvasX - pointerCanvasX) * 0.12;
    pointerCanvasY += (targetPointerCanvasY - pointerCanvasY) * 0.12;

    ctx.clearRect(0, 0, width, height);
    visibleParticles = [];
    for (let i = 0; i < particles.length; i++) {
      drawParticle(particles[i], i, time);
    }
    drawPointerField(time);

    rafId = requestAnimationFrame(animate);
  }

  hero.addEventListener('pointermove', (e) => {
    const rect = hero.getBoundingClientRect();
    pointerActive = true;
    targetPointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    targetPointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    targetPointerCanvasX = e.clientX - rect.left;
    targetPointerCanvasY = e.clientY - rect.top;
  });

  hero.addEventListener('pointerenter', (e) => {
    const rect = hero.getBoundingClientRect();
    pointerActive = true;
    targetPointerCanvasX = e.clientX - rect.left;
    targetPointerCanvasY = e.clientY - rect.top;
  });

  hero.addEventListener('pointerleave', () => {
    pointerActive = false;
    targetPointerX = 0;
    targetPointerY = 0;
    targetPointerCanvasX = centerX;
    targetPointerCanvasY = centerY;
  });

  window.addEventListener('resize', debounce(resizeCanvas, 120));

  resizeCanvas();
  animate(0);

  // Pause drawing when tab is hidden to reduce GPU usage.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    } else if (!rafId) {
      rafId = requestAnimationFrame(animate);
    }
  });
}

// ==================== DYNAMIC NAV BACKGROUND ====================

let lastScrollTop = 0;
const nav = document.querySelector('nav');

function handleNavScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    nav.style.background = 'rgba(1, 2, 5, 0.97)';
    nav.style.boxShadow = '0 1px 0 rgba(61, 156, 207, 0.13), 0 8px 32px rgba(0, 0, 0, 0.68)';
  } else {
    nav.style.background = 'rgba(1, 2, 5, 0.88)';
    nav.style.boxShadow = '0 1px 0 rgba(61, 156, 207, 0.07), 0 4px 24px rgba(0, 0, 0, 0.64)';
  }
  
  lastScrollTop = scrollTop;
}

window.addEventListener('scroll', throttle(handleNavScroll, 100));

// ==================== PERFORMANCE MONITORING ====================

// Log performance metrics in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      console.log(`Page load time: ${loadTime}ms`);
    }
  });
}

// ==================== LAZY LOAD IMAGES ====================

// Add lazy loading for future image additions
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ==================== INITIALIZE ON DOM READY ====================

document.addEventListener('DOMContentLoaded', () => {
  // Create particles
  createParticles();

  // Hero 3D starfield particles
  initHeroParticles3D();
  
  // Initial scroll progress
  updateScrollProgress();
  
  // Initial nav state
  handleNavScroll();

  // Initial parallax state
  if (!prefersReducedMotion) {
    queueParallax();
  }
  
  // Add loaded class to body for CSS animations
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
});

// ==================== ACCESSIBILITY IMPROVEMENTS ====================

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
  // ESC key closes mobile menu
  if (e.key === 'Escape') {
    if (navMenu && navMenu.classList.contains('active')) {
      mobileMenuToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }
});

// Add focus visible for better keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// ==================== PREVENT LAYOUT SHIFT ====================

// Reserve space for dynamic content to prevent CLS
window.addEventListener('load', () => {
  // Ensure all images have dimensions
  document.querySelectorAll('img:not([width]):not([height])').forEach(img => {
    if (img.naturalWidth && img.naturalHeight) {
      img.setAttribute('width', img.naturalWidth);
      img.setAttribute('height', img.naturalHeight);
    }
  });
});

// ==================== ERROR HANDLING ====================

// Global error handler for graceful degradation
window.addEventListener('error', (e) => {
  console.error('Script error:', e.message);
  // Don't break the page on script errors
  return true;
});



// ==================== STAGGERED TIMELINE ====================

function initTimelineStagger() {
  const timelineGroups = {};

  // Group timeline items by their parent container
  document.querySelectorAll('.timeline-item.reveal').forEach((item, index) => {
    item.classList.add(`reveal-delay-${(index % 9) + 1}`);
  });
}

// ==================== SCROLL SPY (active nav) ====================

const navSections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;
  navSections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-menu a[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(l => l.classList.remove('nav-active'));
        link.classList.add('nav-active');
      }
    }
  });
}

window.addEventListener('scroll', throttle(updateActiveNav, 100));
updateActiveNav();


// ==================== CUSTOM CURSOR ====================

(function() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  // Only activate on devices with fine pointer (mouse)
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state on interactive elements
  const hoverEls = document.querySelectorAll('a, button, [role="button"], .skill-item, .project-card, .learning-card, .timeline-card, .contact-item');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('cursor-hover');
      ring.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('cursor-hover');
      ring.classList.remove('cursor-hover');
    });
  });

  // Click state
  document.addEventListener('mousedown', () => dot.classList.add('cursor-clicking'));
  document.addEventListener('mouseup',   () => dot.classList.remove('cursor-clicking'));

  // Hide when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
})();

// ==================== PROGRESS RING BACK-TO-TOP ====================

(function() {
  const btn  = document.querySelector('.back-to-top');
  const fill = document.querySelector('.progress-ring-fill');
  if (!btn || !fill) return;

  const circumference = 2 * Math.PI * 20; // r=20 → 125.66

  function updateRing() {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const progress   = docHeight > 0 ? scrollTop / docHeight : 0;
    const offset     = circumference * (1 - progress);
    fill.style.strokeDashoffset = offset;

    // Show/hide button
    if (scrollTop > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', throttle(updateRing, 16));
  updateRing();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ==================== COPY EMAIL TO CLIPBOARD ====================

(function() {
  const emailBtn   = document.getElementById('copy-email-btn');
  const toast      = document.getElementById('toast');
  const emailDisplay = document.getElementById('email-display');
  if (!emailBtn || !toast) return;

  const EMAIL = atob('amVldG1ha2hpamEyQGdtYWlsLmNvbQ==');
  const MASKED_EMAIL = 'jeetmakhija2@gmail.com';
  let toastTimer;

  if (emailDisplay) {
    emailDisplay.textContent = MASKED_EMAIL;
  }

  function showToast() {
    clearTimeout(toastTimer);
    toast.classList.add('toast-show');
    toastTimer = setTimeout(() => toast.classList.remove('toast-show'), 2500);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      // Visual feedback on the card
      if (emailDisplay) {
        emailDisplay.textContent = 'Copied!';
        emailDisplay.style.color = 'var(--electric)';
        setTimeout(() => {
          emailDisplay.textContent = MASKED_EMAIL;
          emailDisplay.style.color = '';
        }, 2000);
      }
      showToast();
    } catch (err) {
      // Fallback: open mail client
      window.location.href = `mailto:${EMAIL}`;
    }
  }

  emailBtn.addEventListener('click', copyEmail);
  emailBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      copyEmail();
    }
  });
})();

// ==================== EASTER EGG ====================

// Konami code easter egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);
  
  if (konamiCode.join('').includes(konamiSequence.join(''))) {
    // Easter egg activated!
    document.body.style.animation = 'rainbow 2s infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
  .keyboard-nav *:focus {
    outline: 2px solid var(--electric);
    outline-offset: 2px;
  }
`;
document.head.appendChild(style);
