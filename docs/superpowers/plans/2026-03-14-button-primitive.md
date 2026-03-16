# Button Primitive Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the `ngAtomsButton` Angular directive — a button primitive with 5 variants, 5 sizes, loading state with spinner, and icon support via content projection.

**Architecture:** A standalone Angular directive (`[ngAtomsButton]`) that applies to native `<button>` elements. It uses signal inputs and `effect()` to reactively apply CSS modifier classes via `Renderer2`, and injects a spinner `<span>` into the DOM when `[loading]="true"`. All visual styling lives in a companion CSS file using `--nga-btn-*` custom properties.

**Tech Stack:** Angular 21 (zoneless, signals), TypeScript 5.9, `Renderer2`, `effect()`, plain CSS custom properties.

**Spec:** `docs/superpowers/specs/2026-03-14-button-design.md`

> **Test runner note:** Vitest is not yet wired in `packages/primitives`. Test files are authored in this plan but cannot be executed. `npm run build --workspace=packages/primitives` (`ngc --noEmit`) is used as the verification step throughout. Test execution is a follow-up task.

---

## Chunk 1: CSS + Directive Implementation

### Task 1: Create the button CSS file

**Files:**
- Create: `packages/primitives/src/button/button.styles.css`

- [ ] **Step 1.1: Create the CSS file with custom properties and base styles**

Create `packages/primitives/src/button/button.styles.css`:

```css
/* =============================================================
   NgAtoms Button — button.styles.css
   Import once in your global styles.css:
     @import '@/path/to/button.styles.css';
   ============================================================= */

/* ── Custom properties (override at :root or component level) ─ */
:root {
  /* Shape */
  --nga-btn-radius: var(--nga-radius-md, 0.5rem);
  --nga-btn-font-weight: 600;
  --nga-btn-gap: 0.5rem;
  --nga-btn-transition: background 150ms ease, border-color 150ms ease, opacity 150ms ease;

  /* Focus ring */
  --nga-btn-focus-ring-color: var(--nga-color-primary, #2563eb);
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

  /* Variant: primary */
  --nga-btn-primary-bg:        var(--nga-color-primary, #2563eb);
  --nga-btn-primary-fg:        var(--nga-color-primary-foreground, #ffffff);
  --nga-btn-primary-bg-hover:  color-mix(in srgb, var(--nga-btn-primary-bg) 85%, black);
  --nga-btn-primary-bg-active: color-mix(in srgb, var(--nga-btn-primary-bg) 75%, black);

  /* Variant: outline */
  --nga-btn-outline-border:    var(--nga-color-primary, #2563eb);
  --nga-btn-outline-fg:        var(--nga-color-primary, #2563eb);
  --nga-btn-outline-bg-hover:  color-mix(in srgb, var(--nga-btn-outline-border) 10%, transparent);
  --nga-btn-outline-bg-active: color-mix(in srgb, var(--nga-btn-outline-border) 20%, transparent);

  /* Variant: ghost */
  --nga-btn-ghost-fg:          var(--nga-color-primary, #2563eb);
  --nga-btn-ghost-bg-hover:    color-mix(in srgb, var(--nga-btn-ghost-fg) 10%, transparent);
  --nga-btn-ghost-bg-active:   color-mix(in srgb, var(--nga-btn-ghost-fg) 20%, transparent);

  /* Variant: secondary */
  --nga-btn-secondary-bg:        #f1f5f9;
  --nga-btn-secondary-fg:        #334155;
  --nga-btn-secondary-bg-hover:  #e2e8f0;
  --nga-btn-secondary-bg-active: #cbd5e1;

  /* Variant: destructive */
  --nga-btn-destructive-bg:        #dc2626;
  --nga-btn-destructive-fg:        #ffffff;
  --nga-btn-destructive-bg-hover:  #b91c1c;
  --nga-btn-destructive-bg-active: #991b1b;
}

/* ── Base ───────────────────────────────────────────────────── */
.nga-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--nga-btn-gap);
  border: 1.5px solid transparent;
  border-radius: var(--nga-btn-radius);
  font-weight: var(--nga-btn-font-weight);
  font-family: inherit;
  line-height: 1;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  transition: var(--nga-btn-transition);
  outline: none;
}

.nga-btn:focus-visible {
  outline: var(--nga-btn-focus-ring-width) solid var(--nga-btn-focus-ring-color);
  outline-offset: var(--nga-btn-focus-ring-offset);
}

.nga-btn[aria-disabled="true"] {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── Sizes ──────────────────────────────────────────────────── */
.nga-btn--xs {
  padding: var(--nga-btn-padding-xs);
  font-size: var(--nga-btn-font-size-xs);
}
.nga-btn--sm {
  padding: var(--nga-btn-padding-sm);
  font-size: var(--nga-btn-font-size-sm);
}
.nga-btn--md {
  padding: var(--nga-btn-padding-md);
  font-size: var(--nga-btn-font-size-md);
}
.nga-btn--lg {
  padding: var(--nga-btn-padding-lg);
  font-size: var(--nga-btn-font-size-lg);
}
.nga-btn--xl {
  padding: var(--nga-btn-padding-xl);
  font-size: var(--nga-btn-font-size-xl);
}

/* ── Variants ───────────────────────────────────────────────── */
.nga-btn--primary {
  background: var(--nga-btn-primary-bg);
  color: var(--nga-btn-primary-fg);
  border-color: var(--nga-btn-primary-bg);
}
.nga-btn--primary:hover:not([aria-disabled="true"]) {
  background: var(--nga-btn-primary-bg-hover);
  border-color: var(--nga-btn-primary-bg-hover);
}
.nga-btn--primary:active:not([aria-disabled="true"]) {
  background: var(--nga-btn-primary-bg-active);
  border-color: var(--nga-btn-primary-bg-active);
}

.nga-btn--outline {
  background: transparent;
  color: var(--nga-btn-outline-fg);
  border-color: var(--nga-btn-outline-border);
}
.nga-btn--outline:hover:not([aria-disabled="true"]) {
  background: var(--nga-btn-outline-bg-hover);
}
.nga-btn--outline:active:not([aria-disabled="true"]) {
  background: var(--nga-btn-outline-bg-active);
}

.nga-btn--ghost {
  background: transparent;
  color: var(--nga-btn-ghost-fg);
  border-color: transparent;
}
.nga-btn--ghost:hover:not([aria-disabled="true"]) {
  background: var(--nga-btn-ghost-bg-hover);
}
.nga-btn--ghost:active:not([aria-disabled="true"]) {
  background: var(--nga-btn-ghost-bg-active);
}

.nga-btn--secondary {
  background: var(--nga-btn-secondary-bg);
  color: var(--nga-btn-secondary-fg);
  border-color: var(--nga-btn-secondary-bg);
}
.nga-btn--secondary:hover:not([aria-disabled="true"]) {
  background: var(--nga-btn-secondary-bg-hover);
  border-color: var(--nga-btn-secondary-bg-hover);
}
.nga-btn--secondary:active:not([aria-disabled="true"]) {
  background: var(--nga-btn-secondary-bg-active);
  border-color: var(--nga-btn-secondary-bg-active);
}

.nga-btn--destructive {
  background: var(--nga-btn-destructive-bg);
  color: var(--nga-btn-destructive-fg);
  border-color: var(--nga-btn-destructive-bg);
}
.nga-btn--destructive:hover:not([aria-disabled="true"]) {
  background: var(--nga-btn-destructive-bg-hover);
  border-color: var(--nga-btn-destructive-bg-hover);
}
.nga-btn--destructive:active:not([aria-disabled="true"]) {
  background: var(--nga-btn-destructive-bg-active);
  border-color: var(--nga-btn-destructive-bg-active);
}

/* ── Loading state ──────────────────────────────────────────── */
.nga-btn--loading {
  pointer-events: none;
}

/* ── Spinner ────────────────────────────────────────────────── */
@keyframes nga-btn-spin {
  to { transform: rotate(360deg); }
}

.nga-btn-spinner {
  display: inline-block;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  animation: nga-btn-spin 0.65s linear infinite;
  flex-shrink: 0;
}

.nga-btn--xs .nga-btn-spinner { width: var(--nga-btn-spinner-size-xs); height: var(--nga-btn-spinner-size-xs); }
.nga-btn--sm .nga-btn-spinner { width: var(--nga-btn-spinner-size-sm); height: var(--nga-btn-spinner-size-sm); }
.nga-btn--md .nga-btn-spinner { width: var(--nga-btn-spinner-size-md); height: var(--nga-btn-spinner-size-md); }
.nga-btn--lg .nga-btn-spinner { width: var(--nga-btn-spinner-size-lg); height: var(--nga-btn-spinner-size-lg); }
.nga-btn--xl .nga-btn-spinner { width: var(--nga-btn-spinner-size-xl); height: var(--nga-btn-spinner-size-xl); }
```

- [ ] **Step 1.2: Verify the file was created**

```bash
ls packages/primitives/src/button/
```
Expected: `button.styles.css` listed (only file so far).

---

### Task 2: Create the directive

**Files:**
- Create: `packages/primitives/src/button/button.directive.ts`
- Create: `packages/primitives/src/button/index.ts`
- Modify: `packages/primitives/src/index.ts`

- [ ] **Step 2.1: Create the directive file**

Create `packages/primitives/src/button/button.directive.ts`:

```typescript
import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  Renderer2,
  effect,
  inject,
  input,
} from '@angular/core';

export type NgAtomsButtonVariant =
  | 'primary'
  | 'outline'
  | 'ghost'
  | 'secondary'
  | 'destructive';

export type NgAtomsButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Directive({
  selector: '[ngAtomsButton]',
  standalone: true,
  host: { class: 'nga-btn' },
})
export class NgAtomsButtonDirective implements OnDestroy {
  private readonly el = inject(ElementRef<HTMLButtonElement>);
  private readonly renderer = inject(Renderer2);

  readonly variant = input<NgAtomsButtonVariant>('primary');
  readonly size = input<NgAtomsButtonSize>('md');
  readonly loading = input<boolean>(false);

  private _prevVariant: NgAtomsButtonVariant = 'primary';
  private _prevSize: NgAtomsButtonSize = 'md';
  private _spinnerEl: HTMLElement | null = null;

  constructor() {
    effect(() => {
      const v = this.variant();
      this.renderer.removeClass(this.el.nativeElement, `nga-btn--${this._prevVariant}`);
      this.renderer.addClass(this.el.nativeElement, `nga-btn--${v}`);
      this._prevVariant = v;
    });

    effect(() => {
      const s = this.size();
      this.renderer.removeClass(this.el.nativeElement, `nga-btn--${this._prevSize}`);
      this.renderer.addClass(this.el.nativeElement, `nga-btn--${s}`);
      this._prevSize = s;
    });

    effect(() => {
      if (this.loading()) {
        this._activateLoading();
      } else {
        this._deactivateLoading();
      }
    });
  }

  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent): void {
    if (this.loading()) {
      event.stopImmediatePropagation();
    }
  }

  ngOnDestroy(): void {
    this._spinnerEl = null;
  }

  private _activateLoading(): void {
    if (this._spinnerEl) return;

    const el = this.el.nativeElement;
    this.renderer.setAttribute(el, 'aria-disabled', 'true');
    this.renderer.setAttribute(el, 'aria-busy', 'true');
    this.renderer.addClass(el, 'nga-btn--loading');

    const spinner: HTMLElement = this.renderer.createElement('span');
    this.renderer.addClass(spinner, 'nga-btn-spinner');
    this.renderer.setAttribute(spinner, 'aria-hidden', 'true');
    this.renderer.insertBefore(el, spinner, el.firstChild ?? null);
    this._spinnerEl = spinner;
  }

  private _deactivateLoading(): void {
    if (!this._spinnerEl) return;

    const el = this.el.nativeElement;
    this.renderer.removeChild(el, this._spinnerEl);
    this._spinnerEl = null;

    this.renderer.removeClass(el, 'nga-btn--loading');
    this.renderer.removeAttribute(el, 'aria-busy');

    if (!el.hasAttribute('disabled')) {
      this.renderer.removeAttribute(el, 'aria-disabled');
    }
  }
}
```

- [ ] **Step 2.2: Create the barrel file**

Create `packages/primitives/src/button/index.ts`:

```typescript
export { NgAtomsButtonDirective } from './button.directive';
export type { NgAtomsButtonVariant, NgAtomsButtonSize } from './button.directive';
```

- [ ] **Step 2.3: Update the package entry point**

Edit `packages/primitives/src/index.ts` — replace its current contents:

```typescript
// NgAtoms primitives — components will be exported from here
export * from './button';
```

- [ ] **Step 2.4: Run the type checker to verify the directive compiles**

```bash
npm run build --workspace=packages/primitives
```

Expected output:
```
> @thereisnoplacelike/ngatoms-primitives@0.0.1 build
> ngc --noEmit -p tsconfig.json
```
No errors. If there are errors, fix them before proceeding.

- [ ] **Step 2.5: Commit**

```bash
git add packages/primitives/src/button/button.directive.ts \
        packages/primitives/src/button/button.styles.css \
        packages/primitives/src/button/index.ts \
        packages/primitives/src/index.ts
git commit -m "feat(primitives): add ngAtomsButton directive with 5 variants and 5 sizes"
```

---

## Chunk 2: Registry Entry + Tests

### Task 3: Add the registry entry

**Files:**
- Modify: `registry/registry.json`

- [ ] **Step 3.1: Add the button entry to the registry**

Edit `registry/registry.json` — replace its contents:

```json
{
  "components": [
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
  ]
}
```

- [ ] **Step 3.2: Verify the JSON is valid**

```bash
node -e "JSON.parse(require('fs').readFileSync('registry/registry.json', 'utf8')); console.log('valid')"
```

Expected: `valid`

- [ ] **Step 3.3: Commit**

```bash
git add registry/registry.json
git commit -m "chore(registry): add button component entry"
```

---

### Task 4: Write the test file

**Files:**
- Create: `packages/primitives/src/button/button.directive.spec.ts`

> **Note:** This file is authored for completeness but cannot be executed until the Vitest test runner is wired up (follow-up task). The file will be type-checked by `ngc --noEmit`.

- [ ] **Step 4.1: Create the test file**

Create `packages/primitives/src/button/button.directive.spec.ts`:

```typescript
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgAtomsButtonDirective } from './button.directive';

// ── Helpers ───────────────────────────────────────────────────

function createFixture<T>(component: new () => T) {
  TestBed.configureTestingModule({ imports: [component] });
  const fixture = TestBed.createComponent(component as any);
  fixture.detectChanges();
  return fixture;
}

// ── Defaults ──────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [NgAtomsButtonDirective],
  template: `<button ngAtomsButton>Click</button>`,
})
class DefaultButtonFixture {}

describe('NgAtomsButtonDirective — defaults', () => {
  it('applies nga-btn base class', () => {
    const fixture = createFixture(DefaultButtonFixture);
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.classList.contains('nga-btn')).toBe(true);
  });

  it('applies nga-btn--primary by default', () => {
    const fixture = createFixture(DefaultButtonFixture);
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.classList.contains('nga-btn--primary')).toBe(true);
  });

  it('applies nga-btn--md by default', () => {
    const fixture = createFixture(DefaultButtonFixture);
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.classList.contains('nga-btn--md')).toBe(true);
  });
});

// ── Variant classes ───────────────────────────────────────────

@Component({
  standalone: true,
  imports: [NgAtomsButtonDirective],
  template: `<button ngAtomsButton [variant]="variant">Click</button>`,
})
class VariantButtonFixture {
  variant: 'primary' | 'outline' | 'ghost' | 'secondary' | 'destructive' = 'primary';
}

describe('NgAtomsButtonDirective — variant', () => {
  const variants = ['primary', 'outline', 'ghost', 'secondary', 'destructive'] as const;

  for (const v of variants) {
    it(`applies nga-btn--${v} when variant="${v}"`, () => {
      const fixture = createFixture(VariantButtonFixture);
      fixture.componentInstance.variant = v;
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
      expect(btn.classList.contains(`nga-btn--${v}`)).toBe(true);
    });
  }

  it('removes previous variant class when variant changes', () => {
    const fixture = createFixture(VariantButtonFixture);
    fixture.componentInstance.variant = 'primary';
    fixture.detectChanges();
    fixture.componentInstance.variant = 'destructive';
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.classList.contains('nga-btn--primary')).toBe(false);
    expect(btn.classList.contains('nga-btn--destructive')).toBe(true);
  });
});

// ── Size classes ──────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [NgAtomsButtonDirective],
  template: `<button ngAtomsButton [size]="size">Click</button>`,
})
class SizeButtonFixture {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
}

describe('NgAtomsButtonDirective — size', () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  for (const s of sizes) {
    it(`applies nga-btn--${s} when size="${s}"`, () => {
      const fixture = createFixture(SizeButtonFixture);
      fixture.componentInstance.size = s;
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
      expect(btn.classList.contains(`nga-btn--${s}`)).toBe(true);
    });
  }

  it('removes previous size class when size changes', () => {
    const fixture = createFixture(SizeButtonFixture);
    fixture.componentInstance.size = 'lg';
    fixture.detectChanges();
    fixture.componentInstance.size = 'xs';
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.classList.contains('nga-btn--lg')).toBe(false);
    expect(btn.classList.contains('nga-btn--xs')).toBe(true);
  });
});

// ── Loading state ─────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [NgAtomsButtonDirective],
  template: `<button ngAtomsButton [loading]="loading">Click</button>`,
})
class LoadingButtonFixture {
  loading = false;
}

describe('NgAtomsButtonDirective — loading', () => {
  it('injects spinner as first child when loading=true', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    const firstChild = btn.firstChild as HTMLElement;
    expect(firstChild?.classList.contains('nga-btn-spinner')).toBe(true);
  });

  it('sets aria-busy="true" when loading=true', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.getAttribute('aria-busy')).toBe('true');
  });

  it('sets aria-disabled="true" when loading=true', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.getAttribute('aria-disabled')).toBe('true');
  });

  it('adds nga-btn--loading class when loading=true', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.classList.contains('nga-btn--loading')).toBe(true);
  });

  it('removes spinner when loading returns to false', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.querySelector('.nga-btn-spinner')).toBeNull();
  });

  it('removes aria-busy when loading returns to false', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.hasAttribute('aria-busy')).toBe(false);
  });

  it('removes nga-btn--loading class when loading returns to false', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.classList.contains('nga-btn--loading')).toBe(false);
  });

  it('does not set native disabled attribute when loading=true', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.hasAttribute('disabled')).toBe(false);
  });

  it('stops click event propagation when loading=true', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;

    let parentReceived = false;
    btn.parentElement!.addEventListener('click', () => { parentReceived = true; });
    btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(parentReceived).toBe(false);
  });

  it('does not double-inject spinner on rapid toggle', () => {
    const fixture = createFixture(LoadingButtonFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    expect(btn.querySelectorAll('.nga-btn-spinner').length).toBe(1);
  });
});

// ── loading + native disabled interaction ─────────────────────

@Component({
  standalone: true,
  imports: [NgAtomsButtonDirective],
  template: `<button ngAtomsButton disabled [loading]="loading">Click</button>`,
})
class LoadingWithDisabledFixture {
  loading = false;
}

describe('NgAtomsButtonDirective — loading + native disabled', () => {
  it('retains aria-disabled when loading=false and native disabled is present', () => {
    const fixture = createFixture(LoadingWithDisabledFixture);
    fixture.componentInstance.loading = true;
    fixture.detectChanges();
    fixture.componentInstance.loading = false;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.directive(NgAtomsButtonDirective)).nativeElement;
    // Native disabled is present — aria-disabled must NOT be removed
    expect(btn.getAttribute('aria-disabled')).toBe('true');
  });
});
```

- [ ] **Step 4.2: Verify the test file type-checks cleanly**

```bash
npm run build --workspace=packages/primitives
```

Expected: same clean output as before — no type errors in the spec file.

- [ ] **Step 4.3: Commit**

```bash
git add packages/primitives/src/button/button.directive.spec.ts
git commit -m "test(primitives): add button directive test suite (runner follow-up)"
```

---

## Final verification

- [ ] **Step 5.1: Run the full monorepo build**

```bash
npm run build
```

Expected: all workspaces build without errors.

- [ ] **Step 5.2: Confirm button files exist**

```bash
ls packages/primitives/src/button/
```

Expected:
```
button.directive.spec.ts
button.directive.ts
button.styles.css
index.ts
```

- [ ] **Step 5.3: Confirm registry entry**

```bash
node -e "const r = JSON.parse(require('fs').readFileSync('registry/registry.json', 'utf8')); console.log(r.components[0].name)"
```

Expected: `button`
