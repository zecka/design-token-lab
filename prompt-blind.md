# Prompt — New Approach (Blind)

Use this prompt to create a new approach without being influenced by existing ones.

---

XX = 04

## Task

You are working in a static CSS design token playground called **Design Token Lab**.
Your job is to create a new approach folder: `src/approach-XX/`.

**Do not read, open, or reference any existing approach folder.**
Do not look at `src/approach-01/`, `src/approach-02/`, or any other `approach-*` files.
Come up with your own token naming strategy from scratch.

---

## Project context

This is a plain HTML and CSS playground. No framework. No JavaScript. No build-time CSS processing.

The project explores different ways to name and structure CSS custom property color tokens.
Each approach is fully standalone: one HTML file, one CSS file.

Page layout styles and the badge demo HTML are shared via a build step:
- `src/shared/demo.css` — page chrome (header, grid, disabled section styles). Already exists.
- `src/components/badge.html` — the badge demo HTML (grid + disabled + in-context). Already exists.

The build script resolves `<include src="...">` tags in HTML files before copying to `dist/`.

---

## What to create

Two files only:

### `src/approach-XX/index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Approach XX — [Your approach name]</title>
  <link rel="stylesheet" href="../shared/demo.css" />
  <link rel="stylesheet" href="index.css" />
</head>
<body>

  <header class="page-header">
    <a class="page-header__back" href="../index.html">← Back to overview</a>
    <p class="page-header__eyebrow">Approach XX</p>
    <h1 class="page-header__title">[Your approach name]</h1>
    <p class="page-header__desc">
      [One or two sentences describing the token strategy this approach demonstrates.]
    </p>
  </header>

  <main class="page-main">

    <!-- Token Architecture Reference -->
    <!-- Show a few concrete examples of your token naming using .token-map classes -->
    <section>
      <p class="token-map__title">Token Architecture</p>
      <div class="token-map">
        <!--
          Add one .token-map__row per property you want to illustrate.
          Each row is a horizontal chain showing how one token resolves.
          Use .token-map__layer--a / --b / --c only for visual distinction — they carry no semantic meaning.
          Use as many layers per row as your architecture actually has. One layer and three layers are equally valid.

          Example of a two-layer chain:
          <div class="token-map__row">
            <span class="token-map__layer">--your-token-name: #value</span>
            <span class="token-map__arrow">→</span>
            <span class="token-map__layer">--component-property: var(--your-token-name)</span>
          </div>
        -->
      </div>
    </section>

    <include src="../components/badge.html"></include>

  </main>

</body>
</html>
```

### `src/approach-XX/index.css`

This file must contain:
1. Your token definitions (whatever layers you choose)
2. The `.badge` component styles

Rules for the CSS:
- Component selectors (`.badge`, `.badge[data-variant="..."]`, etc.) must not contain any raw color values (no hex, no rgb, no hsl). They reference CSS custom properties only.
- Token names must be theme-agnostic. No "light", "dark", "white", "black" in token names.
- Token names must not mirror the HTML attribute names. `data-role` is an implementation detail — do not let it dictate your token prefix or naming convention.
- The `.badge` component reads color via `data-role` attribute on the element.
- `data-role` values: `primary`, `neutral`, `success`, `error`, `morning`, `afternoon`, `evening`, `brand1`, `brand2`, `brand3`
- `data-variant` values: `highlight` (solid fill), `soft` (tinted background), `outline` (border only)

---

## Badge component spec

Each badge is a `<button>` element with two data attributes:
- `data-role="primary"` (or neutral, success, error, morning, afternoon, evening)
- `data-variant="highlight"` (or soft, outline)

The demo grid in `badge.html` shows all 7 roles × 3 variants.
The disabled section shows all roles in all variants with the `disabled` HTML attribute.

Required interactive states: normal, hover, focus-visible, active, disabled.

---

## Brand colors — mandatory rule

Three roles (`brand1`, `brand2`, `brand3`) carry exact brand identity colors. Every approach
**must** surface these colors. They are deliberately outside the "Swiss wellness" palette —
the whole point is to test colors that clash with a pre-existing design system, where the
brand color does not naturally fit the token scale.

Exact hex values (identical across all approaches — do not alter them):

- `brand1` — light yellow `#F6D425`
- `brand2` — dark violet `#3B2A5A`
- `brand3` — medium blue `#3B6FB5`

Rules:

- **highlight** and **outline** must respect the EXACT brand color (highlight background =
  exact hex; outline border + text derived from the brand color).
- **soft** may deviate: if the brand color is legible as text (e.g. dark violet), use it as the
  text color over a derived soft background. If it is too light to read (yellow), soft may
  diverge from the exact value.
- The text color on the **highlight** brand badge MUST reach **WCAG AA contrast (4.5:1)**
  against the exact background. This is the core challenge: `brand1` (light) forces dark text,
  `brand2` (dark) forces light text, `brand3` (mid) is borderline — pick the side that passes.

The grid in `badge.html` shows the three brand roles in a separate group labeled "Brand colors"
below the seven semantic roles.

---

## Brand direction

Swiss luxury wellness. Warm, premium, calm, refined.
Avoid generic SaaS colors. Avoid oversaturated palettes.
Prefer warm neutrals, subtle gold/bronze, deep greens, soft mineral tones.

Color meanings and their character:
- **primary** — warm gold or bronze, the brand's main accent
- **neutral** — warm stone or greige, background-safe
- **success** — deep forest or sage green
- **error** — muted terracotta or dusty rose, never screaming red
- **morning** — soft mineral, cool-leaning (mist, pale slate)
- **afternoon** — warm amber or honey
- **evening** — deep indigo or warm violet

---

## Token layering — your choice

You decide how many layers sit between raw color values and component rules.
Some options:

```
Option A — three layers
  raw value → named palette token → semantic role token → component alias

Option B — two layers
  raw value → semantic role token → component alias
  (raw values live directly inside role token definitions, no separate palette)

Option C — one layer
  raw value → component token directly
  (flat, no indirection at all)

Option D — something else entirely
  Invent your own model. Justify it briefly in the page description.
```

---

## After creating the files

Also update `src/index.html`: add a new `<li>` in the `.approach-list` linking to `approach-XX/index.html`, with a short description of the token strategy.
