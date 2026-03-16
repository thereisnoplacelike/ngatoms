import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, readFileSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { configExists, readConfig, writeConfig } from './config.js';

let tmpDir;

describe('config.js', () => {
  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), 'ngatoms-test-'));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it('configExists returns false when ngatoms.json does not exist', () => {
    assert.equal(configExists(tmpDir), false);
  });

  it('configExists returns true after writing config', () => {
    writeConfig({ componentsDir: 'src/components', stylesFile: 'src/styles.css', themes: [] }, tmpDir);
    assert.equal(configExists(tmpDir), true);
  });

  it('readConfig returns null when file does not exist', () => {
    assert.equal(readConfig(tmpDir), null);
  });

  it('writeConfig writes valid JSON and readConfig reads it back', () => {
    const config = { componentsDir: 'src/components', stylesFile: 'src/styles.css', themes: ['src/themes/default.css'] };
    writeConfig(config, tmpDir);
    const result = readConfig(tmpDir);
    assert.deepEqual(result, config);
  });

  it('writeConfig writes pretty-printed JSON ending with newline', () => {
    writeConfig({ componentsDir: 'src/components', stylesFile: 'src/styles.css', themes: [] }, tmpDir);
    const raw = readFileSync(join(tmpDir, 'ngatoms.json'), 'utf8');
    assert.ok(raw.endsWith('\n'));
    assert.ok(raw.includes('  "componentsDir')); // indented
  });
});
