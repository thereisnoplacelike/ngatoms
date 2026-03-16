import { createInterface } from 'readline';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, relative, dirname } from 'path';
import { configExists, writeConfig } from '../lib/config.js';

const THEME_TEMPLATE = `/* NgAtoms — default theme */
/* Override any variable below to customize your theme.         */
/* Multiple themes: duplicate this file, scope to a class or    */
/* data attribute on your root element, and swap it at runtime. */

:root {
  /* ─── Global tokens ─────────────────────── */
  --nga-radius-md: 0.5rem;
  --nga-color-primary: #2563eb;
  --nga-color-primary-foreground: #ffffff;

  /* ─── Button ────────────────────────────── */
  --nga-btn-radius: var(--nga-radius-md, 0.5rem);
  --nga-btn-font-weight: 600;
  --nga-btn-gap: 0.5rem;
  --nga-btn-transition: background 150ms ease, border-color 150ms ease, opacity 150ms ease;

  /* Focus ring */
  --nga-btn-focus-ring-width: 2px;
  --nga-btn-focus-ring-offset: 2px;
  --nga-btn-focus-ring-color: var(--nga-color-primary, #2563eb);

  /* Sizes — padding */
  --nga-btn-padding-xs: 3px 10px;
  --nga-btn-padding-sm: 5px 14px;
  --nga-btn-padding-md: 8px 20px;
  --nga-btn-padding-lg: 11px 28px;
  --nga-btn-padding-xl: 14px 36px;

  /* Sizes — font */
  --nga-btn-font-size-xs: 11px;
  --nga-btn-font-size-sm: 13px;
  --nga-btn-font-size-md: 14px;
  --nga-btn-font-size-lg: 16px;
  --nga-btn-font-size-xl: 18px;

  /* Sizes — spinner */
  --nga-btn-spinner-size-xs: 10px;
  --nga-btn-spinner-size-sm: 12px;
  --nga-btn-spinner-size-md: 14px;
  --nga-btn-spinner-size-lg: 16px;
  --nga-btn-spinner-size-xl: 18px;

  /* Variant: primary */
  --nga-btn-primary-bg:        var(--nga-color-primary, #2563eb);
  --nga-btn-primary-fg:        var(--nga-color-primary-foreground, #ffffff);
  --nga-btn-primary-bg-hover:  color-mix(in srgb, var(--nga-btn-primary-bg) 85%, black);
  --nga-btn-primary-bg-active: color-mix(in srgb, var(--nga-btn-primary-bg) 75%, black);

  /* Variant: outline */
  --nga-btn-outline-border:    var(--nga-color-primary, #2563eb);
  --nga-btn-outline-fg:        var(--nga-color-primary, #2563eb);
  --nga-btn-outline-bg-hover:  color-mix(in srgb, var(--nga-btn-outline-border) 10%, transparent);
  --nga-btn-outline-bg-active: color-mix(in srgb, var(--nga-btn-outline-border) 20%, transparent);

  /* Variant: ghost */
  --nga-btn-ghost-fg:          var(--nga-color-primary, #2563eb);
  --nga-btn-ghost-bg-hover:    color-mix(in srgb, var(--nga-btn-ghost-fg) 10%, transparent);
  --nga-btn-ghost-bg-active:   color-mix(in srgb, var(--nga-btn-ghost-fg) 20%, transparent);

  /* Variant: secondary */
  --nga-btn-secondary-bg:        #f1f5f9;
  --nga-btn-secondary-fg:        #334155;
  --nga-btn-secondary-bg-hover:  #e2e8f0;
  --nga-btn-secondary-bg-active: #cbd5e1;

  /* Variant: destructive */
  --nga-btn-destructive-bg:        #dc2626;
  --nga-btn-destructive-fg:        #ffffff;
  --nga-btn-destructive-bg-hover:  #b91c1c;
  --nga-btn-destructive-bg-active: #991b1b;
}
`;

async function ask(rl, question, defaultValue) {
  return new Promise(resolve => {
    rl.question(`${question} (${defaultValue}) `, answer => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

async function confirm(rl, question, defaultYes) {
  const hint = defaultYes ? 'Y/n' : 'y/N';
  return new Promise(resolve => {
    rl.question(`${question} (${hint}) `, answer => {
      const trimmed = answer.trim().toLowerCase();
      if (trimmed === '') resolve(defaultYes);
      else resolve(trimmed === 'y' || trimmed === 'yes');
    });
  });
}

export async function writeTheme(stylesFile, themePath, cwd = process.cwd()) {
  const absThemePath = join(cwd, themePath);
  mkdirSync(dirname(absThemePath), { recursive: true });
  writeFileSync(absThemePath, THEME_TEMPLATE, 'utf8');

  const absStylesFile = join(cwd, stylesFile);
  if (existsSync(absStylesFile)) {
    const existing = readFileSync(absStylesFile, 'utf8');
    const rel = relative(dirname(join(cwd, stylesFile)), absThemePath);
    const importPath = rel.startsWith('..') ? rel : `./${rel}`;
    const importLine = `@import '${importPath}';\n`;
    if (!existing.includes(importLine.trim())) {
      writeFileSync(absStylesFile, importLine + existing, 'utf8');
    }
  }
}

export async function init(cwd = process.cwd()) {
  if (configExists(cwd)) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const overwrite = await confirm(rl, 'ngatoms.json already exists. Overwrite?', false);
    rl.close();
    if (!overwrite) process.exit(0);
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const componentsDir = await ask(rl, '? Where should components be copied?', 'src/components');
  const stylesFile = await ask(rl, '? Which styles file should imports be added to?', 'src/styles.css');
  const createTheme = await confirm(rl, '? Create a theme template?', true);
  rl.close();

  const themePath = 'src/themes/default.css';
  const config = { componentsDir, stylesFile, themes: [] };

  if (createTheme) {
    await writeTheme(stylesFile, themePath, cwd);
    config.themes = [themePath];
  }

  writeConfig(config, cwd);

  console.log('\n✓ Created ngatoms.json');
  if (createTheme) {
    console.log('✓ Created src/themes/default.css');
    const themeImportRel = relative(dirname(stylesFile), themePath);
    const themeImportPath = themeImportRel.startsWith('..') ? themeImportRel : `./${themeImportRel}`;
    if (existsSync(join(cwd, stylesFile))) {
      console.log(`✓ Updated ${stylesFile}`);
    } else {
      console.warn(`⚠ Could not find ${stylesFile} — add the import manually:\n  @import '${themeImportPath}';`);
    }
  }
  console.log('\nRun `npx ngatoms add button` to add your first component.');
}
