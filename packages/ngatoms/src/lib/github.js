import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
  readFileSync(join(__dirname, '../../package.json'), 'utf8')
);
// Defensive assertion: verify we resolved the right package.json
if (pkg.name !== 'ngatoms') {
  throw new Error(`Expected package "ngatoms", got "${pkg.name}". Check path resolution in github.js.`);
}

export const VERSION = pkg.version;

export function getRef() {
  const prerelease = VERSION.match(/-(alpha|beta|rc)\.\d+$/);
  if (prerelease) return prerelease[1];
  return `v${VERSION}`;
}

export function getRawUrl(filepath) {
  return `https://raw.githubusercontent.com/ngAtoms/ngatoms/${getRef()}/${filepath}`;
}

export async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(
        `404: ${url}\nCheck your CLI version or try: npx ngatoms@latest`
      );
    }
    throw new Error(`Fetch failed (${res.status}): ${url}`);
  }
  return res.text();
}
