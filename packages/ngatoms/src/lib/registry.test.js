import { describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { findComponent, listComponents, fetchRegistry } from './registry.js';

const MOCK_REGISTRY = {
  components: [
    {
      name: 'button',
      description: 'A button directive.',
      files: [
        'packages/primitives/src/button/button.directive.ts',
        'packages/primitives/src/button/button.styles.css',
        'packages/primitives/src/button/index.ts',
      ],
      cssImport: 'button.styles.css',
    },
  ],
};

describe('registry.js — pure helpers', () => {
  it('findComponent returns the component when it exists', () => {
    const result = findComponent(MOCK_REGISTRY, 'button');
    assert.equal(result.name, 'button');
    assert.equal(result.cssImport, 'button.styles.css');
    assert.equal(result.files.length, 3);
  });

  it('findComponent returns null for an unknown component', () => {
    const result = findComponent(MOCK_REGISTRY, 'input');
    assert.equal(result, null);
  });

  it('listComponents returns array of component names', () => {
    const names = listComponents(MOCK_REGISTRY);
    assert.deepEqual(names, ['button']);
  });
});

describe('registry.js — fetchRegistry', () => {
  it('fetches and parses registry JSON', async () => {
    mock.method(globalThis, 'fetch', async () => ({
      ok: true,
      status: 200,
      text: async () => JSON.stringify(MOCK_REGISTRY),
    }));
    const registry = await fetchRegistry();
    assert.equal(registry.components.length, 1);
    assert.equal(registry.components[0].name, 'button');
    mock.restoreAll();
  });
});
