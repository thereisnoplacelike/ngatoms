<p align="center">
  <a href="https://ngatoms.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ngAtoms/ngatoms/main/apps/docs/src/assets/ngatoms-logo-w.svg" width="160" />
      <img src="https://raw.githubusercontent.com/ngAtoms/ngatoms/main/apps/docs/src/assets/ngatoms-logo-b.svg" width="160" alt="NgAtoms" />
    </picture>
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

## Components

Full docs and previews at **[ngatoms.com](https://ngatoms.com)**.

| Component | Description | Status |
|-----------|-------------|--------|
| `accordion` | Collapsible items, single or multiple mode | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `alert` | Feedback messages — 5 variants | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `avatar` | Image with fallback initials or icon | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `badge` | Labels — 5 variants | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `button` | 5 variants, 5 sizes, loading state, icon support | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `card` | Container with header, content, footer slots | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `checkbox` | Checked, unchecked, and indeterminate states | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `date-picker` | Custom calendar overlay — single/range, min/max, i18n, month/year picker | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `dialog` | Modal using native `<dialog>`, focus trap, backdrop | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `dropdown-menu` | Contextual action menu — 4 placements, flip, icons, keyboard navigation | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `input` | 3 variants, 5 sizes, invalid state | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `number-input` | Numeric input with increment/decrement controls | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `popover` | Floating content anchored to a trigger — 4 placements, flip | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `progress` | Progress bar — determinate and indeterminate | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `radio-group` | Radio button group with keyboard navigation | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `select` | Styled native select — 3 variants, 5 sizes | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `separator` | Horizontal or vertical divider | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `spinner` | Loading spinner | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `switch` | Toggle switch — 3 sizes | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `tabs` | Underline and pills variants, keyboard navigation | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `textarea` | Multiline input with auto-resize | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `tooltip` | Floating label — 4 placements, viewport clamping | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
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

## Monorepo Structure

```
ngatoms/
├─ packages/
│  ├─ ngatoms        # Published CLI
│  ├─ primitives     # Angular UI primitive components
│  ├─ tokens         # Design tokens / CSS variables
│  └─ utils          # Shared utilities
├─ apps/
│  └─ docs           # Documentation site → ngatoms.com
├─ registry/         # Component registry metadata
└─ tools/            # Build and publishing scripts
```

## Development

```bash
npm install
npm run build
npm run test
npm run lint
```

## Release Channels

| Branch | npm tag | Description |
|--------|---------|-------------|
| `main` | `latest` | Stable |
| `lts` | `lts` | Long-term support |
| `rc` | `rc` | Release candidate |

## License

MIT
