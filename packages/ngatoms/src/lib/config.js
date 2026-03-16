import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const CONFIG_FILE = 'ngatoms.json';

export function configExists(cwd = process.cwd()) {
  return existsSync(join(cwd, CONFIG_FILE));
}

export function readConfig(cwd = process.cwd()) {
  const path = join(cwd, CONFIG_FILE);
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, 'utf8'));
}

export function writeConfig(config, cwd = process.cwd()) {
  const path = join(cwd, CONFIG_FILE);
  writeFileSync(path, JSON.stringify(config, null, 2) + '\n', 'utf8');
}
