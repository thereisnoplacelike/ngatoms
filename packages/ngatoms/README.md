<p align="center">
  <img src="https://raw.githubusercontent.com/ngAtoms/ngatoms/main/apps/docs/src/assets/ngatoms-logo-b.svg" width="80" alt="NgAtoms" />
</p>

<h1 align="center">NgAtoms</h1>

<p align="center">Angular UI primitives you own.<br/>No runtime dependency — copy components directly into your project.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/ngatoms"><img src="https://img.shields.io/npm/v/ngatoms?label=npm" alt="npm version" /></a>
  <img src="https://img.shields.io/badge/Angular-21+-red" alt="Angular 21+" />
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT license" />
</p>

---

## Quick Start

```bash
# 1. Initialize your project
npx ngatoms init

# 2. Add a component
npx ngatoms add button
```

`init` creates `ngatoms.json` (config), a default theme file, and wires it into your styles.
`add <component>` fetches the component source from GitHub and copies it into your `componentsDir`.

## Commands

### `npx ngatoms init`

Sets up NgAtoms in your Angular project:

- Creates `ngatoms.json` with your `componentsDir` and `stylesFile` paths
- Optionally scaffolds a default CSS theme file
- Adds the theme `@import` to your styles entry point

### `npx ngatoms add <component>`

Copies a component into your project:

- Fetches source files from the NgAtoms registry
- Writes them to `<componentsDir>/<component>/`
- Patches your `stylesFile` with the component's CSS `@import`

```bash
npx ngatoms add button
npx ngatoms add input
npx ngatoms add dialog
```

## Available Components

| Component | Description |
|-----------|-------------|
| `accordion` | Collapsible items, single or multiple mode |
| `alert` | Feedback messages — 5 variants |
| `badge` | Labels — 5 variants |
| `button` | Button directive — 5 variants, 5 sizes, loading state |
| `card` | Container with header, content, footer slots |
| `checkbox` | Checked, unchecked, and indeterminate states |
| `dialog` | Modal using native `<dialog>`, focus trap, backdrop |
| `input` | Input directive — 3 variants, 5 sizes, invalid state |
| `select` | Custom dropdown with search and multiple selection |
| `separator` | Horizontal or vertical divider |
| `switch` | Toggle switch — 3 sizes |
| `tabs` | Tabbed navigation — underline and pills variants |
| `textarea` | Multiline input with auto-resize |
| `tooltip` | Floating label — 4 placements, viewport clamping |

## Config (`ngatoms.json`)

```json
{
  "componentsDir": "src/components",
  "stylesFile": "src/styles.css",
  "themes": ["src/themes/default.css"]
}
```

## Requirements

- Node >= 18
- Angular >= 21

## License

MIT
