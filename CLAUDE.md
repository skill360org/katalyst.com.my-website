# Claude Code Guide

See `AGENTS.md` for full project standards. Key points for Claude:

## Build system
- Dev: `npm run dev` (Vite, port 3000)
- Build: `npm run build` (Vite → `dist/`)
- Header/footer are Handlebars partials — use `{{> header}}` and `{{> footer footerClass="..." footerCardClass="..."}}` in page files. Never expand them inline.

## Formatting — run before every commit
```bash
npm run format
```
The project enforces 2-space indentation via Prettier (`.prettierrc`). Always run `npm run format` after making changes and before committing. Do not manually adjust indentation or reorder Tailwind classes — let Prettier handle it. If a third-party diff introduces inconsistent formatting, run `npm run format` to normalize before merging.

## Testing
```bash
npm run test
```
Runs HTML SEO baseline checks, internal link integrity, and JS unit tests. Individual test commands:

- `npm run test:html` — validates `title`, `meta[name=description]`, canonical, and OpenGraph tags across all pages; also checks for `.html` hrefs.
- `npm run test:links` — checks that all internal `/`-relative hrefs resolve to known pages.
- `npm run test:unit` — runs Vitest unit tests for JS utilities (`normalizePath`, `isActivePath`).
- `npm run test:e2e` — Playwright smoke tests (requires a production build).
