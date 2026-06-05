# Prompt — Step 2: Badge Implementation

Generate `src/approach-XX/index.css` and `src/approach-XX/index.html` with badge component only.

---

## Input from Step 1

Read: `src/approach-XX/tokens.md` (created in Step 1)

---

## Your task

### 1. Create `src/approach-XX/index.css`

This file contains:
1. All token definitions for the single theme (luxury light by default)
2. CSS custom properties for all tokens
3. The `.badge` component styles with all 7 roles × 3 variants
4. Interactive states: normal, hover, focus-visible, active, disabled

**Rules:**
- No raw color values inside component selectors
- All token references use CSS custom properties
- Each badge element has `data-role` and `data-variant` attributes
- `data-role`: `primary`, `neutral`, `success`, `error`, `morning`, `afternoon`, `evening`, `brand1`, `brand2`, `brand3`
- `data-variant`: `highlight`, `soft`, `outline`

**Brand color rules:**
- `brand1` (#F6D425): must use exact hex for highlight; soft may deviate if text contrast fails; outline uses exact hex
- `brand2` (#3B2A5A): must use exact hex for highlight and outline; text must reach WCAG AA contrast
- `brand3` (#3B6FB5): must use exact hex for highlight and outline; text contrast critical

### 2. Create `src/approach-XX/index.html`

Template structure (fill in token facets from tokens.md):

```html
<!DOCTYPE html>
<html lang="en" data-theme="luxury" data-mode="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Approach XX — [Your approach name]</title>
  <link rel="stylesheet" href="../shared/demo.css" />
  <link rel="stylesheet" href="demo.css" />
  <link rel="stylesheet" href="index.css" />
</head>
<body>

  <header class="page-header">
    <a class="page-header__back" href="../index.html">← Back to overview</a>
    <p class="page-header__eyebrow">Approach XX</p>
    <h1 class="page-header__title">[Your approach name]</h1>
    <p class="page-header__desc">
      [One or two sentences describing the token strategy from tokens.md.]
    </p>
  </header>

  <include src="../components/theme-switcher.html"></include>

  <main class="page-main">

    <!-- Token Architecture Reference -->
    <section>
      <p class="token-map__title">Token Architecture</p>
      <table class="token-legend">
        <thead>
          <tr>
            <th>Facet</th>
            <th>Surface role</th>
            <th>Intent</th>
          </tr>
        </thead>
        <tbody>
          <!-- Convert your tokens.md table to HTML rows here -->
          <tr>
            <td><code>--token-name-*</code></td>
            <td>vivid fill</td>
            <td>explanation</td>
          </tr>
        </tbody>
      </table>

      <div class="token-map">
        <!-- Show 2-3 concrete examples of token resolution chains -->
        <div class="token-map__row">
          <span class="token-map__layer">--primitive-gold-600: #956b38</span>
          <span class="token-map__arrow">→</span>
          <span class="token-map__layer">--your-semantic-token: var(--primitive-gold-600)</span>
          <span class="token-map__arrow">→</span>
          <span class="token-map__layer">--badge-fill: var(--your-semantic-token)</span>
        </div>
      </div>
    </section>

    <include src="../components/badge.html"></include>

  </main>

</body>
</html>
```

**Note:** Keep `data-theme="luxury"` and `data-mode="light"` fixed. No theme switching yet.

---

## Badge component spec (reference)

- Grid of all 7 roles × 3 variants = 21 badges
- Disabled section: all 7 roles in all 3 variants with `disabled` attribute
- Required states: normal, hover, focus-visible, active, disabled

---

## Deliverables

Create three files and report completion:

### 1. `src/approach-XX/index.css`
```css
/* Your complete CSS here */
```

### 2. `src/approach-XX/index.html`
```html
<!-- Your complete HTML here -->
```

### 3. `src/approach-XX/demo.css`
```css
/* Empty for now — filled in Step 4 */
```

Then report:
```
✓ Created index.css, index.html, demo.css
Ready for Step 3: Card implementation
```
