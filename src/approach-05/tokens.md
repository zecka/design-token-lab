# Approach 05 — Semantic Intent Stack

## Concept
Semantic roles (primary, neutral, success, error, time-of-day, brand) each have three intensity variants (highlight, soft, outline) with dedicated fill, text, and border tokens for complete surface control.

## Token Architecture

| Facet | Surface role | Origin & intent |
|-------|--------------|-----------------|
| `--color-{role}-highlight-fill` | vivid fill | primary action, strong emphasis |
| `--color-{role}-highlight-text` | text on highlight | legible contrast on vivid fill |
| `--color-{role}-highlight-border` | border/stroke | reinforce primary action boundary |
| `--color-{role}-soft-fill` | subtle background | secondary actions, gentle emphasis |
| `--color-{role}-soft-text` | text on soft fill | readable text over soft background |
| `--color-{role}-soft-border` | faint stroke | light boundary, de-emphasized |
| `--color-{role}-outline-fill` | transparent fill | ghost button, hollow state |
| `--color-{role}-outline-text` | outline text | label for outline variant |
| `--color-{role}-outline-border` | solid outline stroke | visible but not filled |
| `--surface-base` | page/container background | theme root, context reset |
| `--surface-raised` | card/panel background | elevated surface above base |
| `--surface-overlay` | modal/dropdown bg | topmost, isolated context |

**Roles:** primary, neutral, success, error, morning, afternoon, evening, brand1, brand2, brand3

## Example Usage

### Badge Component

```css
.badge {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

/* Highlight variant: vivid, primary state */
.badge[data-variant="highlight"] {
  background-color: var(--color-primary-highlight-fill);
  color: var(--color-primary-highlight-text);
  border-color: var(--color-primary-highlight-border);
}

.badge[data-variant="highlight"]:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.badge[data-variant="highlight"]:focus-visible {
  outline: 2px solid var(--color-primary-highlight-border);
  outline-offset: 2px;
}

.badge[data-variant="highlight"]:active {
  transform: translateY(0);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.badge[data-variant="highlight"]:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Soft variant: secondary, de-emphasized */
.badge[data-variant="soft"] {
  background-color: var(--color-primary-soft-fill);
  color: var(--color-primary-soft-text);
  border-color: var(--color-primary-soft-border);
}

.badge[data-variant="soft"]:hover {
  background-color: var(--color-primary-highlight-fill);
  color: var(--color-primary-highlight-text);
}

/* Outline variant: ghost, hollow */
.badge[data-variant="outline"] {
  background-color: transparent;
  color: var(--color-primary-outline-text);
  border-color: var(--color-primary-outline-border);
}

.badge[data-variant="outline"]:hover {
  background-color: var(--color-primary-soft-fill);
  color: var(--color-primary-soft-text);
}

/* Dynamic role switching */
.badge[data-role="primary"] { --role: primary; }
.badge[data-role="success"] { --role: success; }
.badge[data-role="error"] { --role: error; }
.badge[data-role="neutral"] { --role: neutral; }
```
