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
}

window.addEventListener('scroll', throttle(parallaxEffect, 16));

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
      
      // Animate skill bars
      if (entry.target.classList.contains('skill-item')) {
        const skillProgress = entry.target.querySelector('.skill-progress');
        if (skillProgress) {
          const progress = skillProgress.getAttribute('data-progress');
          setTimeout(() => {
            skillProgress.style.width = `${progress}%`;
          }, 100);
        }
      }
      
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

// ==================== DYNAMIC NAV BACKGROUND ====================

let lastScrollTop = 0;
const nav = document.querySelector('nav');

function handleNavScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    nav.style.background = 'rgba(13, 17, 23, 0.95)';
    nav.style.boxShadow = '0 1px 0 rgba(88, 166, 255, 0.15), 0 8px 32px rgba(0, 0, 0, 0.5)';
  } else {
    nav.style.background = 'rgba(13, 17, 23, 0.75)';
    nav.style.boxShadow = '0 1px 0 rgba(88, 166, 255, 0.08), 0 4px 24px rgba(0, 0, 0, 0.4)';
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
  
  // Initial scroll progress
  updateScrollProgress();
  
  // Initial nav state
  handleNavScroll();
  
  // Initialize skill bars to 0 width
  document.querySelectorAll('.skill-progress').forEach(progress => {
    progress.style.width = '0%';
  });
  
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

  const EMAIL = 'jeetmakhija2@gmail.com';
  let toastTimer;

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
        const original = emailDisplay.textContent;
        emailDisplay.textContent = 'Copied!';
        emailDisplay.style.color = 'var(--electric)';
        setTimeout(() => {
          emailDisplay.textContent = original;
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
