import { describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';

import { VERSION, getRef, getRawUrl, fetchText } from './github.js';

describe('github.js — URL building', () => {
  it('VERSION is a non-empty string', () => {
    assert.ok(typeof VERSION === 'string' && VERSION.length > 0);
  });

  it('getRef returns channel branch for prerelease versions', () => {
    const prerelease = VERSION.match(/-(alpha|beta|rc)\.\d+$/);
    if (prerelease) {
      assert.equal(getRef(), prerelease[1]);
    } else {
      assert.equal(getRef(), `v${VERSION}`);
    }
  });

  it('getRawUrl builds correct GitHub raw URL', () => {
    const url = getRawUrl('registry/registry.json');
    assert.equal(
      url,
      `https://raw.githubusercontent.com/ngAtoms/ngatoms/${getRef()}/registry/registry.json`
    );
  });

  it('getRawUrl works for nested file paths', () => {
    const url = getRawUrl('packages/primitives/src/button/button.directive.ts');
    assert.ok(url.includes('ngAtoms/ngatoms'));
    assert.ok(url.endsWith('packages/primitives/src/button/button.directive.ts'));
  });
});

describe('github.js — fetchText', () => {
  it('returns text on successful response', async () => {
    mock.method(globalThis, 'fetch', async () => ({
      ok: true,
      status: 200,
      text: async () => 'file content',
    }));
    const result = await fetchText('https://example.com/file.txt');
    assert.equal(result, 'file content');
    mock.restoreAll();
  });

  it('throws with 404 guidance message on 404 response', async () => {
    mock.method(globalThis, 'fetch', async () => ({
      ok: false,
      status: 404,
    }));
    await assert.rejects(
      fetchText('https://example.com/missing.txt'),
      /Check your CLI version/
    );
    mock.restoreAll();
  });

  it('throws with status code on non-ok non-404 response', async () => {
    mock.method(globalThis, 'fetch', async () => ({
      ok: false,
      status: 500,
    }));
    await assert.rejects(
      fetchText('https://example.com/error.txt'),
      /500/
    );
    mock.restoreAll();
  });
});
