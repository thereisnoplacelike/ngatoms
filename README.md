# NgAtoms

NgAtoms is a collection of modern Angular UI primitives designed to be **copied directly into your project**.

Instead of installing a heavy component library, NgAtoms lets you add composable components like buttons, dialogs, inputs, and menus directly into your codebase — giving you full control over styling, behavior, and architecture.

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

Preview releases:

```bash
npm install ngatoms@alpha
npm install ngatoms@beta
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

| Branch | Channel | Example version |
|--------|---------|----------------|
| `main` | latest | `1.0.0` |
| `alpha` | alpha | `1.1.0-alpha.0` |
| `beta` | beta | `1.1.0-beta.0` |
| `rc` | release candidate | `1.1.0-rc.0` |

Releases are automated via **Changesets + GitHub Actions**. Every PR that modifies a publishable package must include a changeset:

```bash
npm run changeset
```

## License

MIT