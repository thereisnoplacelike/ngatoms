# Brand Tokens Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder tokens in `packages/tokens` with a complete two-tier design token system (Japandi/Scandinavian/Apple aesthetic) covering colors, typography, spacing, and radius — and update the button primitive to reference the new semantic tokens.

**Architecture:** Primitive tokens define raw named values (`--nga-gray-900`, `--nga-gold-300`). Semantic tokens reference primitives and define roles (`--nga-color-primary`). Dark mode redefines only the semantic layer inside `.dark`. Components reference semantic tokens only — fallback values updated from old blue to new near-black.

**Tech Stack:** CSS custom properties, no build step.

---

## Chunk 1: Token File

### Task 1: Replace tokens.css with the full two-tier system

**Files:**
- Modify: `packages/tokens/src/tokens.css`

- [ ] **Step 1: Replace the entire file**

Write the following content to `packages/tokens/src/tokens.css`:

```css
/* =============================================================
   NgAtoms Design Tokens
   Two-tier system: primitives → semantic roles
   Dark mode: add .dark class to <html> or <body>
   ============================================================= */

/* ── Primitives: Neutral gray (warm undertone) ────────────── */
:root {
  --nga-gray-50:  #FAFAF9;
  --nga-gray-100: #F4F4F2;
  --nga-gray-200: #E8E8E5;
  --nga-gray-300: #D1D1CD;
  --nga-gray-400: #A8A8A3;
  --nga-gray-500: #7A7A75;
  --nga-gray-600: #525250;
  --nga-gray-700: #3A3A38;
  --nga-gray-800: #242422;
  --nga-gray-900: #141413;
  --nga-gray-950: #0A0A09;
}

/* ── Primitives: Gold (restrained accent) ─────────────────── */
:root {
  --nga-gold-50:  #FBF5E9;
  --nga-gold-100: #F0E0BC;
  --nga-gold-200: #DEC48A;
  --nga-gold-300: #C8A97E;
  --nga-gold-400: #B08D5A;
  --nga-gold-500: #8A6B3A;
}

/* ── Primitives: Green (muted sage, success only) ─────────── */
:root {
  --nga-green-50:  #F0F4EF;
  --nga-green-100: #D8E8D5;
  --nga-green-200: #AEC9A9;
  --nga-green-300: #7FA878;
  --nga-green-400: #527A4C;
  --nga-green-500: #365230;
}

/* ── Semantic: Light mode (default) ───────────────────────── */
:root {
  /* Surfaces */
  --nga-color-background:            var(--nga-gray-50);
  --nga-color-foreground:            var(--nga-gray-950);

  /* Primary action */
  --nga-color-primary:               var(--nga-gray-900);
  --nga-color-primary-foreground:    #ffffff;

  /* Secondary action */
  --nga-color-secondary:             var(--nga-gray-100);
  --nga-color-secondary-foreground:  var(--nga-gray-900);

  /* Muted / subdued */
  --nga-color-muted:                 var(--nga-gray-100);
  --nga-color-muted-foreground:      var(--nga-gray-500);

  /* Accent (gold — use sparingly) */
  --nga-color-accent:                var(--nga-gold-300);
  --nga-color-accent-foreground:     var(--nga-gold-500);

  /* Borders & rings */
  --nga-color-border:                var(--nga-gray-200);
  --nga-color-ring:                  var(--nga-gold-300);

  /* Card */
  --nga-color-card:                  #ffffff;
  --nga-color-card-foreground:       var(--nga-gray-950);

  /* Success */
  --nga-color-success:               var(--nga-green-400);
  --nga-color-success-foreground:    #ffffff;

  /* Destructive */
  --nga-color-destructive:           #A8392A;
  --nga-color-destructive-foreground: #ffffff;

  /* Radius */
  --nga-radius-none: 0;
  --nga-radius-sm:   0.25rem;
  --nga-radius-md:   0.5rem;
  --nga-radius-lg:   0.75rem;
  --nga-radius-xl:   1rem;
  --nga-radius-2xl:  1.5rem;
  --nga-radius-full: 9999px;

  /* Spacing (4px base) */
  --nga-space-1:  0.25rem;
  --nga-space-2:  0.5rem;
  --nga-space-3:  0.75rem;
  --nga-space-4:  1rem;
  --nga-space-5:  1.25rem;
  --nga-space-6:  1.5rem;
  --nga-space-8:  2rem;
  --nga-space-10: 2.5rem;
  --nga-space-12: 3rem;
  --nga-space-16: 4rem;
  --nga-space-20: 5rem;
  --nga-space-24: 6rem;

  /* Typography */
  --nga-font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --nga-font-mono: ui-monospace, 'Cascadia Code', 'Fira Code', monospace;

  --nga-text-xs:   0.75rem;
  --nga-text-sm:   0.875rem;
  --nga-text-base: 1rem;
  --nga-text-lg:   1.125rem;
  --nga-text-xl:   1.25rem;
  --nga-text-2xl:  1.5rem;
  --nga-text-3xl:  1.875rem;
  --nga-text-4xl:  2.25rem;

  --nga-font-weight-normal:   400;
  --nga-font-weight-medium:   500;
  --nga-font-weight-semibold: 600;
  --nga-font-weight-bold:     700;

  --nga-leading-tight:   1.25;
  --nga-leading-snug:    1.375;
  --nga-leading-normal:  1.5;
  --nga-leading-relaxed: 1.625;

  --nga-tracking-tight:  -0.02em;
  --nga-tracking-normal:  0em;
  --nga-tracking-wide:    0.05em;
  --nga-tracking-wider:   0.1em;
}

/* ── Semantic: Dark mode (.dark on <html> or <body>) ──────── */
.dark {
  /* Surfaces */
  --nga-color-background:            var(--nga-gray-950);
  --nga-color-foreground:            var(--nga-gray-50);

  /* Primary action */
  --nga-color-primary:               var(--nga-gray-100);
  --nga-color-primary-foreground:    var(--nga-gray-900);

  /* Secondary action */
  --nga-color-secondary:             var(--nga-gray-800);
  --nga-color-secondary-foreground:  var(--nga-gray-300);

  /* Muted / subdued */
  --nga-color-muted:                 var(--nga-gray-800);
  --nga-color-muted-foreground:      var(--nga-gray-500);

  /* Accent — gold steps up one shade for dark background contrast */
  --nga-color-accent:                var(--nga-gold-400);
  --nga-color-accent-foreground:     var(--nga-gold-50);

  /* Borders & rings */
  --nga-color-border:                var(--nga-gray-700);
  --nga-color-ring:                  var(--nga-gold-400);

  /* Card */
  --nga-color-card:                  var(--nga-gray-900);
  --nga-color-card-foreground:       var(--nga-gray-50);

  /* Success */
  --nga-color-success:               var(--nga-green-300);
  --nga-color-success-foreground:    var(--nga-gray-950);

  /* Destructive — same value, readable on dark */
  --nga-color-destructive:           #A8392A;
  --nga-color-destructive-foreground: #ffffff;
}
```

- [ ] **Step 2: Verify no syntax errors**

```bash
npx --yes csslint packages/tokens/src/tokens.css 2>&1 || true
```

If csslint isn't available, just open the file and check for obvious issues (unmatched braces, missing semicolons).

- [ ] **Step 3: Commit**

```bash
git add packages/tokens/src/tokens.css
git commit -m "feat(tokens): add full two-tier brand token system (Japandi/Scandinavian/Apple)"
```

---

## Chunk 2: Button Styles Update

### Task 2: Update button.styles.css to reference new semantic tokens

The button styles currently use hardcoded blue fallbacks (`#2563eb`) and hardcoded secondary/destructive colors that don't match the new palette. Update them to reference the new semantic tokens.

**Files:**
- Modify: `packages/primitives/src/button/button.styles.css`

- [ ] **Step 1: Update focus ring and variant fallbacks**

In `button.styles.css`, replace the entire `:root` block (lines 8–69) with:

```css
:root {
  /* Shape */
  --nga-btn-radius: var(--nga-radius-md, 0.5rem);
  --nga-btn-font-weight: 600;
  --nga-btn-gap: 0.5rem;
  --nga-btn-transition: background 150ms ease, border-color 150ms ease, opacity 150ms ease;

  /* Focus ring — gold from semantic token */
  --nga-btn-focus-ring-color: var(--nga-color-ring, #C8A97E);
  --nga-btn-focus-ring-offset: 2px;
  --nga-btn-focus-ring-width: 2px;

  /* Sizes — padding */
  --nga-btn-padding-xs: 3px 10px;
  --nga-btn-padding-sm: 5px 14px;
  --nga-btn-padding-md: 8px 20px;
  --nga-btn-padding-lg: 11px 28px;
  --nga-btn-padding-xl: 14px 36px;

  /* Sizes — font */
  --nga-btn-font-size-xs: 11px;
  --nga-btn-font-size-sm: 13px;
  --nga-btn-font-size-md: 14px;
  --nga-btn-font-size-lg: 16px;
  --nga-btn-font-size-xl: 18px;

  /* Sizes — spinner */
  --nga-btn-spinner-size-xs: 10px;
  --nga-btn-spinner-size-sm: 12px;
  --nga-btn-spinner-size-md: 14px;
  --nga-btn-spinner-size-lg: 16px;
  --nga-btn-spinner-size-xl: 18px;

  /* Variant: primary — near-black, fallback to #141413 */
  --nga-btn-primary-bg:        var(--nga-color-primary, #141413);
  --nga-btn-primary-fg:        var(--nga-color-primary-foreground, #ffffff);
  --nga-btn-primary-bg-hover:  color-mix(in srgb, var(--nga-btn-primary-bg) 85%, black);
  --nga-btn-primary-bg-active: color-mix(in srgb, var(--nga-btn-primary-bg) 75%, black);

  /* Variant: outline — near-black border */
  --nga-btn-outline-border:    var(--nga-color-primary, #141413);
  --nga-btn-outline-fg:        var(--nga-color-primary, #141413);
  --nga-btn-outline-bg-hover:  color-mix(in srgb, var(--nga-btn-outline-border) 10%, transparent);
  --nga-btn-outline-bg-active: color-mix(in srgb, var(--nga-btn-outline-border) 20%, transparent);

  /* Variant: ghost — near-black */
  --nga-btn-ghost-fg:          var(--nga-color-primary, #141413);
  --nga-btn-ghost-bg-hover:    color-mix(in srgb, var(--nga-btn-ghost-fg) 10%, transparent);
  --nga-btn-ghost-bg-active:   color-mix(in srgb, var(--nga-btn-ghost-fg) 20%, transparent);

  /* Variant: secondary — warm gray from semantic tokens */
  --nga-btn-secondary-bg:        var(--nga-color-secondary, #F4F4F2);
  --nga-btn-secondary-fg:        var(--nga-color-secondary-foreground, #141413);
  --nga-btn-secondary-bg-hover:  color-mix(in srgb, var(--nga-btn-secondary-bg) 85%, black);
  --nga-btn-secondary-bg-active: color-mix(in srgb, var(--nga-btn-secondary-bg) 75%, black);

  /* Variant: destructive — muted terracotta */
  --nga-btn-destructive-bg:        var(--nga-color-destructive, #A8392A);
  --nga-btn-destructive-fg:        var(--nga-color-destructive-foreground, #ffffff);
  --nga-btn-destructive-bg-hover:  color-mix(in srgb, var(--nga-btn-destructive-bg) 85%, black);
  --nga-btn-destructive-bg-active: color-mix(in srgb, var(--nga-btn-destructive-bg) 75%, black);
}
```

- [ ] **Step 2: Run existing button tests to confirm nothing broke**

```bash
npm run test --workspace=packages/primitives
```

Expected: all tests pass.

- [ ] **Step 3: Commit**

```bash
git add packages/primitives/src/button/button.styles.css
git commit -m "feat(primitives): update button styles to reference new brand tokens"
```

---

## Chunk 3: Changeset

### Task 3: Create changeset for both packages

Both `packages/tokens` and `packages/primitives` changed — both need a changeset entry.

**Files:**
- Create: `.changeset/<auto-named>.md` (generated by CLI)

- [ ] **Step 1: Create the changeset**

```bash
npm run changeset
```

When prompted:
- Select both `@thereisnoplacelike/ngatoms-tokens` (minor) and `@thereisnoplacelike/ngatoms-primitives` (patch)
- Summary: `Add full brand token system (Japandi/Scandinavian/Apple aesthetic) with two-tier color, typography, spacing, and radius tokens. Update button primitive to reference new semantic tokens.`

- [ ] **Step 2: Commit the changeset**

```bash
git add .changeset/
git commit -m "chore: add changeset for brand tokens and button update"
```

---

## Verification

After all tasks are complete, do a final visual check:

- [ ] Open the docs app (`npm start --workspace=apps/docs`) or any test Angular app that imports both `tokens.css` and `button.styles.css`
- [ ] Confirm buttons render near-black (not blue)
- [ ] Confirm focus ring is gold
- [ ] Confirm destructive buttons are terracotta (not bright red)
- [ ] Add `.dark` to `<body>` and confirm dark mode flips correctly