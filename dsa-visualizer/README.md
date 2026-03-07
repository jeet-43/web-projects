# DSA Visualizer

An interactive, browser-based tool for visualizing classic Data Structures & Algorithms — built to make abstract concepts click through step-by-step animation.

🔗 **Live Demo:** [dsa-visualizer-jeet.netlify.app](https://dsa-visualizer-jeet.netlify.app)

---

## Features

- **10 algorithms** across sorting, searching, and technique categories
- **Step-by-step execution** — run automatically or advance manually one step at a time (including stepping backward)
- **Live pseudocode + code panel** with line highlighting synced to the current step
- **Multi-language code snippets** — Pseudocode, Python, C++, and Java
- **Sound mode** — optional audio tones that reflect comparisons, swaps, and sorted placements
- **Custom array input** — enter your own comma-separated values
- **Preset cases** — instantly load Best, Average, Worst, and Equal-elements scenarios
- **Speed control** — from Very Slow to Instant
- **Dark / Light theme** toggle
- **Responsive design** — works on desktop and mobile

---

## Algorithms Covered

### Sorting
| Algorithm | Time (Best) | Time (Avg/Worst) | Space | Stable |
|-----------|-------------|-------------------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(1) | ✅ |
| Selection Sort | O(n²) | O(n²) | O(1) | ❌ |
| Insertion Sort | O(n) | O(n²) | O(1) | ✅ |
| Merge Sort | O(n log n) | O(n log n) | O(n) | ✅ |
| Quick Sort | O(n log n) | O(n log n) / O(n²) | O(log n) | ❌ |
| Counting Sort | O(n+k) | O(n+k) | O(n+k) | ✅ |

### Techniques
| Technique | Time | Space |
|-----------|------|-------|
| Two Pointers | O(n) | O(1) |
| Sliding Window | O(n) | O(1) |

### Searching
| Algorithm | Time (Best) | Time (Worst) | Requires Sorted |
|-----------|-------------|--------------|-----------------|
| Linear Search | O(1) | O(n) | ❌ |
| Binary Search | O(1) | O(log n) | ✅ |

---

## Tech Stack

Pure vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, no dependencies.

- **Fonts:** IBM Plex Mono, Instrument Serif, DM Sans (Google Fonts)
- **Deployment:** Netlify

---

## Project Structure

```
dsa-visualizer/
├── index.html      # Markup and layout
├── style.css       # Theming, animations, responsive styles
└── script.js       # All algorithm generators, rendering, and UI logic
```

---

## How It Works

Each algorithm is implemented as a JavaScript **generator function** that yields snapshot objects at every meaningful step. A snapshot contains the current array state and highlight metadata (which indices are comparing, swapping, sorted, etc.). The renderer reads these snapshots to paint the bar chart or grid view, and the code panel highlights the corresponding pseudocode line.

This makes stepping forward *and* backward trivial — all snapshots are pre-computed and stored in an array.

---

## Credits

Designed and built by **Jeet Makhija** 

---
