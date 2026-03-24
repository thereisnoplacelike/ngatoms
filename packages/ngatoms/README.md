<p align="center">
  <a href="https://ngatoms.com/docs">
    <img src="https://raw.githubusercontent.com/ngAtoms/ngatoms/main/apps/docs/src/assets/ngatoms-logo-b.svg" width="80" alt="NgAtoms" />
  </a>
</p>

<h1 align="center">NgAtoms</h1>

<p align="center">Angular UI primitives you own.<br/>No runtime dependency — copy components directly into your project.</p>

<p align="center">
  <a href="https://ngatoms.com/docs"><img src="https://img.shields.io/badge/docs-ngatoms.com-blue" alt="Documentation" /></a>
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

| Component | Description | Status |
|-----------|-------------|--------|
| `accordion` | Collapsible items, single or multiple mode | ✅ Available |
| `alert` | Feedback messages — 5 variants | ✅ Available |
| `badge` | Labels — 5 variants | ✅ Available |
| `button` | Button directive — 5 variants, 5 sizes, loading state | ✅ Available |
| `card` | Container with header, content, footer slots | ✅ Available |
| `checkbox` | Checked, unchecked, and indeterminate states | ✅ Available |
| `dialog` | Modal using native `<dialog>`, focus trap, backdrop | ✅ Available |
| `input` | Input directive — 3 variants, 5 sizes, invalid state | ✅ Available |
| `select` | Custom dropdown with search and multiple selection | ✅ Available |
| `separator` | Horizontal or vertical divider | ✅ Available |
| `switch` | Toggle switch — 3 sizes | ✅ Available |
| `tabs` | Tabbed navigation — underline and pills variants | ✅ Available |
| `textarea` | Multiline input with auto-resize | ✅ Available |
| `tooltip` | Floating label — 4 placements, viewport clamping | ✅ Available |
| `avatar` | Image with fallback initials/icon | 🔜 Coming soon |
| `date-picker` | Calendar overlay for date selection | 🔜 Coming soon |
| `dropdown-menu` | Contextual action menu | 🔜 Coming soon |
| `number-input` | Numeric input with increment/decrement controls | 🔜 Coming soon |
| `popover` | Floating content anchored to a trigger | 🔜 Coming soon |
| `progress` | Progress bar — determinate and indeterminate | 🔜 Coming soon |
| `radio-group` | Radio button group with keyboard navigation | 🔜 Coming soon |
| `spinner` | Loading spinner | 🔜 Coming soon |

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
