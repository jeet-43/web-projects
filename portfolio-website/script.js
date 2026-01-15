// Typing effect for hero section
const roles = [
  "Aspiring Software Engineer",
  "CS Student",
  "Web Developer",
  "DSA Learner"
];

const el = document.getElementById("typing");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const current = roles[roleIndex];
  
  if (!deleting) {
    el.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      setTimeout(() => deleting = true, 600);
    }
  } else {
    el.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
}

setInterval(typeEffect, 60);

// Intersection Observer for scroll animations
const sections = document.querySelectorAll('.services');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach(section => observer.observe(section));

// Cursor glow effect
const glow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});


// TODO: add smooth scroll for nav links later
// TODO: maybe add a dark mode toggle?
