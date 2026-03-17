import { createInterface } from 'readline';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, relative, dirname } from 'path';
import { configExists, writeConfig } from '../lib/config.js';
import { fetchText, getRawUrl } from '../lib/github.js';

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

export async function writeTheme(stylesFile, themePath, content, cwd = process.cwd()) {
  const absThemePath = join(cwd, themePath);
  mkdirSync(dirname(absThemePath), { recursive: true });
  writeFileSync(absThemePath, content, 'utf8');

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
    const tokensContent = await fetchText(getRawUrl('packages/tokens/src/tokens.css'));
    await writeTheme(stylesFile, themePath, tokensContent, cwd);
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
