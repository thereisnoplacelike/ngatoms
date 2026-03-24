<p align="center">
  <a href="https://ngatoms.com">
    <img src="https://raw.githubusercontent.com/ngAtoms/ngatoms/main/apps/docs/src/assets/ngatoms-logo-b.svg" width="80" alt="NgAtoms" />
  </a>
</p>

<h1 align="center">NgAtoms</h1>

<p align="center">Angular UI primitives you own.<br/>No runtime dependency — copy components directly into your project.</p>

<p align="center">
  <a href="https://ngatoms.com"><img src="https://img.shields.io/badge/docs-ngatoms.com-blue" alt="Documentation" /></a>
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

## Components

Full docs and previews at **[ngatoms.com](https://ngatoms.com)**.

| Component | Description | Status |
|-----------|-------------|--------|
| `accordion` | Collapsible items, single or multiple mode | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `alert` | Feedback messages — 5 variants | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `badge` | Labels — 5 variants | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `button` | Button directive — 5 variants, 5 sizes, loading state | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `card` | Container with header, content, footer slots | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `checkbox` | Checked, unchecked, and indeterminate states | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `dialog` | Modal using native `<dialog>`, focus trap, backdrop | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `input` | Input directive — 3 variants, 5 sizes, invalid state | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `select` | Custom dropdown with search and multiple selection | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `separator` | Horizontal or vertical divider | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `switch` | Toggle switch — 3 sizes | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `tabs` | Tabbed navigation — underline and pills variants | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `textarea` | Multiline input with auto-resize | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `tooltip` | Floating label — 4 placements, viewport clamping | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `avatar` | Image with fallback initials/icon | ![in progress](https://img.shields.io/badge/in_progress-blue?style=flat-square) |
| `date-picker` | Calendar overlay for date selection | ![in progress](https://img.shields.io/badge/in_progress-blue?style=flat-square) |
| `dropdown-menu` | Contextual action menu | ![in progress](https://img.shields.io/badge/in_progress-blue?style=flat-square) |
| `number-input` | Numeric input with increment/decrement controls | ![in progress](https://img.shields.io/badge/in_progress-blue?style=flat-square) |
| `popover` | Floating content anchored to a trigger | ![in progress](https://img.shields.io/badge/in_progress-blue?style=flat-square) |
| `progress` | Progress bar — determinate and indeterminate | ![in progress](https://img.shields.io/badge/in_progress-blue?style=flat-square) |
| `radio-group` | Radio button group with keyboard navigation | ![in progress](https://img.shields.io/badge/in_progress-blue?style=flat-square) |
| `spinner` | Loading spinner | ![in progress](https://img.shields.io/badge/in_progress-blue?style=flat-square) |
| `breadcrumb` | Hierarchical navigation trail | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `combobox` | Text input with filtered dropdown | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `file-upload` | Drag-and-drop file input zone | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `pagination` | Page navigation controls | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `slider` | Range slider — single and dual thumb | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `stepper` | Multi-step wizard progress indicator | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `tag-input` | Input that creates removable tag chips | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `code-block` | Syntax-highlighted code display | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `color-picker` | HSL/hex color selector | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `context-menu` | Right-click triggered menu | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `drawer` | Side-panel overlay | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `rating` | Star rating input | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `skeleton` | Placeholder loading shimmer | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `timeline` | Vertical event timeline | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `tree` | Collapsible tree view | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |

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
