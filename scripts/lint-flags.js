#!/usr/bin/env node
// Validates flags.json conforms to the repo's flag conventions (see README.md).

const fs = require("fs");
const path = require("path");

const FLAGS_PATH = path.join(__dirname, "..", "flags.json");

// Pre-existing keys that predate the enable-* convention. Do not add new
// entries here — new flags must use the enable- prefix.
const LEGACY_PREFIX_EXCEPTIONS = new Set(["master-use-flags"]);

const KEBAB_CASE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function fail(message) {
  console.error(`lint-flags: ${message}`);
  process.exitCode = 1;
}

function warn(message) {
  console.warn(`lint-flags: warning: ${message}`);
}

const raw = fs.readFileSync(FLAGS_PATH, "utf8");

let flags;
try {
  flags = JSON.parse(raw);
} catch (err) {
  fail(`flags.json is not valid JSON: ${err.message}`);
  process.exit(1);
}

if (typeof flags !== "object" || flags === null || Array.isArray(flags)) {
  fail("flags.json must be a single JSON object keyed by flag name.");
  process.exit(1);
}

for (const [key, value] of Object.entries(flags)) {
  if (!KEBAB_CASE.test(key)) {
    fail(`"${key}" is not kebab-case.`);
    continue;
  }

  if (!key.startsWith("enable-") && !LEGACY_PREFIX_EXCEPTIONS.has(key)) {
    fail(`"${key}" must start with "enable-".`);
  }

  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    fail(`"${key}" must map to an object with "title" and "description".`);
    continue;
  }

  const allowedFields = new Set(["title", "description"]);
  for (const field of Object.keys(value)) {
    if (!allowedFields.has(field)) {
      warn(`"${key}" has unexpected field "${field}".`);
    }
  }

  if (typeof value.title !== "string" || value.title.trim() === "") {
    fail(`"${key}" is missing a non-empty "title".`);
  }

  if (typeof value.description !== "string" || value.description.trim() === "") {
    fail(`"${key}" is missing a non-empty "description".`);
  }
}

if (process.exitCode === 1) {
  process.exit(1);
}

console.log(`lint-flags: OK (${Object.keys(flags).length} flags checked).`);
