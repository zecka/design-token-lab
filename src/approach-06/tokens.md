# Approach 06 — Stateful Contrast Pairs

## Concept
Each role exposes variant-ready contrast pairs for rest and interaction states, so components choose a variant recipe while themes own every color decision.

## Aware Mode Analysis

Existing approaches cover these spaces:

| Approach | Strategy | Layers | Naming | Scope | Theming |
|----------|----------|--------|--------|-------|---------|
| 01 | Primitive palette to semantic role facets to component aliases | 3 plus surface roles | `--primitive-*`, `--role-*`, `--c-*` | Global role tokens with component aliases | Theme and mode remap role tokens |
| 02 | Direct role facets with explicit interaction states | 2 | `--role-*-fill`, `--role-*-tint`, `--badge-*` | Global role tokens bound into badge slots | Theme and mode redefine every role facet |
| 03 | Perceptual chromatic dimensions | 3 | `--chroma-*`, `--echo-*`, `--trace-*`, `--mark-*`, `--script-*` | Global chromatic tokens bound into badge dimensions | Theme and mode redefine dimensions |
| 04 | Contextual slot binding | 3 | `--pal-*`, `--_*` | Role selectors bind private context slots consumed by components | Theme and mode redefine palette and surfaces |

Approach 06 is meaningfully different because the main abstraction is not a palette ramp, chromatic quality, or generic component slot. It defines stateful surface/ink pairs per role and variant, treating contrast as the portable token contract. Components consume the same pair facets for rest, hover, active, focus, and disabled behavior without deciding how to darken, tint, or switch ink.

## Token Architecture

| Facet | Surface role | Origin & intent |
|-------|--------------|-----------------|
| `--pair-[role]-highlight-bg` | vivid fill | The role's strongest expression for primary actions and high-emphasis badges; exact brand colors are used here for `brand1`, `brand2`, and `brand3`. |
| `--pair-[role]-highlight-fg` | text on vivid fill | Contrast-matched ink for readable labels over `highlight-bg`; may be warm near-cream or deep ink depending on the role color. |
| `--pair-[role]-highlight-border` | vivid border | Border aligned with the high-emphasis fill, allowing solid badges and cards to keep a defined edge. |
| `--pair-[role]-highlight-bg-hover` | vivid hover fill | The interactive continuation of `highlight-bg`, tuned per theme rather than calculated in component rules. |
| `--pair-[role]-highlight-bg-active` | vivid pressed fill | The pressed state of the high-emphasis surface, preserving contrast with `highlight-fg`. |
| `--pair-[role]-soft-bg` | faint background | A quiet tinted surface for low-emphasis badges, nested content, and subtle status areas. |
| `--pair-[role]-soft-fg` | text on faint background | Readable role-colored ink for text on `soft-bg`, tuned independently from the vivid ink. |
| `--pair-[role]-soft-border` | faint border | Soft edge definition when the background alone is not enough to separate from the page surface. |
| `--pair-[role]-soft-bg-hover` | faint hover background | Slightly stronger soft surface for hover while staying low emphasis. |
| `--pair-[role]-soft-bg-active` | faint pressed background | Pressed state for soft controls and quiet selectable surfaces. |
| `--pair-[role]-outline-bg` | transparent or ambient background | The resting background for outline variants; usually transparent, but can resolve to an ambient surface in contexts that need containment. |
| `--pair-[role]-outline-fg` | outline text | Role-colored readable ink for transparent or ambient surfaces. |
| `--pair-[role]-outline-border` | outline stroke | The visible role stroke for outline controls, tuned separately from soft and highlight borders. |
| `--pair-[role]-outline-bg-hover` | outline hover wash | The tinted wash introduced when an outline control is hovered. |
| `--pair-[role]-outline-border-hover` | outline hover stroke | A stronger stroke for hover and selected-like emphasis. |
| `--pair-[role]-focus-ring` | focus indicator | Accessible focus ring color associated with the role, independent from border and fill tokens. |
| `--pair-[role]-focus-gap` | focus separation | Local surface color used for the outline offset gap so focus remains visible across modes. |
| `--pair-[role]-disabled-bg` | disabled background | Non-role-specific muted surface assigned through the pair contract so components do not reference raw disabled colors. |
| `--pair-[role]-disabled-fg` | disabled text | Muted text for disabled state, guaranteed to look inactive without relying on opacity alone. |
| `--pair-[role]-disabled-border` | disabled border | Muted edge for disabled state, keeping layout and shape stable. |
| `--surface-canvas` | page background | Theme and mode surface foundation used behind components and as the root for transparent outline behavior. |
| `--surface-panel` | raised surface | Card and panel background for the first raised layer. |
| `--surface-panel-alt` | nested surface | Secondary surface for nested card sections and media wells. |
| `--surface-border` | structural border | Neutral edge for cards, panels, dividers, and non-role component frames. |
| `--surface-border-hover` | structural hover border | Theme-level hover edge, commonly mapped from the primary pair without requiring card rules to know the role. |
| `--ink-strong` | primary text | Main readable text on neutral surfaces. |
| `--ink-muted` | secondary text | Supporting readable text on neutral surfaces. |
| `--ink-subtle` | metadata text | Lowest-emphasis text that still belongs to the active theme surface. |
| `--component-bg` | resolved component background | Component-local alias selected from one of the role pair backgrounds by variant and state. |
| `--component-fg` | resolved component text | Component-local alias selected from the paired foreground token. |
| `--component-border` | resolved component edge | Component-local alias selected from the pair border token. |
| `--component-focus-ring` | resolved focus ring | Component-local alias for the role focus ring. |
| `--component-focus-gap` | resolved focus gap | Component-local alias for the theme-aware focus separation color. |

Roles supported by every `--pair-[role]-*` facet: `primary`, `neutral`, `success`, `error`, `morning`, `afternoon`, `evening`, `brand1`, `brand2`, `brand3`.

Theme families:

| Family | Role color direction |
|--------|----------------------|
| `luxury` | Warm bronze primary, warm stone neutral, deep forest success, dusty terracotta error, mineral morning, honey afternoon, warm indigo evening. |
| `cozy` | Softer and warmer equivalents with coral bronze primary, greige neutral, sage success, brick rose error, softened mineral morning, apricot afternoon, plum evening. |

Modes:

| Mode | Pair behavior |
|------|---------------|
| `light` | Soft pairs are pale tints with deep ink; highlight pairs are deeper fills with near-cream or dark contrast ink. |
| `dark` | Soft pairs become deep tinted surfaces with brighter role ink; highlight pairs become lifted mid-chroma fills with dark contrast ink when needed. |

Mandatory exact brand color placement:

| Role | Exact color | Token requirement |
|------|-------------|-------------------|
| `brand1` | `#F6D425` | `--pair-brand1-highlight-bg` in every theme and mode. |
| `brand2` | `#3B2A5A` | `--pair-brand2-highlight-bg` in every theme and mode. |
| `brand3` | `#3B6FB5` | `--pair-brand3-highlight-bg` in every theme and mode. |

## Example Usage

```css
.badge-primary[data-role="primary"] {
  --component-focus-ring: var(--pair-primary-focus-ring);
  --component-focus-gap: var(--pair-primary-focus-gap);
  --component-disabled-bg: var(--pair-primary-disabled-bg);
  --component-disabled-fg: var(--pair-primary-disabled-fg);
  --component-disabled-border: var(--pair-primary-disabled-border);
}

.badge-primary[data-variant="highlight"][data-role="primary"] {
  --component-bg: var(--pair-primary-highlight-bg);
  --component-fg: var(--pair-primary-highlight-fg);
  --component-border: var(--pair-primary-highlight-border);

  background-color: var(--component-bg);
  color: var(--component-fg);
  border-color: var(--component-border);

  &:hover {
    --component-bg: var(--pair-primary-highlight-bg-hover);
    --component-border: var(--pair-primary-highlight-bg-hover);
  }

  &:focus-visible {
    outline-color: var(--component-focus-ring);
    box-shadow: 0 0 0 2px var(--component-focus-gap);
  }

  &:active {
    --component-bg: var(--pair-primary-highlight-bg-active);
    --component-border: var(--pair-primary-highlight-bg-active);
  }

  &:disabled {
    --component-bg: var(--component-disabled-bg);
    --component-fg: var(--component-disabled-fg);
    --component-border: var(--component-disabled-border);
  }
}

.badge-primary[data-variant="soft"][data-role="primary"] {
  --component-bg: var(--pair-primary-soft-bg);
  --component-fg: var(--pair-primary-soft-fg);
  --component-border: var(--pair-primary-soft-border);
}

.badge-primary[data-variant="outline"][data-role="primary"] {
  --component-bg: var(--pair-primary-outline-bg);
  --component-fg: var(--pair-primary-outline-fg);
  --component-border: var(--pair-primary-outline-border);
}
```
