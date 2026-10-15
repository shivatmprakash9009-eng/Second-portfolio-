# Developer Portfolio

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Framer Motion

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Edit content

All copy, images, projects, skills and contact details live in `src/lib/data.ts`.

## Structure

- `src/components/sections/` – Navbar, Hero, About, SkillsNetwork, RecentWork, ProjectCard, Contact, Footer
- `src/components/ui/` – ParallaxBackground (GSAP mouse + scroll parallax), SplitHeading (ScrollTrigger reveal), MagneticButton (Framer Motion), icons
- `src/lib/gsap.ts` – single place where GSAP plugins are registered

## Design tokens

Primary `#DC00D3` (magenta), `#0CFFFF` (cyan), `#100425` (dark blue). Fonts: Josefin Sans (display) and Inter (UI), per the Figma design system.
