#!/usr/bin/env node
import { init } from '../src/commands/init.js';
import { add } from '../src/commands/add.js';
import { checkForUpdate } from '../src/lib/github.js';

checkForUpdate();

const [,, command, ...args] = process.argv;

if (command === 'init') {
  await init();
} else if (command === 'add' && args[0]) {
  await add(args[0]);
} else if (command && command !== 'add') {
  await add(command);
} else {
  console.log('Usage:\n  npx ngatoms init\n  npx ngatoms add <component>');
  process.exit(1);
}
