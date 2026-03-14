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
| Loading spinner | `Renderer2` DOM injection | Directive has no template — `Renderer2` is the correct imperative DOM tool for directives. Signal-driven `@if` requires a component template. Renderer2 works correctly in zoneless Angular 21. |
| Variant/size class mechanism | `effect()` + `Renderer2` | Inputs are signals; `effect()` reacts to changes and applies/removes classes via `Renderer2.addClass/removeClass`. Avoids verbose per-value `host` metadata bindings. |
| Border radius default | `0.5rem` (`--nga-radius-md` fallback) | Matches the tokens package value exactly (`--nga-radius-md: 0.5rem`) |
| CSS token namespace | `--nga-btn-*` | Matches existing `--nga-*` namespace in `packages/tokens` |
| Keyboard blocking during loading | `click` listener + `stopImmediatePropagation` | `pointer-events: none` blocks mouse only; a `(click)` host listener that calls `$event.stopImmediatePropagation()` during loading prevents downstream Angular event handlers (the consumer's `(click)` output) from firing. Directives bind before template listeners so the directive's host listener runs first. `preventDefault()` is a no-op for button click events and does not block Angular handlers. |

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

The CSS file ships as raw source alongside the directive. Consumers import it once in their global `styles.css`. The CLI handles this import automatically when scaffolding.

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

<!-- With leading icon (consumer places icon before label text) -->
<button ngAtomsButton variant="primary">
  <fa-icon icon="save"></fa-icon>
  Save changes
</button>

<!-- With trailing icon (consumer places icon after label text) -->
<button ngAtomsButton variant="primary">
  Continue
  <fa-icon icon="arrow-right"></fa-icon>
</button>

<!-- Loading state -->
<button ngAtomsButton variant="primary" [loading]="isSaving">
  Save changes
</button>

<!-- Destructive -->
<button ngAtomsButton variant="destructive" size="sm">Delete</button>
```

> **String vs property binding:** `variant="primary"` (attribute binding) and `[variant]="'primary'"` (property binding) are equivalent. String union inputs accept both forms.

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

| Size | Padding | Font size |
|---|---|---|
| `xs` | 3px 10px | 11px |
| `sm` | 5px 14px | 13px |
| `md` (default) | 8px 20px | 14px |
| `lg` | 11px 28px | 16px |
| `xl` | 14px 36px | 18px |

All size values exposed as CSS custom properties for consumer overrides.

---

## CSS Custom Properties (Theming Surface)

Namespace: `--nga-btn-*` — consistent with the project-wide `--nga-*` token namespace.

### Shape & structure

```css
--nga-btn-radius: var(--nga-radius-md, 0.5rem);  /* 0.5rem matches --nga-radius-md in tokens package */
--nga-btn-font-weight: 600;
--nga-btn-transition: background 150ms ease, border-color 150ms ease, opacity 150ms ease;
--nga-btn-focus-ring-color: var(--nga-color-primary, #2563eb);
--nga-btn-focus-ring-offset: 2px;
--nga-btn-focus-ring-width: 2px;
--nga-btn-gap: 0.5rem;  /* gap between spinner/icon and label text */
```

### Size tokens

```css
--nga-btn-padding-xs: 3px 10px;    --nga-btn-font-size-xs: 11px;
--nga-btn-padding-sm: 5px 14px;    --nga-btn-font-size-sm: 13px;
--nga-btn-padding-md: 8px 20px;    --nga-btn-font-size-md: 14px;
--nga-btn-padding-lg: 11px 28px;   --nga-btn-font-size-lg: 16px;
--nga-btn-padding-xl: 14px 36px;   --nga-btn-font-size-xl: 18px;
--nga-btn-spinner-size-xs: 10px;   --nga-btn-spinner-size-sm: 12px;
--nga-btn-spinner-size-md: 14px;   --nga-btn-spinner-size-lg: 16px;
--nga-btn-spinner-size-xl: 18px;
```

### Variant tokens

```css
/* primary */
--nga-btn-primary-bg:          var(--nga-color-primary, #2563eb);
--nga-btn-primary-fg:          var(--nga-color-primary-foreground, #ffffff);
--nga-btn-primary-bg-hover:    color-mix(in srgb, var(--nga-btn-primary-bg) 85%, black);
--nga-btn-primary-bg-active:   color-mix(in srgb, var(--nga-btn-primary-bg) 75%, black);

/* outline */
--nga-btn-outline-border:      var(--nga-color-primary, #2563eb);
--nga-btn-outline-fg:          var(--nga-color-primary, #2563eb);
--nga-btn-outline-bg-hover:    color-mix(in srgb, var(--nga-btn-outline-border) 10%, transparent);
--nga-btn-outline-bg-active:   color-mix(in srgb, var(--nga-btn-outline-border) 20%, transparent);

/* ghost */
--nga-btn-ghost-fg:            var(--nga-color-primary, #2563eb);
--nga-btn-ghost-bg-hover:      color-mix(in srgb, var(--nga-btn-ghost-fg) 10%, transparent);
--nga-btn-ghost-bg-active:     color-mix(in srgb, var(--nga-btn-ghost-fg) 20%, transparent);

/* secondary */
--nga-btn-secondary-bg:        #f1f5f9;
--nga-btn-secondary-fg:        #334155;
--nga-btn-secondary-bg-hover:  #e2e8f0;
--nga-btn-secondary-bg-active: #cbd5e1;

/* destructive */
--nga-btn-destructive-bg:          #dc2626;
--nga-btn-destructive-fg:          #ffffff;
--nga-btn-destructive-bg-hover:    #b91c1c;
--nga-btn-destructive-bg-active:   #991b1b;
```

---

## Host Class & Variant/Size Class Application

### Static base class

The directive applies the base class via static decorator metadata:

```ts
@Directive({
  selector: '[ngAtomsButton]',
  standalone: true,
  host: { class: 'nga-btn' },
})
```

`host: { class: 'nga-btn' }` is resolved at compile time — no change detection overhead.

### Dynamic variant and size classes

`variant` and `size` are signal-based inputs. The directive uses `effect()` to react to their changes and applies modifier classes via `Renderer2`:

- **Class pattern:** `nga-btn--{variant}` and `nga-btn--{size}`
- **Examples:** `nga-btn--primary`, `nga-btn--outline`, `nga-btn--xs`, `nga-btn--lg`
- **Mechanism:** On each `effect()` run, the previous class is removed (`Renderer2.removeClass`) and the new class is added (`Renderer2.addClass`). The previous values are tracked in private fields to enable removal.

```ts
// Sketch — not final implementation
effect(() => {
  renderer.removeClass(el, `nga-btn--${prevVariant}`);
  renderer.addClass(el, `nga-btn--${this.variant()}`);
  prevVariant = this.variant();
});
```

All styles use these classes as selectors (e.g. `.nga-btn.nga-btn--primary { ... }`).

---

## `disabled` Attribute Behavior

The directive does **not** add a `disabled` input. Consumers use the native `disabled` attribute directly:

```html
<button ngAtomsButton disabled>Can't click</button>
<button ngAtomsButton [disabled]="isReadOnly">...</button>
```

The native `disabled` attribute is fully respected by the browser — no directive intervention needed.

**`loading + disabled` combination:** When both `[loading]="true"` and `[disabled]="true"` are present simultaneously, the button is blocked by both mechanisms. The loading state is visually redundant but non-destructive. Consumers are responsible for not setting both simultaneously if the spinner needs to be meaningful. This is a documented accepted edge case.

---

## Loading State Behavior

### Activation (`[loading]` → `true`)

1. Guard: if `this._spinnerEl` is already set, return early (prevents double-injection on rapid toggles)
2. Set `aria-disabled="true"` and `aria-busy="true"` on host via `Renderer2.setAttribute`
3. Add CSS class `nga-btn--loading` to host via `Renderer2.addClass`
4. Create `<span class="nga-btn-spinner" aria-hidden="true"></span>` via `Renderer2.createElement`, then `Renderer2.insertBefore(el, spinnerEl, el.firstChild)`
5. Store reference: `this._spinnerEl = spinnerEl`

### Deactivation (`[loading]` → `false`)

1. If `this._spinnerEl` is null, return early
2. `Renderer2.removeChild(el, this._spinnerEl)` — removes by stored reference, no DOM query needed
3. `this._spinnerEl = null`
4. Remove `nga-btn--loading` via `Renderer2.removeClass`
5. Remove `aria-busy` via `Renderer2.removeAttribute`
6. **Conditional `aria-disabled` removal:** only remove `aria-disabled` if the native `disabled` attribute is **not** present on the host element. This prevents leaving an AT-inconsistent state when the consumer also has `[disabled]="true"`.

### Interaction blocking during loading

- **Mouse:** `.nga-btn--loading` applies `pointer-events: none` (CSS)
- **Keyboard:** The directive adds a `(click)` host listener that calls `$event.stopImmediatePropagation()` when `this.loading()` is true. Since directives bind their host listeners before the consumer's template listeners, this prevents the consumer's `(click)` handler from firing — while keeping the button focusable and announced by screen readers.

```ts
@HostListener('click', ['$event'])
onHostClick(event: MouseEvent): void {
  if (this.loading()) event.stopImmediatePropagation();
}
```

### Spinner DOM order

The spinner is always the first child. Leading icon content projected by the consumer is shifted after the spinner by the flex layout. Trailing icon content is unaffected. The flex `gap` ensures clear visual separation.

---

## Styles

CSS states covered in `button.styles.css`:

- `:hover` — background/border shift per variant
- `:focus-visible` — keyboard-accessible focus ring (`outline`, not `box-shadow`)
- `:active` — pressed state
- `[aria-disabled="true"]` — `opacity: 0.5`, `cursor: not-allowed`
- `.nga-btn--loading` — `pointer-events: none`, slight opacity dim on label content

All styles scoped to `.nga-btn`.

---

## Registry Entry

Entry to be added to `registry/registry.json`:

```json
{
  "name": "button",
  "description": "A button directive with 5 variants, 5 sizes, loading state, and icon support.",
  "files": [
    "packages/primitives/src/button/button.directive.ts",
    "packages/primitives/src/button/button.styles.css",
    "packages/primitives/src/button/index.ts"
  ],
  "cssImport": "button.styles.css"
}
```

The `cssImport` field tells the CLI which CSS file to add to the consumer's `styles.css` on scaffolding.

---

## Testing

File: `packages/primitives/src/button/button.directive.spec.ts`

> **Note:** Test runner (Vitest) is not yet wired in this package. Test files are authored in this iteration but cannot be executed until the runner is set up (tracked as a follow-up task). The risk is accepted — type checking via `ngc --noEmit` still runs.

**Test cases:**
- Default classes `nga-btn--primary` and `nga-btn--md` applied when no inputs given
- `nga-btn--{variant}` class applied and updated when `variant` input changes
- `nga-btn--{size}` class applied and updated when `size` input changes
- Previous variant/size class removed when input changes (no class accumulation)
- `loading=true` → spinner `<span class="nga-btn-spinner">` injected as first child
- `loading=true` → `aria-busy="true"` and `aria-disabled="true"` set on host
- `loading=true` → `nga-btn--loading` class present on host
- `loading=true` → click event is prevented
- `loading=false` → spinner removed from DOM by reference
- `loading=false` → `aria-busy`, `nga-btn--loading` removed
- `loading=false` → `aria-disabled` removed only when native `disabled` is absent
- `loading=false` → `aria-disabled` retained when native `disabled` is present
- Native `disabled` attribute is not touched by the directive during loading
- Rapid `loading` toggle (true → false → true) does not double-inject the spinner

---

## Out of Scope

- Icon library integration (consumer responsibility)
- `RouterLink` integration (native `<a>` use case — separate primitive)
- `ButtonGroup` / toggle group — separate primitive
- Test runner setup — follow-up task
- `disabled` input on the directive — native attribute is sufficient
- RTL spinner positioning — spinner is always first child (LTR-optimized); RTL layout is a known limitation for a future iteration
