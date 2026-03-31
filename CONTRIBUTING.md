# Contributing to NgAtoms

Thank you for your interest in contributing! NgAtoms is a collection of Angular UI primitives designed to be copied directly into projects. Contributions of all kinds are welcome — bug fixes, new components, docs improvements, and more.

## Table of Contents

- [Getting Started](#getting-started)
- [Repository Structure](#repository-structure)
- [Development Workflow](#development-workflow)
- [Branch Strategy](#branch-strategy)
- [Pull Requests](#pull-requests)
- [Changesets](#changesets)
- [Adding a New Component](#adding-a-new-component)
- [Code Guidelines](#code-guidelines)
- [Commit Messages](#commit-messages)

---

## Getting Started

**Prerequisites:** Node.js 22.x, npm 10+.

```bash
git clone https://github.com/ngAtoms/ngatoms.git
cd ngatoms
npm install
npm run build
```

Verify everything is working:

```bash
npm run test
npm run lint
```

---

## Repository Structure

```
ngatoms/
├─ packages/
│  ├─ ngatoms        # Main package / CLI entry point
│  ├─ cli            # @ngatoms/ngatoms-cli — scaffolding tool
│  ├─ primitives     # @ngatoms/ngatoms-primitives — UI components
│  ├─ tokens         # @ngatoms/ngatoms-tokens — CSS design tokens
│  └─ utils          # @ngatoms/ngatoms-utils — shared utilities
├─ apps/
│  └─ docs           # Documentation site (Angular 21) → ngatoms.com
├─ registry/
│  └─ registry.json  # Component registry read by the CLI
└─ tools/            # Build and publishing scripts
```

---

## Development Workflow

```bash
# Build everything
npm run build

# Run all tests
npm run test

# Run tests for a single package
npm run test --workspace=packages/primitives

# Lint all packages
npm run lint

# Build a single package
npm run build --workspace=packages/primitives

# Run the docs app locally
npm run start --workspace=apps/docs
```

---

## Branch Strategy

The project uses a promotion model — **never commit or merge directly to `main`**.

| Branch | npm tag | Purpose |
|--------|---------|---------|
| `rc`   | `rc`    | Active development — open PRs here |
| `lts`  | `lts`   | Long-term support channel |
| `main` | `latest`| Stable releases |

1. **Fork** the repository and create your branch from `rc`.
2. Branch names should follow the pattern: `feat/<name>`, `fix/<name>`, `docs/<name>`, `chore/<name>`.
3. Open your PR targeting `rc`.

---

## Pull Requests

- Target the `rc` branch (not `main`).
- Keep PRs focused — one feature or fix per PR.
- CI must pass: lint, tests, build, and changeset validation.
- Include relevant tests for new functionality.
- Update docs in `apps/docs` if the change affects a component's API or behavior.

---

## Changesets

**Every PR that modifies a publishable package (`packages/*` or `registry/`) must include a changeset.** CI will fail without one.

```bash
# Interactive changeset prompt — select packages and bump type
npm run changeset
```

Choose the appropriate bump type:

| Type    | When to use |
|---------|-------------|
| `patch` | Bug fixes, non-breaking internal changes |
| `minor` | New features, new components (backward compatible) |
| `major` | Breaking API changes |

Commit the generated `.changeset/*.md` file alongside your changes.

To preview what would be versioned:

```bash
npm run status:changesets
```

---

## Adding a New Component

New components live in `packages/primitives/src/lib/<component-name>/`.

1. **Create the component** following the structure of an existing component (e.g., `button` or `checkbox`).
2. **Export it** from `packages/primitives/src/index.ts`.
3. **Register it** in `registry/registry.json` with the appropriate metadata.
4. **Add a docs page** under `apps/docs/src/app/pages/<component-name>/`.
5. **Write tests** in the component directory.
6. **Run a changeset** with a `minor` bump for `@ngatoms/ngatoms-primitives` and `ngatoms`.

Component checklist:

- [ ] No runtime UI library dependencies
- [ ] ARIA attributes and keyboard navigation implemented
- [ ] Supports the standard size/style variants used by other primitives
- [ ] Exports a standalone Angular component/directive
- [ ] Documented in the docs app with live examples

---

## Code Guidelines

- **No runtime UI dependencies** — components must work with zero third-party runtime packages.
- **Accessibility first** — every interactive primitive must have correct ARIA roles, states, and keyboard support.
- **Angular-native patterns** — use signals, `input()`, `output()`, `inject()` over legacy decorator-based APIs where appropriate.
- **Design tokens** — use CSS custom properties from `@ngatoms/ngatoms-tokens` for colors, spacing, and typography. Use `rem`/`em` over `px`; unitless zero.
- **TypeScript strict mode** — all packages run with strict TypeScript settings.
- **Minimal abstractions** — do not add helpers or utilities for one-off operations. Prefer clarity over cleverness.

---

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short summary>
```

Common types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.

Examples:

```
feat(primitives): add slider component
fix(button): correct loading spinner alignment on small size
docs(contributing): clarify changeset requirement
```

---

## Questions?

Open a [GitHub Discussion](https://github.com/ngAtoms/ngatoms/discussions) or file an issue. We're happy to help.