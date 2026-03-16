import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync, readFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { computeImportPath, patchStylesFile } from './add.js';

let tmpDir;

describe('add.js — computeImportPath', () => {
  it('default config: styles at src/styles.css, components at src/components', () => {
    const result = computeImportPath('src/styles.css', 'src/components', 'button', 'button.styles.css');
    assert.equal(result, './components/button/button.styles.css');
  });

  it('styles file and components dir at same level', () => {
    const result = computeImportPath('styles.css', 'components', 'button', 'button.styles.css');
    assert.equal(result, './components/button/button.styles.css');
  });

  it('styles file deeper than components dir — uses .. traversal', () => {
    const result = computeImportPath('src/app/styles.css', 'src/components', 'button', 'button.styles.css');
    assert.equal(result, '../components/button/button.styles.css');
  });
});

describe('add.js — patchStylesFile', () => {
  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), 'ngatoms-test-'));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it('returns false when styles file does not exist', () => {
    const result = patchStylesFile(join(tmpDir, 'nonexistent.css'), "@import './button/button.styles.css';");
    assert.equal(result, false);
  });

  it('appends the import line when not already present', () => {
    const file = join(tmpDir, 'styles.css');
    writeFileSync(file, 'body { margin: 0; }\n', 'utf8');
    const result = patchStylesFile(file, "@import './components/button/button.styles.css';");
    assert.equal(result, true);
    const content = readFileSync(file, 'utf8');
    assert.ok(content.includes("@import './components/button/button.styles.css';"));
  });

  it('does not duplicate the import if already present', () => {
    const file = join(tmpDir, 'styles.css');
    writeFileSync(file, "@import './components/button/button.styles.css';\nbody { margin: 0; }\n", 'utf8');
    const result = patchStylesFile(file, "@import './components/button/button.styles.css';");
    assert.equal(result, false);
    const content = readFileSync(file, 'utf8');
    const count = (content.match(/@import/g) || []).length;
    assert.equal(count, 1);
  });
});
