#!/usr/bin/env node
/**
 * Automated QA smoke runner for Phase 6 / 52_QA_CHECKLIST.md
 * Runs quality gates that can be verified without manual UI clicks.
 */
import { spawnSync } from "node:child_process";

const steps = [
  { id: "lint", command: "pnpm", args: ["lint"] },
  { id: "typecheck", command: "pnpm", args: ["typecheck"] },
  { id: "unit", command: "pnpm", args: ["test"] },
  { id: "audit", command: "pnpm", args: ["audit:deps"] },
  { id: "build", command: "pnpm", args: ["build"] },
  { id: "e2e", command: "pnpm", args: ["exec", "playwright", "test"] },
];

const results = [];

for (const step of steps) {
  process.stdout.write(`\n▶ ${step.id}\n`);
  const result = spawnSync(step.command, step.args, {
    stdio: "inherit",
    shell: process.platform === "win32",
    env: {
      ...process.env,
      CI: process.env.CI ?? "true",
    },
  });
  const ok = result.status === 0;
  results.push({ id: step.id, ok });
  if (!ok) {
    break;
  }
}

process.stdout.write("\n=== QA SMOKE SUMMARY ===\n");
for (const item of results) {
  process.stdout.write(`${item.ok ? "PASS" : "FAIL"}  ${item.id}\n`);
}

const failed = results.some((item) => !item.ok);
process.exit(failed ? 1 : 0);
