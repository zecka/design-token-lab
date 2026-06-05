# Prompt — Step 3: Card Implementation

Extend `src/approach-XX/index.css` and `src/approach-XX/index.html` with card component.

---

## Input from Steps 1–2

You have:
- `src/approach-XX/tokens.md` (token architecture reference)
- `src/approach-XX/index.css` (badge styles — keep all of this)
- `src/approach-XX/index.html` (badge demo — keep everything, add card section below)

---

## Your task

### 1. Extend `src/approach-XX/index.css`

Add the `.card` component styles. The card demonstrates:

- **Surface layering:** three depth levels
  - Page background (lowest)
  - Raised card surface (middle)
  - Inset nested element (highest)
  
- **Text hierarchy:** primary text (title) vs secondary text (metadata, description)

- **Hover state:** border-color shift on the full card

- **Badge in context:** existing `.badge` elements inside the card body must work without modification

**Rules:**
- No raw color values
- All colors via CSS custom properties
- Card structure is theme-agnostic; theming happens only via token re-mapping

### 2. Extend `src/approach-XX/index.html`

Add this section **after** the badge section (before closing `</main>`):

```html
<include src="../components/card.html"></include>
```

The card HTML is already structured in a shared file. Your CSS will style it.

---

## Card component spec (reference)

`src/components/card.html` contains:
- A `.card-grid` with 3 cards
- Each card is an `<article class="card">`
- Three card types:
  1. Card with image area and nested items
  2. Card with nested items
  3. Minimal card

Each card includes:
- Card surface (background, border)
- Card title (primary text)
- Card description (secondary text)
- Optional badge elements inside the card body
- Hover state on border-color

---

## Surface layering example (how tokens should work)

```
Page background:         neutral or surface token
Card surface:            raised token (slightly lighter or darker)
Nested element inside:   even higher layer (inset visual)
Title text:              semantic text token
Description text:        muted/secondary text token
Card border:             border/edge token
Card border (hover):     darker or more saturated border token
```

How you implement this is up to your token model.
Example approaches:
- Separate `--card-bg`, `--card-surface`, `--card-nested`, `--card-border`, `--card-border-hover`
- Use existing tokens with different scopes: `:root` + `.card { --bg: ...; --border: ...; }`
- Use CSS cascade layers to override badge tokens in card context

---

## Deliverables

Return one code block with the **complete updated** `index.css`:

```css
/* Your complete CSS here — badge styles + new card styles */
```

Then report:
```
✓ Updated index.css with card styles
Ready for Step 4: Multi-theming
```

Note: The HTML already has the card include, so no HTML changes needed.

---

## Next step (reference only)

Step 4 will generate the 4 theme variations (luxury light/dark, cozy light/dark) and a `demo.css` file for theming overrides.
