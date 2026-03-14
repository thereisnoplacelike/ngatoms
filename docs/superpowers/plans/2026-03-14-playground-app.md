# Playground App Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a running Angular 21 playground app inside `apps/docs` that visually showcases NgAtoms button variants, sizes, loading states, and icon usage.

**Architecture:** Angular CLI workspace mode with a single root `angular.json`. The app uses standalone components, zoneless change detection, and Angular Router (one route per primitive). It imports NgAtoms primitives directly from source (no compiled package). Phosphor Icons web components provide polished icon examples.

**Tech Stack:** Angular 21, Angular CLI, `@angular-devkit/build-angular` (esbuild), `@angular/router`, `@phosphor-icons/web`, TypeScript 5.9, CSS (no preprocessor).

**Spec:** `docs/superpowers/specs/2026-03-14-playground-app-design.md`

---

## Chunk 1: Dependencies + Angular Workspace Config + App Scaffold

### Task 1: Install new root devDependencies

**Files:**
- Modify: `package.json` (root)

> `@angular/cli`, `@angular/router`, `@angular-devkit/build-angular`, and `@phosphor-icons/web` are not yet installed. Everything else Angular-related is already at root.

- [ ] **Step 1: Install the four new packages**

```bash
npm install --save-dev @angular/cli @angular/router @angular-devkit/build-angular @phosphor-icons/web
```

Expected: no peer dependency errors. npm will resolve Angular 21-compatible versions of `@angular/cli` and `@angular-devkit/build-angular`.

- [ ] **Step 2: Verify Angular CLI resolves**

```bash
npx ng version
```

Expected output includes `Angular CLI:` line and `Angular:` line showing 21.x.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install Angular CLI, router, build-angular, and Phosphor Icons for playground"
```

---

### Task 2: Create `angular.json` at monorepo root

**Files:**
- Create: `angular.json`

The Angular CLI workspace config tells the CLI where the `docs` project lives and how to build/serve it. It must live at the monorepo root (same level as root `package.json`).

- [ ] **Step 1: Create `angular.json`**

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "apps",
  "projects": {
    "docs": {
      "projectType": "application",
      "root": "apps/docs",
      "sourceRoot": "apps/docs/src",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "apps/docs/dist",
            "index": "apps/docs/src/index.html",
            "browser": "apps/docs/src/main.ts",
            "tsConfig": "apps/docs/tsconfig.app.json",
            "styles": ["apps/docs/src/styles.css"],
            "scripts": [],
            "assets": [
              "apps/docs/src/favicon.ico",
              { "glob": "**/*", "input": "apps/docs/src/assets", "output": "assets" }
            ]
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "buildTarget": "docs:build"
          }
        }
      }
    }
  }
}
```

Write this to `angular.json` at the monorepo root.

- [ ] **Step 2: Verify the CLI recognizes the project**

```bash
npx ng build --project=docs 2>&1 | head -20
```

Expected: an error about a missing source file (e.g. `apps/docs/src/main.ts` not found), NOT an error about an unknown project or unrecognized builder. If the CLI fails with "project 'docs' is not defined" or "unknown builder", fix `angular.json` before proceeding.

- [ ] **Step 3: Commit**

```bash
git add angular.json
git commit -m "chore: add Angular workspace config for docs playground"
```

---

### Task 3: Create `apps/docs/tsconfig.app.json`

**Files:**
- Create: `apps/docs/tsconfig.app.json`

This TypeScript config is for the Angular application builder only. It extends the root `tsconfig.json`, suppresses ambient types (`"types": []` prevents `@types/node` leaking into browser code), and points the compiler at `main.ts` as the entry.

- [ ] **Step 1: Create `apps/docs/tsconfig.app.json`**

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "types": []
  },
  "files": [
    "src/main.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/docs/tsconfig.app.json
git commit -m "chore: add tsconfig.app.json for docs playground"
```

---

### Task 4: Create static source files (`index.html`, `favicon.ico`, `assets/`, `styles.css`)

**Files:**
- Create: `apps/docs/src/index.html`
- Create: `apps/docs/src/favicon.ico` (placeholder)
- Create: `apps/docs/src/assets/` (empty directory, tracked via `.gitkeep`)
- Create: `apps/docs/src/styles.css`

- [ ] **Step 1: Create `apps/docs/src/index.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>NgAtoms Playground</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```

- [ ] **Step 2: Create a placeholder `favicon.ico`**

```bash
touch apps/docs/src/favicon.ico
```

Any valid file works — the build just needs it to exist to copy it to `dist`. A real icon can be added later.

- [ ] **Step 3: Create empty `assets/` directory tracked by git**

```bash
mkdir -p apps/docs/src/assets
touch apps/docs/src/assets/.gitkeep
```

Angular's build config references this directory; it must exist.

- [ ] **Step 4: Create `apps/docs/src/styles.css`**

```css
@import '../../../packages/primitives/src/button/button.styles.css';

*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  background: #0a0a0a;
  color: #e4e4e7;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 14px;
  line-height: 1.5;
}

a {
  color: inherit;
  text-decoration: none;
}
```

> The `@import` path is relative from `apps/docs/src/` to the monorepo root and into `packages/primitives/src/button/`. The Angular esbuild pipeline resolves this at build time.

- [ ] **Step 5: Commit**

```bash
git add apps/docs/src/index.html apps/docs/src/favicon.ico apps/docs/src/assets/.gitkeep apps/docs/src/styles.css
git commit -m "feat: add playground static source files (index.html, styles, assets)"
```

---

### Task 5: Create app bootstrap files (`main.ts`, `app.config.ts`, `app.routes.ts`)

**Files:**
- Create: `apps/docs/src/main.ts`
- Create: `apps/docs/src/app/app.config.ts`
- Create: `apps/docs/src/app/app.routes.ts`

- [ ] **Step 1: Create `apps/docs/src/main.ts`**

```typescript
import '@phosphor-icons/web';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch(console.error);
```

The `import '@phosphor-icons/web'` is a side-effect import that registers all Phosphor icon custom elements globally. It must come first.

- [ ] **Step 2: Create `apps/docs/src/app/app.config.ts`**

```typescript
import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
  ],
};
```

`provideZonelessChangeDetection()` is the stable Angular 18+ API (not the old experimental variant).

- [ ] **Step 3: Create `apps/docs/src/app/app.routes.ts`**

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'button', pathMatch: 'full' },
  {
    path: 'button',
    loadComponent: () =>
      import('./pages/button/button-page.component').then(m => m.ButtonPageComponent),
  },
];
```

- [ ] **Step 4: Commit**

```bash
git add apps/docs/src/main.ts apps/docs/src/app/app.config.ts apps/docs/src/app/app.routes.ts
git commit -m "feat: add playground bootstrap (main.ts, app.config, app.routes)"
```

---

### Task 6: Create `AppComponent` (root shell)

**Files:**
- Create: `apps/docs/src/app/app.component.ts`
- Create: `apps/docs/src/app/app.component.css`

The root shell renders a sidebar nav and the `<router-outlet>`. `CUSTOM_ELEMENTS_SCHEMA` allows Phosphor icon tags (`<ph-*>`) in the template without TypeScript errors.

- [ ] **Step 1: Create `apps/docs/src/app/app.component.ts`**

```typescript
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="layout">
      <nav class="sidebar">
        <span class="sidebar-title">NgAtoms</span>
        <a routerLink="/button" routerLinkActive="active">Button</a>
      </nav>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {}
```

- [ ] **Step 2: Create `apps/docs/src/app/app.component.css`**

```css
.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  min-height: 100vh;
}

.sidebar {
  padding: 1.5rem 1rem;
  background: #111;
  border-right: 1px solid #222;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sidebar-title {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #71717a;
  margin-bottom: 0.75rem;
}

.sidebar a {
  display: block;
  padding: 0.375rem 0.75rem;
  border-radius: 4px;
  font-size: 14px;
  color: #a1a1aa;
  transition: background 0.15s, color 0.15s;
}

.sidebar a:hover {
  background: #1c1c1c;
  color: #e4e4e7;
}

.sidebar a.active {
  background: #1c1c1c;
  color: #e4e4e7;
}

.content {
  padding: 2rem;
  overflow-y: auto;
}
```

- [ ] **Step 3: Verify TypeScript type-checks so far**

```bash
npx ng build --project=docs 2>&1 | head -40
```

Expected: build fails because `button-page.component.ts` doesn't exist yet, but all existing files should compile without TypeScript errors. Any error mentioning a file created in Tasks 1–6 must be fixed before proceeding.

- [ ] **Step 4: Commit**

```bash
git add apps/docs/src/app/app.component.ts apps/docs/src/app/app.component.css
git commit -m "feat: add playground root shell component"
```

---

## Chunk 2: Button Page + Scripts + End-to-End Verification

### Task 7: Create Button showcase page

**Files:**
- Create: `apps/docs/src/app/pages/button/button-page.component.ts`
- Create: `apps/docs/src/app/pages/button/button-page.component.css`

The button page showcases all NgAtoms button combinations. It imports `NgAtomsButtonDirective` from the primitives source directly (not from a compiled package — the playground is an integration harness). `CUSTOM_ELEMENTS_SCHEMA` is needed in this component too because it uses `<ph-*>` Phosphor tags.

- [ ] **Step 1: Create `apps/docs/src/app/pages/button/button-page.component.ts`**

```typescript
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgAtomsButtonDirective } from '../../../../../../packages/primitives/src/button';

const VARIANTS = ['primary', 'outline', 'ghost', 'secondary', 'destructive'] as const;
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

type Variant = typeof VARIANTS[number];
type Size = typeof SIZES[number];

@Component({
  selector: 'app-button-page',
  standalone: true,
  imports: [NgAtomsButtonDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './button-page.component.html',
  styleUrl: './button-page.component.css',
})
export class ButtonPageComponent {
  readonly variants = VARIANTS;
  readonly sizes = SIZES;
}
```

> **Import path note:** from `apps/docs/src/app/pages/button/`, six `../` hops reach the monorepo root. The path above is `../../../../../../packages/primitives/src/button`.

- [ ] **Step 2: Create `apps/docs/src/app/pages/button/button-page.component.html`**

```html
<h1 class="page-title">Button</h1>

<section class="showcase-section">
  <h2 class="section-title">Variants &times; Sizes</h2>
  <div class="grid-table">
    <div class="grid-header">
      <span></span>
      @for (size of sizes; track size) {
        <span class="col-label">{{ size }}</span>
      }
    </div>
    @for (variant of variants; track variant) {
      <div class="grid-row">
        <span class="row-label">{{ variant }}</span>
        @for (size of sizes; track size) {
          <span>
            <button ngAtomsButton [variant]="variant" [size]="size">Button</button>
          </span>
        }
      </div>
    }
  </div>
</section>

<section class="showcase-section">
  <h2 class="section-title">Loading state</h2>
  <div class="row-group">
    @for (variant of variants; track variant) {
      <button ngAtomsButton [variant]="variant" [loading]="true">Loading</button>
    }
  </div>
</section>

<section class="showcase-section">
  <h2 class="section-title">Disabled state</h2>
  <div class="row-group">
    @for (variant of variants; track variant) {
      <button ngAtomsButton [variant]="variant" disabled>Disabled</button>
    }
  </div>
</section>

<section class="showcase-section">
  <h2 class="section-title">With icons</h2>
  <div class="row-group">
    <button ngAtomsButton variant="primary">
      <ph-arrow-right weight="bold"></ph-arrow-right>
      Continue
    </button>
    <button ngAtomsButton variant="outline">
      <ph-download weight="bold"></ph-download>
      Download
    </button>
    <button ngAtomsButton variant="destructive">
      <ph-trash weight="bold"></ph-trash>
      Delete
    </button>
  </div>
</section>
```

> The template uses Angular 17+ `@for` control flow syntax (not `*ngFor`).

- [ ] **Step 3: Create `apps/docs/src/app/pages/button/button-page.component.css`**

```css
.page-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 2rem;
  color: #e4e4e7;
}

.showcase-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #71717a;
  margin: 0 0 1rem;
}

/* Variants × Sizes grid */
.grid-table {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.grid-header,
.grid-row {
  display: grid;
  grid-template-columns: 100px repeat(5, 1fr);
  align-items: center;
  gap: 0.75rem;
}

.col-label {
  font-size: 12px;
  color: #71717a;
  text-align: center;
}

.row-label {
  font-size: 12px;
  color: #71717a;
}

.grid-row span {
  display: flex;
  justify-content: center;
}

/* Loading / disabled / icons row */
.row-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}
```

- [ ] **Step 4: Update `apps/docs/tsconfig.app.json` to include the HTML template**

Because `button-page.component.ts` uses `templateUrl`, the `tsconfig.app.json` `files` entry points only to `main.ts` — but Angular's compiler finds templates automatically from `templateUrl`. No change needed to tsconfig.

- [ ] **Step 5: Commit**

```bash
git add apps/docs/src/app/pages/
git commit -m "feat: add button showcase page"
```

---

### Task 8: Update `apps/docs/package.json` scripts

**Files:**
- Modify: `apps/docs/package.json`

Replace the placeholder `dev` and `build` scripts with real Angular CLI commands. `@angular/cli` is installed at the monorepo root only — do not add it as a local dependency.

- [ ] **Step 1: Update `apps/docs/package.json`**

```json
{
  "name": "@thereisnoplacelike/ngatoms-docs",
  "version": "0.0.1",
  "private": true,
  "description": "NgAtoms playground app",
  "author": "Lázaro Dutra",
  "license": "MIT",
  "scripts": {
    "dev": "ng serve --project=docs",
    "build": "ng build --project=docs"
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/docs/package.json
git commit -m "chore: update docs package.json with real ng serve/build scripts"
```

---

### Task 9: Full build verification

- [ ] **Step 1: Run the Angular build**

```bash
npx ng build --project=docs
```

Expected: build succeeds with no errors. Output files written to `apps/docs/dist/`.

If there are TypeScript errors, fix them before proceeding. Common issues:
- Wrong import path for `NgAtomsButtonDirective` — double-check the relative path from `apps/docs/src/app/pages/button/` (five `../` hops to reach monorepo root, then `packages/primitives/src/button`)
- Missing `CUSTOM_ELEMENTS_SCHEMA` in a component that uses `<ph-*>` tags

- [ ] **Step 2: Serve the app**

```bash
npx ng serve --project=docs
```

Open `http://localhost:4200` in a browser.

Expected behavior:
- Dark layout with sidebar on the left showing "NgAtoms" title and "Button" link
- Clicking "Button" (or loading directly) shows the button showcase page
- Variants × Sizes grid: 5 rows × 5 columns of buttons, each styled correctly
- Loading state row: 5 buttons showing spinner, text dimmed, not clickable
- Disabled state row: 5 visually dimmed buttons
- Icon examples: 3 buttons with Phosphor icons

- [ ] **Step 3: Stop the dev server (Ctrl+C)**

- [ ] **Step 4: Add `apps/docs/dist` to `.gitignore`**

```bash
echo "apps/docs/dist/" >> .gitignore
git add .gitignore
git commit -m "chore: ignore docs build output"
```

---

### Task 10: Add changeset (required for alpha-targeted PR)

> PRs that modify `packages/*` or `registry/` require a changeset. This PR only modifies `apps/docs` and root config files — no publishable packages are changed. **No changeset is needed.**

Verify this is the case:

```bash
git diff origin/alpha --name-only | grep -E '^packages/|^registry/'
```

Expected: empty output. If any `packages/` or `registry/` files appear, a changeset is required — run `npm run changeset` and follow the prompts.

---
