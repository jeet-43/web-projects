# Jeet Makhija — Personal Portfolio

> **Live Site:** [jeet-dev.netlify.app](https://jeet-dev.netlify.app/)

A fast, fully responsive personal portfolio built from scratch with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies. Designed with a dark, developer-focused aesthetic and packed with interactive details.

---

## ✨ Features

- **3D Starfield Hero** — Canvas-based particle system with mouse-parallax depth effect
- **Custom Cursor** — Dot + trailing ring with hover/click state transitions
- **Scroll Progress Ring** — SVG-animated back-to-top button that doubles as a scroll indicator
- **Scroll-Reveal Animations** — IntersectionObserver-powered fade/slide-in for every section
- **Animated Skill Bars** — Progress bars that animate in when scrolled into view
- **Scroll Spy Nav** — Active nav link updates as you scroll through sections
- **Parallax Section Numbers** — Section labels shift subtly on scroll
- **Role Text Rotator** — Hero subtitle cycles through roles; click or keyboard to advance
- **Copy-to-Clipboard Email** — Masked email revealed and copied on click, with toast notification
- **GitHub Card** — Fetches live avatar and profile info from the GitHub API
- **Konami Code Easter Egg** — ↑ ↑ ↓ ↓ ← → ← → B A
- **Keyboard Accessibility** — Full keyboard nav, ESC to close mobile menu, focus-visible styles
- **Responsive Mobile Menu** — Hamburger toggle with click-outside-to-close
- **SEO Ready** — Open Graph tags, Twitter Card, JSON-LD structured data, canonical URL

---

## 🗂️ Project Structure

```
portfolio-website/
├── index.html      # Main page — all sections, inline hero styles
├── resume.html     # Standalone resume page
├── style.css       # Global styles, CSS variables, component styles
└── script.js       # All interactivity and animations
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | CSS3 (custom properties, Grid, Flexbox, animations) |
| Scripting | Vanilla JavaScript (ES6+) |
| Fonts | IBM Plex Mono, Outfit, Space Grotesk (Google Fonts) |
| Icons | Devicons |
| Hosting | Netlify |

---

## 📄 Sections

| # | Section | Description |
|---|---|---|
| 01 | About | Who I am and what drives me |
| 02 | Tech Stack | Skills with animated progress bars |
| 03 | Currently Learning | Advanced DSA, Full Stack, System Design, React |
| 04 | My Journey | Timeline from first `Hello, World!` to now |
| 05 | Featured Work | Algo-Sight, Portfolio, DSA Solutions in C++ |
| 06 | Profiles | GitHub, LinkedIn, LeetCode |
| 07 | Certifications | Verified credentials from Anthropic (Skilljar) |
| 08 | Contact | Email copy card + location + LinkedIn |

---

## 🚀 Projects Featured

### [Algo-Sight](https://algo-sight.netlify.app/#app)
Browser-based algorithm visualizer covering **34 algorithms** — sorting, searching, pathfinding, and more. Features step-by-step playback, live metrics, learn mode, race mode, and a pathfinding grid.
`JavaScript` `HTML5` `CSS3` `Generator Functions` `Web Audio API`
→ [GitHub](https://github.com/jeet-43/algo-sight) · [Live Demo](https://algo-sight.netlify.app/#app)

### [DSA Solutions in C++](https://github.com/jeet-43/dsa-cpp)
Growing collection of DSA problems solved in C++. Arrays, linked lists, trees, graphs, DP, recursion, sorting — written with clean logic and optimal complexity in mind.
`C++` `Data Structures` `Algorithms`
→ [GitHub](https://github.com/jeet-43/dsa-cpp) · [LeetCode](https://leetcode.com/u/Jeet_16/)

---

## ⚙️ JavaScript Modules (`script.js`)

| Module | What it does |
|---|---|
| `debounce` / `throttle` | Utility wrappers for scroll performance |
| Scroll Progress | Updates `<div>` width as you scroll |
| Mobile Menu | Toggle + click-outside + ESC close |
| Parallax | `requestAnimationFrame`-queued section-number shift |
| Scroll Reveal | `IntersectionObserver` with staggered skill-bar animation |
| Smooth Scroll | Native `scrollTo` with nav-height offset |
| Floating Particles | Dot + cross particles in the background |
| 3D Starfield | Canvas particle system with mouse-pointer parallax |
| Scroll Spy | Highlights active nav link based on scroll position |
| Custom Cursor | Dot + lagging ring, hover/click states |
| Progress Ring Back-to-Top | SVG stroke animation tied to scroll depth |
| Copy Email | Clipboard API with masked display + fallback `mailto:` |
| Timeline Stagger | Delay classes applied to timeline items |
| Konami Code | Easter egg: rainbow hue-rotate animation |

---

## 🔗 Links

- **Portfolio:** [jeet-dev.netlify.app](https://jeet-dev.netlify.app/)
- **GitHub:** [github.com/jeet-43](https://github.com/jeet-43)
- **LinkedIn:** [linkedin.com/in/jeet-makhija](https://www.linkedin.com/in/jeet-makhija/)
- **LeetCode:** [leetcode.com/u/Jeet_16](https://leetcode.com/u/Jeet_16/)

---

## 📬 Contact

**Email:** jeetmakhija2@gmail.com  
**Location:** Delhi, India

---

*Built from scratch with code and caffeine — © 2026 Jeet Makhija*
