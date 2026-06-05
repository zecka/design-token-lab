# Prompt — Step 4: Multi-Theming

Generate `src/approach-XX/demo.css` with all 4 theme combinations.

---

## Input from Steps 1–3

You have:
- `src/approach-XX/tokens.md` (token architecture reference)
- `src/approach-XX/index.css` with complete badge + card styles (single theme: luxury light)
- `src/approach-XX/index.html` with token architecture, badge, and card sections
- `src/approach-XX/demo.css` (empty — you will fill this now)

---

## Your task

Create `src/approach-XX/demo.css` that re-maps tokens for all 4 theme combinations:

1. `[data-theme="luxury"][data-mode="light"]` — current (no change needed, but define it explicitly)
2. `[data-theme="luxury"][data-mode="dark"]` — darker variant of luxury
3. `[data-theme="cozy"][data-mode="light"]` — warmer alternative
4. `[data-theme="cozy"][data-mode="dark"]` — warmer + dark

### Token re-mapping rules

- Component styles (`.badge`, `.card`) stay **100% identical** across all 4 themes
- Only the **token layer(s) your architecture designates** are re-mapped in `demo.css`
- Use attribute selectors to scope the re-mapping:
  ```css
  [data-theme="luxury"][data-mode="dark"] {
    --your-token-name: new-value;
    /* more token overrides */
  }
  ```

### Theming guidance

**Luxury palette** (already in `index.css`):
- warm gold/bronze primary
- warm stone/greige neutral
- deep forest/sage success
- muted terracotta error
- soft mineral morning
- warm amber afternoon
- deep indigo evening

**Cozy palette** (warmer, softer alternative):
- warm terracotta primary
- warm cream neutral
- toasted amber afternoon
- earthy success tone
- dusty rose error
- similar evening tones
- similar morning/brand tones

**Dark mode adjustments:**
- Luxury dark: maintain refinement, use darker/cooler inverted tones
- Cozy dark: maintain warmth, shift toward richer, darker earth tones

---

## Optional: Page styling overrides

If your approach needs page-specific styling (background color, font override, etc.), add it to `demo.css` under appropriate selectors. Keep it minimal — focus on token re-mapping.

Example:
```css
[data-theme="cozy"] {
  --page-bg: warmer-neutral;
}

[data-mode="dark"] body {
  background-color: var(--page-bg);
}
```

---

## Deliverable

Return one code block:

```css
/* Complete demo.css with all 4 theme token re-mappings */
```

Then update `src/index.html`:

```html
<!-- Add this <li> to the .approach-list -->
<li>
  <a class="approach-item" href="approach-XX/index.html">
    <span class="approach-item__number">XX</span>
    <span class="approach-item__body">
      <span class="approach-item__title">[Your approach name]</span>
      <span class="approach-item__desc">[One sentence: token strategy + how it differs from existing approaches]</span>
    </span>
    <span class="approach-item__arrow">→</span>
  </a>
</li>
```

Then report:
```
✓ Created demo.css with 4 theme combinations
✓ Updated src/index.html with approach-XX listing
✓ Approach XX complete
```

---

## Verification (manual, you do this in browser)

1. Run build script to compile to `dist/`
2. Open `dist/approach-XX/index.html` in browser
3. Verify:
   - Click theme switcher (top-right)
   - All 4 combinations render correctly
   - Badges and cards look intentional in all themes
   - No visual regressions across theme switches
   - Text contrast readable in dark mode
   - Brand colors correct in all variants
