# Design Token Lab

A static CSS playground for experimenting with different semantic color token strategies. Each approach lives in isolation so naming models, mapping layers, and component patterns can be compared side by side.

This is not a component library. It is a scratchpad for design token research — specifically semantic color tokens, CSS custom properties, theme-agnostic naming, and utility mapping ideas.

---

## Goal

Compare different strategies for:

- Naming and structuring CSS custom property color tokens
- Choosing how many layers sit between raw values and components
- Expressing component intent without referencing raw values directly in component selectors
- Keeping tokens theme-agnostic (no "light" or "dark" in names)

---

## Project structure

```
src/
  index.html          Homepage linking all approaches
  index.css           Homepage styles
  approach-01/
    index.html        Standalone demo
    index.css         Standalone styles + all token layers
  approach-02/
    index.html
    index.css
  approach-03/
    index.html
    index.css
dist/                 Built output (copy of src/)
scripts/
  build.js            Build script (Node.js, no dependencies)
.github/
  workflows/
    deploy.yml        GitHub Pages deployment
```

---

## Running locally

```bash
# Dev — watch + serve in one terminal
npm run dev

# Build once (no server)
npm run build

# Serve dist/ without watch
npm run preview
```

No install step required. All scripts use `npx serve` and Node.js built-ins.

`npm run dev` starts the file watcher and local server together. Ctrl+C stops both. The build processes `<include>` tags and copies `src/` → `dist/`.

---

## Adding a new approach

1. Create a new folder: `src/approach-XX/`
2. Add `index.html` and `index.css` — fully self-contained, no shared dependencies
3. Add a link in `src/index.html` inside the `.approach-list`
4. Push to `main` — GitHub Pages deploys automatically

Each approach must be standalone. Do not import files from other approaches or from the root `src/`.

---

## Token principles

- Components reference semantic tokens only — never raw palette values inside component selectors.
- Token names are theme-agnostic — no "light" or "dark" in any name.
- Color roles describe intent (`primary`, `success`, `error`) not appearance.
- The number of layers between raw values and components is itself a variable — each approach may test a different depth.

---

## Token layering — what each approach can explore

The primitive layer is not a universal requirement. It is one strategy among others.

```
Option A — three layers (approach-01)
  raw value → primitive token → semantic role → component alias

Option B — two layers
  raw value → semantic role → component alias
  (no separate primitive layer; raw values live directly in semantic tokens)

Option C — one layer
  raw value → component token
  (flat, no indirection)
```

Each option trades off differently on reusability, maintainability, and explicitness. This lab exists to surface those trade-offs through real examples.

---

## Approaches

### Approach 01 — Three-layer: Primitive → Role → Component alias

```
--primitive-gold-600     →  --role-primary-base   →  --c-base
--primitive-gold-300     →  --role-primary-border  →  --c-border
--primitive-gold-100     →  --role-primary-subtle  →  --c-subtle
```

Raw values live in primitives. Semantic roles reference primitives. Component aliases (`--c-*`) are set per `data-role` and consumed by component rules. No raw values appear inside component selectors.

**Component:** Badge / Tag  
**Variants:** highlight (solid), soft (tinted), outline (border only)  
**Color roles:** primary, neutral, success, error, morning, afternoon, evening  
**States:** normal, hover, focus, active, disabled

---

## Deployment

Merging to `main` triggers the GitHub Actions workflow at `.github/workflows/deploy.yml`.

The workflow:
1. Runs `node scripts/build.js` to copy `src/` → `dist/`
2. Uploads `dist/` as a Pages artifact
3. Deploys via `actions/deploy-pages`

To enable GitHub Pages on a new repository:  
**Settings → Pages → Source → GitHub Actions**

---

## Brand direction

Swiss luxury wellness. Warm, premium, calm, refined.

Palettes used in approach-01:
- **Gold** — warm amber-bronze (primary)
- **Stone** — warm greige neutral
- **Sage** — deep forest green (success)
- **Terra** — muted terracotta-rose (error)
- **Mist** — mineral blue-grey (morning)
- **Amber** — warm honey-mustard (afternoon)
- **Dusk** — warm indigo-violet (evening)
