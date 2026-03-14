# Playground App — Design Spec

**Date:** 2026-03-14
**Package:** `apps/docs` (repurposed as playground)
**Status:** Approved

---

## Overview

A running Angular 21 application that serves as both a visual playground and integration harness for NgAtoms primitives. Repurposes the existing `apps/docs` stub. Built with Angular CLI (root `angular.json` workspace mode), routed (one page per primitive), and uses Phosphor Icons web components for polished icon examples.

---

## Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Location | `apps/docs` repurposed | Existing stub, no new workspace entry needed |
| Angular setup | Root `angular.json` (Angular workspace mode) | Single `node_modules`, idiomatic monorepo pattern |
| Icons | `@phosphor-icons/web` (web components) | No Angular-specific package exists; web components work natively in Angular via `CUSTOM_ELEMENTS_SCHEMA` |
| Routing | Angular Router, one route per primitive | Scales naturally as primitives are added |
| Styling | Minimal dark-themed layout CSS in `styles.css` | Playground-specific, not part of any primitive |

---

## File Structure

```
monorepo root/
├── angular.json                             ← NEW: Angular workspace config (project: "docs")

apps/docs/
├── package.json                             ← updated: ng serve / ng build scripts
├── tsconfig.app.json                        ← NEW: extends ../../tsconfig.json
└── src/
    ├── index.html                           ← standard Angular shell; root element <app-root>
    ├── favicon.ico                          ← placeholder (can be any .ico file)
    ├── assets/                              ← empty directory (required by angular.json assets glob)
    ├── main.ts                              ← bootstrapApplication + Phosphor side-effect import
    ├── styles.css                           ← global styles + button.styles.css import
    └── app/
        ├── app.component.ts                 ← root shell: <nav> + <router-outlet>
        ├── app.component.css                ← CSS grid layout: sidebar + main
        ├── app.config.ts                    ← provideRouter(routes), provideZonelessChangeDetection() [stable API, Angular 18+]
        ├── app.routes.ts                    ← routes array
        └── pages/
            └── button/
                ├── button-page.component.ts ← showcase grid
                └── button-page.component.css ← showcase section spacing; no layout primitives
```

---

## Angular Workspace Config

`angular.json` at monorepo root defines a single project `docs`:

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

> `favicon.ico` and the `assets/` directory must exist on disk for the build to succeed. Both are listed in the file structure above. `assets/` can be an empty directory — it just needs to exist.

---

## New Root devDependencies

| Package | Status | Purpose |
|---|---|---|
| `@angular/cli` | new | `ng serve` / `ng build` |
| `@angular/router` | new | Client-side routing |
| `@angular-devkit/build-angular` | new | Application builder (esbuild) |
| `@phosphor-icons/web` | new | Icon web components |

> Already installed at root: `@angular/core`, `@angular/common`, `@angular/compiler`, `@angular/compiler-cli`, `@angular/platform-browser`, `typescript`.

> `@angular/cli` must be installed at the **monorepo root only**. Do not add it to `apps/docs/package.json`. The `ng` binary resolves from root `node_modules/.bin` via npm workspace hoisting — this is correct behavior and requires no local entry.

---

## App Bootstrap

**`apps/docs/src/main.ts`:**
```typescript
import '@phosphor-icons/web';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch(console.error);
```

> The `import '@phosphor-icons/web'` is a side-effect import that registers all Phosphor icon custom elements globally. It must appear before `bootstrapApplication`.

**`apps/docs/src/app/app.config.ts`:**
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

**`apps/docs/src/app/app.routes.ts`:**
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

---

## Root Shell Component

**`apps/docs/src/app/app.component.ts`:**

`CUSTOM_ELEMENTS_SCHEMA` is a property of the `@Component` decorator (standalone component — no NgModule involved):

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

**`apps/docs/src/app/app.component.css`:**
- CSS grid layout: two columns (fixed sidebar + flexible main)
- Sidebar: ~200px wide, dark background, vertical nav links
- Content area: fills remaining width, padding for readability
- Example:
  ```css
  .layout { display: grid; grid-template-columns: 200px 1fr; min-height: 100vh; }
  .sidebar { padding: 1.5rem 1rem; background: #111; display: flex; flex-direction: column; gap: 0.5rem; }
  .content { padding: 2rem; }
  ```

**`apps/docs/src/index.html`:**
Standard Angular CLI template. Root element tag must match the component selector (`app-root`):
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

---

## Button Showcase Page

**`apps/docs/src/app/pages/button/button-page.component.ts`:**
- Standalone, imports `NgAtomsButtonDirective` from a relative path into the primitives source:
  ```typescript
  import { NgAtomsButtonDirective } from '../../../../../../packages/primitives/src/button';
  ```
  This matches the source-import strategy used for CSS (integration harness imports from source, not from a compiled package).
- Also includes `CUSTOM_ELEMENTS_SCHEMA` in its `schemas` array to allow Phosphor icon tags in its own template.
- Sections rendered:

### 1. Variants × Sizes grid
A table-like grid. Rows = variants (`primary`, `outline`, `ghost`, `secondary`, `destructive`). Columns = sizes (`xs`, `sm`, `md`, `lg`, `xl`). Each cell: `<button ngAtomsButton [variant]="v" [size]="s">Button</button>`.

### 2. Loading state row
One button per variant with `[loading]="true"`.

### 3. Disabled state row
One button per variant with native `disabled`.

### 4. Icon examples
A few buttons with Phosphor icons as leading/trailing content, using `CUSTOM_ELEMENTS_SCHEMA`:
```html
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
```

Phosphor web components are registered by importing `@phosphor-icons/web` in `main.ts`.

**`apps/docs/src/app/pages/button/button-page.component.css`:**
Contains section-level spacing only — no layout primitives. Each showcase section (variants grid, loading row, disabled row, icon examples) is wrapped in a `<section>` with a heading. CSS provides `margin-bottom` between sections and styles the `<h2>` headings. The variant-size grid is rendered as a plain `<div>` with CSS grid columns (one per size), rows flowing naturally.

---

## `apps/docs/package.json` Scripts

```json
{
  "scripts": {
    "dev": "ng serve --project=docs",
    "build": "ng build --project=docs"
  }
}
```

---

## `apps/docs/tsconfig.app.json`

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

> **Trade-off:** `"types": []` suppresses all ambient type declarations (e.g. `@types/node`). This is intentional — the playground is a browser app that shouldn't have Node types leaking in. If a test runner is added later that requires ambient types, this array will need entries added.

> **`emitDecoratorMetadata` is intentionally absent.** Angular 21 standalone bootstrapping with signals does not require it. The root `tsconfig.json` sets `experimentalDecorators: true` (inherited here), which is sufficient for Angular decorators without metadata emission.

---

## Global Styles

**`apps/docs/src/styles.css`:**
- Imports `button.styles.css` from the primitives package source via relative path:
  ```css
  @import '../../../packages/primitives/src/button/button.styles.css';
  ```
- Sets a dark background, basic reset, monospace/sans-serif font stack
- No component styles — those live in component CSS files

> **Coupling note:** The relative import path ties the playground directly to the primitives source tree. This is intentional — the playground is an integration harness, not a consumer project, so importing raw source is appropriate. The Angular CLI build (esbuild) resolves the `@import` at build time, so no extra bundler config is needed.

---

## Routing Nav

The nav lists all available primitive pages. For now: just "Button". Each entry is a `[routerLink]` with `routerLinkActive="active"` styling.

---

## Out of Scope

- SSR / prerendering
- Docs prose or MDX-style content
- Production deployment
- More than the button page (follow-up as primitives grow)
- Dark/light mode toggle
