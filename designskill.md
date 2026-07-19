# Skills Checklist — DeerHack-Style Landing Page
*(Layout & animation only — no colors, per your design system)*

---

## 1. Layout Skills

### CSS Grid
2D layout system for arranging items in rows AND columns at once.
- Use for: benefits grid, judges grid, mentors grid, sponsor logo tiers
- Key snippet: `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));`

### Flexbox
1D layout system for arranging items in a single row or column.
- Use for: navbar (logo / links / CTA), card internals (icon + text + button)
- Key properties: `justify-content`, `align-items`, `gap`, `flex-wrap`

### Responsive Design (Media Queries)
Adapting layout based on screen width, mobile-first.
- Use for: nav collapsing to hamburger, grids dropping to 1 column
- Key snippet: `@media (max-width: 768px) { ... }`

### Sticky Positioning
Element scrolls normally then "sticks" at a defined edge.
- Use for: navbar staying pinned on scroll
- Key snippet: `position: sticky; top: 0; z-index: 50;`

### Absolute Positioning
Pulls element out of normal flow, placed relative to nearest positioned parent.
- Use for: decorative SVG accents (leaves, shapes) floating over sections
- Requires: `position: relative` on parent container

---

## 2. Animation Skills

### Scroll-Triggered Reveal
Elements fade/slide in as they enter the viewport.
- Use for: every major section transition down the page
- Powered by: Intersection Observer + CSS class toggle

### Infinite Auto-Scroll Carousel
Continuously scrolling strip that loops seamlessly.
- Use for: photo gallery, "what to expect" cards
- Technique: duplicate the item list back-to-back, animate `transform: translateX()`, reset invisibly at loop point

### Number Count-Up
Stats animate from 0 to target value once visible.
- Use for: applicants / hackers / projects counters
- Technique: `requestAnimationFrame` loop + Intersection Observer trigger

### Accordion Expand/Collapse
Smooth open/close for FAQ-style content.
- Use for: FAQ section
- Technique: animate `max-height` (with upper bound) or measure `scrollHeight` dynamically — never use `display: none` (it snaps, doesn't animate)

### Tab Switching
Clicking a label swaps content + moves an active indicator.
- Use for: Tracks section, FAQ categories
- Technique: track active tab position, animate a separate underline/pill element to match

### Hamburger Menu Toggle
Icon morphs hamburger ↔ X, reveals slide-in/overlay nav.
- Use for: mobile navigation
- Technique: 3 `<span>` lines rotated/translated via CSS transform on toggle state

### Hover Micro-Interactions
Subtle lift + shadow on hover.
- Use for: all cards and buttons
- Key snippet: `transform: translateY(-4px); transition: all 200ms ease;`

### Autoplay Carousel (Pause on Interaction)
Rotates automatically, pauses if user manually navigates.
- Use for: testimonials
- Technique: timer-based autoplay + pause flag on manual click, resume after delay

---

## 3. Logic Skills

### Intersection Observer API
Native browser API to detect when elements enter/exit viewport — no expensive scroll listeners.
- Powers: scroll-reveal, count-up triggers

### Component State Management
Track "active tab," "accordion open," "carousel index" in local state.
- Tooling: React `useState` (or plain JS variables in vanilla)
- No global state library needed for this scale

### Componentization
One reusable card component fed different data (judge, mentor, sponsor) instead of duplicated markup.
- Mindset skill — pays off in maintainability

---

## 4. Libraries to Use (don't hand-roll everything)

| Purpose | Library |
|---|---|
| Scroll reveal, hover, tab transitions | Framer Motion |
| Complex sequenced animation (alt.) | GSAP + ScrollTrigger |
| Carousel / infinite loop / touch drag | Swiper.js or Embla Carousel |
| Accessible accordion & tabs | Radix UI or Headless UI |
| Number count-up | react-countup |

---

## Suggested Build Order

1. Flexbox
2. CSS Grid
3. Responsive breakpoints
4. Hover transitions
5. Intersection Observer (scroll reveals)
6. Tabs / accordion state logic
7. Carousel library integration
8. Count-up animation