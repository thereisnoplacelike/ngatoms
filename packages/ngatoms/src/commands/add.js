import { createInterface } from 'readline';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join, relative, dirname } from 'path';
import { readConfig } from '../lib/config.js';
import { fetchRegistry, findComponent, listComponents } from '../lib/registry.js';
import { fetchText, getRawUrl } from '../lib/github.js';

async function confirm(rl, question) {
  return new Promise(resolve => {
    rl.question(`${question} (y/N) `, answer => {
      const trimmed = answer.trim().toLowerCase();
      resolve(trimmed === 'y' || trimmed === 'yes');
    });
  });
}

export function computeImportPath(stylesFile, componentsDir, componentName, cssImport) {
  const cssFullPath = join(componentsDir, componentName, cssImport);
  const rel = relative(dirname(stylesFile), cssFullPath);
  return rel.startsWith('..') ? rel : `./${rel}`;
}

export function patchStylesFile(stylesFilePath, importLine) {
  if (!existsSync(stylesFilePath)) return false;
  const existing = readFileSync(stylesFilePath, 'utf8');
  if (existing.includes(importLine)) return false;
  writeFileSync(stylesFilePath, existing + `\n${importLine}\n`, 'utf8');
  return true;
}

export async function add(componentName, cwd = process.cwd()) {
  const config = readConfig(cwd);
  if (!config) {
    console.error('No ngatoms.json found. Run `npx ngatoms init` first.');
    process.exit(1);
  }

  if (!config.componentsDir || !config.stylesFile) {
    console.error('ngatoms.json is missing required fields. Re-run `npx ngatoms init`.');
    process.exit(1);
  }

  const registry = await fetchRegistry();
  const component = findComponent(registry, componentName);
  if (!component) {
    console.error(`Unknown component: "${componentName}"`);
    console.error(`Available: ${listComponents(registry).join(', ')}`);
    process.exit(1);
  }

  const targetDir = join(cwd, config.componentsDir, componentName);
  if (existsSync(targetDir)) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const overwrite = await confirm(rl, `Component "${componentName}" already exists. Overwrite?`);
    rl.close();
    if (!overwrite) process.exit(0);
  }

  mkdirSync(targetDir, { recursive: true });

  for (const filepath of component.files) {
    const url = getRawUrl(filepath);
    const content = await fetchText(url);
    const filename = filepath.split('/').pop();
    writeFileSync(join(targetDir, filename), content, 'utf8');
  }

  const importPath = computeImportPath(
    config.stylesFile,
    config.componentsDir,
    componentName,
    component.cssImport
  );
  const importLine = `@import '${importPath}';`;
  const stylesFilePath = join(cwd, config.stylesFile);
  const patched = patchStylesFile(stylesFilePath, importLine);

  console.log(`\n✓ Added ${componentName} to ${config.componentsDir}/${componentName}/`);
  if (patched) {
    console.log(`✓ Updated ${config.stylesFile}`);
  } else if (!existsSync(stylesFilePath)) {
    console.warn(`⚠ Could not find ${config.stylesFile} — add the import manually:\n  ${importLine}`);
  }
}
