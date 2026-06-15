# INCyTEA-APP — Agent Guide

## Project

Spanish-language client-side SPA (Vite + React 19 + JSX + Tailwind CSS v4). All data is mock/local state — no backend, no real auth.

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run lint` | ESLint check (flat config, `eslint .`) |
| `npm run preview` | Preview production build |

No test runner, no formatter (Prettier), no CI, no pre-commit hooks.

## Key Conventions

- **UI language:** Mexican Spanish throughout.
- **Auth:** Role stored in `localStorage.getItem("role")`. Roles defined in `src/data/roles.js`: `admin`, `direccion`, `vehicular`, `caseta`. Sidebar reads permissions from there.
- **Tailwind v4:** Uses `@import "tailwindcss"` in CSS (not `@tailwind` directives). Plugin `@tailwindcss/vite` in `vite.config.js`.
- **Routing:** All routes in `src/App.jsx` via `react-router-dom` v7 `<Routes>`. No lazy loading.
- **State:** React `useState` only — no external state library.
- **No TypeScript:** Pure JSX. `@types/react` are installed but unused.
- **`dist/` is pre-built and committed.**

## Architecture

```
src/main.jsx          — Entry point (BrowserRouter > App)
src/App.jsx           — Routes definition
src/pages/            — 7 page components (Landing, Login, Dashboard, Vehicular, Caseta, Admin, DirySec)
src/components/       — Sidebar.jsx (shared nav, reads role from localStorage)
src/data/roles.js     — Role → permissions mapping
src/index.css         — Tailwind import + body reset
```

## Gotchas

- ESLint is the only check. Run `npm run lint` after making changes.
- No CI — linting is manual.
- `public/icons.svg` is referenced directly in pages (not imported).
- Signature pads in `DirySec.jsx` use raw HTML5 Canvas — no library.
- The `Login.jsx` form shows but performs no real validation.
- `dist/` assets are hashed on build. After building, update any hardcoded references if needed.
