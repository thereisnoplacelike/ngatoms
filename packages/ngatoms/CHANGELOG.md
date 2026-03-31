# ngatoms

## 0.3.0-rc.0

### Minor Changes

- efbcede: Add popover primitive
- 0ed976c: feat(primitives): add date-picker directive with 3 variants, 5 sizes, invalid state, and webkit normalizations
- b349eb5: feat(primitives): add dropdown-menu component with keyboard navigation and item variants
- a4c399d: feat(cli): add status field to registry entries and warn when adding alpha components

### Patch Changes

- 80b55fe: feat(cli): allow shorthand `npx ngatoms <component>` as alias for `npx ngatoms add <component>`
- d10c9b7: feat(cli): add colored status badge to component status warning — amber background for alpha, green for stable
- e7699f8: feat(cli): check for newer version on startup and warn user with upgrade hint
- 80b55fe: fix(cli): align getRef() tag format with changesets convention (ngatoms@x.y.z) and push tags after publish
- 914ffe6: fix(date-picker): remove unused MONTHS constant to resolve lint errors; update README and docs component table — promote date-picker, dropdown-menu, and popover to alpha, remove tier column, sort alphabetically
- c1b5aa5: `init` now fetches `tokens.css` from GitHub instead of writing a hardcoded theme template, so the generated theme always reflects the current brand palette.
- 2595ad8: Add full component status table with descriptions and tier groupings to README
- 689120f: Add component status table to README showing available and coming-soon components

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
