# 🚀 Jeet Makhija — Personal Portfolio

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge&logo=netlify)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

**A modern, high-performance developer portfolio built from scratch with vanilla HTML, CSS & JavaScript — no frameworks, no dependencies, just clean code.**

[🌐 Live Demo](https://jeet-dev.netlify.app/) &nbsp;·&nbsp; [📁 GitHub](https://github.com/jeet-43) &nbsp;·&nbsp; [💼 LinkedIn](https://www.linkedin.com/in/jeet-makhija/) &nbsp;·&nbsp; 

</div>

---

## 📸 Overview

This is my personal developer portfolio — a handcrafted, fully responsive website that showcases my skills, journey, projects, and profiles as an aspiring software engineer. Every pixel, animation, and interaction was built from scratch without any CSS or JS frameworks.

---

## ✨ Features

### 🎨 UI & Design
- **Dark-mode first** aesthetic with a deep `#0d1117` base inspired by GitHub's dark theme
- **Animated hero section** with a massive clipped gradient title, outline text variant, and a moving grid background
- **Floating particles** in the hero — a mix of dots and plus-shaped crosses with randomized sizes, speeds, and colors
- **Scrolling marquee** banner showcasing core skills with smooth infinite animation
- **Glass-morphism cards** throughout — translucent backgrounds, backdrop blur, and soft border glow
- **Glowing section dividers** with a pulsing center dot and a traveling scan-line animation
- **Radial gradient section backgrounds** — each section has a unique, subtle ambient glow
- **Custom scrollbar** styled with a blue gradient to match the overall theme

### ⚡ Animations & Motion
- **Custom cursor** — a dot + lagging ring combo, with hover expansion and click-shrink states (desktop only)
- **Scroll-reveal animations** — elements fade and slide into view as you scroll, powered by `IntersectionObserver`
- **Staggered timeline entries** — each journey card animates in with a cascading delay
- **Skill progress bars** — animate from 0% to their target width when scrolled into view
- **Learning progress bars** — same animated reveal with shimmer effect
- **Hero title entrance** — both lines slide up with staggered delays on page load
- **Parallax effects** — hero grid and section numbers shift subtly on scroll
- **Shimmer effect** on all progress bars using a CSS `@keyframes` sweep

### 🧭 Navigation & Scrolling
- **Fixed glassmorphism navbar** that becomes more opaque on scroll
- **Smooth scrolling** to all anchor sections with nav height offset accounted for
- **Scroll spy** — active nav link updates automatically as you scroll through sections
- **Scroll progress bar** fixed at the top of the page
- **Back-to-top button** with a circular SVG progress ring that fills as you scroll, visible only after 500px

### 📱 Responsive Design
- **Fully mobile-responsive** across all screen sizes
- **Hamburger menu** for mobile with smooth slide-in/out animation and outside-click dismissal
- **Two-column timeline** collapses to single-column on mobile with repositioned dots
- **Touch-friendly tap targets** — all buttons/links have minimum 44px hit area on mobile
- **Safe-area insets** support for notched devices (`env(safe-area-inset-*`)
- **Custom cursor disabled** on touch devices

### ♿ Accessibility
- `skip-link` for keyboard users to jump directly to main content
- `aria-label` and `role` attributes on interactive elements
- `aria-hidden` on decorative elements (particles, grid, marquee duplicate)
- `aria-live="polite"` on the toast notification
- Keyboard navigation support — `Escape` closes mobile menu, `Tab` activates focus outlines
- `prefers-reduced-motion` media query disables all animations for users who prefer it

### 🔧 Functionality
- **Copy email to clipboard** — clicking the email card copies the address with visual feedback and a toast notification
- **Konami code easter egg** — triggers a rainbow hue-rotate animation on the page
- **Lazy image loading** — `IntersectionObserver`-based loader ready for future image additions
- **Performance monitoring** — logs page load time to console in `localhost` environments
- **Global error handler** for graceful degradation on script failures

### 🏗️ Code Architecture
- **Zero dependencies** — pure vanilla HTML5, CSS3, and ES6+ JavaScript
- **CSS custom properties (variables)** for the full design token system (colors, glows, glass styles)
- **Modular JavaScript** with clearly separated sections and IIFE-wrapped features
- **Utility functions** — `debounce` and `throttle` for optimised scroll performance
- **GPU-accelerated animations** using `will-change` and `translateZ(0)` on heavy elements
- **Clean file separation** — `index.html`, `style.css`, `script.js`

---

## 🗂️ Project Structure

```
portfolio-website/
├── index.html       # Semantic HTML structure
├── style.css        # All styles, animations, and responsive rules
├── script.js        # All interactivity and DOM logic
└── resume.html      # Resume page (linked from nav)
```

---

## 🧩 Sections

| # | Section | Description |
|---|---------|-------------|
| 01 | **About** | Bio with a live-syntax C++ code block |
| 02 | **Tech Stack** | Skills with animated progress bars and devicons |
| 03 | **Currently Learning** | Progress cards for ongoing learning paths |
| 04 | **My Journey** | Two-column alternating timeline of milestones |
| 05 | **Featured Work** | Project cards with tech stack tags and links |
| 06 | **My Profiles** | GitHub, LinkedIn, LeetCode profile cards |
| 07 | **Contact** | Email copy card, location, and LinkedIn |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 (semantic elements, ARIA) |
| Styling | CSS3 (custom properties, grid, flexbox, keyframes) |
| Scripting | Vanilla JavaScript (ES6+, IntersectionObserver, Clipboard API) |
| Fonts | IBM Plex Mono · Outfit · Space Grotesk (Google Fonts) |
| Icons | Devicon CDN |
| Deployment | Netlify |

---

## ⚙️ Performance Highlights

- `IntersectionObserver` for all scroll-triggered effects — no scroll event polling
- `throttle()` wrapper on scroll handlers (16ms frame cap)
- `will-change: transform` and `translateZ(0)` on animated elements for GPU compositing
- `prefers-reduced-motion` support — all animations disabled for users who opt out
- Lazy image loading scaffold built in for future additions
- Elements unobserved after reveal to free up observer overhead

---


<div align="center">

Built with 💙 and caffeine by **Jeet Makhija**

[jeet-dev.netlify.app](https://jeet-dev.netlify.app/)

</div>
