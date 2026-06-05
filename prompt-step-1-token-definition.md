# Prompt — Step 1: Token Definition (Interactive)

Ask questions, read existing approaches if needed, generate token architecture.

---

## Your role

You are an agent designing a new approach for Design Token Lab. Your job is to:
1. Ask which approach number to create
2. Ask: blind mode or aware mode?
3. If aware: read existing approaches, evaluate if you can propose something genuinely better
4. Output token architecture to `src/approach-XX/tokens.md`

---

## Initial questions to ask

Ask these in order:

### Question 1: Approach number
"What approach number should I create? (e.g., 05, 06, 07...)"

### Question 2: Blind or Aware?
```
Blind mode: Create a completely new token model from scratch. 
I will NOT look at existing approaches.

Aware mode: I will read existing approaches (01-04), understand what's 
been explored, then propose something meaningfully different.

Which mode? (blind/aware)
```

---

## If AWARE mode

After the user chooses "aware":

1. **Read all existing approaches** in `src/approach-*/index.css`
2. **Analyze** what token strategies exist:
   - How many layers?
   - Naming conventions?
   - Scope (global vs. component)?
   - Theming approach?
3. **Decide:** Can you genuinely propose something different and better?
   - If YES: explain briefly what makes it different, then proceed
   - If NO: **Stop here.** Say explicitly: "I cannot propose a genuinely different approach. Approach XX already covers this space well because [reason]. Recommend exploring [different angle] instead."

---

## If BLIND mode

Skip the analysis. Go straight to design phase.

---

## Design phase (both modes)

Define your token architecture:

1. **Short name** — e.g., "OKLCH-Based Chromatic Layers", "Semantic Intent Stack"
2. **One-sentence concept** — the core idea
3. **Token facets table** — all layers and their purpose

### Table format:

| Facet | Surface role | Origin & intent |
|-------|--------------|-----------------|
| `--token-name-*` | eg. vivid fill | explanation |
| `--token-name-*` | eg. faint bg | explanation |

### Table requirements:
- One row per token facet
- Facet column: the CSS custom property naming pattern
- Surface role: what visual purpose (fill, bg, border, text, etc.)
- Intent: why it exists and how it's used

---

## Key constraints (all modes)

- Component selectors reference CSS custom properties only — no raw values
- Token names are theme-agnostic (no "light", "dark", "white", "black")
- Multi-theming required: (luxury | cozy) × (light | dark)
- All roles supported: `primary`, `neutral`, `success`, `error`, `morning`, `afternoon`, `evening`, `brand1`, `brand2`, `brand3`
- Three variants: `highlight`, `soft`, `outline`

### Brand colors (exact, mandatory)
- `brand1` #F6D425 (light yellow)
- `brand2` #3B2A5A (dark violet)
- `brand3` #3B6FB5 (medium blue)

### Brand direction
Swiss luxury wellness: warm, premium, calm, refined.
- **primary** — warm gold or bronze
- **neutral** — warm stone or greige
- **success** — deep forest or sage green
- **error** — muted terracotta or dusty rose
- **morning** — soft mineral, cool-leaning
- **afternoon** — warm amber or honey
- **evening** — deep indigo or warm violet

---

## Example architectures (inspiration only)

**Layered by intensity:**
- `--chroma-*` → vivid fill
- `--echo-*` → faint bg
- `--trace-*` → border / edge
- `--mark-*` → ink on vivid
- `--script-*` → ink on soft

**Semantic intent:**
- `--fill` → dominant color (highlight)
- `--soft` → tinted background
- `--text` → readable ink
- `--border` → boundary line

---

## Deliverable

Create `src/approach-XX/tokens.md` with this structure:

```markdown
# Approach XX — [Your approach name]

## Concept
[One sentence describing the token strategy.]

## Token Architecture

| Facet | Surface role | Origin & intent |
|-------|--------------|-----------------|
| `--token-name-*` | vivid fill | explanation |
| ... | ... | ... |

```

Then report:
```
✓ Created src/approach-XX/tokens.md
Ready for Step 2: Badge implementation
```

---

## Next steps (reference only)

- Step 2: Use tokens.md to generate CSS + HTML with badge component
- Step 3: Add card component with surface layering
- Step 4: Generate all 4 theme combinations
