# Developer Guide: LumbiniX Hackathon Website

Welcome to the development guide for the LumbiniX Hackathon project. This document outlines the architecture, technology stack, and workflows required to maintain and extend the website.

## 🚀 Tech Stack

- **Framework**: [Astro](https://astro.build/) (Static Site Generator)
- **UI Library**: [React](https://react.dev/) (Used for interactive "Islands")
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)

---

## 🛠 Setup & Development

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation
```bash
npm install
```

### Local Development
```bash
npm run dev
```
The site will be available at `http://localhost:4321`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

The project uses a **feature-based** folder structure to keep components and logic organized.

```text
src/
├── data/           # Static data files (Single Source of Truth)
├── features/       # Feature-based modules (Hero, Schedule, etc.)
│   └── [feature]/
│       ├── Component.astro    # Layout & Markup
│       └── Interactive.tsx   # React Island (if needed)
├── layouts/        # Page wrappers (BaseLayout.astro)
├── pages/          # Astro routing (Home, Schedule, Speakers, etc.)
│   ├── index.astro
│   ├── schedule.astro
│   ├── speakers.astro
│   ├── prizes.astro
│   ├── sponsors.astro
│   ├── team.astro
│   └── faq.astro
├── styles/         # Global CSS & Tailwind imports
└── types/          # Shared TypeScript interfaces
```

---

## 📊 Data Management

To update the content of the website (speakers, dates, prizes, etc.), **only modify files in `src/data/`**. Do not hardcode content directly into components.

- `event.ts`: Core event meta (name, date, venue).
- `schedule.ts`: Timeline entries.
- `speakers.ts`: Speaker profiles and social links.
- `prizes.ts`: Prize tiers and descriptions.
- `sponsors.ts`: Sponsor tiers and logo URLs.
- `team.ts`: Organizing team members and roles.
- `faqs.ts`: FAQ questions and answers.

**Example: Adding a Speaker**
1. Open `src/data/speakers.ts`.
2. Add a new object to the `speakers` array following the `Speaker` type defined in `src/types/index.ts`.

---

## 🧩 Component Architecture

### Astro Components (`.astro`)
Most components are written in Astro. They render to zero-JS HTML at build time, ensuring maximum performance.
- Use for layout, structural markup, and static content.
- Example: `Navbar.astro`, `SpeakerCard.astro`.

### React Islands (`.tsx`)
React is used only for components requiring client-side interactivity.
- Use the `client:load` directive for above-the-fold interactivity (e.g., `MobileMenu`).
- Use the `client:visible` directive for below-the-fold components (e.g., `FAQAccordion`) to improve performance.

---

## 🎨 Styling & Theme

The project uses a custom Tailwind theme defined in `tailwind.config.mjs`.

### Color Palette
- **Primary**: `#8B5CF6` (Violet) - Used for primary actions and highlights.
- **Accent**: `#10B981` (Emerald) - Used for success states and secondary highlights.
- **Surface**: Dark grays for cards and containers.
- **BG**: Deep slate (`#0F172A`) for the main background.

### Utility Classes
Custom utilities are available in `src/styles/global.css`:
- `.glass-card`: Semi-transparent background with blur and border.
- `.text-gradient`: Brand-colored gradient text.
- `.btn-primary` / `.btn-secondary`: Pre-styled button components.

---

## 📝 Best Practices

1. **Keep Islands Small**: Only use React when client-side state is actually necessary.
2. **Type Safety**: Always import and use types from `src/types` when creating new data or components.
3. **Mobile First**: All Tailwind classes should be written with a mobile-first approach using `md:`, `lg:`, etc.
4. **Performance**: Optimize images by placing them in `public/` or using Astro's built-in image optimization if moving to a hosted environment.
