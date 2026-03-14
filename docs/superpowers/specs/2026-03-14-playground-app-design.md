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
    ├── index.html
    ├── main.ts                              ← bootstrapApplication(AppComponent, appConfig)
    ├── styles.css                           ← global styles + button.styles.css import
    └── app/
        ├── app.component.ts                 ← root shell: <nav> + <router-outlet>
        ├── app.component.css                ← layout: sidebar nav + main content area
        ├── app.config.ts                    ← provideRouter(routes), provideZonelessChangeDetection()
        ├── app.routes.ts                    ← routes array
        └── pages/
            └── button/
                ├── button-page.component.ts ← showcase grid
                └── button-page.component.css
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
            "scripts": []
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

---

## New Root devDependencies

| Package | Purpose |
|---|---|
| `@angular/cli` | `ng serve` / `ng build` |
| `@angular/router` | Client-side routing |
| `@angular/platform-browser` | `bootstrapApplication` |
| `@angular/platform-browser-dynamic` | Not needed (standalone bootstrap) |
| `@angular-devkit/build-angular` | Application builder (esbuild) |
| `@phosphor-icons/web` | Icon web components |

> `@angular/core`, `@angular/compiler`, `@angular/compiler-cli`, `@angular/common`, and `typescript` are already installed at the root.

---

## App Bootstrap

**`apps/docs/src/main.ts`:**
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch(console.error);
```

**`apps/docs/src/app/app.config.ts`:**
```typescript
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
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
- Standalone component
- Imports: `RouterOutlet`, `RouterLink`, `RouterLinkActive`
- Template: a `<nav>` sidebar listing primitive pages, plus `<router-outlet>`
- `CUSTOM_ELEMENTS_SCHEMA` in `schemas` to allow Phosphor web component tags

---

## Button Showcase Page

**`apps/docs/src/app/pages/button/button-page.component.ts`:**
- Standalone, imports `NgAtomsButtonDirective`
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

---

## Global Styles

**`apps/docs/src/styles.css`:**
- Imports `button.styles.css` from the primitives package source
- Sets a dark background, basic reset, monospace/sans-serif font stack
- No component styles — those live in component CSS files

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
