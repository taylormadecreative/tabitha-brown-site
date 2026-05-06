# Tabitha Brown — Master Hub Site

Spec piece by Taylormade Creative — single-page master hub showcasing Tabitha Brown's full empire (9 brands).

## Status
v1.0.0-spec — ready to pitch.

## Live URL
TBD (deployed to GitHub Pages once repo is pushed and Pages is enabled).

## Tech stack
- Vanilla HTML / CSS / JS — single `index.html`
- Vite (dev DX only)
- GSAP core + ScrollTrigger (pinned scroll storytelling, desktop only)
- Lenis (smooth scroll, desktop + no-reduced-motion only)
- Sharp (build-time image pipeline → AVIF/WebP/JPEG × 3 widths)
- Self-hosted Fraunces variable + Inter Tight + Pinyon Script
- ConvertKit-shaped form (simulated success for spec; wire endpoint before launch)

## Sections
1. Sticky nav (mega-menu desktop / accordion mobile)
2. Hero — "Hey there, friend."
3. Intent band — 5 quick-pick CTAs
4. In Her Words — pull quote
5. About Tabitha — two-voice editorial spread
6. The Empire — 9 brand chapters + Chapter 10 closer (pinned scroll)
7. Tour Dates — JSON-driven, filters past dates
8. Tab Universe Map — illustrated SVG
9. Press Wall — auto-scrolling logo soup
10. Newsletter — email/SMS toggle, GDPR, segmentation, honeypot
11. Footer — 4-col desktop / accordion mobile + decorative wordmark

## Develop
```bash
npm install
npm run dev   # http://localhost:5173
```

## Build
```bash
npm run build  # generates ~300 image derivatives + bundles to /dist
```

## Deploy
GitHub Actions → Pages on every push to `main`.

CNAME = `tabithabrown.com` — update if domain changes.

## What's left for production
- Wire ConvertKit + Klaviyo endpoints into `src/js/newsletter.js`
- Replace placeholder press logos with real licensed marks
- Replace placeholder universe map SVG with hand-drawn art
- Source signature object photos (currently using existing portraits as substitutes)
- Vectorize Tab's actual handwriting from her IG (currently Pinyon Script fallback)
- OG image polish — currently auto-generated; replace with designed 1200×630 hero card
- Real tour dates JSON
- Confirm domain (CNAME) + DNS

## Spec + plan
- Design spec: `../docs/2026-05-06-design-spec.md`
- Implementation plan: `../docs/2026-05-06-implementation-plan.md`
