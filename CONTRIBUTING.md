# Contributing to NgAtoms

Contributions are welcome.

## Setup

```bash
git clone https://github.com/ngAtoms/ngatoms.git
cd ngatoms
npm install
npm run build
```

## Development Workflow

```bash
# Create a feature branch
git checkout -b feat/my-feature

# Run tests and lint
npm run test
npm run lint

# Target a single package
npm run test --workspace=packages/primitives
```

## Changesets

Every PR that modifies a publishable package (`packages/*` or `registry/`) **must** include a changeset. CI will fail without one.

```bash
npm run changeset
```

Commit the generated file alongside your changes.

## Pull Requests

Open PRs against `main`. CI runs lint, tests, and build automatically, and validates that a changeset is present for package changes.

## Code Guidelines

- Keep components Angular-native with no runtime UI dependencies
- Maintain accessibility in all primitives
- Follow existing architecture patterns in the package you're modifying
