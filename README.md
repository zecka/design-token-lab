# Design Token Lab

A static CSS playground for experimenting with different semantic color token strategies. Each approach lives in isolation so naming models, mapping layers, and component patterns can be compared side by side.

This is not a component library. It is a scratchpad for design token research — specifically semantic color tokens, CSS custom properties, theme-agnostic naming, and utility mapping ideas.

---

## Goal

Compare different strategies for:

- Naming and structuring CSS custom property color tokens
- Mapping primitive palettes to semantic roles
- Expressing component intent without referencing raw values
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
# Dev server — serves src/ with live reload via npx
npm run dev

# Build — copies src/ into dist/
npm run build

# Preview — serves dist/ locally
npm run preview
```

No install step required. `npm run dev` and `npm run preview` use `npx serve` directly.

---

## Adding a new approach

1. Create a new folder: `src/approach-XX/`
2. Add `index.html` and `index.css` — fully self-contained, no shared dependencies
3. Add a link in `src/index.html` inside the `.approach-list`
4. Push to `main` — GitHub Pages deploys automatically

Each approach must be standalone. Do not import files from other approaches or from the root `src/`.

---

## Token principles

- Components reference semantic tokens only — never raw palette values.
- Primitive tokens hold raw values and exist solely to feed semantic layers.
- Token names are theme-agnostic — no "light" or "dark" in any name.
- Color roles describe intent (`primary`, `success`, `error`) not appearance.

---

## Approach 01 — Role-Based Semantic Tokens

Demonstrates a three-layer token architecture:

```
Primitive  →  Role  →  Component alias
--primitive-gold-600     --role-primary-base      --c-base
--primitive-gold-300     --role-primary-border    --c-border
--primitive-gold-100     --role-primary-subtle    --c-subtle
```

**Component:** Badge / Tag  
**Variants:** highlight (solid), soft (tinted), outline (border only)  
**Color roles:** primary, neutral, success, error, morning, afternoon, evening  
**States:** normal, hover, focus, active, disabled

Components use only `--c-*` aliases. The role is resolved by `data-role` on the element, which maps to the right `--role-*` tokens. No raw values appear inside component selectors.

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
