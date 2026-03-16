import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { writeTheme } from './init.js';

let tmpDir;

describe('init.js — writeTheme', () => {
  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), 'ngatoms-test-'));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it('creates the theme file at the given path', async () => {
    await writeTheme('src/styles.css', 'src/themes/default.css', tmpDir);
    assert.ok(existsSync(join(tmpDir, 'src/themes/default.css')));
  });

  it('theme file contains --nga-color-primary', async () => {
    await writeTheme('src/styles.css', 'src/themes/default.css', tmpDir);
    const content = readFileSync(join(tmpDir, 'src/themes/default.css'), 'utf8');
    assert.ok(content.includes('--nga-color-primary'));
  });

  it('creates parent directories for the theme file', async () => {
    await writeTheme('src/styles.css', 'src/deep/nested/theme.css', tmpDir);
    assert.ok(existsSync(join(tmpDir, 'src/deep/nested/theme.css')));
  });

  it('prepends @import to existing styles file', async () => {
    const { mkdirSync } = await import('fs');
    mkdirSync(join(tmpDir, 'src'), { recursive: true });
    const stylesPath = join(tmpDir, 'src/styles.css');
    writeFileSync(stylesPath, 'body { margin: 0; }\n', 'utf8');
    await writeTheme('src/styles.css', 'src/themes/default.css', tmpDir);
    const content = readFileSync(stylesPath, 'utf8');
    assert.ok(content.startsWith("@import './themes/default.css';"));
  });

  it('does not prepend @import if styles file does not exist', async () => {
    await assert.doesNotReject(
      writeTheme('src/styles.css', 'src/themes/default.css', tmpDir)
    );
  });

  it('does not duplicate import if already present', async () => {
    const srcDir = join(tmpDir, 'src');
    const { mkdirSync: mkdir } = await import('fs');
    mkdir(srcDir, { recursive: true });
    const stylesPath = join(srcDir, 'styles.css');
    writeFileSync(stylesPath, "@import './themes/default.css';\nbody { margin: 0; }\n", 'utf8');
    await writeTheme('src/styles.css', 'src/themes/default.css', tmpDir);
    const content = readFileSync(stylesPath, 'utf8');
    const count = (content.match(/@import/g) || []).length;
    assert.equal(count, 1);
  });
});
