# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**NgAtoms** is a collection of Angular UI primitives designed to be copied directly into projects rather than installed as a library dependency. Core philosophy: no runtime UI dependencies, full project control.

## Monorepo Structure

npm workspaces monorepo with the following packages:

| Package | Name | Purpose |
|---|---|---|
| `packages/ngatoms` | `ngatoms` | Main entry point |
| `packages/cli` | `@ngatoms/ngatoms-cli` | CLI for component scaffolding |
| `packages/primitives` | `@ngatoms/ngatoms-primitives` | Angular UI primitive components |
| `packages/tokens` | `@ngatoms/ngatoms-tokens` | Design tokens / CSS variables |
| `packages/utils` | `@ngatoms/ngatoms-utils` | Shared utilities |
| `apps/docs` | `@ngatoms/ngatoms-docs` | Angular 21 interactive docs — deployed to `ngatoms.com` via Cloudflare Pages |
| `registry/` | — | Component registry metadata (`registry.json`) |

## Common Commands

```bash
# Install all workspace dependencies
npm install

# Build all packages
npm run build

# Run all tests
npm run test

# Lint all packages
npm run lint

# Run a single workspace's script
npm run build --workspace=packages/primitives
npm run test --workspace=packages/utils
```

## Release & Versioning

Versioning is managed via [Changesets](https://github.com/changesets/cli).

```bash
# Create a changeset before merging a PR
npm run changeset

# View changeset status
npm run status:changesets

# Version packages (from changesets)
npm run version:packages

# Publish (dry run first)
npm run publish:latest:dry
npm run publish:latest

# LTS channel
npm run publish:lts:dry
npm run publish:lts

# RC channel
npm run publish:rc:dry
npm run publish:rc
```

**PRs that modify publishable packages (`packages/*` or `registry/`) require a changeset file** — enforced by CI.

## Release Channels

The project supports multiple release channels via branch strategy:

| Branch | Channel | npm tag |
|---|---|---|
| `main` | Stable | `latest` |
| `lts` | Long-term support | `lts` |
| `rc` | Release candidate | `rc` |

## CI/CD

GitHub Actions workflows:

- **ci.yml** — Runs lint, test, build on PRs and pushes to main/alpha/beta/rc
- **changeset-required.yml** — Validates changeset presence on publishable-package PRs
- **release.yml** — Unified release pipeline (stable + preview)
- **release-main.yml / release-prerelease.yml** — Alternative streamlined release pipelines

Node version: **22.x**

## Architecture Notes

- All packages use **TypeScript + ES modules** (`"type": "module"`)
- Scoped packages use the `@ngatoms/` namespace
- Each package explicitly declares its `files` array — only those files are published
- The `registry/registry.json` is the component registry that the CLI reads from; it lists available components with metadata
- Design tokens in `packages/tokens` are distributed as CSS variables
- The CLI (`packages/cli/bin/`) is the main user-facing tool for scaffolding components into consumer projects