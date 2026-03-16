# ngatoms

Angular UI primitives you own.

No runtime library dependency — components are copied directly into your project so you control the code.

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
```

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
- Angular project

## License

MIT
