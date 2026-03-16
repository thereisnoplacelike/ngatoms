import { fetchText, getRawUrl } from './github.js';

export async function fetchRegistry() {
  const url = getRawUrl('registry/registry.json');
  const text = await fetchText(url);
  return JSON.parse(text);
}

export function findComponent(registry, name) {
  return registry.components.find(c => c.name === name) ?? null;
}

export function listComponents(registry) {
  return registry.components.map(c => c.name);
}
