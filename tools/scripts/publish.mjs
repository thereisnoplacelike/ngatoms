#!/usr/bin/env node

import { execSync } from "node:child_process";

function run(command) {
    console.log(`\n> ${command}`);
    execSync(command, {
        stdio: "inherit",
        env: process.env
    });
}

function getArg(name, fallback = null) {
    const args = process.argv.slice(2);
    const index = args.indexOf(name);
    return index >= 0 ? args[index + 1] : fallback;
}

function hasFlag(name) {
    return process.argv.slice(2).includes(name);
}

const channel = getArg("--channel", "latest");
const dryRun = hasFlag("--dry-run");

const validChannels = ["latest", "lts", "rc"];

if (!validChannels.includes(channel)) {
    console.error(`Invalid channel: ${channel}`);
    process.exit(1);
}

function runMaybe(command) {
    if (dryRun) {
        console.log(`\n[dry-run] ${command}`);
        return;
    }
    run(command);
}

try {
    if (channel === "latest") {
        runMaybe("npx changeset version");
        runMaybe("npx changeset publish");
    } else {
        runMaybe(`npx changeset pre enter ${channel}`);
        runMaybe("npx changeset version");
        runMaybe("npx changeset publish");
        runMaybe("npx changeset pre exit");
    }

    console.log("\nPublish flow completed.");
} catch (error) {
    console.error("\nPublish flow failed.");
    process.exit(1);
}