# ngatoms

## 0.2.0

### Minor Changes

- Add 8 new components: Input, Switch, Select (custom dropdown with search + multiple selection), Tabs, Accordion, Dialog, Tooltip, and Get Started docs page.

  Update design tokens: cool blue-gray neutral palette (Acorn-inspired), new `info` and `warning` semantic colors, teal success, vivid destructive red, 3-level shadow scale, and improved system font stack.

  Add ESLint configuration with Angular ESLint rules across all workspaces.

### Patch Changes

- 30dfec9: `init` now fetches `tokens.css` from GitHub instead of writing a hardcoded theme template, so the generated theme always reflects the current brand palette.

## 0.1.0

### Minor Changes

- 85478b8: Add CLI: `npx ngatoms init` and `npx ngatoms add <component>`

### Patch Changes

- 8f79907: config packages
