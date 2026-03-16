# NgAtoms CLI — Design Spec

**Date:** 2026-03-14
**Package:** `packages/ngatoms` (repurposed as the CLI)
**Status:** Approved

---

## Overview

A Node.js CLI that lets Angular developers add NgAtoms primitives to their projects via copy-paste. No runtime dependency on NgAtoms — consumers own the files. The CLI is invoked via `npx ngatoms`.

Two commands:
- `npx ngatoms init` — one-time project setup, creates `ngatoms.json` and optionally a theme file
- `npx ngatoms add <component>` — fetches component files from GitHub and copies them into the project

---

## Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Package | `packages/ngatoms` gets the `bin` field | `npx ngatoms` resolves the `ngatoms` package; no separate CLI package needed |
| `packages/cli` | Marked private + `bin` field removed | Superseded by `packages/ngatoms`; removing `bin` prevents workspace bin conflicts |
| File fetching | GitHub raw content, version-pinned | Files always match the CLI version that ran them |
| Channel detection | Parsed from CLI's own `package.json` version string via `import.meta.url` | `0.0.1` → stable, `0.0.1-alpha.1` → alpha; no user flag needed |
| Dependencies | Node built-ins only (`fs`, `fetch`, `readline`) | Node 18+ has native `fetch`; zero install overhead |
| Config format | `ngatoms.json` at consumer project root | Simple, discoverable, version-controllable |
| Theme files | CSS files owned by the consumer | Fits the copy-paste ownership philosophy; no CLI abstraction needed |

---

## Package Restructure

`packages/ngatoms` is restructured from a placeholder into the CLI package.

**`packages/ngatoms/package.json`** must be updated to include:
- `"type": "module"` — all source files are ESM
- `"bin": { "ngatoms": "./bin/cli.js" }` — exposes the `npx ngatoms` command
- `"files": ["bin", "src"]` — ensures both are published
- `"engines": { "node": ">=18" }` — required for native `fetch`

**File structure:**
```
packages/ngatoms/
├── package.json              ← updated (see above)
├── bin/
│   └── cli.js                ← entry point: parses argv, routes to init or add
└── src/
    ├── commands/
    │   ├── init.js           ← init command: interactive setup, writes ngatoms.json + theme
    │   └── add.js            ← add command: fetch files from GitHub, copy, patch styles
    └── lib/
        ├── config.js         ← read/write ngatoms.json
        ├── github.js         ← fetch raw file content from GitHub, detect version/channel
        └── registry.js       ← fetch and parse registry.json from GitHub
```

**`packages/cli/package.json`** changes:
- Add `"private": true`
- Remove the `"bin"` field entirely (prevents workspace bin conflicts with `packages/ngatoms`)

---

## `ngatoms.json`

Created at the consumer's project root by `init`. Read by `add`.

```json
{
  "componentsDir": "src/components",
  "stylesFile": "src/styles.css",
  "themes": ["src/themes/default.css"]
}
```

| Field | Description |
|---|---|
| `componentsDir` | Directory where component files are copied |
| `stylesFile` | Global styles file where `@import` statements are injected |
| `themes` | List of theme CSS file paths (informational; not read by `add`) |

---

## `bin/cli.js` — Entry Point

Parses `process.argv` to determine the command and dispatch:

```js
#!/usr/bin/env node
import { init } from '../src/commands/init.js';
import { add } from '../src/commands/add.js';

const [,, command, ...args] = process.argv;

if (command === 'init') {
  await init();
} else if (command === 'add' && args[0]) {
  await add(args[0]);
} else {
  console.log('Usage:\n  npx ngatoms init\n  npx ngatoms add <component>');
  process.exit(1);
}
```

---

## `lib/github.js` — Version Detection and Fetching

**Reading the CLI's own version in ESM** (no `__dirname` available):

```js
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const { version } = JSON.parse(
  readFileSync(join(__dirname, '../../package.json'), 'utf8')
);
```

**Channel detection from version string:**

| Version format | GitHub ref |
|---|---|
| `1.0.0` | `v1.0.0` |
| `1.0.0-alpha.1` | `v1.0.0-alpha.1` |
| `1.0.0-beta.1` | `v1.0.0-beta.1` |
| `1.0.0-rc.1` | `v1.0.0-rc.1` |

The ref is always `v${version}` — no branch name logic needed.

> **Depth note:** The `join(__dirname, '../../package.json')` path hardcodes that `github.js` lives exactly two directories below `package.json` (`src/lib/` → `../../`). Add a defensive assertion after reading it: `if (pkg.name !== 'ngatoms') throw new Error('Could not locate ngatoms package.json')`. This prevents a silent version mismatch if the file is ever moved.

**Raw file URL pattern:**
```
https://raw.githubusercontent.com/thereisnoplacelike/ngatoms/<ref>/<filepath>
```

Example — fetching the button directive at `v0.0.1`:
```
https://raw.githubusercontent.com/thereisnoplacelike/ngatoms/v0.0.1/packages/primitives/src/button/button.directive.ts
```

The registry is fetched from the same ref:
```
https://raw.githubusercontent.com/thereisnoplacelike/ngatoms/<ref>/registry/registry.json
```

---

## `init` Command

```
npx ngatoms init
```

**Flow:**

1. Check if `ngatoms.json` already exists — if so, ask: `ngatoms.json already exists. Overwrite? (y/N)`. Default: N. Exit if user declines.

2. Ask three questions in sequence using `readline.createInterface`:

   ```
   ? Where should components be copied? (src/components)
   ? Which styles file should imports be added to? (src/styles.css)
   ? Create a theme template? (Y/n)
   ```

   Default for question 3 is **Y**. Always call `rl.close()` after all prompts complete to prevent the process from hanging.

3. Write `ngatoms.json` with the collected values.

4. If user chose Y on question 3:
   - Create `src/themes/` if it doesn't exist
   - Write `src/themes/default.css` (see Theme Template section below)
   - Prepend `@import './themes/default.css';\n` to the configured styles file
   - Set `"themes": ["src/themes/default.css"]` in `ngatoms.json`

5. Print summary:
   ```
   ✓ Created ngatoms.json
   ✓ Created src/themes/default.css
   ✓ Updated src/styles.css

   Run `npx ngatoms add button` to add your first component.
   ```

---

## `add` Command

```
npx ngatoms add <component>
```

**Flow:**

1. Check `ngatoms.json` exists — if not, print:
   ```
   No ngatoms.json found. Run `npx ngatoms init` first.
   ```
   Exit with code 1.

2. Fetch `registry.json` from GitHub (version-pinned). If the component name is not in the registry, print available components and exit with code 1.

3. Check if `<componentsDir>/<component>/` already exists — if so, ask:
   ```
   Component "button" already exists. Overwrite? (y/N)
   ```
   Default: N. Exit if user declines. Always call `rl.close()` after the prompt.

4. Fetch each file listed in the registry entry from GitHub (version-pinned). Copy into `<componentsDir>/<component>/`. Only files listed in the registry entry are fetched — test files (e.g. `button.directive.spec.ts`) are intentionally excluded from the registry and will not be copied.

5. Compute the `@import` path relative from `stylesFile` to the CSS file:
   - The CSS filename comes from the registry entry's `cssImport` field (e.g. `"button.styles.css"`)
   - The full path to the copied CSS file is `<componentsDir>/<component>/<cssImport>`
   - Use Node's `path.relative(path.dirname(stylesFile), <full CSS path>)` to compute the import path
   - Prefix with `./` if the result doesn't start with `..`
   - Example with defaults: `stylesFile = src/styles.css`, `componentsDir = src/components`, result: `./components/button/button.styles.css`
   - Append `@import '<computed-path>';\n` to `stylesFile` if that exact import is not already present

6. Print summary:
   ```
   ✓ Added button to src/components/button/
   ✓ Updated src/styles.css
   ```

---

## Theme Template

`src/themes/default.css` — written by `init`. Contains all `--nga-*` tokens with their canonical default values (synchronized with `button.styles.css`), ready to override:

```css
/* NgAtoms — default theme */
/* Override any variable below to customize your theme.         */
/* Multiple themes: duplicate this file, scope to a class or    */
/* data attribute on your root element, and swap it at runtime. */

:root {
  /* ─── Global tokens ─────────────────────── */
  --nga-radius-md: 0.5rem;
  --nga-color-primary: #2563eb;
  --nga-color-primary-foreground: #ffffff;

  /* ─── Button ────────────────────────────── */
  --nga-btn-radius: var(--nga-radius-md, 0.5rem);
  --nga-btn-font-weight: 600;
  --nga-btn-gap: 0.5rem;
  --nga-btn-transition: background 150ms ease, border-color 150ms ease, opacity 150ms ease;

  /* Focus ring */
  --nga-btn-focus-ring-width: 2px;
  --nga-btn-focus-ring-offset: 2px;
  --nga-btn-focus-ring-color: var(--nga-color-primary, #2563eb);

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
```

---

## Error Handling

| Scenario | Behaviour |
|---|---|
| Unknown component name | Print available components, exit 1 |
| GitHub fetch fails (network error) | Print error message with URL, exit 1 |
| GitHub returns 404 (tag not found) | Print "Check your CLI version or try `npx ngatoms@latest`", exit 1 |
| `ngatoms.json` missing on `add` | Print "Run `npx ngatoms init` first", exit 1 |
| `ngatoms.json` exists on `init` | Ask before overwriting, default N |
| Component dir exists on `add` | Ask before overwriting, default N |
| `stylesFile` not found | Copy files but warn: "Could not find `<stylesFile>` — add the import manually: `@import '<computed-path>'`" |

---

## Out of Scope

- `npx ngatoms list` (list available components) — follow-up
- `npx ngatoms update` (update an existing component) — follow-up
- `npx ngatoms remove` (delete a component) — follow-up
- TypeScript path alias configuration
- Angular module auto-import
- Multiple component install in one command (`add button input`)
