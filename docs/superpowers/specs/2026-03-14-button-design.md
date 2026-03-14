# Button Primitive — Design Spec

**Date:** 2026-03-14
**Package:** `@thereisnoplacelike/ngatoms-primitives`
**Status:** Approved

---

## Overview

A button primitive for NgAtoms — an Angular directive applied to a native `<button>` element. Ships with a real visual design (CSS custom properties for full theming), five variants, five sizes, content projection for icons, and a built-in loading state.

---

## Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Implementation shape | Directive (`ngAtomsButton`) | Keeps native `<button>` element; better accessibility and form integration |
| Design level | Comes with design | Real visual defaults; overridable via CSS custom properties |
| Variants | 5 (see below) | Shadcn-style set covering most product UI needs |
| Sizes | 5 (xs / sm / md / lg / xl) | Full scale for design systems needing fine control |
| Icons | `ng-content` (library-agnostic) | Consumers use any icon lib (FontAwesome, Heroicons, etc.) |
| Loading spinner | `Renderer2` DOM injection | Full control over spinner markup and positioning |
| Border radius default | 6px | Subtle rounding; overridable via CSS var |

---

## File Structure

```
packages/primitives/src/
└── button/
    ├── button.directive.ts      # NgAtomsButtonDirective
    ├── button.styles.css        # All styles: vars, variants, sizes, states, spinner
    └── index.ts                 # Re-exports NgAtomsButtonDirective
packages/primitives/src/index.ts # Exports button
```

The CSS file ships as raw source alongside the directive. Consumers import it once in their global `styles.css`. The CLI will handle this import automatically when scaffolding.

---

## API

### Selector

```html
<button ngAtomsButton>Label</button>
```

### Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'outline' \| 'ghost' \| 'secondary' \| 'destructive'` | `'primary'` | Visual style |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size scale |
| `loading` | `boolean` | `false` | Shows spinner, disables interaction |

### Usage examples

```html
<!-- Default -->
<button ngAtomsButton>Save</button>

<!-- Variant + size -->
<button ngAtomsButton variant="outline" size="lg">Cancel</button>

<!-- With icon (leading) -->
<button ngAtomsButton variant="primary">
  <fa-icon icon="save"></fa-icon>
  Save changes
</button>

<!-- Loading state -->
<button ngAtomsButton variant="primary" [loading]="isSaving">
  Save changes
</button>

<!-- Destructive -->
<button ngAtomsButton variant="destructive" size="sm">Delete</button>
```

---

## Variants

| Variant | Description |
|---|---|
| `primary` | Solid filled, high emphasis |
| `outline` | Transparent with colored border |
| `ghost` | Transparent, no border |
| `secondary` | Muted filled, low emphasis |
| `destructive` | Red, for dangerous actions |

---

## Sizes

| Size | Approx padding | Font size |
|---|---|---|
| `xs` | 3px 10px | 11px |
| `sm` | 5px 14px | 13px |
| `md` (default) | 8px 20px | 14px |
| `lg` | 11px 28px | 16px |
| `xl` | 14px 36px | 18px |

All size values exposed as CSS custom properties for consumer overrides.

---

## CSS Custom Properties (Theming Surface)

```css
/* Shape */
--ngatoms-btn-radius: 6px;

/* Per-size overrides */
--ngatoms-btn-padding-xs: 3px 10px;
--ngatoms-btn-font-size-xs: 11px;
--ngatoms-btn-padding-sm: 5px 14px;
--ngatoms-btn-font-size-sm: 13px;
--ngatoms-btn-padding-md: 8px 20px;
--ngatoms-btn-font-size-md: 14px;
--ngatoms-btn-padding-lg: 11px 28px;
--ngatoms-btn-font-size-lg: 16px;
--ngatoms-btn-padding-xl: 14px 36px;
--ngatoms-btn-font-size-xl: 18px;

/* Per-variant colors */
--ngatoms-btn-primary-bg: ...;
--ngatoms-btn-primary-fg: ...;
--ngatoms-btn-primary-bg-hover: ...;
--ngatoms-btn-outline-border: ...;
--ngatoms-btn-outline-fg: ...;
/* (full set defined in button.styles.css) */
```

Consumers override at `:root` for global theming or at component level for scoped overrides.

---

## Loading State Behavior

When `[loading]="true"`:

1. `aria-disabled="true"` and `aria-busy="true"` set on host `<button>`
2. CSS class `ngatoms-btn--loading` added to host (dims content opacity)
3. `<span class="ngatoms-btn-spinner" aria-hidden="true"></span>` injected as first child via `Renderer2`
4. Spinner is CSS-animated (`border-radius: 50%`, `@keyframes` rotation) — no SVG, no external assets
5. Spinner size scales with current button size via CSS vars

When `loading` returns to `false`: spinner span removed, attributes restored.

**Native `disabled` is never set.** `aria-disabled` is used so the button stays focusable and screen readers announce the busy state correctly.

---

## Styles

CSS states covered in `button.styles.css`:

- `:hover` — subtle background/border shift
- `:focus-visible` — keyboard-accessible focus ring (outline, not box-shadow)
- `:active` — pressed state
- `[aria-disabled="true"]` — reduced opacity, `cursor: not-allowed`
- `.ngatoms-btn--loading` — dims text, shows spinner

All styles scoped to `.ngatoms-btn` class (applied by the directive as host class).

---

## Testing

File: `packages/primitives/src/button/button.directive.spec.ts`

**Test cases:**
- Default classes applied (`ngatoms-btn--primary`, `ngatoms-btn--md`) when no inputs given
- Correct host class applied per `variant` input
- Correct host class applied per `size` input
- `loading=true` → spinner `<span>` injected as first child
- `loading=true` → `aria-busy="true"` and `aria-disabled="true"` set on host
- `loading=false` → spinner removed, attributes restored
- Native `disabled` attribute is **not** set when `loading=true`

> Note: test framework (Vitest + Angular Testing Library) not yet wired — tests authored in this iteration, runner set up as a follow-up.

---

## Out of Scope

- Icon library integration (consumer responsibility)
- `RouterLink` integration (native `<a>` use case — separate primitive)
- `ButtonGroup` / toggle group — separate primitive
- Test runner setup — follow-up task
