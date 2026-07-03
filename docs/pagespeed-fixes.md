# PageSpeed Insights – Issues & Fixes

Summary of [PageSpeed Insights](https://pagespeed.web.dev/) findings for **nadzhomehealthcare.ae** (Desktop) and what was done or is left to do.

---

## Critical (red) – Insights

### 1. Improve image delivery (~2,798 KiB savings)

**Cause:** Hero and other images were served unoptimized (no WebP/AVIF, no resizing).

**Done:**
- **HeroSection:** Removed `unoptimized` so the hero image is optimized by Next.js (AVIF/WebP, responsive sizes). Strapi host `admincms.nadzhomehealthcare.ae` is already in `next.config.mjs` `images.remotePatterns`.
- **GenericHeroSection & ContentSection:** Removed `unoptimized` for remote Strapi images so they use the built-in optimizer.
- **TrustedProvidersSection:** Replaced raw `<img>` with `next/image` (responsive, lazy, modern formats).

**Still to do (optional):**
- Replace remaining raw `<img>` with `next/image` in:  
  `MainGoalSection`, `HowItWorksSection`, `ExpertDoctorsSection`, `TestimonialsSection`, `PartnersSection` (if using img), `Footer`/`FooterClient`, `HighlightedItemSection`, `NursingVisitSection`, wellness clients (`*Client.jsx`), `WhoWeAreClient`.
- Ensure all Strapi image URLs use hosts listed in `next.config.mjs` → `images.remotePatterns`.

---

### 2. Render-blocking requests (~90 ms)

**Cause:** CSS or scripts blocking first paint.

**Suggestions:**
- Keep using `next/font` (Inter, Space Grotesk) with `display: "swap"` and `preload: true` (already in `layout.jsx`).
- `experimental.optimizeCss: true` (critters) is already enabled in `next.config.mjs`; keep it.
- If you add more global CSS, consider splitting above-the-fold vs below-the-fold and loading the rest async or via dynamic imports.
- Avoid large synchronous scripts in `<head>`; use `defer` or load after first paint.

---

### 3. LCP breakdown / LCP request discovery / Network dependency tree

**Cause:** LCP element (hero image) or its dependencies are discovered or loaded late.

**Done:**
- Hero image uses `priority` in HeroSection and GenericHeroSection so it preloads.
- Hero image is now optimized (no `unoptimized`), so it’s smaller and faster to load.

**Suggestions:**
- Optionally add a `<link rel="preload" as="image" href="…" />` in the layout or page head for the hero image URL when it’s known at build time (e.g. from Strapi at build).
- Ensure hero image is served from a fast CDN (e.g. Strapi upload provider with CDN).
- Keep LCP element above the fold and avoid shifting it (see CLS below).

---

## Warnings (orange) – Insights

### 4. Legacy JavaScript (~13 KiB)

**Cause:** Polyfills or older syntax increasing bundle size.

**Suggestions:**
- Next 16 + SWC already output modern bundles; check for any legacy deps or `browserslist` that targets old browsers.
- Run `npm run build` and inspect the built JS; remove or replace any large polyfills if not needed for your audience.

---

## Informational (gray) – Insights

### 5. Layout shift culprits (CLS)

**Cause:** Elements (images, ads, embeds) that don’t reserve space cause layout shift.

**Suggestions:**
- All `next/image` usage with `width`/`height` or `fill` in a sized container (e.g. `aspect-[4/3]`) is good; keep doing that.
- For any remaining `<img>`, add explicit `width`/`height` or wrap in a container with fixed aspect ratio.
- Avoid inserting above-the-fold content dynamically without reserving space (e.g. use min-height or skeleton).

---

## Diagnostics

### 6. Reduce unused JavaScript (~869 KiB)

**Cause:** Large JS chunks (e.g. Framer Motion, Swiper, react-icons) loaded even where not used.

**Suggestions:**
- **Dynamic imports:** Lazy-load below-the-fold sections that use heavy libs, e.g.  
  `const SwiperCarousel = dynamic(() => import('@/components/...'), { ssr: false });`
- **Framer Motion:** Use dynamic import for sections that only use motion (e.g. `const MotionSection = dynamic(() => import('framer-motion').then(m => m.motion.section));`) or limit `motion` usage to components that really need it.
- **react-icons:** Prefer tree-shaken imports, e.g. `import { FaWhatsapp } from 'react-icons/fa'` (already used), and avoid `import * from 'react-icons/...'`.
- **Swiper:** Ensure only the modules you use are imported; consider loading Swiper only on pages that need it (e.g. home carousel) via dynamic import.
- Run a production build and use Chrome DevTools Coverage (or Lighthouse) to see which chunks are unused on the homepage and trim or code-split them.

---

## Quick reference – Core Web Vitals targets

| Metric | Good | Needs improvement | Poor |
|--------|------|-------------------|------|
| **LCP** | ≤ 2.5 s | 2.5–4 s | > 4 s |
| **INP** | ≤ 200 ms | 200–500 ms | > 500 ms |
| **CLS** | ≤ 0.1 | 0.1–0.25 | > 0.25 |

Re-run PageSpeed after deployments to confirm improvements (especially “Improve image delivery” and LCP).
