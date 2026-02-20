# AGENTS Guide

## Project goals
- Keep the site static and Vercel-friendly.
- Prefer small, readable HTML/CSS/JS changes over framework migrations.
- Maintain clean URLs (no `.html` in internal links).

## Editing standards
- Use semantic HTML and keep indentation consistent (2 spaces in HTML, 2 spaces in JS/CSS).
- Reuse utility classes with shared component classes in `assets/css/input.css` when class lists become too long.
- Prefer lowercase URL slugs (`/contact-us`, `/solutions`, etc.).
- Keep JavaScript in `assets/js/` and avoid inline scripts.

## Shared layout expectations
- Header and footer markup must stay consistent across all pages.
- Active navigation state should be handled in JavaScript based on `window.location.pathname`.
- Use class/id-based grouped-menu activation: JS should infer parent active state from active `.menu-link` items inside dropdown containers and match related `*Dropdown`/`*Toggle` elements.
- For future nav dropdowns, prefer following existing class and id conventions over hardcoded route arrays or custom data attributes.

## SEO baseline for every page
- `title`
- `meta[name=description]`
- canonical link with clean URL
- OpenGraph tags (`og:title`, `og:description`, `og:type`)

## Local development commands
- `npm run dev` → Tailwind/PostCSS watch + local static server with auto reload.
- `npm run build` → production CSS build.
- `npm run images:optimize` → convert PNG/JPG images to optimized WebP files.

## Validation commands
- `npm run test` checks HTML SEO baseline and clean-link rules.
- `npm run format` formats HTML/CSS/JS/JSON files with Prettier.

## Security and hosting notes
- Security headers and clean URL rewrites are configured in `vercel.json`.
- Do not add server-only features; this repo is static-hosted.
