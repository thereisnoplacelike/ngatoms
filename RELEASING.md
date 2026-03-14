# Releasing NgAtoms

NgAtoms uses **Changesets + GitHub Actions** for automated releases. No npm token is required — publishing uses npm trusted publishing via GitHub Actions.

## Changesets

Every PR that modifies a publishable package must include a changeset:

```bash
npm run changeset
```

Select the affected packages and bump type (patch / minor / major). Commit the generated `.changeset/` file with your changes.

## Release Channels

| Branch | Channel | Example version |
|--------|---------|----------------|
| `main` | stable | `1.2.0` |
| `alpha` | alpha | `1.2.0-alpha.0` |
| `beta` | beta | `1.2.0-beta.0` |
| `rc` | release candidate | `1.2.0-rc.0` |

## Stable Release (`main`)

Merge to `main`. CI will automatically:

1. Open a version PR that bumps packages and updates changelogs
2. On merge of the version PR — publish packages and create a GitHub release

## Preview Releases (`alpha` / `beta` / `rc`)

Push to the corresponding branch. CI will version and publish immediately to the matching npm tag.

```bash
npm install ngatoms@alpha
npm install ngatoms@beta
npm install ngatoms@rc
```

## Manual Commands

These are available if you need to run steps locally:

```bash
# Preview what will be versioned
npm run status:changesets

# Version packages from changesets
npm run version:packages

# Dry run before publishing
npm run publish:latest:dry
npm run publish:alpha:dry

# Publish
npm run publish:latest
npm run publish:alpha
```