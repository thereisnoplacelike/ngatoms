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

| Component | Tier | Status |
|-----------|------|--------|
| `accordion` | — | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `alert` | — | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `badge` | — | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `button` | — | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `card` | — | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `checkbox` | — | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `dialog` | — | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `input` | — | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `select` | — | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `separator` | — | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `switch` | — | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `tabs` | — | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `textarea` | — | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `tooltip` | — | ![alpha](https://img.shields.io/badge/alpha-orange?style=flat-square) |
| `avatar` | 1 | ![in progress](https://img.shields.io/badge/in_progress-blue?style=flat-square) |
| `date-picker` | 1 | ![in progress](https://img.shields.io/badge/in_progress-blue?style=flat-square) |
| `dropdown-menu` | 1 | ![in progress](https://img.shields.io/badge/in_progress-blue?style=flat-square) |
| `number-input` | 1 | ![in progress](https://img.shields.io/badge/in_progress-blue?style=flat-square) |
| `popover` | 1 | ![in progress](https://img.shields.io/badge/in_progress-blue?style=flat-square) |
| `progress` | 1 | ![in progress](https://img.shields.io/badge/in_progress-blue?style=flat-square) |
| `radio-group` | 1 | ![in progress](https://img.shields.io/badge/in_progress-blue?style=flat-square) |
| `spinner` | 1 | ![in progress](https://img.shields.io/badge/in_progress-blue?style=flat-square) |
| `breadcrumb` | 2 | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `combobox` | 2 | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `file-upload` | 2 | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `pagination` | 2 | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `slider` | 2 | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `stepper` | 2 | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `tag-input` | 2 | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `code-block` | 3 | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `color-picker` | 3 | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `context-menu` | 3 | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `drawer` | 3 | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `rating` | 3 | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `skeleton` | 3 | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `timeline` | 3 | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |
| `tree` | 3 | ![planned](https://img.shields.io/badge/planned-lightgrey?style=flat-square) |

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
