<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ngAtoms/ngatoms/main/apps/docs/src/assets/ngatoms-logo-w.svg" width="160" />
    <img src="https://raw.githubusercontent.com/ngAtoms/ngatoms/main/apps/docs/src/assets/ngatoms-logo-b.svg" width="160" alt="NgAtoms" />
  </picture>
</p>

# NgAtoms

NgAtoms is a collection of modern Angular UI primitives designed to be **copied directly into your project**.

Instead of installing a heavy component library, NgAtoms lets you add composable components like buttons, dialogs, inputs, and menus directly into your codebase — giving you full control over styling, behavior, and architecture.

## Components

Full docs at **[ngatoms.com](https://ngatoms.com)**.

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

## Goals

- Framework-native Angular components
- No runtime UI dependencies
- Accessible primitives
- Design-system friendly
- Fully customizable

## Installation

Stable release:

```bash
npm install ngatoms
```

LTS release:

```bash
npm install ngatoms@lts
```

Release candidate:

```bash
npm install ngatoms@rc
```

## Monorepo Structure

```
ngatoms/
├─ packages/
│  ├─ ngatoms        # Main entry point
│  ├─ cli            # CLI for scaffolding components into your project
│  ├─ primitives     # Angular UI primitive components
│  ├─ tokens         # Design tokens / CSS variables
│  └─ utils          # Shared utilities
├─ apps/
│  └─ docs           # Documentation site
├─ registry/         # Component registry metadata
└─ tools/            # Build and publishing scripts
```

## Development

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm run test

# Lint
npm run lint

# Target a single workspace
npm run build --workspace=packages/primitives
```

## Release Channels

| Branch | npm tag | Example version |
|--------|---------|----------------|
| `main` | `latest` | `1.0.0` |
| `lts` | `lts` | `1.0.5` |
| `rc` | `rc` | `1.1.0-rc.0` |

Releases are automated via **Changesets + GitHub Actions**. Every PR that modifies a publishable package must include a changeset:

```bash
npm run changeset
```

## License

MIT